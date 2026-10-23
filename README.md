# My Portfolio

Portafolio personal de Carlos Vilchez, publicado en [carlosvilchez.com](https://carlosvilchez.com).

Hecho con React 18, Tailwind CSS 4 y [Vite](https://vite.dev). Es una sola página, en inglés y español, con modo claro y oscuro.

## Pendientes

- [ ] **Capturas de Yaha WorkShop, YahaMovil y Yahacourier.** Ahora muestran un marcador con el tipo de app.
      Guarda cada captura en `src/assets/projects/` (PNG o JPG, mejor en 16:9 y al menos 1280 px de ancho) y escribe
      el nombre del archivo en `image` del proyecto en `src/data/projects.json` (ahora vale `null`). Al compilar se
      convierte sola a WebP en dos tamaños.
- [ ] **CV en PDF.** Guárdalo en `public/` (por ejemplo `public/cv-carlos-vilchez.pdf`) y pon su ruta en `cvUrl`
      en `src/data/profile.js`. El botón "Descargar CV" aparece solo en la portada.

## Dónde cambiar el contenido

| Qué                                      | Archivo                         |
| ---------------------------------------- | ------------------------------- |
| Textos de la web (inglés y español)      | `src/data/translations.json`    |
| Proyectos: resumen, descripción, imagen  | `src/data/projects.json`        |
| Capturas de los proyectos                | `src/assets/projects/`          |
| Tecnologías de cada grupo de habilidades | `src/data/skills.js`            |
| Correo, GitHub, LinkedIn y CV            | `src/data/profile.js`           |
| Colores del tema claro y oscuro          | `src/index.css`                 |
| Foto de perfil                           | `src/assets/carlos-vilchez.jpg` |
| Imagen al compartir el enlace            | `public/og-image.jpg`           |
| Aviso de cookies y Google Analytics      | `src/analytics.js`              |

## Publicación

La web se publica sola: cada push a `main` pasa por GitHub Actions (`.github/workflows/deploy.yml`), que revisa el
código (lint, formato, pruebas y build) y, si todo pasa, publica la carpeta `build` en GitHub Pages. En los pull
requests se hacen las mismas revisiones, sin publicar. Una auditoría de seguridad (`npm audit`) corre aparte y avisa
en rojo sin bloquear la publicación.

Dependabot (`.github/dependabot.yml`) propone cada lunes las actualizaciones de dependencias en un pull request.

### Configuración inicial (una sola vez, en GitHub)

1. **Settings → Pages → Build and deployment → Source:** elegir **GitHub Actions** (antes era "Deploy from a branch",
   con la rama `gh-pages`).
2. En esa misma página, comprobar que **Custom domain** sigue siendo `carlosvilchez.com` y que **Enforce HTTPS** está
   activado.
3. **Settings → Code security:** activar **Dependabot alerts** y **Dependabot security updates**, para recibir los
   arreglos de seguridad en cuanto se publiquen.
4. Cuando la primera publicación desde `main` funcione, la rama `gh-pages` ya no se usa y se puede borrar.

## Requisitos

Node.js 20.19+ o 22.12+.

## Comandos

- `npm start` (o `npm run dev`): abre la web en modo desarrollo en [http://localhost:3000](http://localhost:3000) y se recarga al guardar cambios.
- `npm test`: ejecuta las pruebas con [Vitest](https://vitest.dev) en modo observación. Para una sola pasada: `npx vitest run`.
- `npm run build`: genera la versión de producción en la carpeta `build`.
- `npm run preview`: sirve esa versión de producción en local para revisarla antes de publicar.
- `npm run lint`: revisa el código con ESLint (incluye reglas de accesibilidad).
- `npm run format`: da formato al código con Prettier (`npm run format:check` solo lo comprueba).
