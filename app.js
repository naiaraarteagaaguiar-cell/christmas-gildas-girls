/* ==========================================================================
   Christmas Gildas Girls · lógica
   - Desbloqueo según la fecha de Canarias (Europe/Canary).
   - Respuestas guardadas solo en el móvil (localStorage). No hay sincronización.
   - Compartir: abre WhatsApp con el texto preparado.
   ========================================================================== */
(function () {
  'use strict';

  var ANIO = 2026;
  var PREFIJO = 'cgg:';
  var USUARIAS = ['Naiara', 'Melisa', 'Alba'];
  var ICONO_CANDADO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1zm2 0h6V8a3 3 0 0 0-6 0v2z"/></svg>';

  /* ---------- Utilidades ---------- */

  function $(sel) { return document.querySelector(sel); }

  // Crea un elemento. Claves: text (texto), onclick/onX (eventos), resto de atributos.
  function el(tag, attrs, hijos) {
    var nodo = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === false || v === null || v === undefined) return;
        if (k === 'text') nodo.textContent = v;
        else if (k.indexOf('on') === 0) nodo.addEventListener(k.slice(2), v);
        else nodo.setAttribute(k, v === true ? '' : String(v));
      });
    }
    (hijos || []).forEach(function (h) {
      if (h === null || h === undefined) return;
      nodo.appendChild(typeof h === 'string' ? document.createTextNode(h) : h);
    });
    return nodo;
  }

  function leer(clave, valorPorDefecto) {
    try {
      var v = localStorage.getItem(PREFIJO + clave);
      return v === null ? valorPorDefecto : JSON.parse(v);
    } catch (e) {
      return valorPorDefecto;
    }
  }

  function guardar(clave, valor) {
    try {
      localStorage.setItem(PREFIJO + clave, JSON.stringify(valor));
    } catch (e) {
      /* Almacenamiento no disponible (modo privado antiguo): la app sigue funcionando sin guardar. */
    }
  }

  /* ---------- Fechas (Europe/Canary) ---------- */

  // Fecha actual en Canarias como 'YYYY-MM-DD'.
  // Para probar: añade ?simular=2026-12-10 a la dirección. Puedes quitarlo al publicar si quieres.
  function hoyCanarias() {
    if (window.CGG_FECHA_FORZADA) return window.CGG_FECHA_FORZADA; // Modo prueba (js/prueba.js)
    var sim = new URLSearchParams(window.location.search).get('simular');
    if (sim && /^\d{4}-\d{2}-\d{2}$/.test(sim)) return sim;
    // Canarias usa las mismas reglas horarias que Europe/London (UTC+0 en invierno, UTC+1 en verano).
    // Si el navegador no tiene la zona Europe/Canary, se usa Europe/London para no romper la app.
    var opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
    var partes;
    try {
      opciones.timeZone = 'Europe/Canary';
      partes = new Intl.DateTimeFormat('en-CA', opciones).formatToParts(new Date());
    } catch (e) {
      opciones.timeZone = 'Europe/London';
      partes = new Intl.DateTimeFormat('en-CA', opciones).formatToParts(new Date());
    }
    var v = {};
    partes.forEach(function (p) { v[p.type] = p.value; });
    return v.year + '-' + v.month + '-' + v.day;
  }

  function fechaDia(n) {
    return ANIO + '-12-' + (n < 10 ? '0' + n : String(n));
  }

  // Comparar cadenas 'YYYY-MM-DD' funciona porque el formato ordena bien.
  function estadoDia(n, hoy) {
    var f = fechaDia(n);
    if (hoy < f) return 'bloqueado';
    return hoy === f ? 'hoy' : 'abierto';
  }

  function diasEntre(a, b) {
    var pa = a.split('-').map(Number);
    var pb = b.split('-').map(Number);
    return Math.round((Date.UTC(pb[0], pb[1] - 1, pb[2]) - Date.UTC(pa[0], pa[1] - 1, pa[2])) / 864e5);
  }

  function textoCuenta(hoy) {
    if (hoy < fechaDia(1)) {
      var faltan = diasEntre(hoy, fechaDia(1));
      return 'Faltan ' + faltan + (faltan === 1 ? ' día' : ' días') + ' para abrir la primera casilla';
    }
    if (hoy <= fechaDia(24)) {
      var dia = Number(hoy.slice(8));
      var resto = 24 - dia;
      if (resto === 0) return '¡Hoy es Nochebuena!';
      return 'Hoy es el ' + dia + ' de diciembre · faltan ' + resto + (resto === 1 ? ' día' : ' días') + ' para Nochebuena';
    }
    return 'Todas las casillas están abiertas. ¡Feliz Navidad!';
  }

  function buscarDia(n) {
    for (var i = 0; i < DIAS.length; i++) if (DIAS[i].n === n) return DIAS[i];
    return null;
  }

  /* ---------- Usuaria (solo para identificar el mensaje al compartir) ---------- */

  function renderQuien() {
    var cont = $('#quien');
    cont.innerHTML = '';
    var actual = leer('usuaria', null);
    if (!actual) {
      cont.appendChild(el('p', { class: 'quien__pregunta', text: '¿Quién eres? Así tus respuestas llevan tu nombre al compartirlas.' }));
      cont.appendChild(el('div', { class: 'quien__opciones' }, USUARIAS.map(function (nombre) {
        return el('button', {
          type: 'button', class: 'chip', text: nombre,
          onclick: function () { guardar('usuaria', nombre); renderQuien(); }
        });
      })));
    } else {
      cont.appendChild(el('p', { class: 'quien__hola' }, [
        'Juegas como ' + actual + '. ',
        el('button', { type: 'button', text: 'Cambiar', onclick: function () { guardar('usuaria', null); renderQuien(); } })
      ]));
    }
  }

  /* ---------- Calendario ---------- */

  function tieneRespuestas(d) {
    return resumenDia(d).length > 0;
  }

  function renderCalendario() {
    var hoy = hoyCanarias();
    var cont = $('#calendario');
    cont.innerHTML = '';
    DIAS.forEach(function (d) {
      var est = estadoDia(d.n, hoy);
      var clases = ['casilla', 'is-' + (est === 'hoy' ? 'hoy' : est === 'abierto' ? 'abierto' : 'bloqueado')];
      if (d.especial) clases.push('casilla--' + d.especial);

      var etiqueta = d.especial === 'cumple' ? 'cumple' : d.especial === 'navidad' ? 'Nochebuena' : '';
      if (!etiqueta && est !== 'bloqueado' && tieneRespuestas(d)) etiqueta = 'contestado';

      var hijos = [el('span', { class: 'num', text: String(d.n) })];
      if (est === 'bloqueado') {
        var lock = el('span', {});
        lock.innerHTML = ICONO_CANDADO;
        hijos.push(lock.firstChild);
      }
      if (etiqueta) hijos.push(el('span', { class: 'etiq', text: etiqueta }));

      var etiquetaAccesible = 'Día ' + d.n + ': ' + d.titulo +
        (est === 'bloqueado' ? '. Bloqueado hasta el ' + d.n + ' de diciembre' : '');

      cont.appendChild(el('button', {
        type: 'button',
        class: clases.join(' '),
        'data-dia': d.n,
        'aria-label': etiquetaAccesible,
        disabled: est === 'bloqueado',
        onclick: function () { abrirDia(d.n); }
      }, hijos));
    });
  }

  /* ---------- Hoja de cada día ---------- */

  var diaAbierto = null;

  function abrirDia(n) {
    var d = buscarDia(n);
    if (!d || estadoDia(n, hoyCanarias()) === 'bloqueado') return;
    diaAbierto = n;

    var panel = $('#hoja-panel');
    var clasesPanel = ['hoja__panel'];
    if (d.especial === 'cumple') clasesPanel.push('tema-cumple');
    if (d.especial === 'navidad') clasesPanel.push('tema-navidad');
    panel.className = clasesPanel.join(' ');

    $('#hoja-numero').textContent = 'Día ' + d.n;
    $('#hoja-titulo').textContent = d.titulo;

    var cuerpo = $('#hoja-cuerpo');
    cuerpo.innerHTML = '';
    d.bloques.forEach(function (b) {
      var nodo = renderBloque(b, d.n);
      if (nodo) cuerpo.appendChild(nodo);
    });

    $('#hoja').hidden = false;
    document.body.style.overflow = 'hidden';
    panel.scrollTop = 0;
    panel.focus();
  }

  function cerrarDia() {
    $('#hoja').hidden = true;
    document.body.style.overflow = '';
    renderCalendario();
    var boton = diaAbierto && document.querySelector('[data-dia="' + diaAbierto + '"]');
    diaAbierto = null;
    if (boton && !boton.disabled) boton.focus();
  }

  function renderBloque(b, n) {
    switch (b.t) {
      case 'p': return el('p', { class: 'nota-texto', text: b.texto });
      case 'nota': return el('p', { class: 'nota', text: b.texto });
      case 'todo': return null; // Notas de revisión: no se muestran a las Gildas.
      case 'foto': return bloqueFoto(b);
      case 'galeria': return el('div', { class: 'galeria' }, b.fotos.map(bloqueFoto));
      case 'tarjetas': return el('div', { class: 'tarjetas' }, b.items.map(tarjeta));
      case 'stats': return bloqueStats(b);
      case 'quiz': return bloquePreguntas(b, false);
      case 'test': return bloquePreguntas(b, true);
      case 'votacion': return bloqueVotacion(b);
      case 'escribir': return bloqueEscribir(b);
      case 'felicitacion': return bloqueFelicitacion(b);
      case 'ranking': return bloqueRanking(b);
      case 'carta': return bloqueCarta(b, n === 24);
      case 'compartir': return bloqueCompartir(b, n);
      default: return null;
    }
  }

  function bloqueFoto(b) {
    return el('figure', { class: 'foto' }, [
      el('img', { src: b.src, alt: b.alt, loading: 'lazy', decoding: 'async' }),
      el('figcaption', { text: b.pie })
    ]);
  }

  function tarjeta(it) {
    return el('article', { class: 'tarjeta' }, [
      el('h3', { text: it.titulo }),
      it.texto ? el('p', { text: it.texto }) : null
    ]);
  }

  function bloqueStats(b) {
    return el('div', { class: 'bloque' }, [
      b.titulo ? el('p', { class: 'stats__titulo', text: b.titulo }) : null,
      el('div', { class: 'stats' }, b.items.map(function (s) {
        return el('div', { class: 'stat' }, [el('strong', { text: s.valor }), el('span', { text: s.etiqueta })]);
      }))
    ]);
  }

  // Ganadora del test: la persona con más respuestas. En empate gana el orden de la lista.
  function perfilGanador(b, resp) {
    var cuenta = { naiara: 0, melisa: 0, alba: 0 };
    b.preguntas.forEach(function (q, qi) {
      var op = q.ops[resp[qi]];
      if (op && op.perfil) cuenta[op.perfil] += 1;
    });
    var orden = ['naiara', 'melisa', 'alba'];
    return orden.reduce(function (mejor, p) { return cuenta[p] > cuenta[mejor] ? p : mejor; }, orden[0]);
  }

  // Quiz (con respuesta correcta) y test (de personalidad). Se guarda cada respuesta.
  function bloquePreguntas(b, esTest) {
    var clave = 'resp:' + b.id;
    var resp = leer(clave, {});
    var caja = el('div', { class: 'bloque' });

    function construir() {
      caja.innerHTML = '';
      if (b.titulo) caja.appendChild(el('h3', { class: 'bloque__titulo', text: b.titulo }));

      b.preguntas.forEach(function (q, qi) {
        var contestada = resp[qi] !== undefined;
        var opciones = el('div', { class: 'opciones' });
        q.ops.forEach(function (op, oi) {
          var etiqueta = typeof op === 'string' ? op : op.t;
          var clases = 'opcion';
          if (!esTest && contestada) {
            if (oi === q.ok) clases += ' is-ok';
            else if (oi === resp[qi]) clases += ' is-ko';
          }
          var boton = el('button', {
            type: 'button',
            class: clases,
            text: etiqueta,
            disabled: !esTest && contestada,
            onclick: function () {
              resp[qi] = oi;
              guardar(clave, resp);
              construir();
            }
          });
          boton.setAttribute('aria-pressed', String(resp[qi] === oi));
          opciones.appendChild(boton);
        });
        caja.appendChild(el('div', { class: 'pregunta' }, [
          el('p', { class: 'pregunta__enunciado', text: q.p }),
          opciones
        ]));
      });

      var total = b.preguntas.length;
      var contestadas = Object.keys(resp).length;
      if (contestadas === total) {
        if (esTest) {
          var p = PERFILES[perfilGanador(b, resp)];
          caja.appendChild(el('div', { class: 'resultado' }, [
            el('h3', { text: 'Eres más ' + p.nombre }),
            el('p', { text: p.texto }),
            el('p', { class: 'guardado', text: 'Es un juego, no un diagnóstico.' })
          ]));
        } else {
          var aciertos = b.preguntas.filter(function (q, i) { return resp[i] === q.ok; }).length;
          caja.appendChild(el('p', { class: 'marcador', text: 'Has acertado ' + aciertos + ' de ' + total + '.' }));
        }
      }
    }

    construir();
    return caja;
  }

  function bloqueVotacion(b) {
    var clave = 'resp:' + b.id;
    var caja = el('div', { class: 'votacion' });

    function construir() {
      var elegida = leer(clave, null);
      caja.innerHTML = '';
      caja.appendChild(el('p', { class: 'pregunta__enunciado', text: b.pregunta }));
      var opciones = el('div', { class: 'opciones' });
      b.ops.forEach(function (op, oi) {
        var boton = el('button', {
          type: 'button', class: 'opcion', text: op,
          onclick: function () { guardar(clave, oi); construir(); }
        });
        boton.setAttribute('aria-pressed', String(elegida === oi));
        opciones.appendChild(boton);
      });
      caja.appendChild(opciones);
      if (elegida !== null) {
        caja.appendChild(el('p', { class: 'votacion__tu', text: 'Tu voto: ' + b.ops[elegida] + '. Puedes cambiarlo.' }));
      }
    }

    construir();
    return caja;
  }

  function bloqueEscribir(b) {
    var clave = 'texto:' + b.id;
    var idArea = 'area-' + b.id;
    var estado = el('small', { class: 'guardado', 'aria-live': 'polite', text: '' });
    var area = el('textarea', { id: idArea, rows: '4', placeholder: b.ph });
    area.value = leer(clave, '');
    area.addEventListener('input', function () {
      guardar(clave, area.value);
      estado.textContent = 'Guardado en este móvil';
    });
    return el('div', { class: 'bloque escribir' }, [
      el('label', { for: idArea, text: b.etiqueta }),
      area,
      estado
    ]);
  }

  // Hueco para que Melisa y Alba feliciten a Naiara. Sin base de datos, el mensaje sale por WhatsApp.
  function bloqueFelicitacion(b) {
    var quien = leer('usuaria', null);
    var caja = el('div', { class: 'bloque escribir felicitacion' });

    if (quien === b.destinatario) {
      caja.appendChild(el('p', { class: 'nota', text: 'Este hueco es para Melisa y Alba. Sus felicitaciones te llegarán por WhatsApp.' }));
      return caja;
    }

    var clave = 'texto:' + b.id;
    var idArea = 'area-' + b.id;
    var estado = el('small', { class: 'guardado', 'aria-live': 'polite', text: '' });
    var area = el('textarea', { id: idArea, rows: '6', placeholder: 'Escribe tu felicitación para Naiara...' });
    area.value = leer(clave, '');
    area.addEventListener('input', function () {
      guardar(clave, area.value);
      estado.textContent = 'Guardado en este móvil';
    });

    var boton = el('button', {
      type: 'button', class: 'boton', text: 'Enviar mi felicitación a Naiara por WhatsApp',
      onclick: function () {
        var texto = area.value.trim();
        if (!quien) { estado.textContent = 'Primero elige arriba quién eres, para firmar tu felicitación.'; return; }
        if (!texto) { estado.textContent = 'Escribe tu felicitación antes de enviarla.'; return; }
        var msg = '🎂 Para Naiara, de ' + quien + ':\n\n' + texto + '\n\n— ' + quien;
        window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      }
    });

    caja.appendChild(el('label', { for: idArea, text: 'Tu felicitación para Naiara' }));
    caja.appendChild(area);
    caja.appendChild(boton);
    caja.appendChild(estado);
    caja.appendChild(el('small', { text: 'Se abre WhatsApp con tu mensaje. Elige a Naiara como destinataria y envíalo.' }));
    return caja;
  }

  function bloqueRanking(b) {
    var clave = 'orden:' + b.id;
    var orden = leer(clave, b.items.map(function (_, i) { return i; }));
    var caja = el('div', { class: 'bloque' });
    caja.appendChild(el('p', { class: 'bloque-titulo-pequeno', text: 'De la que más te gusta a la que menos:' }));
    var lista = null;

    function mover(pos, dir) {
      var nuevo = orden.slice();
      var tmp = nuevo[pos];
      nuevo[pos] = nuevo[pos + dir];
      nuevo[pos + dir] = tmp;
      orden = nuevo;
      guardar(clave, orden);
      construir();
    }

    function construir() {
      if (lista) lista.remove();
      lista = el('ol', { class: 'ranking' });
      orden.forEach(function (idx, pos) {
        lista.appendChild(el('li', {}, [
          el('span', { class: 'ranking__pos', text: String(pos + 1) }),
          el('span', { text: b.items[idx] }),
          el('span', { class: 'ranking__botones' }, [
            el('button', { type: 'button', 'aria-label': 'Subir', text: '▲', disabled: pos === 0, onclick: function () { mover(pos, -1); } }),
            el('button', { type: 'button', 'aria-label': 'Bajar', text: '▼', disabled: pos === orden.length - 1, onclick: function () { mover(pos, 1); } })
          ])
        ]));
      });
      caja.appendChild(lista);
    }

    construir();
    return caja;
  }

  function bloqueCarta(b, navidad) {
    var caja = el('div', { class: 'carta' + (navidad ? ' carta--navidad' : '') });
    b.parrafos.forEach(function (p) { caja.appendChild(el('p', { text: p })); });
    if (b.firma) caja.appendChild(el('p', { class: 'carta__firma', text: '— ' + b.firma }));
    return caja;
  }

  function bloqueCompartir(b, n) {
    return el('div', { class: 'bloque compartir' }, [
      el('button', {
        type: 'button', class: 'boton', text: b.texto,
        onclick: function () {
          var msg = construirMensaje(n, !!b.todas);
          window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
        }
      }),
      el('small', { text: 'Se abre WhatsApp con tus respuestas. Tú eliges a quién se lo envías.' })
    ]);
  }

  /* ---------- Resumen y compartir ---------- */

  function nombreOpcion(op) {
    return typeof op === 'string' ? op : op.t;
  }

  // Líneas de texto con lo que ha respondido en un día. Solo lee lo guardado en este móvil.
  function resumenDia(d) {
    var out = [];
    d.bloques.forEach(function (b) {
      if (b.t === 'quiz' || b.t === 'test') {
        var resp = leer('resp:' + b.id, null);
        if (!resp) return;
        if (b.t === 'test') {
          if (Object.keys(resp).length === b.preguntas.length) {
            out.push('• Test: Eres más ' + PERFILES[perfilGanador(b, resp)].nombre);
          }
          return;
        }
        b.preguntas.forEach(function (q, qi) {
          if (resp[qi] === undefined) return;
          var ok = resp[qi] === q.ok ? ' ✓' : ' ✗';
          out.push('• ' + q.p + ' → ' + nombreOpcion(q.ops[resp[qi]]) + ok);
        });
      } else if (b.t === 'votacion') {
        var voto = leer('resp:' + b.id, null);
        if (voto !== null) out.push('• ' + b.pregunta + ' → ' + b.ops[voto]);
      } else if (b.t === 'escribir' || b.t === 'felicitacion') {
        var texto = leer('texto:' + b.id, '');
        var etiqueta = b.t === 'escribir' ? b.etiqueta : 'Felicitación para ' + b.destinatario;
        if (texto && texto.trim()) out.push('• ' + etiqueta + ':\n' + texto.trim());
      } else if (b.t === 'ranking') {
        var orden = leer('orden:' + b.id, null);
        if (orden) {
          out.push('• Ranking: ' + orden.map(function (idx, pos) {
            return (pos + 1) + '. ' + b.items[idx];
          }).join(' · '));
        }
      }
    });
    return out;
  }

  function urlSinParametros() {
    return window.location.href.split('?')[0].split('#')[0];
  }

  function construirMensaje(n, todas) {
    var quien = leer('usuaria', null) || 'una Gilda';
    var lineas = [];
    var dias = todas ? DIAS : [buscarDia(n)];
    if (todas) {
      lineas.push('🎀 Christmas Gildas Girls · respuestas de ' + quien);
    } else {
      var d0 = dias[0];
      lineas.push('🎀 Christmas Gildas Girls · Día ' + d0.n + ': ' + d0.titulo + ' (' + quien + ')');
    }
    var hayAlgo = false;
    dias.forEach(function (d) {
      var res = resumenDia(d);
      if (!res.length) return;
      hayAlgo = true;
      if (todas) lineas.push('', 'Día ' + d.n + ': ' + d.titulo);
      res.forEach(function (l) { lineas.push(l); });
    });
    if (!hayAlgo) lineas.push('', 'Todavía no hay respuestas guardadas en este móvil.');
    lineas.push('', 'Abrid el calendario: ' + urlSinParametros());
    return lineas.join('\n');
  }

  /* ---------- Inicio ---------- */

  function iniciar() {
    renderQuien();
    renderCalendario();
    $('#cuenta').textContent = textoCuenta(hoyCanarias());

    document.querySelectorAll('[data-cerrar]').forEach(function (nodo) {
      nodo.addEventListener('click', cerrarDia);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !$('#hoja').hidden) cerrarDia();
    });

    // Si cambia el día mientras la página está abierta, se actualizan las casillas.
    var ultimoHoy = hoyCanarias();
    setInterval(function () {
      var ahora = hoyCanarias();
      if (ahora !== ultimoHoy) {
        ultimoHoy = ahora;
        $('#cuenta').textContent = textoCuenta(ahora);
        renderCalendario();
      }
    }, 60000);
  }

  // Exponer lo necesario para las pruebas automáticas.
  window.CGG = { hoyCanarias: hoyCanarias, estadoDia: estadoDia, fechaDia: fechaDia, textoCuenta: textoCuenta };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
