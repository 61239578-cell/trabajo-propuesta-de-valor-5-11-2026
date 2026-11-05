# Smart Fit Cusco — sitio web con asistente de tallas

Sitio de una sola página con subpáginas (Inicio, Tienda, Asistente de tallas, Nosotros, Tu opinión, Contacto).
Incluye a **Lía**, la asistente flotante que habla en todas las páginas, y el registro de datos a Excel.

## Archivos
```
index.html            -> estructura del sitio
apps-script.gs        -> código para guardar los datos en Google Sheets / Excel
assets/style.css      -> diseño
assets/app.js         -> lógica (asistente, tienda, Lía, encuestas)
assets/config.js      -> AQUÍ configuras el Excel y las imágenes
assets/img/           -> AQUÍ van tus fotos (ver LEEME.txt)
```

## 1. Conectar con Google Sheets / Excel y Test Card 2 (v6.2)
1. Abre el Google Sheets que ya utiliza Smart Fit Cusco. Si quieres conservar el histórico, trabaja sobre ese mismo archivo; no crees uno nuevo.
2. Extensiones -> Apps Script. Borra lo que haya, pega `apps-script.gs` y guarda.
3. Elige la función `configurarTodo` y pulsa Ejecutar (autoriza los permisos). Crea las hojas base, las pestañas KPI, el panel, el registro de visitantes únicos y el archivo Excel automático.
4. Implementar -> Nueva implementación -> Aplicación web. Ejecutar como: Yo. Acceso: Cualquier persona. Copia la URL `/exec`.
5. En `assets/config.js` pega esa URL en `ENDPOINT` y en `CATALOGO_URL` la misma URL seguida de `?catalogo=1`.
6. El Excel `SMARTFIT_CONTROL_KPI.xlsx` se crea en Drive y se actualiza automáticamente cada 5 minutos cuando hay datos nuevos.

Pestañas que se llenan solas:
- **Pedidos**: cada pedido (WhatsApp o reserva en tienda) con cliente, celular, prendas, total y *estado* (lista desplegable: Nuevo, Confirmado, Pagado, Listo para recoger, Entregado, Cancelado). Tú cambias el estado y escribes notas.
- **Tallaje**: medidas, silueta, talla calculada y prendas probadas.
- **Opiniones**: estrellas y comentario tras el tallaje y tras la compra.
- **Encuesta**: encuesta completa de "Tu opinión".
- **Contactos** (con estado Pendiente/Respondido), **Suscriptores**, **Cambios** (cambio de talla) y **Eventos** (clics, favoritos, Lía...).
- **Catalogo**: edita precios, colores, tallas agotadas y se actualiza en la tienda sin tocar código.
- **Resumen**: totales y promedios con fórmulas.

Si cambias el Apps Script debes crear una *nueva implementación* (o "Administrar implementaciones" -> editar -> Nueva versión). Antes de iniciar la difusión real, ejecuta `iniciarNuevaCampaniaTestCard2()` para separar las pruebas técnicas del experimento oficial; no borra el histórico.
El panel principal de la Test Card 2 está en la pestaña `Panel KPI` de Google Sheets. El panel `index.html?admin=1#opinion` corresponde a las métricas generales antiguas del sitio.
En la bolsa, la persona escribe nombre y celular antes de pedir; sin eso no se envía el pedido.

## 2. Agregar imágenes
1. Copia tus fotos a `assets/img/` (nombres sugeridos en `assets/img/LEEME.txt`).
2. Abre `assets/config.js` y escribe la ruta, por ejemplo `v1: 'assets/img/v1.jpg'`.
3. Recarga. Si una foto falla o falta, el sitio usa la ilustración automáticamente.
El paso 4 del probador virtual muestra la fotografía de la prenda elegida, sin maniquí genérico. Si la tienda tiene configurada una foto de la prenda, se muestra esa imagen; si no, aparece una vista de referencia limpia. La opción de subir una foto personal sigue disponible como superposición aproximada en el navegador.

## 3. Catálogo editable desde Google Sheets (sin tocar código)
1. Importa `catalogo.csv` a una hoja nueva de Google Sheets y edítala (una fila por prenda).
   Columnas: id, categoria (vestido, top, casaca, pantalon), nombre, estilo, precio, precio_anterior, etiqueta (Nuevo, -20% o vacío),
   siluetas (reloj, pera, manzana, rect, inv separadas por ;), colores (Negro, Crema, Azul, Terracota, Verde, Mostaza separados por ;), tela, cuidados.
2. Archivo -> Compartir -> Publicar en la web -> elige esa hoja y formato CSV -> Publicar. Copia el link.
3. Pégalo en `assets/config.js` en `CATALOGO_URL`. Si queda vacío o falla, se usa el catálogo que viene en `app.js`.
La clave de imagen de cada prenda es su `id` (ej: `z1: 'assets/img/z1.jpg'` en config.js).

## 4. Pedidos por WhatsApp
En `assets/config.js` cambia `WHATSAPP` por tu número con código de país (ej: `51984123456`). Lo usan el botón "Pedir por WhatsApp" de la bolsa y la página Contacto.

## 5. Publicar en GitHub Pages
1. Repositorio -> Add file -> Upload files. Sube TODO el contenido (incluida la carpeta `assets`).
2. Settings -> Pages -> rama `main`, carpeta `/ (root)`.
3. Abre el link, haz un tallaje, envía una opinión y comprueba que aparezcan filas en la hoja.

Datos de contacto, precios y stock son de ejemplo: cámbialos en `assets/app.js` (buscar `CAT=` y la página `contacto`).


---
## Novedades v4 (imágenes, efectos y mejoras)

**Cómo cambiar fotos:** reemplaza el archivo en `assets/img/` con el mismo nombre (WebP) o cambia la ruta en `assets/config.js`.
Fotos extra de una prenda: `v1_2`, `v1_3`… (miniaturas en la ficha; la `_2` se ve al pasar el mouse en la tarjeta).
Foto por color: `v1_Terracota`, `v1_Verde`… (cambia al elegir el color; si no existe se usa la principal).

**Apagar efectos** (en `assets/config.js`, bloque `EFECTOS`; `EFECTOS: false` apaga todos):
`zoom` · `crossfade` · `tilt` · `colorHover` · `tov` (categorías) · `kenburns` · `parallax` · `entrada` · `reveal` · `marquee` · `lupa` · `lightbox` · `cursor` · `probadorFoto`.
Además se respeta `prefers-reduced-motion`. Todo el código nuevo está en `assets/efectos.js` y al final de `assets/style.css`.

**Tallas agotadas:** columna opcional `agotadas` en `catalogo.csv` (ej. `L;5XL`).
**Cambio de talla:** botón en la bolsa y en el asistente; se registra en el Excel con tipo `cambio_talla`.
**Pago:** botón "Pagar ahora" desactivado; instrucciones al inicio de `assets/efectos.js` y bloque `PAGO` en config.
**Analítica:** bloque `ANALITICA` en config (apagada). **Idioma:** botón ES/EN (traduce la interfaz; las guías del blog están en español).
**SEO / rutas limpias:** `generar-paginas.py` crea `/tienda/`, `/producto/v1/`, `/blog/...` con sus etiquetas (title, description, Open Graph). Pon `SITIO_URL` en config.js y `SITIO` en el script para vistas previas con dirección completa y `sitemap.xml`.


## Ofertas y fidelización (actualizado)
- Los precios rebajados se mantienen en `catalogo.csv` y en el catálogo de respaldo de `assets/app.js`.
- La segunda prenda del carrito recibe un 5% adicional y la tercera prenda en adelante un 10% adicional. El carrito muestra subtotal, ahorro y total final; el total descontado se usa al reservar o generar el pedido por WhatsApp.
- Envío gratis desde S/ 149.90.
- Si el catálogo se conecta a Google Sheets mediante `CATALOGO_URL`, recuerda actualizar también la pestaña **Catalogo** de esa hoja con los precios de `catalogo.csv`, porque el catálogo remoto tiene prioridad sobre el de respaldo.
- Los precios son de demostración y deben revisarse contra los costos y márgenes reales antes de publicar la tienda.


## Validación premium por Test Card 2
Consulta `VALIDACION_METRICAS.md`. La oferta experimental conserva el precio regular de S/120, aplica 10% de descuento (S/108 final) y envío gratis. El formulario exige nombre, WhatsApp y talla. La muestra se compone de los primeros 50 visitantes únicos persistentes y el criterio mínimo es 4 pre-reservas en 7 días. No procesa pagos reales.
