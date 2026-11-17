# Christmas Gildas Girls

Calendario de Adviento digital para Naiara, Melisa y Alba. Una sola web, 24 casillas del 1 al 24 de diciembre de 2026, que se desbloquean según la hora de Canarias.

## Estructura de archivos

```
christmas-gildas-girls/
├── index.html          Página principal
├── css/
│   └── estilos.css     Diseño (scrapbook, coquette, responsive)
├── js/
│   ├── contenido.js    Textos y actividades de los 24 días
│   └── app.js          Lógica: fechas, desbloqueo, tests, guardado y WhatsApp
├── assets/
│   └── fotos/          Fotografías optimizadas para móvil
├── .nojekyll           Indica a GitHub Pages que sirva los archivos tal cual
└── README.md           Esta guía
```

## Publicar gratis en GitHub Pages

1. **Crea una cuenta en GitHub** en https://github.com si no tienes una. Es gratis.

2. **Crea un repositorio nuevo**
   - Pulsa el botón **+** (arriba a la derecha) y elige **New repository**.
   - Nombre: `christmas-gildas-girls` (puedes usar otro, pero el enlace cambiará).
   - Marca **Public**. GitHub Pages gratuito necesita que el repositorio sea público.
   - No marques ninguna casilla de inicialización. Pulsa **Create repository**.

3. **Sube los archivos**
   - En la página del repositorio recién creado, pulsa **uploading an existing file** (o **Add file → Upload files**).
   - Arrastra **todo el contenido de la carpeta del proyecto**: `index.html`, las carpetas `css`, `js` y `assets`, `README.md` y `.nojekyll`.
   - Espera a que terminen de subirse, escribe un mensaje como «Primera versión» y pulsa **Commit changes**.

4. **Activa GitHub Pages**
   - Ve a **Settings** (pestaña del repositorio).
   - En el menú izquierdo, pulsa **Pages**.
   - En **Build and deployment → Source**, elige **Deploy from a branch**.
   - En **Branch**, elige **main** y la carpeta **/ (root)**. Pulsa **Save**.

5. **Espera 1 o 2 minutos** y recarga la página de Pages. Aparecerá un mensaje con el enlace definitivo:

   ```
   https://TU-USUARIO.github.io/christmas-gildas-girls/
   ```

   Sustituye `TU-USUARIO` por tu nombre de usuario de GitHub.

6. **Comparte el enlace** por WhatsApp con las tres. Cada una lo abre desde su propio móvil.

## Cómo funciona

- **Desbloqueo:** la app usa la fecha de Canarias (Europe/Canary). Hasta el 30 de noviembre todas las casillas están bloqueadas. A partir del 1 de diciembre se abre una casilla por día. Las casillas ya abiertas se pueden volver a abrir. Las futuras siguen bloqueadas.
- **Felicitación del día 21:** cada una escribe en su móvil y pulsa el botón para enviarla por WhatsApp a Naiara. Naiara no ve las felicitaciones dentro de la web, porque llegan por WhatsApp. Su propio móvil muestra un aviso en ese hueco.
- **Respuestas:** se guardan en el móvil donde se responde (localStorage). No hay base de datos, así que **cada móvil guarda sus propias respuestas**. Para juntarlas, cada una pulsa el botón verde de WhatsApp de su día y elige a quién enviarlo. En el día 24 hay un botón que envía todas las respuestas de todo el calendario.
- **Nombre:** la primera vez se pregunta quién eres. Ese nombre aparece en los mensajes que compartes.
- **Sin rankings globales:** no hay ranking compartido, porque no hay base de datos real. El ranking del día 13 es personal.

## Modo prueba (para revisar cada día)

Añade `?prueba=1` a la dirección. Aparece una barra en la parte inferior con un selector para elegir el día que la app considera «hoy» (del 1 al 24 de diciembre). Así puedes abrir y revisar cada casilla. Sin `?prueba=1` la barra no aparece. Para quitarla del todo, borra `js/prueba.js` y su línea en `index.html`.

## Probar el calendario antes de publicarlo

Puedes simular cualquier fecha añadiendo `?simular=AAAA-MM-DD` al final del enlace:

- `https://TU-USUARIO.github.io/christmas-gildas-girls/?simular=2026-12-10` muestra el calendario como si fuera el 10 de diciembre.
- `?simular=2026-12-24` muestra el día 24 y todas las casillas abiertas.

Cuando quieras que sea la fecha real, usa el enlace sin `?simular`. Si prefieres que nadie pueda usar esa opción, elimina la línea que empieza por `var sim` dentro de `hoyCanarias()` en `js/app.js`.

## Antes de compartirlo: revisa estos textos

Los textos vienen del documento de briefing. Hay tres partes que conviene revisar:

1. **Día 21:** Melisa y Alba escriben su felicitación en su propio móvil y la envían a Naiara por WhatsApp. No hay texto de ejemplo: el hueco está vacío hasta que ellas lo usen.
2. **Día 24:** el mensaje sobre vuestra amistad también es un borrador. Revísalo y ajústalo a vuestra forma de hablar.
3. **Día 23:** la foto de los globos rosas y naranjas (con la tarta de mariposas) está en el Recap 2026, con un pie neutral. No se atribuye a ningún cumpleaños concreto.

La nota `TODO` del día 24 es solo para ti: la web no la muestra.

## Actualizar la web

Para cambiar un texto, edita el archivo correspondiente en GitHub (icono del lápiz) o súbelo de nuevo. En uno o dos minutos el enlace se actualiza solo.
