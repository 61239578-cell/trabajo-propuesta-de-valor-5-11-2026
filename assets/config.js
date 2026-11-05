// ============================================================
//  CONFIGURACIÓN DE SMART FIT CUSCO  (v4)
// ============================================================
// 1) EXCEL / GOOGLE SHEETS: pega aquí la URL de tu Apps Script (termina en /exec).
//    Mientras esté vacía, los datos se guardan solo en el navegador de cada persona.
// 2) IMÁGENES: ruta de cada foto (carpeta assets/img/). Si dejas una vacía ('') o falla,
//    se usa la ilustración por defecto.
//    - Fotos extra de una prenda: v1_2, v1_3, ... (aparecen como miniaturas en la ficha
//      y la segunda se ve al pasar el mouse sobre la tarjeta).
//    - Foto por color: v1_Terracota, v1_Verde, ... (cambia al elegir ese color).
// 3) EFECTOS: cada efecto se apaga poniendo false. EFECTOS: false apaga todos.
window.CONFIG = {
  ENDPOINT: 'https://script.google.com/macros/s/AKfycbzLSNb-iqsnouXNvI0lF-wrOZQrswW-pNnoCsbGV4KcD_2bV8mJxVeA7WIT2CWfHfib/exec',
  WHATSAPP: '51938703934',   // WhatsApp de Smart Fit Cusco: +51 938 703 934
  CATALOGO_URL: 'https://script.google.com/macros/s/AKfycbzLSNb-iqsnouXNvI0lF-wrOZQrswW-pNnoCsbGV4KcD_2bV8mJxVeA7WIT2CWfHfib/exec?catalogo=1', // Catálogo servido por Apps Script desde la pestaña Catalogo
  SITIO_URL: '',             // ej: 'https://tuusuario.github.io/smart-fit-cusco' (mejora las vistas previas al compartir)
  IDIOMA: 'es',              // idioma inicial: 'es' o 'en' (la persona puede cambiarlo con el botón ES/EN)

  // ---------- Efectos visuales (true = encendido, false = apagado) ----------
  EFECTOS: {
    zoom: true,          // zoom suave en tarjetas de producto
    crossfade: false,    // 2.ª foto (v1_2) al pasar el mouse (apagado: se usa la misma foto)
    tilt: true,          // inclinación 3D sutil (solo con mouse)
    colorHover: true,    // puntos de color en la tarjeta cambian el tono / la foto
    tov: true,           // categorías del Inicio: texto "Ver colección →" animado
    kenburns: true,      // portada: zoom lento
    parallax: true,      // portada y banners: parallax con el scroll
    entrada: true,       // portada: entrada escalonada del titular y botones
    reveal: true,        // aparición al hacer scroll
    marquee: true,       // cinta de beneficios en el Inicio
    lupa: true,          // lupa en la ficha de producto
    lightbox: true,      // vista grande al hacer clic en la foto
    cursor: true,        // cursor personalizado (solo con mouse)
    probadorFoto: true   // probador virtual con tu propia foto
  },

  // ---------- Pasarela de pago (apagada por defecto) ----------
  // Para activarla lee el comentario "PASARELA DE PAGO" al inicio de assets/efectos.js
  PAGO: {
    ACTIVO: false,
    PROVEEDOR: 'mercadopago',   // 'mercadopago' o 'culqi'
    URL_PREFERENCIA: '',        // Mercado Pago: URL de tu función/servidor que crea la preferencia
    PUBLIC_KEY: ''              // Culqi: tu llave pública (pk_test_... / pk_live_...)
  },

  // ---------- Analítica ligera (apagada por defecto) ----------
  ANALITICA: {
    ACTIVA: false,
    PROVEEDOR: 'plausible',     // 'plausible' o 'ga'
    PLAUSIBLE_DOMINIO: '',      // ej: 'tuusuario.github.io'
    GA_ID: ''                   // ej: 'G-XXXXXXXXXX'
  },

  // ---------- Looks de temporada (sección del Inicio) ----------
  LOOKBOOK: [
    { k: 'lk1', t: 'Falda plisada terracota', alt: 'Mujer con blusa negra y falda plisada terracota' },
    { k: 'lk2', t: 'Looks en pareja', alt: 'Mujer y hombre con ropa de la colección de Smart Fit Cusco' },
    { k: 'lk3', t: 'Polo blanco y jean', alt: 'Hombre con polo blanco y jean azul' },
    { k: 'lk4', t: 'Camiseta y pantalón negro', alt: 'Hombre con camiseta blanca y pantalón negro' },
    { k: 'lk7', t: 'Enterizo fluido negro', alt: 'Mujer con enterizo negro de corte fluido' }
  ],

  // Producto nuevo en la hoja Catalogo sin foto aquí: la tienda busca assets/img/catalogo_nuevo/<id>.webp
  // o usa la columna "imagen" de la hoja (ruta o URL https://).
  CARPETA_FOTOS: 'assets/img/catalogo_nuevo/',

  IMAGENES: {
    // --- Inicio ---
    hero: 'assets/img/hero.webp',
    // --- Tienda ---
    tienda: 'assets/img/tienda.webp',
    // ---- Prendas (cada id usa la foto que realmente muestra esa prenda) ----
    // vestidos
    v1: 'assets/img/catalogo_nuevo/v1_Terracota.webp', // el primer color de v1 es Terracota, así la tarjeta coincide con su punto de color
    v1_Terracota: 'assets/img/catalogo_nuevo/v1_Terracota.webp',
    v1_Verde: 'assets/img/catalogo_nuevo/v1_Verde.webp',
    v1_Negro: 'assets/img/catalogo_nuevo/v1_Negro.webp',
    v1_Azul: 'assets/img/catalogo_nuevo/v1_Azul.webp',
    v2: 'assets/img/catalogo_nuevo/v2.webp',
    v3: 'assets/img/catalogo_nuevo/v3.webp',
    v4: 'assets/img/catalogo_nuevo/v4.webp',
    // tops (b4 y b5 comparten foto de modelo: falta foto específica)
    b1: 'assets/img/catalogo_nuevo/b1.webp',
    b2: 'assets/img/catalogo_nuevo/b2.webp',   // polo blanco
    b3: 'assets/img/catalogo_nuevo/b3.webp',   // blusa satinada (falta foto específica de camisa oversize)
    b4: 'assets/img/catalogo_nuevo/b4.webp',   // polo negro (falta foto específica de top cruzado)
    b5: 'assets/img/catalogo_nuevo/b1.webp',   // falta foto específica de blusa manga larga
    b6: 'assets/img/catalogo_nuevo/b6.webp',
    // casacas
    c1: 'assets/img/catalogo_nuevo/c1.webp',
    c2: 'assets/img/catalogo_nuevo/c2.webp',
    c3: 'assets/img/catalogo_nuevo/c2.webp',   // falta foto específica de blazer
    c4: 'assets/img/catalogo_nuevo/c4.webp',
    c5: 'assets/img/catalogo_nuevo/c2.webp',   // falta foto específica de bomber
    // pantalones y faldas
    p1: 'assets/img/catalogo_nuevo/p1.webp',
    p2: 'assets/img/catalogo_nuevo/p2.webp',
    p3: 'assets/img/catalogo_nuevo/p3.webp',
    p4: 'assets/img/catalogo_nuevo/p1.webp',   // falta foto específica de cargo
    p5: 'assets/img/catalogo_nuevo/p2.webp',   // falta foto específica de sastre
    p6: 'assets/img/catalogo_nuevo/p6.webp',
    // ---- Colección masculina: el archivo mN.webp muestra la prenda del producto mN ----
    m1:'assets/img/catalogo_nuevo/m1.webp', m2:'assets/img/catalogo_nuevo/m2.webp', m3:'assets/img/catalogo_nuevo/m3.webp', m4:'assets/img/catalogo_nuevo/m4.webp', m5:'assets/img/catalogo_nuevo/m5.webp',
    m6:'assets/img/catalogo_nuevo/m6.webp', m7:'assets/img/catalogo_nuevo/m7.webp', m8:'assets/img/catalogo_nuevo/m8.webp', m9:'assets/img/catalogo_nuevo/m9.webp', m10:'assets/img/catalogo_nuevo/m10.webp',
    m11:'assets/img/catalogo_nuevo/m11.webp', m12:'assets/img/catalogo_nuevo/m12.webp', m13:'assets/img/catalogo_nuevo/m13.webp', m14:'assets/img/catalogo_nuevo/m14.webp', m15:'assets/img/catalogo_nuevo/m15.webp',
    m16:'assets/img/catalogo_nuevo/m16.webp', m17:'assets/img/catalogo_nuevo/m17.webp', m18:'assets/img/catalogo_nuevo/m18.webp', m19:'assets/img/catalogo_nuevo/m19.webp',
    // ---- Imágenes de categorías (Inicio) ----
    cat_vestido:'assets/img/catalogo_nuevo/v1_Terracota.webp',
    cat_top:'assets/img/catalogo_nuevo/b1.webp',
    cat_camisa:'assets/img/catalogo_nuevo/m2.webp',
    cat_casaca:'assets/img/catalogo_nuevo/c1.webp',
    cat_pantalon:'assets/img/catalogo_nuevo/p1.webp',
    cat_short:'assets/img/catalogo_nuevo/m10.webp',
    cat_deportivo:'assets/img/catalogo_nuevo/m11.webp',
    cat_accesorio:'assets/img/catalogo_nuevo/m12.webp',
    cat_falda:'assets/img/catalogo_nuevo/p6.webp',
    // --- Looks de temporada ---
    lk1: 'assets/img/lk1.webp', lk2: 'assets/img/lk2.webp', lk3: 'assets/img/lk3.webp',
    lk4: 'assets/img/lk4.webp', lk7: 'assets/img/lk7.webp',
    // --- Bocetos de referencia del asistente de tallas ---
    ref_mujer: 'assets/img/ref_mujer.webp', ref_hombre: 'assets/img/ref_hombre.webp',
    scan_mujer: 'assets/img/scan_mujer.png', scan_hombre: 'assets/img/scan_hombre.png',
    // --- Nosotros ---
    nosotros: 'assets/img/nosotros.webp'
  }
};
