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
