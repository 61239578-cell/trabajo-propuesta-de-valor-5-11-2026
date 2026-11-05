# Instalación final — Smart Fit Cusco · Test Card 2

## Qué incluye esta versión
- Landing page y catálogo original, con el diseño y las páginas existentes.
- Oferta de validación: precio regular S/ 120, descuento de 10% (S/ 12), precio reservado S/ 108 y envío gratis.
- Formulario express obligatorio: nombre, WhatsApp y talla. Al enviarlo, abre WhatsApp con el resumen de la pre-reserva.
- Identificador anónimo persistente por navegador (`visitante_id`) y sesión separada.
- Muestra de los primeros 50 visitantes únicos de cada campaña, deduplicada en el servidor.
- Panel con embudo, conversión a pre-reserva, ventana de 7 días y estados de validación.
- Exportación del libro a `SMARTFIT_CONTROL_KPI.xlsx` en Drive.

## A. Actualizar Google Sheets y Apps Script
1. Abre el Google Sheets que ya utiliza Smart Fit Cusco. No crees otro si quieres conservar las respuestas existentes.
2. Entra en **Extensiones → Apps Script**.
3. Reemplaza el código anterior por el contenido completo de `apps-script.gs` y guarda.
4. Ejecuta `configurarTodo()` una vez y acepta los permisos. Se crearán las pestañas que falten y se añadirán columnas nuevas a las hojas KPI existentes sin borrar sus filas históricas. Las hojas `Resumen` y `Panel KPI` se reconstruyen porque son resúmenes calculados.
5. En **Implementar → Administrar implementaciones**, edita la aplicación web existente y publica una **Nueva versión**. Mantén ejecución como tú y acceso para cualquier persona. Si creas una implementación nueva, copia su URL `/exec`.
6. La URL debe coincidir con `ENDPOINT` y `CATALOGO_URL` en `assets/config.js` (para el catálogo se añade `?catalogo=1`). Revisa también `WHATSAPP`.

## B. Publicar la web en GitHub Pages
1. Descomprime el ZIP. El archivo `index.html` debe quedar directamente en la raíz del repositorio.
2. Sube todo el contenido, incluida la carpeta `assets` y las carpetas de páginas.
3. En GitHub abre **Settings → Pages**, selecciona la rama `main` y la carpeta `/(root)`.
4. Espera a que GitHub publique la URL.

## C. Prueba técnica antes de iniciar la campaña oficial
1. Abre la web en un navegador normal o privado y visita la portada.
2. Comprueba que aparezca una fila en `Visitantes KPI`.
3. Recarga la misma web en el mismo navegador: no debe crear otro visitante único.
4. Pulsa **Congelar mi precio**, completa nombre, WhatsApp y talla, y envía. Se abrirá WhatsApp.
5. Revisa `Reservas Premium`: precio original S/ 120, descuento S/ 12, precio final S/ 108, envío gratis Sí, estado Pendiente y pago_verificado No.
6. Revisa `Experimento KPI` y `Panel KPI`.

Usa datos ficticios para esta prueba. **No inicies la difusión real todavía**, porque las pruebas también cuentan dentro de la campaña activa.

## D. Iniciar los 7 días oficiales
Cuando termines las pruebas técnicas, vuelve a Apps Script y ejecuta una sola vez `iniciarNuevaCampaniaTestCard2()`. Esto crea un ID de campaña nuevo y conserva el histórico anterior. A partir del primer visitante de esa campaña empieza la ventana de 7 días. Después de ejecutarla, no hagas más pruebas con navegadores nuevos: inicia la difusión real.

## Cómo se interpreta el resultado
- **VALIDADA:** pasaron 7 días, los primeros 50 visitantes llegaron dentro de ese plazo y al menos 4 completaron la pre-reserva.
- **NO VALIDADA:** se completaron los 50 visitantes dentro de 7 días, pero hubo menos de 4 pre-reservas.
- **INCOMPLETA:** terminaron los 7 días, pero no se alcanzaron 50 visitantes dentro del plazo.
- **EN PROCESO:** la ventana de 7 días todavía no termina.
- **SIN INICIO:** todavía no llegó ningún visitante único.

**Aclaración matemática:** el PDF original indica “4%” y a la vez “mínimo 4 personas de 50”. Cuatro de 50 equivale a 8%. El sistema conserva el mínimo de cuatro personas y muestra 8% como porcentaje equivalente.

## Limitaciones que debes conocer
- Un visitante único significa un navegador/dispositivo con almacenamiento persistente, no una persona verificada. Si alguien usa otro dispositivo, navegación privada o borra el almacenamiento, puede contarse otra vez.
- La web no puede verificar la respuesta del Apps Script porque usa `no-cors`; comprueba las filas en Google Sheets.
- El sistema no procesa pagos. La columna `pago_verificado` se marca manualmente después de comprobar un pago real.
- La prueba debe dirigirse a público de Cusco; el identificador anónimo no determina la ubicación física del visitante.


---

# SMART FIT CUSCO — actualización Test Card 2 v6.5

## Cambios
- Se añade la hoja `Evaluación Test Card 2`, con fórmulas para evaluar muestra, duración, pre-reservas, conversión, integridad de datos y oferta.
- La exportación automática a Excel ahora incluye únicamente cinco hojas:
  1. Evaluación Test Card 2
  2. Panel KPI
  3. Visitantes KPI
  4. Reservas Premium
  5. Experimento KPI
- Las hojas operativas de la tienda no se borran del Google Sheets original. Se conservan para no romper formularios ni funciones existentes.
- El Excel exportado ya no arrastra pestañas antiguas/no necesarias para la evaluación del experimento.
- Se mantiene la URL de Apps Script configurada en `assets/config.js`.

## Instalación
1. Reemplaza el contenido de `Código.gs` en Apps Script por `apps-script.gs` de este ZIP.
2. Guarda y ejecuta `configurarTodo()` una vez.
3. Ejecuta `sincronizarExcelAhora()` para generar el Excel compacto inicial.
4. Verifica la hoja `Evaluación Test Card 2`.
5. Implementa una nueva versión de la aplicación web solo si también cambiaste el código de recepción o el despliegue.

## Criterio matemático
La Test Card menciona 4% y también exige al menos 4 personas de 50. Cuatro de 50 equivalen a 8%. El sistema conserva el requisito explícito de cuatro pre-reservas y muestra 8% como tasa equivalente. La pre-reserva mide intención, no pago verificado.
