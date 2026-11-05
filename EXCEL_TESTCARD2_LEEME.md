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
