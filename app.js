const ecoStorage = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); return true; } catch { return false; }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch { /* El sitio sigue funcionando sin almacenamiento. */ }
  }
};

const categories = {
  organico: { number: "01", kicker: "Vuelve a la tierra", title: "Residuos orgánicos", icon: "♧", description: "Son restos de origen vegetal o animal que pueden transformarse naturalmente en abono.", yes: ["Cáscaras de frutas y verduras", "Restos de café y té", "Hojas y flores secas"], no: ["Aceite de cocina", "Pañales o toallas sanitarias", "Heces de mascotas"], tip: "Si puedes, conviértelos en composta para nutrir plantas y jardines.", colors: ["#dcecca", "#4b9d61", "#347a4a"] },
  plastico: { number: "02", kicker: "Limpio, seco y compacto", title: "Plásticos reciclables", icon: "♳", description: "Envases y objetos plásticos aceptados por el centro de reciclaje de tu localidad.", yes: ["Botellas de bebidas", "Envases de limpieza", "Tapas y recipientes rígidos"], no: ["Empaques con comida", "Pajillas y cubiertos pequeños", "Plástico mezclado con otros materiales"], tip: "Enjuaga los envases, déjalos secar y aplástalos para ahorrar espacio.", colors: ["#dcecf2", "#529eb4", "#337c91"] },
  papel: { number: "03", kicker: "Seco y sin grasa", title: "Papel y cartón", icon: "▤", description: "El papel limpio puede convertirse muchas veces en cajas, cuadernos y nuevos empaques.", yes: ["Hojas y periódicos", "Cajas de cartón limpias", "Bolsas de papel"], no: ["Servilletas usadas", "Papel encerado o plastificado", "Cajas de pizza con grasa"], tip: "Dobla las cajas y retira cintas, grapas o piezas de plástico cuando sea posible.", colors: ["#efe6d1", "#c69258", "#9c6936"] },
  vidrio: { number: "04", kicker: "Se recicla una y otra vez", title: "Envases de vidrio", icon: "◇", description: "Botellas y frascos de vidrio pueden reciclarse repetidamente sin perder calidad.", yes: ["Botellas de vidrio", "Frascos de alimentos", "Envases cosméticos vacíos"], no: ["Espejos y ventanas", "Bombillas", "Cerámica o vajilla"], tip: "Retira las tapas y entrega el vidrio roto protegido según las reglas de tu localidad.", colors: ["#dceddf", "#55a879", "#387d58"] },
  especial: { number: "05", kicker: "Necesita manejo seguro", title: "Residuos especiales", icon: "⚡", description: "Contienen sustancias o componentes que requieren un punto de recolección autorizado.", yes: ["Pilas y baterías", "Aparatos electrónicos", "Medicamentos vencidos"], no: ["Basura doméstica común", "Contenedor de reciclables", "Desagüe o suelo"], tip: "Guárdalos secos y separados hasta llevarlos a un punto de recolección especial.", colors: ["#f2dfdc", "#cb665f", "#a94540"] }
};

const knowledge = [
  { words: ["cascara", "banano", "platano", "manzana", "fruta", "verdura", "cafe", "te", "hojas", "flores", "comida", "huevo"], category: "Orgánico", icon: "♧", instruction: "Retira cualquier empaque. Si no contiene aceite ni químicos, puedes convertirlo en composta." },
  { words: ["botella plastica", "botella de plastico", "envase plastico", "plastico", "pet", "champu", "detergente", "tapa plastica"], category: "Plástico reciclable", icon: "♳", instruction: "Vacía, enjuaga y seca el envase. Aplástalo y coloca la tapa por separado si tu recolector lo pide." },
  { words: ["ropa", "camisa", "camiseta", "pantalon", "jean", "vestido", "sueter", "tela", "sabana", "toalla"], category: "Tela o ropa", icon: "♢", instruction: "Si está limpia y seca, repárala, dónala o transfórmala antes de desecharla. Los textiles contaminados requieren manejo local." },
  { words: ["palet", "pallet", "tarima", "madera", "tabla", "caja de madera", "cajon de madera"], category: "Madera reutilizable", icon: "▦", instruction: "Comprueba que esté seca, sin moho, plagas ni tratamientos peligrosos. Puede repararse o convertirse en un nuevo objeto." },
  { words: ["mueble", "silla", "mesa", "gaveta", "estante", "repisa", "banco", "armario"], category: "Mueble reutilizable", icon: "▰", instruction: "Si la estructura sigue firme, prioriza repararlo, donarlo o adaptarlo. No reutilices piezas con moho, plagas o daños estructurales." },
  { words: ["papel", "periodico", "revista", "cuaderno", "carton", "caja de carton", "sobre"], category: "Papel y cartón", icon: "▤", instruction: "Debe estar limpio y seco. Aplana las cajas y separa partes plásticas o con grasa." },
  { words: ["vidrio", "frasco", "botella de vino", "botella de cerveza"], category: "Vidrio", icon: "◇", instruction: "Vacía y enjuaga. Retira tapas. No mezcles espejos, cerámica ni bombillas." },
  { words: ["lata", "aluminio", "metal", "conserva", "refresco"], category: "Metal reciclable", icon: "◉", instruction: "Enjuaga, seca y, si es seguro, aplasta la lata. Las tapas afiladas deben quedar dentro del envase." },
  { words: ["pila", "bateria", "celular", "telefono", "computadora", "cargador", "electronico", "medicamento", "aceite", "bombilla", "foco"], category: "Residuo especial", icon: "⚡", instruction: "No lo pongas con la basura común. Guárdalo separado y llévalo a un punto de recolección autorizado." },
  { words: ["pañal", "servilleta", "papel higienico", "papel de baño", "papel sanitario", "toalla de papel", "papel de cocina", "papel mojado", "caja de pizza con grasa", "mascarilla", "ceramica", "esponja", "chicle", "colilla"], category: "No reciclable", icon: "×", instruction: "Deposítalo en la basura general. Reduce su uso cuando exista una alternativa reutilizable." }
];

const quiz = [
  { icon: "🍌", item: "una cáscara de banano", answer: "Orgánico", note: "Las cáscaras se descomponen y pueden convertirse en composta." },
  { icon: "🧴", item: "una botella de champú vacía", answer: "Plástico", note: "Enjuágala y sécala antes de colocarla con los plásticos aceptados." },
  { icon: "📦", item: "una caja de cartón limpia", answer: "Papel", note: "Dóblala para ahorrar espacio y mantenla seca." },
  { icon: "🔋", item: "una pila usada", answer: "Especial", note: "Las pilas requieren un punto de recolección autorizado." },
  { icon: "🍾", item: "una botella de vidrio", answer: "Vidrio", note: "Retira la tapa y enjuágala; no la mezcles con cerámica." }
];

const normalize = text => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

function renderCategory(key) {
  const data = categories[key];
  document.querySelectorAll(".waste-tab").forEach(tab => { const active = tab.dataset.category === key; tab.classList.toggle("active", active); tab.setAttribute("aria-selected", String(active)); });
  document.getElementById("category-number").textContent = data.number;
  document.getElementById("category-kicker").textContent = data.kicker;
  document.getElementById("category-title").textContent = data.title;
  document.getElementById("category-description").textContent = data.description;
  document.getElementById("category-tip").textContent = data.tip;
  document.getElementById("bin-icon").textContent = data.icon;
  document.getElementById("category-yes").innerHTML = data.yes.map(item => `<li>${item}</li>`).join("");
  document.getElementById("category-no").innerHTML = data.no.map(item => `<li>${item}</li>`).join("");
  const bin = document.getElementById("bin-illustration");
  bin.style.background = data.colors[0]; bin.querySelector(".bin-body").style.background = data.colors[1]; bin.querySelector(".bin-lid").style.background = data.colors[2];
}

document.querySelectorAll(".waste-tab").forEach(tab => tab.addEventListener("click", () => renderCategory(tab.dataset.category)));
if (document.getElementById("category-panel")) renderCategory("organico");

const visualWasteRules = [
  { terms: ["cellular telephone", "laptop", "notebook computer", "desktop computer", "computer keyboard", "computer mouse", "remote control", "monitor", "radio", "cassette player", "digital clock", "electric fan", "hair dryer", "flashlight", "battery"], category: "Residuo especial", icon: "⚡", instruction: "Es un aparato, batería o componente que requiere un punto de recolección especial. No lo mezcles con la basura común." },
  { terms: ["paper towel", "toilet tissue", "diaper"], category: "No reciclable", icon: "×", instruction: "El papel sanitario o absorbente usado no debe mezclarse con papel reciclable. Deposítalo en la basura general." },
  { terms: ["jersey", "sweatshirt", "cardigan", "poncho", "shirt", "t-shirt", "jean", "denim", "sock", "apron", "handbag", "backpack"], category: "Tela o ropa", icon: "♢", instruction: "Si está limpia y seca, puedes repararla, donarla o transformarla en un nuevo objeto." },
  { terms: ["rocking chair", "folding chair", "studio couch", "dining table", "wardrobe", "desk", "bookcase"], category: "Mueble reutilizable", icon: "▰", instruction: "Revisa que la estructura esté firme y libre de moho o plagas antes de repararla o transformarla." },
  { terms: ["banana", "orange", "lemon", "pineapple", "strawberry", "fig", "pomegranate", "granny smith", "mushroom", "broccoli", "cauliflower", "cucumber", "artichoke", "bell pepper", "corn", "acorn", "guacamole"], category: "Orgánico", icon: "♧", instruction: "Retira etiquetas o empaques. Puedes aprovechar este residuo en una composta doméstica." },
  { terms: ["plastic bag", "shower cap", "rubber eraser", "bucket"], category: "Plástico reciclable", icon: "♳", instruction: "Comprueba que sea un plástico aceptado en tu localidad; vacíalo, enjuágalo y déjalo secar antes de separarlo." },
  { terms: ["envelope", "carton", "book jacket", "comic book", "menu"], category: "Papel y cartón", icon: "▤", instruction: "Si está limpio y seco, aplánalo y colócalo con papel. Retira partes plásticas o metálicas cuando sea posible." },
  { terms: ["tin can", "oil filter", "chain", "padlock", "nail", "screw", "washer"], category: "Metal reciclable", icon: "◉", instruction: "Límpialo y sécalo. Protege cualquier borde afilado antes de llevarlo al punto de reciclaje." },
  { terms: ["beer bottle", "wine bottle", "pill bottle", "water bottle", "pop bottle", "bottlecap", "vase", "goblet"], category: "Material por confirmar", icon: "?", instruction: "Confirma el material antes de decidir dónde depositarlo.", requiresMaterial: true }
];

const detectedObjectRules = {
  banana: { category: "Orgánico", icon: "♧", instruction: "Las cáscaras y restos de esta fruta pueden convertirse en composta. Retira cualquier etiqueta antes." },
  apple: { category: "Orgánico", icon: "♧", instruction: "Los restos de fruta son orgánicos. Sepáralos para composta cuando sea posible." },
  orange: { category: "Orgánico", icon: "♧", instruction: "La cáscara es un residuo orgánico aprovechable en composta." },
  broccoli: { category: "Orgánico", icon: "♧", instruction: "Los restos vegetales pertenecen a los orgánicos y pueden transformarse en abono." },
  carrot: { category: "Orgánico", icon: "♧", instruction: "Los restos de verduras pueden separarse para composta." },
  sandwich: { category: "Orgánico", icon: "♧", instruction: "Separa cualquier empaque. Los restos de alimento pueden ir a orgánicos si no contienen demasiado aceite." },
  "hot dog": { category: "Orgánico o general", icon: "♧", instruction: "Separa el empaque. Los restos de comida pueden ir a orgánicos si tu sistema de composta los acepta." },
  donut: { category: "Orgánico o general", icon: "♧", instruction: "Separa el empaque. Los restos con mucha grasa deben seguir las reglas de composta de tu localidad." },
  cake: { category: "Orgánico o general", icon: "♧", instruction: "Separa bases, velas y empaques. Los restos de alimento pueden ir a orgánicos según las reglas locales." },
  pizza: { category: "Orgánico o general", icon: "♧", instruction: "Separa los restos de comida. El cartón limpio se recicla; la parte con grasa debe ir a composta o basura general." },
  book: { category: "Papel y cartón", icon: "▤", instruction: "Si está seco y sin cubierta plástica, puede separarse con papel. Considera donarlo antes de reciclarlo." },
  chair: { category: "Mueble reutilizable", icon: "▰", instruction: "Si la estructura está firme, puedes repararla, donarla o transformarla antes de desecharla." },
  bench: { category: "Mueble reutilizable", icon: "▰", instruction: "Comprueba sus uniones y el estado del material. Si es estable, considera repararlo o darle otro uso." },
  "dining table": { category: "Mueble reutilizable", icon: "▰", instruction: "Una mesa estable puede repararse, donarse o adaptarse. Evita reutilizarla si tiene moho, plagas o daños estructurales." },
  couch: { category: "Mueble reutilizable", icon: "▰", instruction: "Antes de reutilizarlo, revisa que no tenga humedad, plagas o daños internos. Si está sano, considera reparación o donación." },
  laptop: { category: "Residuo especial", icon: "⚡", instruction: "Los electrónicos deben entregarse en un punto autorizado. No los mezcles con la basura común." },
  mouse: { category: "Residuo especial", icon: "⚡", instruction: "Este accesorio electrónico requiere recolección especializada." },
  remote: { category: "Residuo especial", icon: "⚡", instruction: "Retira las pilas y lleva ambas partes a puntos de recolección autorizados." },
  keyboard: { category: "Residuo especial", icon: "⚡", instruction: "Llévalo a una jornada o centro de reciclaje electrónico." },
  "cell phone": { category: "Residuo especial", icon: "⚡", instruction: "Borra tus datos y entrégalo en un punto de recolección de electrónicos." },
  tv: { category: "Residuo especial", icon: "⚡", instruction: "Una pantalla necesita manejo especializado; no la abandones ni la mezcles con basura común." },
  microwave: { category: "Residuo especial", icon: "⚡", instruction: "Este electrodoméstico debe llevarse a un centro autorizado de residuos electrónicos." },
  oven: { category: "Residuo especial", icon: "⚡", instruction: "Consulta un punto de recolección de electrodomésticos; no lo mezcles con residuos domésticos." },
  toaster: { category: "Residuo especial", icon: "⚡", instruction: "Este pequeño electrodoméstico pertenece a una recolección de electrónicos." },
  refrigerator: { category: "Residuo especial", icon: "⚡", instruction: "Requiere retiro especializado porque contiene componentes y gases que deben manejarse correctamente." },
  "hair drier": { category: "Residuo especial", icon: "⚡", instruction: "Llévalo a un punto de recolección de aparatos eléctricos." },
  clock: { category: "Residuo especial", icon: "⚡", instruction: "Retira la pila si la tiene y entrega ambas partes según las reglas de residuos electrónicos." },
  toothbrush: { category: "No reciclable", icon: "×", instruction: "Por mezclar varios materiales y ser un objeto sanitario, normalmente va en la basura general." }
};

const ambiguousObjects = new Set(["bottle", "cup", "bowl", "wine glass", "vase", "fork", "knife", "spoon"]);
const objectNames = {
  bottle: "botella", cup: "vaso o taza", bowl: "recipiente", "wine glass": "copa", vase: "florero",
  fork: "tenedor", knife: "cuchillo", spoon: "cuchara", banana: "banana", apple: "manzana",
  orange: "naranja", broccoli: "brócoli", carrot: "zanahoria", sandwich: "sándwich", pizza: "pizza",
  book: "libro", laptop: "computadora portátil", mouse: "ratón de computadora", remote: "control remoto",
  keyboard: "teclado", "cell phone": "teléfono celular", tv: "televisor", microwave: "microondas",
  toaster: "tostadora", refrigerator: "refrigerador", toothbrush: "cepillo de dientes",
  chair: "silla", bench: "banco", "dining table": "mesa", couch: "sofá"
};
const materialResults = {
  plastic: { category: "Plástico reciclable", icon: "♳", instruction: "Vacía, enjuaga y seca el objeto. Verifica el número o tipo de plástico aceptado en tu localidad." },
  glass: { category: "Vidrio", icon: "◇", instruction: "Vacía y enjuaga. Retira tapas y no lo mezcles con cerámica, espejos o cristal templado." },
  paper: { category: "Papel y cartón", icon: "▤", instruction: "Debe estar limpio y seco. Aplánalo y retira cualquier parte plástica o metálica." },
  metal: { category: "Metal reciclable", icon: "◉", instruction: "Límpialo, sécalo y protege cualquier borde afilado antes de entregarlo." },
  organic: { category: "Orgánico", icon: "♧", instruction: "Retira cualquier empaque y sepáralo para composta solo si tu sistema acepta ese tipo de residuo." },
  textile: { category: "Tela o ropa", icon: "♢", instruction: "Si está limpio y seco, repáralo, dónalo o entrégalo en una recolección textil." },
  electronics: { category: "Residuo especial", icon: "⚡", instruction: "Guárdalo seco, no lo abras y llévalo completo a un punto de recolección autorizado." },
  general: { category: "Revisión manual", icon: "?", instruction: "El material no coincide con una categoría segura. Consulta las reglas locales o escribe el nombre en EcoIA." }
};

let visionModel = null;
let visionModelPromise = null;
let detectionModel = null;
let detectionModelPromise = null;
let visionModelsPromise = null;
let pendingVisualAnalysis = null;
let lastVisualContext = null;
let cameraStream = null;
let analysisRunId = 0;
const cameraVideo = document.getElementById("camera-video");
const scanImage = document.getElementById("scan-image");
const captureCanvas = document.getElementById("capture-canvas");
const modelStatus = document.getElementById("model-status");
const scanMessage = document.getElementById("scan-message");

if (cameraVideo && modelStatus && scanMessage) {
  modelStatus.textContent = "Modelos bajo demanda";
  scanMessage.textContent = "Los modelos se descargarán al abrir la cámara o elegir una foto. La imagen se procesa en este dispositivo.";
}

function setScanMessage(message, isError = false) {
  scanMessage.textContent = message;
  scanMessage.classList.toggle("error", isError);
}

async function loadVisionModel() {
  if (visionModel && detectionModel) return { visionModel, detectionModel };
  if (window.ecoVisionModels) {
    visionModel = window.ecoVisionModels.classifier;
    detectionModel = window.ecoVisionModels.detector;
    modelStatus.textContent = "2 modelos listos";
    setScanMessage("Sistema híbrido listo. La fotografía se procesará en este dispositivo.");
    return { visionModel, detectionModel };
  }
  if (visionModelsPromise) return visionModelsPromise;
  if (typeof tf === "undefined" || typeof mobilenet === "undefined" || typeof cocoSsd === "undefined") throw new Error("No se pudieron descargar los modelos de IA. Revisa tu conexión a internet.");
  modelStatus.textContent = "Cargando análisis preciso...";
  setScanMessage("Preparando detección y reconocimiento de alta precisión. La primera carga puede tardar unos segundos.");
  visionModelsPromise = (async () => {
    await tf.ready();
    if (!visionModelPromise) visionModelPromise = mobilenet.load({ version: 2, alpha: 1.0 });
    if (!detectionModelPromise) detectionModelPromise = cocoSsd.load({ base: "mobilenet_v2" });
    [visionModel, detectionModel] = await Promise.all([visionModelPromise, detectionModelPromise]);
    window.ecoVisionModels = { classifier: visionModel, detector: detectionModel };
    modelStatus.textContent = "2 modelos listos";
    setScanMessage("Sistema híbrido listo. La fotografía se procesará en este dispositivo.");
    return { visionModel, detectionModel };
  })();
  try {
    return await visionModelsPromise;
  } catch (error) {
    visionModelsPromise = null;
    visionModelPromise = null;
    detectionModelPromise = null;
    modelStatus.textContent = "Modelos no disponibles";
    throw error;
  }
}

function stopCamera() {
  if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
  cameraStream = null;
  if (cameraVideo) cameraVideo.srcObject = null;
}

function showScanSource(type) {
  document.getElementById("camera-placeholder").hidden = true;
  document.getElementById("focus-frame").hidden = type !== "video";
  cameraVideo.hidden = type !== "video";
  scanImage.hidden = type !== "image";
}

async function startCamera() {
  analysisRunId += 1;
  document.getElementById("analyzing-layer").hidden = true;
  document.getElementById("camera-stage").removeAttribute("aria-busy");
  document.getElementById("scan-result").hidden = true;
  document.getElementById("material-question").hidden = true;
  document.getElementById("scan-guide").hidden = false;
  if (!navigator.mediaDevices?.getUserMedia) {
    setScanMessage("La cámara requiere abrir el proyecto desde HTTPS o localhost. También puedes elegir una foto.", true);
    return;
  }
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
    cameraVideo.srcObject = cameraStream;
    await cameraVideo.play();
    const cameraTrack = cameraStream.getVideoTracks()[0];
    const capabilities = cameraTrack?.getCapabilities?.() || {};
    if (Array.isArray(capabilities.focusMode) && capabilities.focusMode.includes("continuous")) {
      cameraTrack.applyConstraints({ advanced: [{ focusMode: "continuous" }] }).catch(() => {});
    }
    showScanSource("video");
    document.getElementById("start-camera").hidden = true;
    document.getElementById("capture-photo").hidden = false;
    setScanMessage("Centra un solo objeto dentro del marco y procura tener buena iluminación.");
    loadVisionModel().catch(error => setScanMessage(error.message, true));
  } catch (error) {
    const denied = error.name === "NotAllowedError" || error.name === "SecurityError";
    setScanMessage(denied ? "No se concedió permiso para usar la cámara. Puedes elegir una fotografía." : "No fue posible iniciar la cámara en este dispositivo.", true);
  }
}

function sourceSize(source) {
  return {
    width: source.videoWidth || source.naturalWidth || source.width || 0,
    height: source.videoHeight || source.naturalHeight || source.height || 0
  };
}

function prepareAnalysisSource(source, maxDimension = 1600) {
  const dimensions = sourceSize(source);
  const largestSide = Math.max(dimensions.width, dimensions.height);
  if (!largestSide || largestSide <= maxDimension) return source;
  const scale = maxDimension / largestSide;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(dimensions.width * scale);
  canvas.height = Math.round(dimensions.height * scale);
  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function assessImageQuality(source) {
  const { width, height } = sourceSize(source);
  if (!width || !height) return { score: 0, label: "no disponible", blockingMessage: "No se pudo leer la imagen. Prueba con otra fotografía." };
  const sample = document.createElement("canvas");
  const scale = Math.min(1, 180 / Math.max(width, height));
  sample.width = Math.max(1, Math.round(width * scale));
  sample.height = Math.max(1, Math.round(height * scale));
  const context = sample.getContext("2d", { willReadFrequently: true });
  context.drawImage(source, 0, 0, sample.width, sample.height);
  const pixels = context.getImageData(0, 0, sample.width, sample.height).data;
  const luminance = new Float32Array(sample.width * sample.height);
  let total = 0;
  for (let pixel = 0, index = 0; pixel < pixels.length; pixel += 4, index += 1) {
    const value = .2126 * pixels[pixel] + .7152 * pixels[pixel + 1] + .0722 * pixels[pixel + 2];
    luminance[index] = value;
    total += value;
  }
  const mean = total / luminance.length;
  let variance = 0;
  let edgeTotal = 0;
  let edgeCount = 0;
  for (let y = 0; y < sample.height; y += 1) {
    for (let x = 0; x < sample.width; x += 1) {
      const index = y * sample.width + x;
      variance += (luminance[index] - mean) ** 2;
      if (x) { edgeTotal += Math.abs(luminance[index] - luminance[index - 1]); edgeCount += 1; }
      if (y) { edgeTotal += Math.abs(luminance[index] - luminance[index - sample.width]); edgeCount += 1; }
    }
  }
  const contrast = Math.sqrt(variance / luminance.length);
  const detail = edgeCount ? edgeTotal / edgeCount : 0;
  const exposureScore = Math.max(0, 1 - Math.abs(mean - 128) / 128);
  const contrastScore = Math.min(1, contrast / 48);
  const detailScore = Math.min(1, detail / 18);
  const resolutionScore = Math.min(1, Math.min(width, height) / 720);
  const score = Math.max(0, Math.min(1, exposureScore * .32 + contrastScore * .25 + detailScore * .28 + resolutionScore * .15));
  let blockingMessage = "";
  if (Math.min(width, height) < 180) blockingMessage = "La imagen es demasiado pequeña para clasificarla con precisión. Usa una foto de mayor resolución.";
  else if (mean < 20) blockingMessage = "La imagen está demasiado oscura. Añade iluminación y vuelve a intentarlo.";
  else if (mean > 245) blockingMessage = "La imagen está sobreexpuesta. Evita la luz directa y vuelve a intentarlo.";
  const label = score >= .72 ? "buena" : score >= .5 ? "aceptable" : "baja";
  const warning = !blockingMessage && score < .5 ? "La imagen tiene poca luz, contraste o nitidez; el resultado puede ser menos preciso." : "";
  return { score, label, warning, blockingMessage, width, height };
}

function detectionRelevance(detection, dimensions) {
  const [x, y, width, height] = detection.bbox;
  const centerX = (x + width / 2) / dimensions.width;
  const centerY = (y + height / 2) / dimensions.height;
  const centerDistance = Math.min(1, Math.hypot(centerX - .5, centerY - .5) / .71);
  const area = Math.min(1, (width * height) / (dimensions.width * dimensions.height));
  const usableArea = Math.min(1, area / .16);
  return detection.score * (.72 + (1 - centerDistance) * .28) * (.72 + usableArea * .28);
}

function createClassificationCrop(source, detection) {
  const dimensions = sourceSize(source);
  let x = dimensions.width * .12;
  let y = dimensions.height * .12;
  let width = dimensions.width * .76;
  let height = dimensions.height * .76;
  let label = "Vista central";
  if (detection) {
    const [boxX, boxY, boxWidth, boxHeight] = detection.bbox;
    const padding = Math.max(boxWidth, boxHeight) * .16;
    x = Math.max(0, boxX - padding);
    y = Math.max(0, boxY - padding);
    width = Math.min(dimensions.width - x, boxWidth + padding * 2);
    height = Math.min(dimensions.height - y, boxHeight + padding * 2);
    const area = width * height / (dimensions.width * dimensions.height);
    if (area > .9 || area < .008) return createClassificationCrop(source, null);
    label = "Objeto recortado";
  }
  const canvas = document.createElement("canvas");
  const outputScale = Math.min(1, 640 / Math.max(width, height));
  canvas.width = Math.max(224, Math.round(width * outputScale));
  canvas.height = Math.max(224, Math.round(height * outputScale));
  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(source, x, y, width, height, 0, 0, canvas.width, canvas.height);
  return { source: canvas, label };
}

function findVisualRule(prediction) {
  const label = prediction.className.toLowerCase();
  for (const rule of visualWasteRules) {
    const term = rule.terms.find(candidate => label.includes(candidate));
    if (term) return { rule, term };
  }
  return null;
}

function classifyVisualPredictions(predictionSets, qualityScore) {
  const categoryScores = new Map();
  const totalWeight = predictionSets.reduce((sum, view) => sum + view.weight, 0) || 1;
  for (const view of predictionSets) {
    const bestByCategory = new Map();
    for (const prediction of view.predictions) {
      const match = findVisualRule(prediction);
      if (!match) continue;
      const existing = bestByCategory.get(match.rule.category);
      if (!existing || prediction.probability > existing.prediction.probability) bestByCategory.set(match.rule.category, { ...match, prediction });
    }
    for (const match of bestByCategory.values()) {
      const state = categoryScores.get(match.rule.category) || { weightedScore: 0, support: 0, peak: 0, representative: match };
      state.weightedScore += match.prediction.probability * view.weight;
      state.support += 1;
      if (match.prediction.probability > state.peak) {
        state.peak = match.prediction.probability;
        state.representative = match;
      }
      categoryScores.set(match.rule.category, state);
    }
  }
  const ranked = [...categoryScores.values()].map(state => {
    const agreementBonus = state.support > 1 ? Math.min(.08, state.peak * .16) : 0;
    const qualityFactor = .82 + qualityScore * .18;
    return { ...state, confidence: Math.min(.97, (state.weightedScore / totalWeight + agreementBonus) * qualityFactor) };
  }).sort((a, b) => b.confidence - a.confidence);
  const best = ranked[0];
  const second = ranked[1];
  const margin = best ? best.confidence - (second?.confidence || 0) : 0;
  const threshold = qualityScore < .5 ? .2 : .14;
  const conflictingViews = Boolean(best && second && best.support === 1 && second.support === 1 && second.confidence >= Math.max(.08, best.confidence * .42));
  const conclusive = Boolean(best && !conflictingViews && best.confidence >= threshold && (best.support > 1 || margin >= .055 || best.peak >= .35));
  if (!conclusive) {
    const firstPrediction = predictionSets[0]?.predictions[0];
    return { category: "Resultado no concluyente", icon: "?", instruction: "Los modelos no alcanzaron un acuerdo suficiente. Prueba otra foto con un solo objeto, buena luz y un fondo simple.", confidence: best?.confidence || 0, prediction: firstPrediction, margin, conclusive: false };
  }
  return { ...best.representative.rule, confidence: best.confidence, prediction: best.representative.prediction, matchedTerm: best.representative.term, support: best.support, margin, conclusive: true };
}

function showVisualResult(result, confidence, detectedText, detections = [], predictionSets = [], quality = null) {
  document.getElementById("scan-guide").hidden = true;
  document.getElementById("material-question").hidden = true;
  document.getElementById("scan-result-icon").textContent = result.icon;
  document.getElementById("scan-confidence").textContent = result.category === "Resultado no concluyente" ? "REVISIÓN NECESARIA" : confidence >= 0 ? `CONFIANZA ${Math.round(confidence * 100)}%` : "CONFIRMADO POR MATERIAL";
  const confidenceBar = document.getElementById("scan-confidence-bar");
  if (confidenceBar) confidenceBar.style.width = `${confidence >= 0 ? Math.max(8, Math.round(confidence * 100)) : 100}%`;
  document.getElementById("scan-category").textContent = result.category;
  document.getElementById("scan-instruction").textContent = result.instruction;
  const impactLink = document.getElementById("scan-log-impact");
  const impactMaterials = {
    "Plástico reciclable": "plastic",
    "Vidrio": "glass",
    "Papel y cartón": "paper",
    "Metal reciclable": "metal",
    "Orgánico": "organic",
    "Orgánico o general": "organic",
    "Tela o ropa": "textile",
    "Madera reutilizable": "wood",
    "Mueble reutilizable": "furniture",
    "Residuo especial": "electronics",
    "No reciclable": "general"
  };
  const impactMaterial = impactMaterials[result.category];
  if (impactLink) {
    impactLink.hidden = !impactMaterial;
    const integratedImpact = document.getElementById("medir");
    impactLink.href = integratedImpact ? "#medir" : (impactMaterial ? `estacion.html?material=${impactMaterial}#registro` : "estacion.html#registro");
  }
  document.getElementById("scan-result").hidden = false;
  lastVisualContext = { observation: { label: "objeto fotografiado" }, detections, predictionSets, quality };
  window.dispatchEvent(new CustomEvent("ecoguia:scan-result", {
    detail: { category: result.category, confidence, instruction: result.instruction, icon: result.icon }
  }));
}

function askForMaterial(observation, detections, predictionSets, quality) {
  pendingVisualAnalysis = { observation, detections, predictionSets, quality };
  document.getElementById("scan-guide").hidden = true;
  document.getElementById("scan-result").hidden = true;
  document.getElementById("material-question-title").textContent = "Confirma el material del objeto";
  document.getElementById("material-question-text").textContent = "La forma del objeto está clara, pero una cámara no siempre distingue su material. Elige una opción para completar la clasificación.";
  document.getElementById("material-question").hidden = false;
  setScanMessage("Objeto detectado. Confirma su material para obtener una recomendación precisa.");
}

async function analyzeImage(source) {
  const runId = ++analysisRunId;
  const layer = document.getElementById("analyzing-layer");
  const stage = document.getElementById("camera-stage");
  layer.hidden = false;
  stage.setAttribute("aria-busy", "true");
  document.getElementById("scan-result").hidden = true;
  document.getElementById("material-question").hidden = true;
  document.getElementById("scan-guide").hidden = false;
  try {
    const analysisSource = prepareAnalysisSource(source);
    const quality = assessImageQuality(analysisSource);
    if (quality.blockingMessage) {
      setScanMessage(quality.blockingMessage, true);
      return;
    }
    const models = await loadVisionModel();
    if (runId !== analysisRunId) return;
    setScanMessage("Localizando el objeto y comparando dos encuadres...");
    const [detections, fullPredictions] = await Promise.all([
      models.detectionModel.detect(analysisSource, 12, .18),
      models.visionModel.classify(analysisSource, 7)
    ]);
    if (runId !== analysisRunId) return;
    const dimensions = sourceSize(analysisSource);
    const usefulDetections = detections.filter(item => item.class !== "person")
      .sort((a, b) => detectionRelevance(b, dimensions) - detectionRelevance(a, dimensions));
    const crop = createClassificationCrop(analysisSource, usefulDetections[0]);
    const cropPredictions = await models.visionModel.classify(crop.source, 7);
    if (runId !== analysisRunId) return;
    const predictionSets = [
      { label: "Vista completa", weight: .44, predictions: fullPredictions },
      { label: crop.label, weight: .56, predictions: cropPredictions }
    ];
    const visualResult = classifyVisualPredictions(predictionSets, quality.score);
    const primaryDetection = usefulDetections.find(item => (detectedObjectRules[item.class] || ambiguousObjects.has(item.class)) && item.score >= .3);
    if (primaryDetection && ambiguousObjects.has(primaryDetection.class)) {
      askForMaterial({ label: objectNames[primaryDetection.class] || primaryDetection.class, confidence: primaryDetection.score }, usefulDetections, predictionSets, quality);
    } else if (primaryDetection && detectedObjectRules[primaryDetection.class]) {
      const detectedResult = detectedObjectRules[primaryDetection.class];
      const modelsAgree = visualResult.conclusive && visualResult.category === detectedResult.category;
      const detectorIsStrong = primaryDetection.score >= .58 || (primaryDetection.score >= .45 && quality.score >= .5 && !visualResult.conclusive);
      if (modelsAgree || detectorIsStrong) {
        const combinedConfidence = modelsAgree
          ? Math.min(.97, (1 - (1 - primaryDetection.score) * (1 - visualResult.confidence * .7)) * (.84 + quality.score * .16))
          : primaryDetection.score * (.84 + quality.score * .16);
        showVisualResult(detectedResult, combinedConfidence, `Objeto detectado: ${objectNames[primaryDetection.class] || primaryDetection.class}; análisis en dos encuadres.`, usefulDetections, predictionSets, quality);
        setScanMessage(quality.warning || "Los modelos coincidieron y el objeto fue clasificado. Revisa la recomendación local.");
      } else {
        const inconclusive = { category: "Resultado no concluyente", icon: "?", instruction: "El detector y el clasificador no coincidieron con suficiente seguridad. Toma otra foto más cerca, con un solo objeto y un fondo simple." };
        showVisualResult(inconclusive, 0, `Posible objeto: ${objectNames[primaryDetection.class] || primaryDetection.class}; los modelos no coincidieron.`, usefulDetections, predictionSets, quality);
        setScanMessage("Los modelos dieron respuestas distintas. Es mejor repetir la foto antes de desechar el objeto.", true);
      }
    } else if (visualResult.conclusive && visualResult.requiresMaterial) {
      askForMaterial({ label: visualResult.prediction.className.split(",")[0], confidence: visualResult.confidence }, usefulDetections, predictionSets, quality);
    } else if (visualResult.conclusive) {
      showVisualResult(visualResult, visualResult.confidence, `Coincidencia visual: ${visualResult.prediction.className}; acuerdo en ${visualResult.support} encuadre${visualResult.support === 1 ? "" : "s"}.`, usefulDetections, predictionSets, quality);
      setScanMessage(quality.warning || "Clasificación completada mediante consenso entre dos encuadres.");
    } else {
      const detectedText = visualResult.prediction ? `Mejor posibilidad: ${visualResult.prediction.className}; sin consenso suficiente.` : "Sin coincidencias disponibles";
      showVisualResult(visualResult, 0, detectedText, usefulDetections, predictionSets, quality);
      setScanMessage("No hubo suficiente certeza. Acerca el objeto, mejora la iluminación y evita elementos en el fondo.", true);
    }
  } catch (error) {
    if (runId === analysisRunId) setScanMessage(error.message || "No se pudo analizar la imagen. Inténtalo nuevamente.", true);
  } finally {
    if (runId === analysisRunId) {
      layer.hidden = true;
      stage.removeAttribute("aria-busy");
    }
  }
}

document.getElementById("start-camera")?.addEventListener("click", startCamera);
document.getElementById("capture-photo")?.addEventListener("click", async () => {
  if (!cameraVideo.videoWidth) return;
  captureCanvas.width = cameraVideo.videoWidth;
  captureCanvas.height = cameraVideo.videoHeight;
  captureCanvas.getContext("2d").drawImage(cameraVideo, 0, 0);
  scanImage.src = captureCanvas.toDataURL("image/jpeg", .86);
  showScanSource("image");
  stopCamera();
  document.getElementById("capture-photo").hidden = true;
  document.getElementById("start-camera").hidden = false;
  await analyzeImage(captureCanvas);
});

document.getElementById("image-upload")?.addEventListener("change", event => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) { setScanMessage("Selecciona un archivo de imagen válido.", true); return; }
  if (file.size > 20 * 1024 * 1024) { setScanMessage("La imagen supera 20 MB. Usa una fotografía más pequeña para evitar que el navegador se quede sin memoria.", true); event.target.value = ""; return; }
  stopCamera();
  const imageUrl = URL.createObjectURL(file);
  scanImage.onload = async () => { URL.revokeObjectURL(imageUrl); showScanSource("image"); await analyzeImage(scanImage); };
  scanImage.onerror = () => { URL.revokeObjectURL(imageUrl); setScanMessage("No se pudo abrir esa imagen.", true); };
  scanImage.src = imageUrl;
  document.getElementById("capture-photo").hidden = true;
  document.getElementById("start-camera").hidden = false;
});

document.getElementById("material-options")?.addEventListener("click", event => {
  const button = event.target.closest("[data-material]");
  if (!button || !pendingVisualAnalysis) return;
  const result = materialResults[button.dataset.material];
  const { observation, detections, predictionSets, quality } = pendingVisualAnalysis;
  showVisualResult(result, -1, `Objeto reconocido: ${observation.label}; material indicado: ${button.textContent.trim()}`, detections, predictionSets, quality);
  pendingVisualAnalysis = null;
  setScanMessage("Clasificación completada combinando visión artificial y confirmación del material.");
});

document.getElementById("scan-correct-material")?.addEventListener("click", () => {
  if (!lastVisualContext) return;
  pendingVisualAnalysis = lastVisualContext;
  document.getElementById("scan-result").hidden = true;
  document.getElementById("scan-guide").hidden = true;
  document.getElementById("material-question-title").textContent = "Corrige el material";
  document.getElementById("material-question-text").textContent = "Tu confirmación tiene prioridad sobre la predicción visual.";
  document.getElementById("material-question").hidden = false;
  setScanMessage("Selecciona el material principal para corregir la clasificación.");
});

document.getElementById("scan-again")?.addEventListener("click", () => {
  analysisRunId += 1;
  stopCamera();
  pendingVisualAnalysis = null;
  lastVisualContext = null;
  document.getElementById("scan-result").hidden = true;
  document.getElementById("material-question").hidden = true;
  document.getElementById("scan-guide").hidden = false;
  document.getElementById("camera-placeholder").hidden = false;
  document.getElementById("focus-frame").hidden = true;
  document.getElementById("analyzing-layer").hidden = true;
  document.getElementById("camera-stage").removeAttribute("aria-busy");
  cameraVideo.hidden = true;
  scanImage.hidden = true;
  scanImage.removeAttribute("src");
  document.getElementById("image-upload").value = "";
  setScanMessage("Listo para analizar otro residuo.");
});

window.addEventListener("pagehide", stopCamera);

const chatArea = document.getElementById("chat-area");
const chatForm = document.getElementById("chat-form");
const wasteInput = document.getElementById("waste-input");

function addMessage(content, type) {
  const message = document.createElement("div"); message.className = `message ${type}`;
  if (type === "user-message") { const p = document.createElement("p"); p.textContent = content; message.appendChild(p); }
  else { message.innerHTML = `<span class="mini-avatar">✦</span><p>${content}</p>`; }
  chatArea.appendChild(message); chatArea.scrollTop = chatArea.scrollHeight;
}

function termMatches(cleaned, term) {
  const haystack = ` ${cleaned.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ")} `;
  const needle = normalize(term).replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  if (!needle) return false;
  if (haystack.includes(` ${needle} `)) return true;
  return !needle.includes(" ") && (haystack.includes(` ${needle}s `) || haystack.includes(` ${needle}es `));
}

function findWasteMatch(query) {
  const cleaned = normalize(query);
  const priority = { "Residuo especial": 3, "No reciclable": 2 };
  const candidates = knowledge.flatMap(entry => entry.words
    .filter(word => termMatches(cleaned, word))
    .map(word => ({ entry, specificity: normalize(word).split(" ").length * 100 + normalize(word).length })));
  candidates.sort((a, b) => b.specificity - a.specificity || (priority[b.entry.category] || 0) - (priority[a.entry.category] || 0));
  if (candidates[0]) return candidates[0].entry;
  const ambiguousTerms = ["botella", "vaso", "taza", "recipiente", "envase", "caja", "bolsa", "bandeja"];
  if (ambiguousTerms.some(term => termMatches(cleaned, term))) {
    return { category: "Material por confirmar", icon: "?", requiresMaterial: true, instruction: "Ese objeto puede fabricarse con distintos materiales. Confirma si es plástico, vidrio, papel, metal u otro material." };
  }
  return null;
}

function classifyWaste(query) {
  const match = findWasteMatch(query);
  chatArea.querySelectorAll(".message:not(:first-child)").forEach(message => message.remove());
  addMessage(query, "user-message");
  window.setTimeout(() => {
    if (match?.requiresMaterial) addMessage(`${match.icon} <strong>Necesito confirmar el material.</strong><small>${match.instruction}</small>`, "bot-message result-message");
    else if (match) addMessage(`${match.icon} Lo clasificaría como <strong>${match.category}</strong>.<small>${match.instruction} Consulta siempre las reglas de recolección de tu municipio.</small>`, "bot-message result-message");
    else addMessage(`No reconozco ese residuo con suficiente seguridad.<small>Busca el material principal del objeto o consulta con el servicio de recolección de tu localidad. También puedes probar palabras como “papel”, “lata” o “pila”.</small>`, "bot-message result-message");
    window.dispatchEvent(new CustomEvent("ecoguia:text-result", { detail: { query, match: match || null } }));
  }, 320);
}

chatForm?.addEventListener("submit", event => { event.preventDefault(); const value = wasteInput.value.trim(); if (!value) return; classifyWaste(value); wasteInput.value = ""; });
document.addEventListener("click", event => { const queryButton = event.target.closest("[data-query]"); if (queryButton && chatArea) classifyWaste(queryButton.dataset.query); });

const options = ["Orgánico", "Plástico", "Papel", "Vidrio", "Especial"];
let questionIndex = 0, score = 0, answered = false;
function renderQuiz() {
  const question = quiz[questionIndex]; answered = false;
  document.getElementById("quiz-step").textContent = `Pregunta ${questionIndex + 1} de ${quiz.length}`;
  document.getElementById("quiz-progress").style.width = `${((questionIndex + 1) / quiz.length) * 100}%`;
  document.getElementById("quiz-icon").textContent = question.icon; document.getElementById("quiz-item").textContent = question.item; document.getElementById("quiz-feedback").textContent = ""; document.getElementById("next-question").hidden = true;
  document.getElementById("quiz-options").innerHTML = options.map(option => `<button class="quiz-option" type="button" data-answer="${option}">${option}</button>`).join("");
}

document.getElementById("quiz-options")?.addEventListener("click", event => {
  const button = event.target.closest(".quiz-option"); if (!button || answered) return; answered = true;
  const question = quiz[questionIndex], correct = button.dataset.answer === question.answer; if (correct) score += 1;
  document.querySelectorAll(".quiz-option").forEach(option => { option.disabled = true; if (option.dataset.answer === question.answer) option.classList.add("correct"); });
  if (!correct) button.classList.add("wrong"); document.getElementById("quiz-feedback").textContent = `${correct ? "¡Correcto!" : "Casi."} ${question.note}`;
  const next = document.getElementById("next-question"); next.hidden = false; next.firstChild.textContent = questionIndex === quiz.length - 1 ? "Ver resultado " : "Siguiente ";
});

document.getElementById("next-question")?.addEventListener("click", () => {
  if (questionIndex < quiz.length - 1) { questionIndex += 1; renderQuiz(); return; }
  const previousBest = Number(ecoStorage.get("ecoguia-best") || 0), best = Math.max(previousBest, score); ecoStorage.set("ecoguia-best", String(best)); updateBest(best);
  const quizCard = document.getElementById("quiz-card"); quizCard.innerHTML = `<div class="quiz-object">${score >= 4 ? "🌱" : "💚"}</div><h3>¡Reto completado!</h3><p>Obtuviste <strong>${score} de ${quiz.length}</strong> respuestas correctas.</p><p class="quiz-feedback">${score === 5 ? "Excelente: ya dominas la separación básica." : "Cada intento mejora tus hábitos. Repasa la guía y vuelve a probar."}</p><button class="button button-primary" id="restart-quiz" type="button">Intentar de nuevo ↻</button>`;
  document.getElementById("restart-quiz").addEventListener("click", () => window.location.reload());
});

function updateBest(best) { document.getElementById("best-score").textContent = best; document.getElementById("best-progress").style.width = `${(best / quiz.length) * 100}%`; }
if (document.getElementById("quiz-options")) { updateBest(Number(ecoStorage.get("ecoguia-best") || 0)); renderQuiz(); }

const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }); }, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
const menuButton = document.querySelector(".menu-button"), navLinks = document.getElementById("nav-links");
menuButton?.addEventListener("click", () => { const open = navLinks.classList.toggle("open"); menuButton.setAttribute("aria-expanded", String(open)); });
navLinks?.addEventListener("click", event => { if (event.target.matches("a")) { navLinks.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); } });
