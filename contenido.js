/*
  CONTENIDO DEL CALENDARIO
  Todo el texto sale del documento de briefing. No se inventan citas, recuerdos ni estadísticas.
  Las marcas "TODO" indican textos que conviene revisar o sustituir por los reales antes de publicar.
*/

var PERFILES = {
  naiara: {
    nombre: "Naiara",
    texto: "Espontánea y expresiva. Aporta ocurrencias propias, se implica en organizar detalles y coordinar planes, y combina el humor con mensajes cariñosos."
  },
  melisa: {
    nombre: "Melisa",
    texto: "Muy activa en el grupo y con facilidad para iniciar conversaciones y compartir novedades. Participa mucho en planes, compras, recogidas y cotilleos, con una energía resolutiva."
  },
  alba: {
    nombre: "Alba",
    texto: "Aporta propuestas y participa en la organización. En el chat aparecen mensajes de apoyo y cariño, junto a comentarios inesperados y humor surrealista."
  }
};

var DIAS = [
  {
    n: 1,
    titulo: "Bienvenidas al universo Gildas",
    bloques: [
      { t: "p", texto: "Un regalo de Naiara para Melisa y Alba, y para ella también. Cada casilla se abre desde vuestro propio móvil, en la fecha de Canarias." },
      { t: "p", texto: "Los días que ya se han abierto se pueden volver a abrir. Los que faltan esperan su turno." },
      { t: "p", texto: "Lo que escribáis y respondáis se guarda en este móvil. Si queréis, lo compartís luego por WhatsApp." }
    ]
  },
  {
    n: 2,
    titulo: "El trío original",
    bloques: [
      { t: "foto", src: "assets/fotos/trio-pijamas.jpg", alt: "Naiara, Melisa y Alba con pijamas rayadas en rosa", pie: "Tres pijamas rayadas y tres caras distintas." },
      { t: "tarjetas", items: [
        { titulo: "Naiara", texto: PERFILES.naiara.texto },
        { titulo: "Melisa", texto: PERFILES.melisa.texto },
        { titulo: "Alba", texto: PERFILES.alba.texto }
      ]},
      { t: "nota", texto: "Son descripciones lúdicas basadas en el estilo del chat. No son etiquetas definitivas." }
    ]
  },
  {
    n: 3,
    titulo: "¿Quién habla más?",
    bloques: [
      { t: "p", texto: "Antes de mirar las cifras, adivina quién escribió más mensajes de texto en el chat del grupo." },
      { t: "quiz", id: "q3", preguntas: [
        { p: "¿Quién escribió más mensajes de texto?", ops: ["Naiara", "Melisa", "Alba"], ok: 1 },
        { p: "¿Cuántos mensajes de texto escribió Alba?", ops: ["3.912", "4.312", "4.757"], ok: 1 }
      ]},
      { t: "stats", titulo: "Cifras reales del chat (29 ago 2025 — 16 nov 2026)", items: [
        { valor: "5.000", etiqueta: "mensajes de Melisa · 23.562 palabras" },
        { valor: "4.312", etiqueta: "mensajes de Alba · 19.241 palabras" },
        { valor: "4.257", etiqueta: "mensajes de Naiara · 19.086 palabras" }
      ]},
      { t: "p", texto: "Melisa envió 743 mensajes más que Naiara y 688 más que Alba. Alba envió 55 más que Naiara." },
      { t: "nota", texto: "Son mensajes de texto del archivo. No cuentan audios, vídeos ni stickers, ni cuánto habla cada una en persona." }
    ]
  },
  {
    n: 4,
    titulo: "Museo de frases",
    bloques: [
      { t: "p", texto: "Frases que Naiara ha aportado como recuerdos del grupo. Algunas no aparecen en el archivo de texto, así que se muestran como recuerdos y no como datos." },
      { t: "tarjetas", items: [
        { titulo: "«Prescindió» cuando quería decir «prescribió»", texto: "Naiara. Juego de confusión de palabras." },
        { titulo: "«De pequeño me dijeron que no me podían asustar»", texto: "Romén. Frase aportada por Naiara." },
        { titulo: "«Si hubiese nacido canaria no soñaría con ser chicharrera»", texto: "Melisa. Frase aportada por Naiara." },
        { titulo: "«Eso es pa comer, no pa hartarse»", texto: "Dylan, secundario de nuestro universo." },
        { titulo: "«¿El aparato de Padrón se pega con un velcro?»", texto: "Romén, secundario de nuestro universo." }
      ]}
    ]
  },
  {
    n: 5,
    titulo: "¿Quién dijo eso?",
    bloques: [
      { t: "p", texto: "Primera ronda. Solo entran frases con autoría indicada en el museo." },
      { t: "quiz", id: "q5", preguntas: [
        { p: "«Prescindió» cuando quería decir «prescribió».", ops: ["Naiara", "Melisa", "Alba"], ok: 0 },
        { p: "«Si hubiese nacido canaria no soñaría con ser chicharrera».", ops: ["Alba", "Naiara", "Melisa"], ok: 2 }
      ]}
    ]
  },
  {
    n: 6,
    titulo: "El cumpleaños de Alba",
    bloques: [
      { t: "p", texto: "El cumpleaños de Alba tuvo piñata. Un detalle pequeño que merece su casilla." },
      { t: "escribir", id: "recuerdo-alba", etiqueta: "Tu recuerdo del cumpleaños de Alba", ph: "Escribe lo que recuerdas, con tus palabras." }
    ]
  },
  {
    n: 7,
    titulo: "Premios Gildas",
    bloques: [
      { t: "p", texto: "Premios humorísticos. No son estadísticas ni sentencias: son bromas basadas en lo que dejan ver el chat y el carácter de cada una." },
      { t: "tarjetas", items: [
        { titulo: "Premio a la más escritora", texto: "Melisa, con 5.000 mensajes de texto en el archivo." },
        { titulo: "Premio a la ocurrencia", texto: "Naiara, por sus ocurrencias y expresiones propias." },
        { titulo: "Premio al apoyo", texto: "Alba, por sus mensajes de apoyo y cariño." }
      ]}
    ]
  },
  {
    n: 8,
    titulo: "Secundarios de nuestro universo",
    bloques: [
      { t: "p", texto: "Dylan y Romén son secundarios de nuestro universo. Aparecen de vez en cuando, sin quitarle protagonismo al trío." },
      { t: "tarjetas", items: [
        { titulo: "Dylan", texto: "«Eso es pa comer, no pa hartarse»." },
        { titulo: "Romén", texto: "«¿El aparato de Padrón se pega con un velcro?»" }
      ]},
      { t: "quiz", id: "q8", preguntas: [
        { p: "¿Quién preguntó por el velcro?", ops: ["Dylan", "Romén"], ok: 1 },
        { p: "¿Quién soltó lo de «pa comer, no pa hartarse»?", ops: ["Dylan", "Romén"], ok: 0 }
      ]}
    ]
  },
  {
    n: 9,
    titulo: "¿Quién es más probable que...?",
    bloques: [
      { t: "p", texto: "Votación de opinión, no de datos objetivos. Vota cada una desde su móvil." },
      { t: "votacion", id: "v9a", pregunta: "¿Quién es más probable que organice el próximo plan?", ops: ["Naiara", "Melisa", "Alba"] },
      { t: "votacion", id: "v9b", pregunta: "¿Quién es más probable que se apunte a una compra de última hora?", ops: ["Naiara", "Melisa", "Alba"] },
      { t: "votacion", id: "v9c", pregunta: "¿Quién es más probable que proponga algo nuevo?", ops: ["Naiara", "Melisa", "Alba"] }
    ]
  },
  {
    n: 10,
    titulo: "Nuestro historial de cotilleos",
    bloques: [
      { t: "p", texto: "Un recap ligero del chat. Nada de asuntos privados: solo números y cotilleo de buen rollo." },
      { t: "stats", titulo: "Entre las tres (29 ago 2025 — 16 nov 2026)", items: [
        { valor: "13.569", etiqueta: "mensajes de texto" },
        { valor: "61.889", etiqueta: "palabras" }
      ]},
      { t: "nota", texto: "Cifras del archivo de texto del grupo. No incluyen audios ni vídeos." }
    ]
  },
  {
    n: 11,
    titulo: "Test de personalidad Gilda",
    bloques: [
      { t: "p", texto: "Cinco preguntas para descubrir a qué Gilda te pareces más. Responde como sientes, no como crees que deberías." },
      { t: "test", id: "test11", preguntas: [
        { p: "Llega el plan del fin de semana. ¿Qué haces?", ops: [
          { t: "Lo organizo y mando la lista", perfil: "naiara" },
          { t: "Lo lanzo al grupo con novedades", perfil: "melisa" },
          { t: "Propongo algo nuevo", perfil: "alba" }
        ]},
        { p: "¿Qué tipo de mensaje te sale más en el grupo?", ops: [
          { t: "Una ocurrencia que nadie esperaba", perfil: "naiara" },
          { t: "Una noticia con todos los detalles", perfil: "melisa" },
          { t: "Un mensaje de ánimo", perfil: "alba" }
        ]},
        { p: "Te piden una recogida o una compra. ¿Cómo lo vives?", ops: [
          { t: "Hago la lista de detalles", perfil: "naiara" },
          { t: "Me apunto y lo resuelvo", perfil: "melisa" },
          { t: "Propongo cambiar el plan", perfil: "alba" }
        ]},
        { p: "Una amiga está baja de ánimo. ¿Qué haces?", ops: [
          { t: "Le mando algo gracioso y cariñoso", perfil: "naiara" },
          { t: "Le cuento algo para animarla", perfil: "melisa" },
          { t: "Le escribo un mensaje de apoyo", perfil: "alba" }
        ]},
        { p: "¿Cuál es tu superpoder en el grupo?", ops: [
          { t: "Organizar detalles", perfil: "naiara" },
          { t: "Empezar cualquier conversación", perfil: "melisa" },
          { t: "Soltar ideas inesperadas", perfil: "alba" }
        ]}
      ]}
    ]
  },
  {
    n: 12,
    titulo: "Las tres versiones",
    bloques: [
      { t: "p", texto: "Elegid una anécdota real y contadla desde tres perspectivas. Cada una escribe su versión en su móvil; después podéis juntarlas por WhatsApp." },
      { t: "escribir", id: "v12", etiqueta: "Tu versión de la anécdota", ph: "Cuéntala como la recuerdas tú." },
      { t: "compartir", texto: "Compartir mi versión por WhatsApp" }
    ]
  },
  {
    n: 13,
    titulo: "Ranking de barbaridades",
    bloques: [
      { t: "p", texto: "Ordena las frases del museo de la que más te guste a la que menos. Tu ranking se guarda en tu móvil y puedes compartirlo." },
      { t: "nota", texto: "Solo incluye frases que las tres aceptéis compartir." },
      { t: "ranking", id: "r13", items: [
        "«Prescindió» cuando quería decir «prescribió»",
        "«De pequeño me dijeron que no me podían asustar»",
        "«Si hubiese nacido canaria no soñaría con ser chicharrera»",
        "«Eso es pa comer, no pa hartarse»",
        "«¿El aparato de Padrón se pega con un velcro?»"
      ]},
      { t: "compartir", texto: "Compartir mi ranking por WhatsApp" }
    ]
  },
  {
    n: 14,
    titulo: "¿Cuánto nos conocemos?",
    bloques: [
      { t: "quiz", id: "q14", preguntas: [
        { p: "¿Qué tuvo Alba en su cumpleaños?", ops: ["Una piñata", "Un castillo hinchable", "Una tarta de tres pisos"], ok: 0 },
        { p: "¿Quién escribió más mensajes de texto en el chat?", ops: ["Naiara", "Melisa", "Alba"], ok: 1 },
        { p: "¿Quién de nuestros secundarios preguntó por el velcro?", ops: ["Dylan", "Romén", "Padrón"], ok: 1 },
        { p: "¿Qué periodo cubre el análisis del chat?", ops: ["Del 29 de agosto de 2025 al 16 de noviembre de 2026", "Todo el año 2026", "Un mes de verano"], ok: 0 }
      ]}
    ]
  },
  {
    n: 15,
    titulo: "Frases que necesitan contexto",
    bloques: [
      { t: "p", texto: "Lee la frase y elige su significado. Hay pistas en el propio museo." },
      { t: "quiz", id: "q15", preguntas: [
        { p: "«Prescindió» cuando quería decir…", ops: ["«Proscribió»", "«Prescribió»", "«Prescindir»"], ok: 1 },
        { p: "En «Eso es pa comer, no pa hartarse», ¿qué significa «hartarse»?", ops: ["Comer hasta no poder más", "Pedir la cuenta", "Cocinar un postre"], ok: 0 }
      ]}
    ]
  },
  {
    n: 16,
    titulo: "Detector de contexto",
    bloques: [
      { t: "p", texto: "Una frase sin contexto y opciones disparatadas. Ninguna es real: es pura imaginación." },
      { t: "p", texto: "«¿El aparato de Padrón se pega con un velcro?»" },
      { t: "votacion", id: "v16", pregunta: "¿Qué pasó de verdad?", ops: [
        "Alguien intentaba arreglar la tapa de un cajón con cinta de embalar",
        "Un concurso de cocina con la mitad del público en pijama",
        "Una mudanza con un sofá volador"
      ]}
    ]
  },
  {
    n: 17,
    titulo: "Nuestro vocabulario particular",
    bloques: [
      { t: "tarjetas", items: [
        { titulo: "Pa", texto: "Forma coloquial de «para». Aparece en las frases de Dylan." },
        { titulo: "Chicharrera", texto: "Gentilicio de Santa Cruz de Tenerife, usado aquí con humor." },
        { titulo: "Hartarse", texto: "Comer hasta no poder más." },
        { titulo: "Prescindir / prescribir", texto: "Dos palabras que se confunden con facilidad. Aquí, con historia." }
      ]},
      { t: "escribir", id: "v17", etiqueta: "Una expresión propia del grupo", ph: "Escribe la tuya y explícala." }
    ]
  },
  {
    n: 18,
    titulo: "Momentos surrealistas",
    bloques: [
      { t: "galeria", fotos: [
        { src: "assets/fotos/trio-carnaval.jpg", alt: "Naiara, Melisa y Alba con kimonos rosas, sonriendo en la calle", pie: "Kimonos rosas y selfies a la vez." }
      ]},
      { t: "escribir", id: "v18", etiqueta: "Tu momento surrealista favorito del grupo", ph: "Cuéntalo con tus palabras." }
    ]
  },
  {
    n: 19,
    titulo: "Predicciones 2027",
    bloques: [
      { t: "p", texto: "Escribe una predicción divertida para el grupo en 2027. La tuya se guarda en tu móvil y luego podéis compartirlas por WhatsApp." },
      { t: "escribir", id: "v19", etiqueta: "Mi predicción para 2027", ph: "En 2027, las Gildas..." },
      { t: "compartir", texto: "Compartir mi predicción por WhatsApp" }
    ]
  },
  {
    n: 20,
    titulo: "¿Quién sobreviviría a...?",
    bloques: [
      { t: "p", texto: "Escenarios cotidianos y absurdos. Nada de retos peligrosos: solo a quién le iría mejor." },
      { t: "votacion", id: "v20a", pregunta: "¿Quién sobreviviría a una tarde sin cobertura?", ops: ["Naiara", "Melisa", "Alba"] },
      { t: "votacion", id: "v20b", pregunta: "¿Quién sobreviviría a una mudanza con cajas sin etiquetar?", ops: ["Naiara", "Melisa", "Alba"] },
      { t: "votacion", id: "v20c", pregunta: "¿Quién sobreviviría a un viaje en guagua sin música?", ops: ["Naiara", "Melisa", "Alba"] }
    ]
  },
  {
    n: 21,
    especial: "cumple",
    titulo: "El día de Naiara",
    bloques: [
      { t: "p", texto: "Hoy es el día de Naiara. Melisa y Alba tienen aquí su hueco para felicitarla. Sus mensajes le llegan a Naiara por WhatsApp." },
      { t: "galeria", fotos: [
        { src: "assets/fotos/naiara-1.jpg", alt: "Naiara en primer plano", pie: "Naiara, en primer plano." },
        { src: "assets/fotos/naiara-2.jpg", alt: "Naiara delante de la heladería El Sueño", pie: "Naiara, con la heladería El Sueño de fondo." },
        { src: "assets/fotos/naiara-3.jpg", alt: "Naiara en un viaje", pie: "Naiara, de viaje." }
      ]},
      { t: "p", texto: "Una frase de Naiara para reírse del todo:" },
      { t: "tarjetas", items: [
        { titulo: "«Prescindió» cuando quería decir «prescribió»", texto: "Naiara. Juego de confusión de palabras." }
      ]},
      { t: "quiz", id: "q21", titulo: "¿Cuánto conocéis a la cumpleañera?", preguntas: [
        { p: "¿Qué suele hacer Naiara en el grupo?", ops: ["Organizar detalles y coordinar planes", "Hacer de DJ en todas las comidas", "Vivir en un barco"], ok: 0 },
        { p: "¿Cuántos mensajes de texto escribió Naiara en el periodo analizado?", ops: ["4.257", "4.312", "5.000"], ok: 0 },
        { p: "¿Qué palabra confundió Naiara en su frase del museo?", ops: ["Prescindió por prescribió", "Pa por para", "Chicharrera por canaria"], ok: 0 }
      ]},
      { t: "felicitacion", id: "felic-naiara", destinatario: "Naiara" }
    ]
  },
  {
    n: 22,
    titulo: "Una carta para nuestras Gildas",
    bloques: [
      { t: "p", texto: "Escribe una carta para las otras dos. Puedes empezar con «Querida Gilda:». Cada una la escribe en su móvil y luego pueden compartirla por WhatsApp." },
      { t: "escribir", id: "v22", etiqueta: "Tu carta", ph: "Querida Gilda:" },
      { t: "compartir", texto: "Compartir mi carta por WhatsApp" }
    ]
  },
  {
    n: 23,
    titulo: "Recap 2026",
    bloques: [
      { t: "p", texto: "Lo mejor del año compartido, en números y en palabras." },
      { t: "foto", src: "assets/fotos/cumple-globos.jpg", alt: "Tres chicas delante de globos rosas y naranjas y una tarta de mariposas", pie: "Un cumpleaños con globos rosas y naranjas." },
      { t: "stats", titulo: "El chat, de principio a fin", items: [
        { valor: "13.569", etiqueta: "mensajes de texto entre las tres" },
        { valor: "61.889", etiqueta: "palabras" }
      ]},
      { t: "nota", texto: "Cifras del archivo de texto del grupo (29 ago 2025 — 16 nov 2026)." },
      { t: "escribir", id: "v23", etiqueta: "Lo mejor del año, para mí", ph: "Escríbelo como quieras." },
      { t: "compartir", texto: "Compartir mi recap por WhatsApp" }
    ]
  },
  {
    n: 24,
    especial: "navidad",
    titulo: "Nuestra Nochebuena Gilda",
    bloques: [
      { t: "foto", src: "assets/fotos/trio-teide.jpg", alt: "Naiara, Melisa y Alba delante del Teide nevado al atardecer", pie: "Las tres, con el Teide de fondo." },
      { t: "carta", firma: "Naiara, Melisa y Alba", parrafos: [
        "¡Feliz Navidad, Gildas!",
        "Este calendario empezó siendo un regalo de Adviento y acaba siendo un recuerdo de tres amigas que se buscan aunque no estén juntas. Cada una tiene su manera de estar: una organiza, otra empieza las conversaciones y otra propone cosas nuevas, y todas acabamos en el mismo grupo.",
        "Gracias por reíros de las mismas cosas, por las fotos y por los planes. Lo que cuenta es estar."
      ]},
      { t: "todo", texto: "TODO: revisad el mensaje sobre vuestra amistad y ajustadlo a vuestra forma de hablar." },
      { t: "escribir", id: "v24", etiqueta: "Tu mensaje final para las Gildas", ph: "Escribe lo último antes de cerrar el calendario." },
      { t: "compartir", texto: "Enviar mis respuestas de todo el calendario por WhatsApp", todas: true },
      { t: "p", texto: "Cerramos el calendario. Gracias por abrirlo cada día." }
    ]
  }
];
