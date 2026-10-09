const categories = {
  organico: { number: "01", kicker: "Vuelve a la tierra", title: "Residuos orgánicos", icon: "♧", description: "Son restos de origen vegetal o animal que pueden transformarse naturalmente en abono.", yes: ["Cáscaras de frutas y verduras", "Restos de café y té", "Hojas y flores secas"], no: ["Aceite de cocina", "Pañales o toallas sanitarias", "Heces de mascotas"], tip: "Si puedes, conviértelos en composta para nutrir plantas y jardines.", colors: ["#dcecca", "#4b9d61", "#347a4a"] },
  plastico: { number: "02", kicker: "Limpio, seco y compacto", title: "Plásticos reciclables", icon: "♳", description: "Envases y objetos plásticos aceptados por el centro de reciclaje de tu localidad.", yes: ["Botellas de bebidas", "Envases de limpieza", "Tapas y recipientes rígidos"], no: ["Empaques con comida", "Pajillas y cubiertos pequeños", "Plástico mezclado con otros materiales"], tip: "Enjuaga los envases, déjalos secar y aplástalos para ahorrar espacio.", colors: ["#dcecf2", "#529eb4", "#337c91"] },
  papel: { number: "03", kicker: "Seco y sin grasa", title: "Papel y cartón", icon: "▤", description: "El papel limpio puede convertirse muchas veces en cajas, cuadernos y nuevos empaques.", yes: ["Hojas y periódicos", "Cajas de cartón limpias", "Bolsas de papel"], no: ["Servilletas usadas", "Papel encerado o plastificado", "Cajas de pizza con grasa"], tip: "Dobla las cajas y retira cintas, grapas o piezas de plástico cuando sea posible.", colors: ["#efe6d1", "#c69258", "#9c6936"] },
  vidrio: { number: "04", kicker: "Se recicla una y otra vez", title: "Envases de vidrio", icon: "◇", description: "Botellas y frascos de vidrio pueden reciclarse repetidamente sin perder calidad.", yes: ["Botellas de vidrio", "Frascos de alimentos", "Envases cosméticos vacíos"], no: ["Espejos y ventanas", "Bombillas", "Cerámica o vajilla"], tip: "Retira las tapas y entrega el vidrio roto protegido según las reglas de tu localidad.", colors: ["#dceddf", "#55a879", "#387d58"] },
  especial: { number: "05", kicker: "Necesita manejo seguro", title: "Residuos especiales", icon: "⚡", description: "Contienen sustancias o componentes que requieren un punto de recolección autorizado.", yes: ["Pilas y baterías", "Aparatos electrónicos", "Medicamentos vencidos"], no: ["Basura doméstica común", "Contenedor de reciclables", "Desagüe o suelo"], tip: "Guárdalos secos y separados hasta llevarlos a un punto de recolección especial.", colors: ["#f2dfdc", "#cb665f", "#a94540"] }
};

const knowledge = [
  { words: ["cascara", "banano", "platano", "manzana", "fruta", "verdura", "cafe", "te", "hojas", "flores", "comida", "huevo"], category: "Orgánico", icon: "♧", instruction: "Retira cualquier empaque. Si no contiene aceite ni químicos, puedes convertirlo en composta." },
  { words: ["botella plastica", "plastico", "pet", "champu", "detergente", "tapa", "envase"], category: "Plástico reciclable", icon: "♳", instruction: "Vacía, enjuaga y seca el envase. Aplástalo y coloca la tapa por separado si tu recolector lo pide." },
  { words: ["papel", "periodico", "revista", "cuaderno", "carton", "caja", "sobre"], category: "Papel y cartón", icon: "▤", instruction: "Debe estar limpio y seco. Aplana las cajas y separa partes plásticas o con grasa." },
  { words: ["vidrio", "frasco", "botella de vino", "botella de cerveza"], category: "Vidrio", icon: "◇", instruction: "Vacía y enjuaga. Retira tapas. No mezcles espejos, cerámica ni bombillas." },
  { words: ["lata", "aluminio", "metal", "conserva", "refresco"], category: "Metal reciclable", icon: "◉", instruction: "Enjuaga, seca y, si es seguro, aplasta la lata. Las tapas afiladas deben quedar dentro del envase." },
  { words: ["pila", "bateria", "celular", "telefono", "computadora", "cargador", "electronico", "medicamento", "aceite", "bombilla", "foco"], category: "Residuo especial", icon: "⚡", instruction: "No lo pongas con la basura común. Guárdalo separado y llévalo a un punto de recolección autorizado." },
  { words: ["pañal", "servilleta", "papel higienico", "mascarilla", "ceramica", "esponja", "chicle", "colilla"], category: "No reciclable", icon: "×", instruction: "Deposítalo en la basura general. Reduce su uso cuando exista una alternativa reutilizable." }
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
renderCategory("organico");

const stationMaterials = {
  organic: { name: "Orgánico", color: "#4b9d61", icon: "♧", recovery: .9, action: "Separar los restos de cocina puede reducir rápidamente la basura general. Empieza una composta o define una entrega frecuente." },
  plastic: { name: "Plástico", color: "#529eb4", icon: "♳", recovery: .65, action: "Prioriza envases limpios y secos. Reduce primero los empaques de un solo uso y compacta las botellas." },
  paper: { name: "Papel", color: "#c69258", icon: "▤", recovery: .8, action: "Mantén papel y cartón secos. Dobla las cajas para que tu estación ocupe menos espacio." },
  glass: { name: "Vidrio", color: "#7769a9", icon: "◇", recovery: .95, action: "Reserva un contenedor firme. Retira tapas y lleva los envases juntos para reducir viajes." }
};
const amountLabels = ["Nada", "Poco", "Medio", "Mucho"];
let peopleCount = 3;
const stationRanges = Object.keys(stationMaterials).reduce((ranges, key) => {
  ranges[key] = document.getElementById(`${key}-range`);
  return ranges;
}, {});

function updateStationControls() {
  document.getElementById("people-value").textContent = peopleCount;
  Object.entries(stationRanges).forEach(([key, range]) => {
    document.getElementById(`${key}-output`).textContent = amountLabels[Number(range.value)];
  });
}

document.getElementById("people-minus").addEventListener("click", () => { peopleCount = Math.max(1, peopleCount - 1); updateStationControls(); });
document.getElementById("people-plus").addEventListener("click", () => { peopleCount = Math.min(8, peopleCount + 1); updateStationControls(); });
Object.values(stationRanges).forEach(range => range.addEventListener("input", updateStationControls));

function containerSize(amount) {
  const adjusted = amount * (.72 + peopleCount * .16);
  if (adjusted <= 1.2) return "10 L";
  if (adjusted <= 2.4) return "20 L";
  if (adjusted <= 3.8) return "35 L";
  return "50 L";
}

function buildStationPlan(plan, shouldSave = true) {
  peopleCount = plan.people;
  Object.entries(plan.amounts).forEach(([key, value]) => { if (stationRanges[key]) stationRanges[key].value = value; });
  updateStationControls();
  const active = Object.entries(plan.amounts).filter(([, amount]) => amount > 0);
  const total = active.reduce((sum, [, amount]) => sum + amount, 0);
  if (!total) {
    document.getElementById("result-placeholder").innerHTML = `<div class="mini-station"><span></span><span></span><span></span></div><h3>Aún no hay residuos</h3><p>Selecciona al menos una cantidad para poder diseñar tu estación.</p>`;
    document.getElementById("result-placeholder").hidden = false;
    document.getElementById("result-content").hidden = true;
    return;
  }
  const recoverable = Math.round(active.reduce((sum, [key, amount]) => sum + amount * stationMaterials[key].recovery, 0) / total * 100);
  const priorityKey = active.sort((a, b) => b[1] * (2 - stationMaterials[b[0]].recovery) - a[1] * (2 - stationMaterials[a[0]].recovery))[0][0];
  const priority = stationMaterials[priorityKey];
  document.getElementById("plan-title").textContent = peopleCount === 1 ? "Estación individual" : `Estación para ${peopleCount} personas`;
  document.getElementById("recommended-bins").innerHTML = active.map(([key, amount]) => {
    const material = stationMaterials[key];
    return `<div class="recommended-bin"><i style="--bin-color:${material.color}">${material.icon}</i><strong>${material.name}</strong><span>${containerSize(amount)}</span></div>`;
  }).join("");
  document.getElementById("impact-number").textContent = `${recoverable}%`;
  document.getElementById("impact-ring").style.setProperty("--percentage", recoverable);
  document.getElementById("priority-title").textContent = priority.name;
  document.getElementById("priority-text").textContent = priority.action;
  const highVolume = active.filter(([, amount]) => amount === 3).map(([key]) => stationMaterials[key].name.toLowerCase());
  const collection = highVolume.length ? `vacía ${highVolume.join(" y ")} dos veces por semana` : "revisa los contenedores cada fin de semana";
  document.getElementById("routine-text").textContent = `Limpia y seca los reciclables al usarlos; ${collection}. Una vez al mes, lleva vidrio y residuos especiales a su punto de recolección.`;
  document.getElementById("result-placeholder").hidden = true;
  document.getElementById("result-content").hidden = false;
  document.getElementById("saved-pill").textContent = shouldSave ? "Guardado localmente" : "Último plan guardado";
  if (shouldSave) localStorage.setItem("ecoguia-station", JSON.stringify(plan));
}

document.getElementById("build-station").addEventListener("click", () => {
  const amounts = Object.fromEntries(Object.entries(stationRanges).map(([key, range]) => [key, Number(range.value)]));
  buildStationPlan({ people: peopleCount, amounts });
});
document.getElementById("reset-station").addEventListener("click", () => {
  document.getElementById("result-content").hidden = true;
  document.getElementById("result-placeholder").hidden = false;
  document.getElementById("result-placeholder").innerHTML = `<div class="mini-station"><span></span><span></span><span></span></div><h3>Haz nuevos ajustes</h3><p>Cambia las cantidades y vuelve a generar tu recomendación.</p>`;
});
updateStationControls();
try {
  const savedStation = JSON.parse(localStorage.getItem("ecoguia-station"));
  if (savedStation?.people && savedStation?.amounts) buildStationPlan(savedStation, false);
} catch { localStorage.removeItem("ecoguia-station"); }

const visualWasteRules = [
  { terms: ["cellular telephone", "laptop", "notebook computer", "desktop computer", "computer keyboard", "mouse", "remote control", "monitor", "screen", "radio", "cassette player", "digital clock", "electric fan", "hair dryer", "lighter"], category: "Residuo especial", icon: "⚡", instruction: "Es un aparato o componente que requiere un punto de recolección de electrónicos. No lo mezcles con la basura común." },
  { terms: ["beer bottle", "wine bottle", "pill bottle", "bottlecap", "glass", "vase"], category: "Vidrio", icon: "◇", instruction: "Vacía y enjuaga el envase. Retira la tapa y evita mezclarlo con cerámica, espejos o bombillas." },
  { terms: ["banana", "orange", "lemon", "pineapple", "strawberry", "fig", "pomegranate", "granny smith", "mushroom", "broccoli", "cauliflower", "cucumber", "artichoke", "bell pepper", "corn", "acorn", "guacamole"], category: "Orgánico", icon: "♧", instruction: "Retira etiquetas o empaques. Puedes aprovechar este residuo en una composta doméstica." },
  { terms: ["pop bottle", "water bottle", "plastic bag", "shower cap", "rubber eraser", "bucket", "milk can"], category: "Plástico reciclable", icon: "♳", instruction: "Comprueba que sea plástico aceptado en tu localidad; vacíalo, enjuágalo y déjalo secar antes de separarlo." },
  { terms: ["envelope", "carton", "book jacket", "comic book", "paper towel", "toilet tissue", "menu"], category: "Papel o cartón", icon: "▤", instruction: "Si está limpio y seco, aplánalo y colócalo con papel. Si tiene grasa o residuos sanitarios, va en la basura general." },
  { terms: ["tin can", "oil filter", "chain", "padlock", "nail", "screw", "washer", "metal"], category: "Metal reciclable", icon: "◉", instruction: "Límpialo y sécalo. Protege cualquier borde afilado antes de llevarlo al punto de reciclaje." }
];

let visionModel = null;
let visionModelPromise = null;
let cameraStream = null;
const cameraVideo = document.getElementById("camera-video");
const scanImage = document.getElementById("scan-image");
const captureCanvas = document.getElementById("capture-canvas");
const modelStatus = document.getElementById("model-status");
const scanMessage = document.getElementById("scan-message");

function setScanMessage(message, isError = false) {
  scanMessage.textContent = message;
  scanMessage.classList.toggle("error", isError);
}

async function loadVisionModel() {
  if (visionModel) return visionModel;
  if (visionModelPromise) return visionModelPromise;
  if (typeof tf === "undefined" || typeof mobilenet === "undefined") throw new Error("No se pudo descargar la biblioteca de IA. Revisa tu conexión a internet.");
  modelStatus.textContent = "Cargando modelo...";
  setScanMessage("Preparando la red neuronal. La primera carga puede tardar unos segundos.");
  visionModelPromise = (async () => {
    await tf.ready();
    return mobilenet.load({ version: 2, alpha: .5 });
  })();
  try {
    visionModel = await visionModelPromise;
    modelStatus.textContent = "IA lista";
    setScanMessage("Modelo listo. La fotografía se procesará en este dispositivo.");
    return visionModel;
  } catch (error) {
    visionModelPromise = null;
    modelStatus.textContent = "IA no disponible";
    throw error;
  }
}

function stopCamera() {
  if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
  cameraStream = null;
  cameraVideo.srcObject = null;
}

function showScanSource(type) {
  document.getElementById("camera-placeholder").hidden = true;
  document.getElementById("focus-frame").hidden = type !== "video";
  cameraVideo.hidden = type !== "video";
  scanImage.hidden = type !== "image";
}

async function startCamera() {
  document.getElementById("scan-result").hidden = true;
  if (!navigator.mediaDevices?.getUserMedia) {
    setScanMessage("La cámara requiere abrir el proyecto desde HTTPS o localhost. También puedes elegir una foto.", true);
    return;
  }
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
    cameraVideo.srcObject = cameraStream;
    await cameraVideo.play();
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

function classifyVisualPredictions(predictions) {
  for (const prediction of predictions) {
    const label = prediction.className.toLowerCase();
    const rule = visualWasteRules.find(candidate => candidate.terms.some(term => label.includes(term)));
    if (rule && prediction.probability >= .08) return { ...rule, prediction };
  }
  return { category: "Resultado no concluyente", icon: "?", instruction: "La IA no reconoce este objeto con seguridad. Prueba otra foto con un fondo simple o utiliza EcoIA escribiendo el nombre del residuo.", prediction: predictions[0] };
}

async function analyzeImage(source) {
  const layer = document.getElementById("analyzing-layer");
  layer.hidden = false;
  document.getElementById("scan-result").hidden = true;
  try {
    const model = await loadVisionModel();
    const predictions = await model.classify(source, 5);
    const result = classifyVisualPredictions(predictions);
    const confidence = Math.round((result.prediction?.probability || 0) * 100);
    document.getElementById("scan-result-icon").textContent = result.icon;
    document.getElementById("scan-confidence").textContent = result.category === "Resultado no concluyente" ? "REVISIÓN NECESARIA" : `CONFIANZA ${confidence}%`;
    document.getElementById("scan-category").textContent = result.category;
    document.getElementById("scan-instruction").textContent = result.instruction;
    document.getElementById("scan-detected").textContent = result.prediction ? `El modelo observó: ${result.prediction.className} (${confidence}%)` : "Sin predicciones disponibles";
    document.getElementById("scan-result").hidden = false;
    setScanMessage("Análisis terminado. Confirma siempre el material antes de desecharlo.");
  } catch (error) {
    setScanMessage(error.message || "No se pudo analizar la imagen. Inténtalo nuevamente.", true);
  } finally {
    layer.hidden = true;
  }
}

document.getElementById("start-camera").addEventListener("click", startCamera);
document.getElementById("capture-photo").addEventListener("click", async () => {
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

document.getElementById("image-upload").addEventListener("change", event => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) { setScanMessage("Selecciona un archivo de imagen válido.", true); return; }
  stopCamera();
  const imageUrl = URL.createObjectURL(file);
  scanImage.onload = async () => { URL.revokeObjectURL(imageUrl); showScanSource("image"); await analyzeImage(scanImage); };
  scanImage.onerror = () => { URL.revokeObjectURL(imageUrl); setScanMessage("No se pudo abrir esa imagen.", true); };
  scanImage.src = imageUrl;
  document.getElementById("capture-photo").hidden = true;
  document.getElementById("start-camera").hidden = false;
});

document.getElementById("scan-again").addEventListener("click", () => {
  stopCamera();
  document.getElementById("scan-result").hidden = true;
  document.getElementById("camera-placeholder").hidden = false;
  document.getElementById("focus-frame").hidden = true;
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

function classifyWaste(query) {
  const cleaned = normalize(query); const match = knowledge.find(entry => entry.words.some(word => cleaned.includes(normalize(word)))); addMessage(query, "user-message");
  window.setTimeout(() => {
    if (match) addMessage(`${match.icon} Lo clasificaría como <strong>${match.category}</strong>.<small>${match.instruction} Consulta siempre las reglas de recolección de tu municipio.</small>`, "bot-message result-message");
    else addMessage(`No reconozco ese residuo con suficiente seguridad.<small>Busca el material principal del objeto o consulta con el servicio de recolección de tu localidad. También puedes probar palabras como “papel”, “lata” o “pila”.</small>`, "bot-message result-message");
  }, 320);
}

chatForm.addEventListener("submit", event => { event.preventDefault(); const value = wasteInput.value.trim(); if (!value) return; classifyWaste(value); wasteInput.value = ""; });
document.addEventListener("click", event => { const queryButton = event.target.closest("[data-query]"); if (queryButton) classifyWaste(queryButton.dataset.query); });

const options = ["Orgánico", "Plástico", "Papel", "Vidrio", "Especial"];
let questionIndex = 0, score = 0, answered = false;
function renderQuiz() {
  const question = quiz[questionIndex]; answered = false;
  document.getElementById("quiz-step").textContent = `Pregunta ${questionIndex + 1} de ${quiz.length}`;
  document.getElementById("quiz-progress").style.width = `${((questionIndex + 1) / quiz.length) * 100}%`;
  document.getElementById("quiz-icon").textContent = question.icon; document.getElementById("quiz-item").textContent = question.item; document.getElementById("quiz-feedback").textContent = ""; document.getElementById("next-question").hidden = true;
  document.getElementById("quiz-options").innerHTML = options.map(option => `<button class="quiz-option" type="button" data-answer="${option}">${option}</button>`).join("");
}

document.getElementById("quiz-options").addEventListener("click", event => {
  const button = event.target.closest(".quiz-option"); if (!button || answered) return; answered = true;
  const question = quiz[questionIndex], correct = button.dataset.answer === question.answer; if (correct) score += 1;
  document.querySelectorAll(".quiz-option").forEach(option => { option.disabled = true; if (option.dataset.answer === question.answer) option.classList.add("correct"); });
  if (!correct) button.classList.add("wrong"); document.getElementById("quiz-feedback").textContent = `${correct ? "¡Correcto!" : "Casi."} ${question.note}`;
  const next = document.getElementById("next-question"); next.hidden = false; next.firstChild.textContent = questionIndex === quiz.length - 1 ? "Ver resultado " : "Siguiente ";
});

document.getElementById("next-question").addEventListener("click", () => {
  if (questionIndex < quiz.length - 1) { questionIndex += 1; renderQuiz(); return; }
  const previousBest = Number(localStorage.getItem("ecoguia-best") || 0), best = Math.max(previousBest, score); localStorage.setItem("ecoguia-best", String(best)); updateBest(best);
  const quizCard = document.getElementById("quiz-card"); quizCard.innerHTML = `<div class="quiz-object">${score >= 4 ? "🌱" : "💚"}</div><h3>¡Reto completado!</h3><p>Obtuviste <strong>${score} de ${quiz.length}</strong> respuestas correctas.</p><p class="quiz-feedback">${score === 5 ? "Excelente: ya dominas la separación básica." : "Cada intento mejora tus hábitos. Repasa la guía y vuelve a probar."}</p><button class="button button-primary" id="restart-quiz" type="button">Intentar de nuevo ↻</button>`;
  document.getElementById("restart-quiz").addEventListener("click", () => window.location.reload());
});

function updateBest(best) { document.getElementById("best-score").textContent = best; document.getElementById("best-progress").style.width = `${(best / quiz.length) * 100}%`; }
updateBest(Number(localStorage.getItem("ecoguia-best") || 0)); renderQuiz();

const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }); }, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
const menuButton = document.querySelector(".menu-button"), navLinks = document.getElementById("nav-links");
menuButton.addEventListener("click", () => { const open = navLinks.classList.toggle("open"); menuButton.setAttribute("aria-expanded", String(open)); });
navLinks.addEventListener("click", event => { if (event.target.matches("a")) { navLinks.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); } });
