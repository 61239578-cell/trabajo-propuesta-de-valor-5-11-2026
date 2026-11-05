# Smart Fit Cusco — versión preparada para GitHub Pages

## Publicación
1. Descomprime este ZIP en tu computadora.
2. En GitHub, crea un repositorio nuevo (por ejemplo `smart-fit-cusco`).
3. Abre el repositorio y pulsa **Add file → Upload files**.
4. Selecciona y arrastra TODO el contenido descomprimido, incluida la carpeta `assets` y las carpetas `tienda`, `producto`, `blog`, `nosotros`, `asistente` y `opinion`. `index.html` debe quedar directamente en la raíz del repositorio, no dentro de otra carpeta.
5. Pulsa **Commit changes**.
6. Ve a **Settings → Pages**. En **Build and deployment**, elige **Deploy from a branch**, rama `main` y carpeta `/(root)`, y guarda.
7. Espera a que GitHub muestre la URL publicada en esa misma sección.

## Importante
- Es un sitio estático; GitHub Pages sirve el HTML, CSS, JavaScript e imágenes, pero no ejecuta `apps-script.gs`. Para registrar pedidos, opiniones o tallas en Google Sheets, implementa el archivo en Google Apps Script como aplicación web y pega la URL `/exec` en `assets/config.js` en `ENDPOINT` (y en `CATALOGO_URL` si corresponde).
- Las páginas usan rutas relativas y navegación interna para funcionar desde la raíz del repositorio.
- Antes de publicar, revisa `assets/config.js` y confirma el WhatsApp y cualquier endpoint.
