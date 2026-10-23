# My Portfolio

Portafolio personal de Carlos Vilchez, publicado en [carlosvilchez.com](https://carlosvilchez.com).

Hecho con React 18, Tailwind CSS 4 y [Vite](https://vite.dev). Es una sola página, en inglés y español, con modo claro y oscuro.

## Pendientes

- [ ] **Capturas de Yaha WorkShop, YahaMovil y Yahacourier.** Ahora muestran un marcador con el tipo de app.
      Guarda cada captura en `public/` (mejor en formato 16:9) y escribe el nombre del archivo en `image`
      del proyecto en `src/data/projects.json` (ahora vale `null`).
- [ ] **CV en PDF.** Guárdalo en `public/` (por ejemplo `public/cv-carlos-vilchez.pdf`) y pon su ruta en `cvUrl`
      en `src/data/profile.js`. El botón "Descargar CV" aparece solo en la portada.

## Dónde cambiar el contenido

| Qué                                      | Archivo                         |
| ---------------------------------------- | ------------------------------- |
| Textos de la web (inglés y español)      | `src/data/translations.json`    |
| Proyectos: resumen, descripción, imagen  | `src/data/projects.json`        |
| Tecnologías de cada grupo de habilidades | `src/data/skills.js`            |
| Correo, GitHub, LinkedIn y CV            | `src/data/profile.js`           |
| Colores del tema claro y oscuro          | `src/index.css`                 |
| Foto de perfil                           | `src/assets/carlos-vilchez.jpg` |
| Imagen al compartir el enlace            | `public/og-image.jpg`           |

## Requisitos

Node.js 20.19+ o 22.12+.

## Comandos

- `npm start` (o `npm run dev`): abre la web en modo desarrollo en [http://localhost:3000](http://localhost:3000) y se recarga al guardar cambios.
- `npm test`: ejecuta las pruebas con [Vitest](https://vitest.dev) en modo observación. Para una sola pasada: `npx vitest run`.
- `npm run build`: genera la versión de producción en la carpeta `build`, lista para publicar en la rama `gh-pages`.
- `npm run preview`: sirve esa versión de producción en local para revisarla antes de publicar.
