# Validación premium SMART FIT — Test Card 2

## Hipótesis y oferta
La prueba evalúa la disposición a reservar una prenda premium con precio regular de S/ 120.00, incentivo de 10% (S/ 12.00), precio reservado de S/ 108.00 y envío gratis. El formulario exige Nombre, WhatsApp y Talla. No procesa pagos.

## Diseño de la prueba
- Duración: 7 días desde el primer visitante único registrado.
- Muestra: primeros 50 visitantes únicos persistentes.
- Métrica principal: pre-reservas completas de esos primeros 50 visitantes.
- Criterio: mínimo 4 personas de 50 completan la pre-reserva. Matemáticamente, 4/50 = 8%, aunque el PDF original menciona 4%; se conserva el mínimo de cuatro personas y se deja documentada la equivalencia.
- Si terminan los 7 días y no se alcanzan 50 visitantes únicos, el resultado será INCOMPLETA; no se declarará validación.

## Identificación y deduplicación
El navegador genera un `visitante_id` persistente en `localStorage` y un `sesion` por pestaña/sesión. El servidor registra una sola fila por `visitante_id` y fija los primeros 50 como muestra. Los clics e inicios se deduplican por visitante. La identificación representa un navegador/dispositivo, no una persona física: otro dispositivo, navegador privado o almacenamiento borrado puede contarse como visitante distinto.

## Hojas
- `Visitantes KPI`: registro de visitantes únicos, número de muestra y marca Sí/No para los primeros 50.
- `Experimento KPI`: eventos, sesión, visitante, talla, oferta y origen.
- `Reservas Premium`: datos de pre-reserva, talla, beneficio aplicado, estado y verificación manual del pago.
- `Panel KPI`: muestra, pre-reservas, conversión, días transcurridos y estado final.
- `SMARTFIT_CONTROL_KPI.xlsx`: exportación automática del libro cada 5 minutos cuando hay cambios.

## Eventos
| Evento | Cuándo se registra |
|---|---|
| `visitante_landing` | Primera visita registrada para el visitante_id. |
| `clic_reserva_premium` | Primer clic de ese visitante en el CTA. |
| `formulario_iniciado` | Primer foco en un campo, deduplicado por visitante. |
| `formulario_completado` | Envío del formulario con los tres campos. |
| `intencion_modalidad` | Intención de coordinar por WhatsApp. |
| `reserva_completada` | Pre-reserva validada y guardada con visitante_id y reserva_id. |

## Seguridad y limitaciones
- La web no puede marcar pagos; `pago_verificado` se actualiza manualmente en `Reservas Premium`.
- El servidor fija el precio final (S/108), descuento (S/12) y envío gratis; no confía en importes enviados por el navegador.
- La URL pública de Apps Script y el modo `no-cors` no permiten que la web confirme la escritura. Comprueba los registros en Sheets durante la prueba.
- Los datos personales de la pre-reserva no se guardan en el historial local del navegador; se envían al Apps Script y se comparten en WhatsApp para coordinación.

## Antes de publicar
1. Pega `apps-script.gs` en Apps Script y ejecuta `configurarTodo()` una sola vez. Autoriza permisos.
2. Implementa como aplicación web: ejecutar como tú y acceso para cualquier persona.
3. Si ya existía implementación, edítala y publica una nueva versión.
4. Confirma que `ENDPOINT`, `CATALOGO_URL` y `WHATSAPP` en `assets/config.js` sean correctos.
5. Haz una prueba desde un navegador nuevo y verifica las hojas `Visitantes KPI`, `Experimento KPI` y `Reservas Premium`.
6. Prueba recargando la página: el mismo navegador no debe aumentar el conteo de visitantes únicos.
7. No anuncies validación hasta cumplir los 7 días y revisar el estado del Panel KPI.
