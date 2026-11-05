// ============================================================
//  SMART FIT CUSCO · Registro en Google Sheets (v6.3 ESTABLE)
//  = v5 original + Test Card 2 + visitantes únicos + Panel + Excel automático
//
//  INSTALACIÓN (una sola vez):
//  1) Pega TODO este archivo en Extensiones -> Apps Script
//  2) Ejecuta la función  configurarTodo()  (pide permisos)
//     -> crea TODAS las hojas, el panel y el Excel en Drive
//  2b) Antes del tráfico real, ejecuta iniciarNuevaCampaniaTestCard2() para separar pruebas previas
//  3) Implementar -> Nueva implementación -> Aplicación web
//     (Ejecutar como: Yo · Acceso: Cualquier persona) -> URL /exec
//     (Si ya tenías implementación: Gestionar implementaciones ->
//      lápiz -> Nueva versión -> Implementar. La URL no cambia.)
// ============================================================

const PESTANAS = {
  Pedidos:     ['fecha','pedido_id','estado','canal','cliente','telefono','items','cantidad','total','sesion','notas'],
  Tallaje:     ['fecha','sesion','paso','detalle','prenda','talla','color','silueta','altura','pecho','cintura','cadera','segundos'],
  Opiniones:   ['fecha','sesion','momento','prenda','talla','estrellas','gusto','comentario'],
  Encuesta:    ['fecha','sesion','estrellas','gusto','uso','util','conf','usar','pago','nps','comentario','silueta','altura','pecho','cintura','cadera'],
  Contactos:   ['fecha','cliente','correo','mensaje','estado'],
  Suscriptores:['fecha','correo'],
  Cambios:     ['fecha','sesion','prenda','talla','color','detalle','comentario','estado'],
  Eventos:     ['fecha','sesion','evento','prenda','talla','segundos']
};
const CAT_HEAD = ['id','categoria','nombre','estilo','precio','precio_anterior','etiqueta','siluetas','colores','tela','cuidados','agotadas'];
const CAT_DATOS = [["id", "categoria", "nombre", "estilo", "precio", "precio_anterior", "etiqueta", "siluetas", "colores", "tela", "cuidados", "agotadas"], ["v1", "vestido", "Vestido envolvente", "Elegante", "139", "", "Nuevo", "reloj;pera;manzana", "Terracota;Verde;Negro;Azul", "Crepé elástico", "Lavar en frío, no usar secadora", ""], ["v2", "vestido", "Vestido línea A", "Casual", "149", "189", "-20%", "manzana;inv;rect", "Azul;Mostaza;Negro;Verde", "Crepé elástico", "Lavar en frío, no usar secadora", "L;5XL"], ["v3", "vestido", "Vestido midi fluido", "Elegante", "169", "", "", "pera;reloj;rect", "Verde;Terracota;Negro;Crema", "Crepé elástico", "Lavar en frío, no usar secadora", ""], ["b1", "top", "Blusa fluida", "Moderno", "79", "", "Nuevo", "pera;rect;reloj", "Crema;Terracota;Verde;Azul", "Algodón con elastano", "Lavar a máquina en frío", ""], ["b2", "top", "Polo básico", "Casual", "59", "", "", "reloj;pera;manzana;rect;inv", "Negro;Crema;Azul;Mostaza", "Algodón con elastano", "Lavar a máquina en frío", "5XL"], ["b3", "top", "Camisa oversize", "Clásico", "99", "129", "-20%", "manzana;inv;rect", "Crema;Azul;Negro;Verde", "Algodón con elastano", "Lavar a máquina en frío", ""], ["b4", "top", "Top cruzado", "Moderno", "89", "", "Nuevo", "reloj;pera;manzana", "Verde;Negro;Terracota;Crema", "Algodón con elastano", "Lavar a máquina en frío", ""], ["b5", "top", "Blusa manga larga", "Casual", "85", "", "", "pera;rect;inv", "Mostaza;Crema;Negro;Verde", "Algodón con elastano", "Lavar a máquina en frío", ""], ["b6", "top", "Suéter tejido", "Clásico", "129", "159", "-20%", "reloj;rect;manzana", "Terracota;Verde;Crema;Negro", "Tejido suave", "Lavar a mano", ""], ["c1", "casaca", "Casaca larga", "Urbano", "219", "", "Nuevo", "manzana;reloj;rect", "Negro;Azul;Terracota;Verde", "Mezcla de poliéster", "Lavado en seco o a mano", ""], ["c2", "casaca", "Casaca estructurada", "Clásico", "199", "", "", "pera;rect", "Negro;Crema;Mostaza;Azul", "Mezcla de poliéster", "Lavado en seco o a mano", ""], ["c3", "casaca", "Blazer largo", "Elegante", "239", "299", "-20%", "pera;reloj;manzana", "Negro;Azul;Crema;Terracota", "Mezcla de poliéster", "Lavado en seco o a mano", "2XL"], ["c4", "casaca", "Cárdigan largo", "Casual", "179", "", "Nuevo", "manzana;pera;rect", "Crema;Negro;Azul;Terracota", "Tejido suave", "Lavar a mano", ""], ["c5", "casaca", "Bomber urbana", "Urbano", "189", "", "", "inv;rect;reloj", "Verde;Negro;Azul;Mostaza", "Mezcla de poliéster", "Lavado en seco o a mano", ""], ["p1", "pantalon", "Pantalón tiro alto", "Moderno", "159", "", "", "reloj;manzana;rect", "Negro;Azul;Mostaza;Verde", "Algodón stretch", "Lavar a máquina, planchar a temperatura media", "3XL"], ["p2", "pantalon", "Pantalón recto", "Clásico", "129", "", "", "inv;pera;reloj;rect", "Negro;Crema;Azul;Terracota", "Algodón stretch", "Lavar a máquina, planchar a temperatura media", ""], ["p3", "pantalon", "Pantalón fluido", "Casual", "139", "", "Nuevo", "pera;manzana;rect", "Crema;Verde;Negro;Mostaza", "Algodón stretch", "Lavar a máquina, planchar a temperatura media", ""], ["p4", "pantalon", "Pantalón cargo", "Urbano", "149", "", "", "pera;manzana;rect", "Crema;Verde;Negro;Azul", "Algodón stretch", "Lavar a máquina, planchar a temperatura media", ""], ["p5", "pantalon", "Pantalón sastre", "Elegante", "169", "", "Nuevo", "reloj;pera;rect", "Negro;Azul;Crema;Mostaza", "Algodón stretch", "Lavar a máquina, planchar a temperatura media", ""]];
const ESTADOS_PEDIDO = ['Nuevo','Confirmado','Pagado','Listo para recoger','Entregado','Cancelado'];

// ============================================================
// CONFIGURACIÓN DEL EXPERIMENTO SMART FIT · TEST CARD 2
// ============================================================
const KPI_HOJA_EVENTOS  = 'Experimento KPI';
const KPI_HOJA_PANEL    = 'Panel KPI';
const KPI_HOJA_RESERVAS = 'Reservas Premium';
const KPI_HOJA_VISITANTES = 'Visitantes KPI';

const KPI_ENCABEZADOS_EVENTOS = [
  'fecha','sesion','evento','producto','precio','modalidad','reserva_id','valor','pagina','detalle','origen',
  'visitante_id','talla','precio_original','descuento','precio_final','envio_gratis','es_muestra','campania_id'
];
const KPI_ENCABEZADOS_RESERVAS = [
  'fecha','sesion','reserva_id','cliente','telefono','producto','precio','modalidad','estado','pago_verificado',
  'talla','visitante_id','precio_original','descuento','precio_final','envio_gratis','es_muestra','campania_id'
];
const KPI_ENCABEZADOS_VISITANTES = [
  'fecha','visitante_id','primera_sesion','pagina','origen','numero_muestra','es_muestra','campania_id'
];

const KPI_EVENTOS_PERMITIDOS = [
  'visitante_landing','clic_reserva_premium','formulario_iniciado',
  'formulario_completado','intencion_modalidad','reserva_completada'
];
const KPI_UNICO_POR_VISITANTE = [
  'visitante_landing','clic_reserva_premium','formulario_iniciado','formulario_completado','intencion_modalidad'
];
const KPI_MAPA_ANTIGUO = {
  landing_sesion_unica: 'visitante_landing',
  reserva_premium_click: 'clic_reserva_premium',
  reserva_premium_formulario: 'formulario_completado',
  reserva_premium_metodo: 'intencion_modalidad'
};

// Test Card 2: cuatro pre-reservas de los primeros 50 visitantes = 8%.
// Se conserva el mínimo de cuatro personas indicado en la tarjeta original.
const KPI_METAS = {
  visitantesMuestra: 50,
  reservasMinimas: 4,
  duracionDias: 7,
  precioPremium: 120,
  descuentoPorcentaje: 10,
  descuentoSoles: 12,
  precioFinal: 108
};

// Si este proyecto Apps Script fue creado desde script.google.com y no está
// vinculado directamente al Google Sheets, pega aquí el ID del archivo.
// Se obtiene de la URL: https://docs.google.com/spreadsheets/d/ESTE_ID/edit
// Si el script está vinculado a la hoja, puedes dejarlo vacío.
const SMARTFIT_SPREADSHEET_ID = 'PEGA_AQUI_EL_ID_DE_TU_GOOGLE_SHEETS';

const EXCEL_FILE_ID = '';
const EXCEL_NOMBRE = 'SMARTFIT_CONTROL_KPI.xlsx';
const MIME_XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const SYNC_MINUTOS = 5;
const SMARTFIT_VERSION = '6.3-ESTABLE-2026-11-05';

// Obtiene el documento de trabajo tanto si el proyecto está vinculado como
// si es un proyecto independiente. Evita getActiveSpreadsheet() === null.
function obtenerSpreadsheet_(){
  const activo = SpreadsheetApp.getActiveSpreadsheet();
  if (activo) return activo;

  const idConfigurado = String(SMARTFIT_SPREADSHEET_ID || '').trim();
  if (idConfigurado && idConfigurado !== 'PEGA_AQUI_EL_ID_DE_TU_GOOGLE_SHEETS') {
    return SpreadsheetApp.openById(idConfigurado);
  }

  const idGuardado = PropertiesService.getScriptProperties().getProperty('SMARTFIT_SPREADSHEET_ID');
  if (idGuardado) return SpreadsheetApp.openById(idGuardado);

  throw new Error('No hay una hoja de cálculo vinculada. Abre el Google Sheets correcto y entra en Extensiones > Apps Script para crear un proyecto vinculado; o pega el ID del Google Sheets en SMARTFIT_SPREADSHEET_ID al inicio del código.');
}

// Permite guardar el ID sin tener que modificar las funciones del sistema.
// Para usarla, escribe el ID entre comillas en la línea indicada y ejecútala.
function guardarVinculoSpreadsheet(){
  const id = String(SMARTFIT_SPREADSHEET_ID || '').trim();
  if (!id || id === 'PEGA_AQUI_EL_ID_DE_TU_GOOGLE_SHEETS') {
    throw new Error('Primero pega el ID real de tu Google Sheets en SMARTFIT_SPREADSHEET_ID, al inicio del código.');
  }
  const ss = SpreadsheetApp.openById(id);
  PropertiesService.getScriptProperties().setProperty('SMARTFIT_SPREADSHEET_ID', ss.getId());
  avisar_('Vinculación guardada correctamente: ' + ss.getName());
  return ss.getId();
}

// Diagnóstico sencillo para confirmar qué versión está abierta en Apps Script.
function diagnosticoSmartFit(){
  const ss = obtenerSpreadsheet_();
  const info = {
    version: SMARTFIT_VERSION,
    proyectoVinculado: !!ss,
    spreadsheetId: ss ? ss.getId() : 'NO DISPONIBLE',
    hojas: ss ? ss.getSheets().map(function(sh){ return sh.getName(); }) : [],
    webApp: 'La implementación se administra desde el menú Implementar; no se crea desde una función.'
  };
  console.log(JSON.stringify(info, null, 2));
  avisar_('Versión cargada: ' + SMARTFIT_VERSION + '\nProyecto vinculado: ' + (info.proyectoVinculado ? 'Sí' : 'No') +
    '\nHojas detectadas: ' + info.hojas.length + '\n\nRevisa Ver -> Registros de ejecución para ver el diagnóstico completo.');
  return info;
}

// ============================================================
// UTILIDADES
// ============================================================
function hoja_(nombre){
  const ss = obtenerSpreadsheet_();
  return ss.getSheetByName(nombre) || ss.insertSheet(nombre);
}

function avisar_(msg){
  try { SpreadsheetApp.getUi().alert(msg); } catch (e) { console.log(msg); }
}

function limpiar_(v){
  // Evita que un texto enviado desde la web se ejecute como fórmula.
  if (typeof v === 'string' && v.charAt(0) === '=') return "'" + v;
  return v;
}

function marcarPendienteExcel_(){
  PropertiesService.getScriptProperties().setProperty('EXCEL_PENDIENTE', '1');
}

function campaniaIdKPI_(){
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('KPI_CAMPANIA_ID');
  if (!id) {
    id = 'TC2-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmm');
    props.setProperty('KPI_CAMPANIA_ID', id);
  }
  return id;
}

// Inicia una campaña oficial nueva sin borrar el histórico de campañas anteriores.
function iniciarNuevaCampaniaTestCard2(){
  const id = 'TC2-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
  PropertiesService.getScriptProperties().setProperty('KPI_CAMPANIA_ID', id);
  configurarKPI_();
  marcarPendienteExcel_();
  sincronizarExcelAhora();
  avisar_('Nueva campaña Test Card 2 creada: ' + id + '\nEl conteo de 7 días comenzará con el primer visitante único. El histórico anterior se conserva.');
}

// ============================================================
// UN SOLO PASO: crea TODO (hojas, panel, Excel y activador)
// ============================================================
function configurarTodo(){
  const incidencias = [];
  // La estructura de datos se configura primero y no se revierte si falla otro servicio.
  configurar_();
  configurarKPI_();

  try {
    instalarSincronizacion_();
  } catch (e) {
    incidencias.push('No se pudo instalar el activador automático: ' + e.message +
      '. Ejecuta configurarSincronizacionExcel() después de autorizar los permisos.');
  }

  // La exportación XLSX es independiente: no debe impedir preparar la Web App.
  try {
    sincronizarExcelAhora();
  } catch (e) {
    incidencias.push('No se pudo crear/actualizar el Excel: ' + e.message +
      '. Ejecuta probarSincronizacionExcel() luego de revisar permisos de Drive.');
  }

  const id = idExcel_();
  let mensaje = 'CONFIGURACIÓN SMART FIT v6.3 TERMINADA.\n\n' +
    'Hojas y panel KPI: preparados.\n' +
    (id ? 'Excel en Drive: https://drive.google.com/file/d/' + id + '/view\n' : 'Excel: pendiente de sincronización.\n') +
    '\nSiguiente paso: Implementar -> Nueva implementación -> Aplicación web.\n' +
    'Ejecutar como: Yo. Acceso: Cualquier persona, si tu cuenta lo permite.';
  if (incidencias.length) mensaje += '\n\nPENDIENTES (no impiden implementar la Web App):\n- ' + incidencias.join('\n- ');
  avisar_(mensaje);
  console.log(mensaje);
}

// ---------- Se ejecuta UNA vez a mano (v5 original) ----------
function configurar(){
  configurar_();
  avisar_('Hojas base configuradas. Para publicar, usa Implementar -> Nueva implementación -> Aplicación web.');
}

// Se desactiva el formato numérico automático para evitar el error de
// Google Sheets en columnas de tablas tipadas como Texto. No modifica datos.
// Los formatos visuales se pueden aplicar manualmente después de configurar.
function formatoSeguro_(rango, formato, etiqueta){
  // Intencionalmente no se llama a setNumberFormat().
  return;
}

function configurar_(){
  const ss = obtenerSpreadsheet_();
  Object.keys(PESTANAS).forEach(function(n){
    const sh = hoja_(n), h = PESTANAS[n];
    if (sh.getLastRow() === 0) sh.getRange(1,1,1,h.length).setValues([h]);
    sh.getRange(1,1,1,h.length).setFontWeight('bold').setBackground('#111111').setFontColor('#ffffff');
    sh.setFrozenRows(1);
    formatoSeguro_(sh.getRange(2,1,sh.getMaxRows()-1,1),'yyyy-mm-dd hh:mm',n+'!A:A');
    sh.autoResizeColumns(1,h.length);
  });
  // Lista desplegable de estado en Pedidos
  const p = hoja_('Pedidos');
  p.getRange(2,3,1000,1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(ESTADOS_PEDIDO,true).setAllowInvalid(true).build());
  formatoSeguro_(p.getRange(2,9,1000,1),'"S/ "#,##0.00','Pedidos!I:I');
  const reglas = [['Nuevo','#fff2cc'],['Confirmado','#cfe2f3'],['Pagado','#d9ead3'],['Listo para recoger','#d9d2e9'],['Entregado','#b6d7a8'],['Cancelado','#f4cccc']]
    .map(function(r){ return SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(r[0]).setBackground(r[1]).setRanges([p.getRange('C2:C1000')]).build(); });
  p.setConditionalFormatRules(reglas);
  hoja_('Contactos').getRange(2,5,1000,1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['Pendiente','Respondido'],true).build());

  // Catálogo (editable): se carga solo si está vacío
  const c = hoja_('Catalogo');
  if (c.getLastRow() === 0) c.getRange(1,1,CAT_DATOS.length,CAT_HEAD.length).setValues(CAT_DATOS);
  c.getRange(1,1,1,CAT_HEAD.length).setFontWeight('bold').setBackground('#111111').setFontColor('#ffffff');
  c.setFrozenRows(1);
  formatoSeguro_(c.getRange(1,1,c.getMaxRows(),CAT_HEAD.length),'@','Catalogo'); // conserva tallas y códigos como texto cuando la hoja lo permite

  resumen_();
  const hojaInicial = ss.getSheetByName('Hoja 1') || ss.getSheetByName('Sheet1');
  if (hojaInicial && ss.getSheets().length > 1 && hojaInicial.getLastRow() === 0) ss.deleteSheet(hojaInicial);
  ss.setActiveSheet(ss.getSheetByName('Resumen'));
}

function resumen_(){
  const sh = hoja_('Resumen'); sh.clear();
  const f = [
    ['RESUMEN SMART FIT CUSCO',''],
    ['Pedidos totales',"=MAX(0,COUNTA(Pedidos!B:B)-1)"],
    ['Pedidos nuevos (sin atender)','=COUNTIF(Pedidos!C:C,"Nuevo")'],
    ['Ventas confirmadas (S/)','=SUM(Pedidos!I2:I)-SUMIF(Pedidos!C2:C,"Nuevo",Pedidos!I2:I)-SUMIF(Pedidos!C2:C,"Cancelado",Pedidos!I2:I)'],
    ['Pedidos por WhatsApp','=COUNTIF(Pedidos!D:D,"WhatsApp")'],
    ['Reservas en tienda','=COUNTIF(Pedidos!D:D,"Reserva en tienda")'],
    ['Tallajes realizados','=COUNTIF(Tallaje!C:C,"medidas_analizadas")'],
    ['Opiniones (tras tallaje/compra)','=MAX(0,COUNTA(Opiniones!A:A)-1)'],
    ['Estrellas promedio (opiniones)','=IFERROR(AVERAGE(Opiniones!F2:F),"–")'],
    ['Encuestas completas','=MAX(0,COUNTA(Encuesta!A:A)-1)'],
    ['Recomendación promedio 0–10 (NPS)','=IFERROR(AVERAGE(Encuesta!J2:J),"–")'],
    ['Mensajes de contacto pendientes','=COUNTIF(Contactos!E:E,"Pendiente")'],
    ['Suscriptores','=MAX(0,COUNTA(Suscriptores!B:B)-1)'],
    ['Solicitudes de cambio de talla','=MAX(0,COUNTA(Cambios!A:A)-1)']
  ];
  f.forEach(function(r,i){ sh.getRange(i+1,1).setValue(r[0]); if (r[1]) sh.getRange(i+1,2).setFormula(r[1]); });
  sh.getRange('A1').setFontWeight('bold').setFontSize(14);
  sh.getRange('A2:A14').setFontWeight('bold');
  sh.setColumnWidth(1,300); sh.setColumnWidth(2,140);
}

// ============================================================
// CREAR HOJAS DEL EXPERIMENTO KPI (sin alertas: seguro desde la web)
// ============================================================
function configurarKPI(){
  configurarKPI_();
  avisar_('Las hojas del experimento KPI están configuradas correctamente.');
}

function asegurarEncabezadosKPI_(nombre, encabezados){
  const sh = hoja_(nombre);
  let cambio = false;
  if (sh.getLastRow() === 0 || sh.getLastColumn() === 0) {
    sh.getRange(1,1,1,encabezados.length).setValues([encabezados]);
    cambio = true;
  } else {
    const actuales = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(String);
    const faltantes = encabezados.filter(function(h){ return actuales.indexOf(h) === -1; });
    if (faltantes.length) {
      sh.getRange(1, actuales.length + 1, 1, faltantes.length).setValues([faltantes]);
      cambio = true;
    }
  }
  if (cambio) {
    const n = sh.getLastColumn();
    sh.getRange(1,1,1,n).setFontWeight('bold').setBackground('#111111').setFontColor('#ffffff');
    sh.setFrozenRows(1);
    sh.autoResizeColumns(1,n);
  }
  return sh;
}

function appendPorEncabezadosKPI_(sh, objeto){
  const h = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(String);
  sh.appendRow(h.map(function(k){ return objeto[k] === undefined ? '' : limpiar_(objeto[k]); }));
}

function configurarKPI(){
  configurarKPI_();
  avisar_('Las hojas de la Test Card 2 están configuradas correctamente.');
}

function configurarKPI_(){
  const ev = asegurarEncabezadosKPI_(KPI_HOJA_EVENTOS, KPI_ENCABEZADOS_EVENTOS);
  const rs = asegurarEncabezadosKPI_(KPI_HOJA_RESERVAS, KPI_ENCABEZADOS_RESERVAS);
  const vs = asegurarEncabezadosKPI_(KPI_HOJA_VISITANTES, KPI_ENCABEZADOS_VISITANTES);
  formatoSeguro_(ev.getRange('A2:A'),'yyyy-mm-dd hh:mm:ss','Experimento KPI!A:A');
  formatoSeguro_(rs.getRange('A2:A'),'yyyy-mm-dd hh:mm:ss','Reservas Premium!A:A');
  formatoSeguro_(rs.getRange('G2:G'),'"S/ "0.00','Reservas Premium!G:G');
  formatoSeguro_(rs.getRange('M2:O'),'"S/ "0.00','Reservas Premium!M:O');
  formatoSeguro_(vs.getRange('A2:A'),'yyyy-mm-dd hh:mm:ss','Visitantes KPI!A:A');
  rs.getRange('I2:I1000').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['Pendiente','Confirmada','Cancelada'],true).setAllowInvalid(true).build());
  rs.getRange('J2:J1000').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['Sí','No'],true).setAllowInvalid(true).build());

  // Panel derivado: se reconstruye sin tocar las hojas de datos ni su histórico.
  const pn = hoja_(KPI_HOJA_PANEL);
  pn.getCharts().forEach(function(c){pn.removeChart(c)});
  pn.clear();
  pn.clearConditionalFormatRules();
  const V = "'" + KPI_HOJA_VISITANTES + "'!";
  const R = "'" + KPI_HOJA_RESERVAS + "'!";
  const campania = campaniaIdKPI_();
  const filas = [
    ['PANEL DE CONTROL · TEST CARD 2 SMART FIT','Resultado','Meta','Estado'],
    ['Visitantes únicos incluidos en la muestra','=COUNTIFS('+V+'G2:G,"Sí",'+V+'H2:H,"'+campania+'")',KPI_METAS.visitantesMuestra,''],
    ['Visitantes únicos totales','=COUNTIF('+V+'H2:H,"'+campania+'")','',''],
    ['Pre-reservas de los primeros 50 visitantes','=COUNTIFS('+R+'Q2:Q,"Sí",'+R+'R2:R,"'+campania+'",'+R+'A2:A,"<="&IFERROR(MIN(FILTER('+V+'A2:A,'+V+'H2:H="'+campania+'"))+7,DATE(1900,1,1)))',KPI_METAS.reservasMinimas,''],
    ['Conversión a pre-reserva de la muestra','=IFERROR(B4/B2,0)',KPI_METAS.reservasMinimas/KPI_METAS.visitantesMuestra,''],
    ['Porcentaje equivalente del criterio','=C5','','4 de 50 = 8%'],
    ['Visitantes fuera de la muestra','=MAX(0,B3-B2)','',''],
    ['Pre-reservas fuera de la muestra','=COUNTIFS('+R+'Q2:Q,"No",'+R+'R2:R,"'+campania+'")','',''],
    ['Días transcurridos desde el primer visitante','=IFERROR(MIN(7,INT(NOW()-MIN(FILTER('+V+'A2:A,'+V+'H2:H="'+campania+'")))),0)',KPI_METAS.duracionDias,''],
    ['Duración prevista (días)',KPI_METAS.duracionDias,KPI_METAS.duracionDias,'Fijo'],
    ['Estado de la Test Card','=IF(B3=0,"SIN INICIO",IF(B9<7,"EN PROCESO",IF(OR(B2<50,B18<>TRUE),"INCOMPLETA",IF(B4>=4,"VALIDADA","NO VALIDADA"))))','',''],
    ['Precio original (S/)',KPI_METAS.precioPremium,KPI_METAS.precioPremium,'Fijo'],
    ['Descuento ofrecido',KPI_METAS.descuentoPorcentaje/100,KPI_METAS.descuentoPorcentaje/100,'Fijo'],
    ['Ahorro (S/)',KPI_METAS.descuentoSoles,KPI_METAS.descuentoSoles,'Fijo'],
    ['Precio final con descuento (S/)',KPI_METAS.precioFinal,KPI_METAS.precioFinal,'Fijo'],
    ['Envío gratis','Sí','Sí','Fijo'],
    ['Pagos verificados manualmente','=COUNTIFS('+R+'J2:J,"Sí",'+R+'R2:R,"'+campania+'")','','No es la métrica principal'],
    ['Los 50 visitantes llegaron dentro de los 7 días','=IF(B2<50,FALSE,IFERROR(INDEX(FILTER('+V+'A2:A,'+V+'H2:H="'+campania+'"),50)<=MIN(FILTER('+V+'A2:A,'+V+'H2:H="'+campania+'"))+7,FALSE))','','Control de muestra'],
    ['ID de campaña',campania,'','No modificar durante la prueba']
  ];
  pn.getRange(1,1,filas.length,4).setValues(filas);
  pn.getRange('A1:D1').setBackground('#111111').setFontColor('#ffffff').setFontWeight('bold');
  pn.getRange('A2:A19').setFontWeight('bold');
  formatoSeguro_(pn.getRange('B5:C6'),'0.00%','Panel KPI!B5:C6');
  formatoSeguro_(pn.getRange('B13:C13'),'0%','Panel KPI!B13:C13');
  formatoSeguro_(pn.getRange('B12:C12'),'"S/ "0.00','Panel KPI!B12:C12');
  formatoSeguro_(pn.getRange('B14:C15'),'"S/ "0.00','Panel KPI!B14:C15');
  pn.setColumnWidth(1,360); pn.setColumnWidth(2,170); pn.setColumnWidth(3,120); pn.setColumnWidth(4,190);
  pn.setFrozenRows(1);
  // Tabla auxiliar para un embudo visual (las fórmulas se actualizan solas).
  pn.getRange('F1:G6').setValues([
    ['EMBUDO DE PRE-RESERVA','Personas'],
    ['Visitantes de la muestra','=B2'],
    ['Clics en CTA','=COUNTIFS(\'Experimento KPI\'!C:C,"clic_reserva_premium",\'Experimento KPI\'!R:R,"Sí",\'Experimento KPI\'!S:S,"'+campania+'")'],
    ['Formularios iniciados','=COUNTIFS(\'Experimento KPI\'!C:C,"formulario_iniciado",\'Experimento KPI\'!R:R,"Sí",\'Experimento KPI\'!S:S,"'+campania+'")'],
    ['Formularios completados','=COUNTIFS(\'Experimento KPI\'!C:C,"formulario_completado",\'Experimento KPI\'!R:R,"Sí",\'Experimento KPI\'!S:S,"'+campania+'")'],
    ['Pre-reservas','=B4']
  ]);
  pn.getRange('F1:G1').setBackground('#111111').setFontColor('#ffffff').setFontWeight('bold');
  pn.setColumnWidth(6,240); pn.setColumnWidth(7,130);
  const chart = pn.newChart().setChartType(Charts.ChartType.BAR).addRange(pn.getRange('F1:G6'))
    .setPosition(21,1,0,0).setOption('title','Embudo de conversión · Test Card 2')
    .setOption('legend',{position:'none'}).build();
  pn.insertChart(chart);
  pn.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('VALIDADA').setBackground('#b6d7a8').setRanges([pn.getRange('B11')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('NO VALIDADA').setBackground('#f4cccc').setRanges([pn.getRange('B11')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('INCOMPLETA').setBackground('#fce5cd').setRanges([pn.getRange('B11')]).build()
  ]);
  SpreadsheetApp.flush();
  configurarEvaluacionTestCard2_();
}

// ============================================================
// EVALUACIÓN AUTOMÁTICA DE LOS CRITERIOS DE TEST CARD 2
// ============================================================
function configurarEvaluacionTestCard2_(){
  const sh = hoja_('Evaluación Test Card 2');
  sh.clear();
  const filas = [
    ['EVALUACIÓN TEST CARD 2 · SMART FIT CUSCO','RESULTADO','META / CRITERIO','ESTADO'],
    ['Visitantes únicos incluidos en la muestra',"='Panel KPI'!B2",50,'=IF(B2>=C2,"CUMPLE","PENDIENTE")'],
    ['Duración del experimento (días)',"='Panel KPI'!B9",7,'=IF(B3>=C3,"CUMPLE","EN PROCESO")'],
    ['Pre-reservas válidas de los primeros 50',"='Panel KPI'!B4",4,'=IF(B3<7,"EN PROCESO",IF(B4>=C4,"CUMPLE","NO CUMPLE"))'],
    ['Conversión a pre-reserva',"='Panel KPI'!B5",'=4/50','=IF(B3<7,"EN PROCESO",IF(B5>=C5,"CUMPLE","NO CUMPLE"))'],
    ['Formularios con nombre, WhatsApp y talla completos',"=COUNTIFS('Reservas Premium'!Q2:Q,\"Sí\",'Reservas Premium'!D2:D,\"<>\",'Reservas Premium'!E2:E,\"<>\",'Reservas Premium'!K2:K,\"<>\")",4,'=IF(B3<7,"EN PROCESO",IF(B6>=C6,"CUMPLE","REVISAR"))'],
    ['Precio original',KPI_METAS.precioPremium,KPI_METAS.precioPremium,'=IF(B7=C7,"CUMPLE","REVISAR")'],
    ['Descuento ofrecido',KPI_METAS.descuentoPorcentaje/100,KPI_METAS.descuentoPorcentaje/100,'=IF(B8=C8,"CUMPLE","REVISAR")'],
    ['Precio final promocional',KPI_METAS.precioFinal,KPI_METAS.precioFinal,'=IF(B9=C9,"CUMPLE","REVISAR")'],
    ['Envío gratis','Sí','Sí','=IF(B10=C10,"CUMPLE","REVISAR")'],
    ['CRITERIO ORIGINAL: mínimo 4 personas de 50','4 de 50','8% equivalente','La tarjeta menciona 4%; hay inconsistencia matemática'],
    ['RESULTADO GLOBAL','=IF(AND(B2>=50,B3>=7,B4>=4,B5>=C5,B6>=4),"VALIDADA",IF(B3<7,"EN PROCESO",IF(B2<50,"MUESTRA INCOMPLETA","NO VALIDADA")))','',''],
    ['Nota metodológica','La pre-reserva valida intención, no pago. Los pagos verificados se reportan por separado.','','']
  ];
  sh.getRange(1,1,filas.length,4).setValues(filas);
  sh.getRange('A1:D1').setBackground('#111111').setFontColor('#ffffff').setFontWeight('bold');
  sh.getRange('A2:A13').setFontWeight('bold');
  formatoSeguro_(sh.getRange('B5:C5'),'0.00%','Evaluación Test Card 2!B5:C5');
  formatoSeguro_(sh.getRange('B8:C8'),'0%','Evaluación Test Card 2!B8:C8');
  formatoSeguro_(sh.getRange('B7:C7'), '"S/ "0.00','Evaluación Test Card 2!B7:C7');
  formatoSeguro_(sh.getRange('B9:C9'), '"S/ "0.00','Evaluación Test Card 2!B9:C9');
  sh.setColumnWidth(1,390); sh.setColumnWidth(2,180); sh.setColumnWidth(3,180); sh.setColumnWidth(4,300);
  sh.setFrozenRows(1);
  SpreadsheetApp.flush();
}

// ============================================================
// RECIBE LOS DATOS DEL SITIO WEB
// ============================================================
function doPost(e){
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const d = JSON.parse(e.postData.contents || '{}');
    const f = d.fecha ? new Date(d.fecha) : new Date();

    // Experimento KPI
    if (d.tipo === 'experimento') {
      return registrarEventoKPI_(d, new Date()); // hora del servidor, no reloj del navegador
    }

    const ev = String(d.detalle||'').split(':')[0];
    const resto = String(d.detalle||'').indexOf(':')>-1 ? String(d.detalle).slice(String(d.detalle).indexOf(':')+1).trim() : '';

    // Compatibilidad: páginas antiguas enviaban el experimento como tipo:'evento'
    if (d.tipo !== 'pedido' && KPI_MAPA_ANTIGUO[ev]) {
      return registrarEventoKPI_(Object.assign({}, d, {
        evento: KPI_MAPA_ANTIGUO[ev],
        modalidad: ev === 'reserva_premium_metodo' ? resto.split(' · ')[0] : '',
        detalle: resto
      }), f);
    }

    let destino, fila;
    switch (d.tipo) {
      case 'pedido':
        destino='Pedidos'; fila={fecha:f,pedido_id:d.pedido_id,estado:d.estado||'Nuevo',canal:d.canal,cliente:d.cliente,telefono:d.telefono,items:d.items,cantidad:d.cantidad,total:d.total,sesion:d.sesion,notas:''}; break;
      case 'feedback_talla': case 'feedback_compra':
        destino='Opiniones'; fila={fecha:f,sesion:d.sesion,momento:d.tipo==='feedback_talla'?'Tras el tallaje':'Tras la compra',prenda:d.prenda,talla:d.talla,estrellas:d.estrellas,gusto:d.gusto,comentario:d.comentario}; break;
      case 'encuesta':
        destino='Encuesta'; fila=Object.assign({},d,{fecha:f}); break;
      case 'contacto':
        destino='Contactos'; fila={fecha:f,cliente:d.cliente||String(d.detalle||'').split(' · ')[0],correo:d.correo||String(d.detalle||'').split(' · ')[1]||'',mensaje:d.comentario,estado:'Pendiente'}; break;
      case 'suscripcion':
        destino='Suscriptores'; fila={fecha:f,correo:d.correo||d.detalle}; break;
      case 'cambio_talla':
        destino='Cambios'; fila={fecha:f,sesion:d.sesion,prenda:d.prenda,talla:d.talla,color:d.color,detalle:d.detalle,comentario:d.comentario,estado:'Pendiente'}; break;
      default: // 'evento'
        if (['medidas_analizadas','prenda_probada','talla_lista'].indexOf(ev) > -1) {
          destino='Tallaje'; fila=Object.assign({},d,{fecha:f,paso:ev,detalle:resto});
        } else {
          destino='Eventos'; fila={fecha:f,sesion:d.sesion,evento:ev,prenda:resto||d.prenda,talla:d.talla,segundos:d.segundos};
        }
    }
    const sh = hoja_(destino), head = PESTANAS[destino];
    if (sh.getLastRow() === 0) sh.appendRow(head);
    sh.appendRow(head.map(function(k){ return fila[k]===undefined?'':fila[k]; }));
    marcarPendienteExcel_();
    return ContentService.createTextOutput('ok'); // misma respuesta que la v5
  } catch (err) {
    return ContentService.createTextOutput('error: '+err);
  } finally { try { lock.releaseLock(); } catch(x){} }
}

// ============================================================
// REGISTRO DE EVENTOS KPI
// ============================================================
function buscarVisitanteKPI_(visitanteId, campania){
  if (!visitanteId) return null;
  const sh = hoja_(KPI_HOJA_VISITANTES);
  if (sh.getLastRow() < 2) return null;
  const h = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(String);
  const col = h.indexOf('visitante_id') + 1;
  const cCamp = h.indexOf('campania_id');
  if (!col || cCamp < 0) return null;
  const rows = sh.getRange(2,1,sh.getLastRow()-1,sh.getLastColumn()).getValues();
  for (let i=0;i<rows.length;i++) if (String(rows[i][col-1]) === String(visitanteId) && String(rows[i][cCamp]) === String(campania)) {
    const row = rows[i];
    const o = {}; h.forEach(function(k,j){o[k]=row[j]}); return o;
  }
  return null;
}

function registrarVisitanteKPI_(d, fecha){
  const id = String(d.visitante_id || '');
  if (!id) return {nuevo:false, numero_muestra:'', es_muestra:'No'};
  const campania = campaniaIdKPI_();
  const existente = buscarVisitanteKPI_(id, campania);
  if (existente) return {nuevo:false, numero_muestra:existente.numero_muestra, es_muestra:existente.es_muestra || 'No'};
  const sh = hoja_(KPI_HOJA_VISITANTES);
  const vh = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(String);
  const cCamp = vh.indexOf('campania_id');
  const total = sh.getLastRow() > 1 ? sh.getRange(2,1,sh.getLastRow()-1,sh.getLastColumn()).getValues().filter(function(r){return cCamp>=0 && String(r[cCamp])===campania}).length : 0;
  const numero = total + 1;
  const muestra = numero <= KPI_METAS.visitantesMuestra ? 'Sí' : 'No';
  appendPorEncabezadosKPI_(sh, {
    fecha:fecha, visitante_id:id, primera_sesion:d.sesion || '', pagina:d.pagina || '',
    origen:d.origen || 'web', numero_muestra:numero, es_muestra:muestra, campania_id:campania
  });
  marcarPendienteExcel_();
  return {nuevo:true, numero_muestra:numero, es_muestra:muestra};
}

function existeEventoVisitanteKPI_(visitanteId, evento, campania){
  const sh = hoja_(KPI_HOJA_EVENTOS);
  if (sh.getLastRow() < 2) return false;
  const h = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(String);
  const ci = h.indexOf('visitante_id'), ce = h.indexOf('evento'), cc = h.indexOf('campania_id');
  if (ci < 0 || ce < 0 || cc < 0) return false;
  const vals = sh.getRange(2,1,sh.getLastRow()-1,sh.getLastColumn()).getValues();
  return vals.some(function(r){return String(r[ci])===String(visitanteId) && String(r[ce])===String(evento) && String(r[cc])===String(campania)});
}

function registrarEventoKPI_(d, fecha){
  const evento = String(d.evento || d.nombre_evento || '');
  if (evento === 'pago_confirmado') return ContentService.createTextOutput('ok');
  if (KPI_EVENTOS_PERMITIDOS.indexOf(evento) === -1) throw new Error('Evento KPI no reconocido: ' + evento);
  asegurarEncabezadosKPI_(KPI_HOJA_EVENTOS, KPI_ENCABEZADOS_EVENTOS);
  asegurarEncabezadosKPI_(KPI_HOJA_RESERVAS, KPI_ENCABEZADOS_RESERVAS);
  asegurarEncabezadosKPI_(KPI_HOJA_VISITANTES, KPI_ENCABEZADOS_VISITANTES);

  const visitanteId = String(d.visitante_id || '');
  const campania = campaniaIdKPI_();
  const visitante = registrarVisitanteKPI_(d, fecha);
  const esMuestra = visitante.es_muestra || 'No';

  if (KPI_UNICO_POR_VISITANTE.indexOf(evento) > -1 && visitanteId && existeEventoVisitanteKPI_(visitanteId, evento, campania)) {
    return ContentService.createTextOutput('ok');
  }

  if (evento === 'reserva_completada') {
    const nombre = String(d.cliente || d.nombre || '').trim();
    const telefono = String(d.telefono || '').replace(/[^0-9+]/g,'');
    const talla = String(d.talla || '').trim().toUpperCase();
    const tallasValidas = ['L','XL','2XL','3XL','4XL','5XL'];
    if (!visitanteId) throw new Error('Falta el identificador anónimo del visitante.');
    if (nombre.length < 2) throw new Error('El nombre es obligatorio.');
    if (telefono.replace(/\D/g,'').length < 7) throw new Error('WhatsApp no válido.');
    if (tallasValidas.indexOf(talla) === -1) throw new Error('Selecciona una talla válida.');
    const rid = String(d.reserva_id || '');
    if (!rid) throw new Error('Falta el identificador de la pre-reserva.');
    const rs = hoja_(KPI_HOJA_RESERVAS);
    if (rs.getLastRow() > 1) {
      const h = rs.getRange(1,1,1,rs.getLastColumn()).getValues()[0].map(String);
      const cRid = h.indexOf('reserva_id'), cVid = h.indexOf('visitante_id'), cCamp = h.indexOf('campania_id');
      const rows = rs.getRange(2,1,rs.getLastRow()-1,rs.getLastColumn()).getValues();
      const repetida = rows.some(function(r){return cCamp>=0 && String(r[cCamp])===campania && ((cRid>=0 && String(r[cRid])===rid) || (cVid>=0 && String(r[cVid])===visitanteId))});
      if (repetida) return ContentService.createTextOutput('ok');
    }
    // El servidor fija la oferta: nunca confía en precios enviados por el navegador.
    d.producto = 'Prenda premium en validación';
    d.precio = KPI_METAS.precioFinal;
    d.precio_original = KPI_METAS.precioPremium;
    d.descuento = KPI_METAS.descuentoSoles;
    d.precio_final = KPI_METAS.precioFinal;
    d.envio_gratis = 'Sí';
    d.modalidad = 'Coordinar por WhatsApp';
    d.talla = talla;
  }

  const ev = hoja_(KPI_HOJA_EVENTOS);
  appendPorEncabezadosKPI_(ev, {
    fecha:fecha, sesion:d.sesion || '', evento:evento,
    producto:d.producto || 'Premium', precio:evento==='reserva_completada'?KPI_METAS.precioFinal:(d.precio || ''),
    modalidad:d.modalidad || '', reserva_id:d.reserva_id || '', valor:d.valor || '',
    pagina:d.pagina || '', detalle:d.detalle || '', origen:d.origen || 'web',
    visitante_id:visitanteId, talla:d.talla || '', precio_original:evento==='reserva_completada'?KPI_METAS.precioPremium:'',
    descuento:evento==='reserva_completada'?KPI_METAS.descuentoSoles:'',
    precio_final:evento==='reserva_completada'?KPI_METAS.precioFinal:'',
    envio_gratis:evento==='reserva_completada'?'Sí':'', es_muestra:esMuestra, campania_id:campania
  });

  if (evento === 'reserva_completada') {
    const rs = hoja_(KPI_HOJA_RESERVAS);
    appendPorEncabezadosKPI_(rs, {
      fecha:fecha, sesion:d.sesion || '', reserva_id:d.reserva_id || '',
      cliente:d.cliente || d.nombre || '', telefono:String(d.telefono || ''),
      producto:d.producto, precio:KPI_METAS.precioFinal, modalidad:d.modalidad,
      estado:'Pendiente', pago_verificado:'No', talla:d.talla, visitante_id:visitanteId,
      precio_original:KPI_METAS.precioPremium, descuento:KPI_METAS.descuentoSoles,
      precio_final:KPI_METAS.precioFinal, envio_gratis:'Sí', es_muestra:esMuestra, campania_id:campania
    });
  }
  marcarPendienteExcel_();
  return ContentService.createTextOutput('ok');
}

// ============================================================
// SINCRONIZACIÓN GOOGLE SHEETS -> EXCEL (.xlsx en Drive)
// ============================================================
function idExcel_(){
  if (EXCEL_FILE_ID) return EXCEL_FILE_ID;
  return PropertiesService.getScriptProperties().getProperty('EXCEL_ID') || '';
}

// La ejecuta el activador: solo sincroniza si hay datos nuevos.
function sincronizarExcelKPI(){
  sincronizar_(false);
}

// Manual: fuerza la sincronización.
function sincronizarExcelAhora(){
  sincronizar_(true);
}
function probarSincronizacionExcel(){
  sincronizar_(true);
}

function sincronizar_(forzar){
  const props = PropertiesService.getScriptProperties();
  if (!forzar && props.getProperty('EXCEL_PENDIENTE') !== '1') return; // nada nuevo

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) { console.log('Otro proceso en ejecución; se omite.'); return; }

  try {
    props.deleteProperty('EXCEL_PENDIENTE'); // si entra algo nuevo durante la exportación, quedará marcado
    SpreadsheetApp.flush();

    const token = ScriptApp.getOAuthToken();
    const ssId = crearSpreadsheetExportacionKPI_();

    // 1) Exportar únicamente las cinco hojas necesarias para el control Test Card 2.
    const resp = UrlFetchApp.fetch(
      'https://www.googleapis.com/drive/v3/files/' + ssId + '/export?mimeType=' + encodeURIComponent(MIME_XLSX),
      { method: 'get', headers: { Authorization: 'Bearer ' + token }, muteHttpExceptions: true }
    );
    // El archivo temporal se elimina al terminar la exportación, incluso si hay error HTTP.
    try { DriveApp.getFileById(ssId).setTrashed(true); } catch (cleanupError) { console.log('No se pudo eliminar temporal: ' + cleanupError.message); }
    if (resp.getResponseCode() !== 200) {
      props.setProperty('EXCEL_PENDIENTE', '1');
      throw new Error('Error al exportar Google Sheets: ' + resp.getContentText());
    }
    const blob = resp.getBlob().setName(EXCEL_NOMBRE).setContentType(MIME_XLSX);

    // 2) Buscar el Excel de destino; si no existe, crearlo
    let id = idExcel_();
    let existe = false;
    if (id) {
      try { existe = !DriveApp.getFileById(id).isTrashed(); } catch (x) { existe = false; }
    }
    if (!existe) {
      const nuevo = DriveApp.createFile(blob);
      props.setProperty('EXCEL_ID', nuevo.getId());
      console.log('Excel creado: ' + nuevo.getUrl());
      return;
    }

    // 3) Reemplazar el contenido del Excel existente (mismo ID y enlace)
    const up = UrlFetchApp.fetch(
      'https://www.googleapis.com/upload/drive/v3/files/' + id + '?uploadType=media&supportsAllDrives=true',
      { method: 'patch', contentType: MIME_XLSX, headers: { Authorization: 'Bearer ' + token },
        payload: blob.getBytes(), muteHttpExceptions: true }
    );
    const code = up.getResponseCode();
    if (code < 200 || code >= 300) {
      props.setProperty('EXCEL_PENDIENTE', '1');
      throw new Error('No se pudo actualizar el Excel: ' + up.getContentText());
    }
    console.log('Excel actualizado: ' + new Date().toISOString());
  } finally {
    lock.releaseLock();
  }
}

function crearSpreadsheetExportacionKPI_(){
  const origen = obtenerSpreadsheet_();
  const nombres = ['Evaluación Test Card 2','Panel KPI','Visitantes KPI','Reservas Premium','Experimento KPI'];
  const temporal = SpreadsheetApp.create('TEMP_SMARTFIT_KPI_EXPORT_' + new Date().getTime());
  const inicial = temporal.getSheets()[0];
  nombres.forEach(function(nombre, indice){
    const hojaOrigen = origen.getSheetByName(nombre);
    if (!hojaOrigen) throw new Error('Falta la hoja necesaria para Excel: ' + nombre + '. Ejecuta configurarTodo().');
    const copia = hojaOrigen.copyTo(temporal);
    copia.setName(nombre);
  });
  temporal.deleteSheet(inicial);
  SpreadsheetApp.flush();
  return temporal.getId();
}

function instalarSincronizacion_(){
  ScriptApp.getProjectTriggers().forEach(function(t){
    if (t.getHandlerFunction() === 'sincronizarExcelKPI') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('sincronizarExcelKPI').timeBased().everyMinutes(SYNC_MINUTOS).create();
}

// Por si solo quieres reinstalar el activador
function configurarSincronizacionExcel(){
  instalarSincronizacion_();
  sincronizarExcelAhora();
  avisar_('Sincronización configurada: el Excel se actualiza cada ' + SYNC_MINUTOS + ' min si hay datos nuevos.');
}

// ============================================================
// GET: estado, o catálogo en CSV para la tienda
// ============================================================
function doGet(e){
  if (e && e.parameter && e.parameter.catalogo) {
    const v = hoja_('Catalogo').getDataRange().getValues();
    const csv = v.map(function(r){ return r.map(function(c){ return '"'+String(c).replace(/"/g,'""')+'"'; }).join(','); }).join('\n');
    return ContentService.createTextOutput(csv).setMimeType(ContentService.MimeType.CSV);
  }
  return ContentService.createTextOutput('Smart Fit Cusco: activo');
}
