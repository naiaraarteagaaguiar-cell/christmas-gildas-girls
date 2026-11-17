/*
  MODO PRUEBA (solo para ti)
  Se activa añadiendo ?prueba=1 a la dirección. Sin ese parámetro no hace nada.
  Permite elegir el día que la app cree que es hoy, para probar cada casilla.
  Para quitarlo del todo: borra este archivo y la línea que lo carga en index.html.
*/
(function () {
  'use strict';
  if (new URLSearchParams(window.location.search).get('prueba') !== '1') return;

  var CLAVE = 'cgg:prueba-fecha';
  var elegida = null;
  try { elegida = localStorage.getItem(CLAVE); } catch (e) { elegida = null; }
  if (elegida) window.CGG_FECHA_FORZADA = elegida;

  function opciones() {
    var lista = [['', 'Fecha real (Canarias)']];
    lista.push(['2026-11-17', '17 nov (antes de diciembre)']);
    for (var d = 1; d <= 24; d++) {
      var v = '2026-12-' + (d < 10 ? '0' + d : d);
      lista.push([v, d + ' de diciembre']);
    }
    lista.push(['2027-01-01', 'Después del 24 (todo abierto)']);
    return lista;
  }

  function montar() {
    var barra = document.createElement('div');
    barra.setAttribute('style',
      'position:fixed;left:0;right:0;bottom:0;z-index:99;background:#3d1622;color:#fff;' +
      'font:15px/1.3 system-ui,sans-serif;padding:10px 12px calc(10px + env(safe-area-inset-bottom,0px));' +
      'display:flex;gap:8px;align-items:center;justify-content:space-between;box-shadow:0 -4px 14px rgba(0,0,0,.25)');

    var txt = document.createElement('span');
    txt.textContent = 'Modo prueba';

    var sel = document.createElement('select');
    sel.setAttribute('aria-label', 'Elegir fecha de prueba');
    sel.setAttribute('style', 'font:inherit;padding:6px;border-radius:8px;max-width:60%');
    opciones().forEach(function (o) {
      var op = document.createElement('option');
      op.value = o[0];
      op.textContent = o[1];
      if (o[0] === (elegida || '')) op.selected = true;
      sel.appendChild(op);
    });
    sel.addEventListener('change', function () {
      try {
        if (sel.value) localStorage.setItem(CLAVE, sel.value);
        else localStorage.removeItem(CLAVE);
      } catch (e) {}
      window.location.reload();
    });

    barra.appendChild(txt);
    barra.appendChild(sel);
    document.body.appendChild(barra);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
  else montar();
})();
