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

  IMAGENES: {
    // --- Inicio ---
    hero: 'assets/img/hero.webp',
    cat_vestido: 'assets/img/cat_vestido.webp',
    cat_top: 'assets/img/cat_top.webp',
    cat_casaca: 'assets/img/cat_casaca.webp',
    cat_pantalon: 'assets/img/cat_pantalon.webp',
    // --- Tienda ---
    tienda: 'assets/img/tienda.webp',
    // vestidos: Envolvente, Línea A, Midi fluido
    v1: 'assets/img/catalogo_nuevo/v1.jpg',
    // Variantes de color del vestido envolvente: misma modelo, pose y prenda; cambia solo el tono de la tela.
    v1_Terracota: 'assets/img/catalogo_nuevo/v1_Terracota.jpg',
    v1_Verde: 'assets/img/catalogo_nuevo/v1_Verde.jpg',
    v1_Negro: 'assets/img/catalogo_nuevo/v1_Negro.jpg',
    v1_Azul: 'assets/img/catalogo_nuevo/v1_Azul.jpg',
    v4: 'assets/img/catalogo_nuevo/v4.jpg',
    v2: 'assets/img/catalogo_nuevo/v2.jpg',
    v3: 'assets/img/catalogo_nuevo/v3.jpg',
    // tops: Blusa fluida, Polo básico, Camisa oversize, Top cruzado, Blusa manga larga, Suéter tejido
    b1: 'assets/img/catalogo_nuevo/b1.jpg',
    b2: 'assets/img/catalogo_nuevo/b3.jpg', // polo blanco
    b3: 'assets/img/catalogo_nuevo/b2.jpg', // blusa satinada
    b4: 'assets/img/catalogo_nuevo/b4.jpg', // polo negro
    b5: 'assets/img/catalogo_nuevo/b1.jpg', // foto de modelo disponible; falta foto específica
    b6: 'assets/img/catalogo_nuevo/b6.jpg',
    // casacas: Larga, Estructurada, Blazer largo, Cárdigan largo, Bomber urbana
    c1: 'assets/img/catalogo_nuevo/c1.jpg',
    c2: 'assets/img/catalogo_nuevo/c2.jpg',
    c3: 'assets/img/catalogo_nuevo/c2.jpg', // se conserva la mejor foto disponible para blazer
    c4: 'assets/img/catalogo_nuevo/c4.jpg',
    c5: 'assets/img/catalogo_nuevo/c2.jpg', // imagen disponible de casaca; falta foto específica bomber

    // pantalones: Tiro alto, Recto, Fluido, Cargo, Sastre
    p1: 'assets/img/catalogo_nuevo/p1.jpg',
    p2: 'assets/img/catalogo_nuevo/p2.jpg',
    p3: 'assets/img/catalogo_nuevo/p3.jpg',
    p4: 'assets/img/catalogo_nuevo/p1.jpg', // foto de modelo disponible; falta foto específica cargo
    p5: 'assets/img/catalogo_nuevo/p2.jpg', // foto de modelo disponible; falta foto específica sastre
    p6: 'assets/img/catalogo_nuevo/p6.jpg',
    // --- Nueva colección masculina ---
    // Asignación por tipo de prenda (los nombres m1–m19 del archivo original siguen intactos).
    m1:'assets/img/catalogo_nuevo/m1.jpg',   // polo negro
    m2:'assets/img/catalogo_nuevo/m4.jpg',   // camisa celeste
    m3:'assets/img/catalogo_nuevo/m8.jpg',   // pantalón chino beige
    m4:'assets/img/catalogo_nuevo/m14.jpg',  // casaca impermeable
    m5:'assets/img/catalogo_nuevo/m6.jpg',   // polo deportivo
    m6:'assets/img/catalogo_nuevo/m10.jpg',  // jogger deportivo
    m7:'assets/img/catalogo_nuevo/m3.jpg',   // polo negro clásico
    m8:'assets/img/catalogo_nuevo/m15.jpg',  // casaca verde urbana
    m9:'assets/img/catalogo_nuevo/m12.jpg',  // suéter
    m10:'assets/img/catalogo_nuevo/m11.jpg', // short deportivo
    m11:'assets/img/catalogo_nuevo/m13.jpg', // polerón con capucha
    m12:'assets/img/catalogo_nuevo/m18.jpg', // mochila
    m13:'assets/img/catalogo_nuevo/m2.jpg',  // polo blanco
    m14:'assets/img/catalogo_nuevo/m5.jpg',  // camisa a cuadros
    m15:'assets/img/catalogo_nuevo/m9.jpg',  // pantalón negro
    m16:'assets/img/catalogo_nuevo/m16.jpg', // casaca beige
    m17:'assets/img/catalogo_nuevo/m17.jpg', // gorra
    m18:'assets/img/catalogo_nuevo/m19.jpg', // zapatillas blancas
    m19:'assets/img/catalogo_nuevo/m7.jpg',  // polo deportivo ligero
    // Imágenes de categorías: fotografías reales, no siluetas SVG.
    cat_vestido:'assets/img/catalogo_nuevo/v1.jpg',
    cat_top:'assets/img/catalogo_nuevo/b1.jpg',
    cat_camisa:'assets/img/catalogo_nuevo/m4.jpg',
    cat_casaca:'assets/img/catalogo_nuevo/m14.jpg',
    cat_pantalon:'assets/img/catalogo_nuevo/p1.jpg',
    cat_short:'assets/img/catalogo_nuevo/m11.jpg',
    cat_deportivo:'assets/img/catalogo_nuevo/m6.jpg',
    cat_accesorio:'assets/img/catalogo_nuevo/m18.jpg',
    cat_falda:'assets/img/catalogo_nuevo/p6.jpg',
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
