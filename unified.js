const intakeButtons = [...document.querySelectorAll("[data-intake-mode]")];
const intakePanels = [...document.querySelectorAll("[data-input-panel]")];
const outcome = document.getElementById("respuesta");
const ideasSection = document.getElementById("reutilizar");
const impactSection = document.getElementById("medir");
const flowImpactForm = document.getElementById("flow-impact-form");
let activeImpactMaterial = null;
let pendingIdea = null;
let activeOutcome = null;

const materialByCategory = {
  "Plástico reciclable": "plastic",
  Vidrio: "glass",
  "Papel y cartón": "paper",
  "Metal reciclable": "metal",
  "Tela o ropa": "textile",
  "Madera reutilizable": "wood",
  "Mueble reutilizable": "furniture"
};

const impactMaterialByCategory = {
  ...materialByCategory,
  Orgánico: "organic",
  "Orgánico o general": "organic",
  "Residuo especial": "electronics",
  "No reciclable": "general"
};

const stationGuidance = {
  paper: { icon: "▤", title: "Contenedor seco para papel y cartón", instruction: "Aplánalo y mantenlo limpio y seco. Separa cinta, plástico y las partes con grasa." },
  plastic: { icon: "♳", title: "Contenedor para plásticos aceptados", instruction: "Vacía, enjuaga y seca. Confirma que el tipo de plástico sea recibido por tu recolector local." },
  glass: { icon: "◇", title: "Caja rígida para vidrio", instruction: "Guárdalo limpio y sin tapas. No mezcles cerámica, espejos ni vidrio roto sin protección." },
  metal: { icon: "◉", title: "Contenedor para metales", instruction: "Enjuaga, seca y protege los bordes afilados. Compacta las latas solo cuando sea seguro." },
  organic: { icon: "♧", title: "Recipiente para orgánicos o composta", instruction: "Retira empaques y mantenlo separado. Usa composta solo si el residuo y tu sistema lo permiten." },
  textile: { icon: "♢", title: "Área seca para textiles", instruction: "Límpialo y mantenlo seco. Prioriza reparación, donación o un punto de recolección textil." },
  wood: { icon: "▦", title: "Área seca para madera", instruction: "Sepárala de la lluvia y revisa moho, plagas, clavos y tratamientos antes de reutilizarla." },
  furniture: { icon: "▰", title: "Zona de recuperación de muebles", instruction: "No lo mezcles con residuos pequeños. Conserva las piezas secas para reparar, donar o entregar." },
  electronics: { icon: "⚡", title: "Caja para residuos especiales", instruction: "Guárdalo seco, sin abrir ni aplastar, y entrégalo completo en un punto autorizado." },
  general: { icon: "×", title: "Contenedor de basura general", instruction: "Aísla objetos sanitarios o con filo y sigue las reglas locales. No lo mezcles con reciclables limpios." }
};

const manualOutcomeMaterials = {
  plastic: { category: "Plástico reciclable", icon: "♳", instruction: "Vacía, enjuaga y seca el objeto. Confirma que ese tipo de plástico sea aceptado en tu localidad." },
  glass: { category: "Vidrio", icon: "◇", instruction: "Vacía y enjuaga. Retira tapas y no lo mezcles con cerámica, espejos o cristal templado." },
  paper: { category: "Papel y cartón", icon: "▤", instruction: "Debe estar limpio y seco. Aplánalo y retira partes plásticas, metálicas o con grasa." },
  metal: { category: "Metal reciclable", icon: "◉", instruction: "Límpialo, sécalo y protege cualquier borde afilado antes de entregarlo." },
  organic: { category: "Orgánico", icon: "♧", instruction: "Retira empaques. Si tu sistema lo acepta, sepáralo para composta." },
  textile: { category: "Tela o ropa", icon: "♢", instruction: "Si está limpio y seco, repáralo, dónalo o llévalo a una recolección textil." },
  electronics: { category: "Residuo especial", icon: "⚡", instruction: "Guárdalo seco y sin abrir. Llévalo completo a un punto autorizado." },
  general: { category: "Revisión manual", icon: "?", instruction: "El material no coincide con una categoría segura. Consulta las reglas locales antes de desecharlo." }
};

function selectIntakeMode(mode, { focus = false, updateHash = true } = {}) {
  const selected = intakeButtons.find(button => button.dataset.intakeMode === mode) || intakeButtons[0];
  intakeButtons.forEach(button => {
    const active = button === selected;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  intakePanels.forEach(panel => { panel.hidden = panel.dataset.inputPanel !== selected.dataset.intakeMode; });
  if (updateHash) history.replaceState(null, "", selected.dataset.intakeMode === "photo" ? "#foto" : "#consulta");
  if (focus) selected.focus();
}

intakeButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectIntakeMode(button.dataset.intakeMode));
  button.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = intakeButtons[(index + direction + intakeButtons.length) % intakeButtons.length];
    selectIntakeMode(next.dataset.intakeMode, { focus: true });
  });
});

function setFlowProgress(step) {
  document.querySelectorAll("[data-flow-step]").forEach(item => {
    const itemStep = Number(item.dataset.flowStep);
    item.classList.toggle("complete", itemStep < step);
    item.classList.toggle("current", itemStep === step);
  });
}

function resetResultDrawers() {
  ideasSection.hidden = true;
  impactSection.hidden = true;
  document.querySelector(".idea-customize")?.removeAttribute("open");
}

function stageDirectIdea(project, context) {
  pendingIdea = { type: "direct", project, context };
  return true;
}

function prepareIdeas(item, category) {
  const material = materialByCategory[category];
  const itemField = document.getElementById("upcycle-item");
  const materialField = document.getElementById("upcycle-material");
  if (material) {
    itemField.value = item || `objeto de ${category.toLowerCase()}`;
    materialField.value = material;
    pendingIdea = { type: "library", context: `Usaremos el material “${category}” para preparar una idea. Puedes personalizarla después de abrirla.` };
    return true;
  }

  if (category.startsWith("Orgánico")) {
    return stageDirectIdea({
      icon: "♧", label: "IDEA RECOMENDADA", title: "Composta doméstica", material: "Residuo orgánico", level: "Fácil", time: "5 min + proceso", blocked: true,
      summary: "Convierte restos vegetales en abono y evita que terminen mezclados con la basura general.",
      materials: ["Recipiente ventilado", "Material seco como hojas o cartón sin tinta", "Restos vegetales en trozos pequeños"],
      steps: ["Retira etiquetas, bolsas y cualquier parte no orgánica.", "Alterna una capa de restos húmedos con otra de material seco.", "Mantén la mezcla ligeramente húmeda y muévela cada semana.", "Cuando tenga color oscuro y olor a tierra, úsala como mejorador de suelo."],
      safety: "No agregues químicos, aceite, vidrio, plástico, heces de mascotas ni alimentos que tu sistema de composta no acepte."
    }, "Este residuo no necesita convertirse en un objeto: su mejor segunda vida puede ser volver a la tierra.");
  }

  if (category === "Residuo especial") {
    return stageDirectIdea({
      icon: "⚡", label: "ACCIÓN SEGURA", title: "Reparar, donar o entregar", material: "Residuo especial", level: "Sin desmontar", time: "Según el punto local", blocked: true,
      summary: "Los aparatos y baterías pueden contener componentes peligrosos. La mejor opción es prolongar su uso o entregarlos completos a un gestor autorizado.",
      materials: ["Caja o recipiente seco", "Etiqueta para identificar el aparato", "Dirección de un punto autorizado"],
      steps: ["Si funciona, considera repararlo, venderlo o donarlo.", "Borra tus datos personales cuando corresponda.", "Retira las pilas solo si el fabricante permite hacerlo con seguridad.", "Entrégalo completo en una jornada o centro de residuos electrónicos."],
      safety: "No abras baterías, pantallas ni aparatos conectados. Evita piezas expuestas y consulta un servicio profesional."
    }, "Por seguridad no generamos una manualidad con electrónicos, pilas o residuos especiales.");
  }

  if (category === "No reciclable") {
    return stageDirectIdea({
      icon: "×", label: "ALTERNATIVA RESPONSABLE", title: "Reducir y reemplazar", material: "No reciclable", level: "Preventiva", time: "Próxima compra", blocked: true,
      summary: "Cuando un residuo no puede reciclarse ni reutilizarse de forma higiénica, la acción con mayor impacto es evitar que vuelva a generarse.",
      materials: ["Una alternativa durable o recargable", "Lista de compras", "Contenedor de basura general"],
      steps: ["Deposita este residuo siguiendo las reglas locales.", "Identifica por qué se generó y si existe una versión reutilizable.", "En tu próxima compra, elige una opción con menos empaque o de mayor duración.", "Registra el cambio para convertirlo en un hábito."],
      safety: "No conviertas residuos sanitarios, contaminados o con filos en objetos para el hogar."
    }, "No encontramos una reutilización segura; por eso la recomendación se enfoca en reducir su uso.");
  }

  pendingIdea = null;
  return false;
}

function prepareImpact(category) {
  const material = impactMaterialByCategory[category];
  const guidance = stationGuidance[material];
  if (!material || !guidance || !window.ecoImpact?.materials[material]) {
    activeImpactMaterial = null;
    return false;
  }

  activeImpactMaterial = material;
  document.getElementById("flow-station-icon").textContent = guidance.icon;
  document.getElementById("flow-station-title").textContent = guidance.title;
  document.getElementById("flow-station-instruction").textContent = guidance.instruction;
  document.getElementById("flow-impact-material-label").textContent = window.ecoImpact.materials[material].label.toUpperCase();
  document.getElementById("flow-impact-result").hidden = true;
  document.getElementById("flow-impact-status").textContent = "";

  const limit = document.getElementById("flow-impact-limit");
  if (material === "paper") {
    limit.textContent = "* Para papel y cartón se estiman CO₂e, energía, agua y árboles con factores educativos promedio.";
  } else if (window.ecoImpact.materials[material].eligible) {
    limit.textContent = "Se estiman CO₂e y energía con factores educativos promedio. Agua y árboles se muestran solo para papel y cartón.";
  } else {
    limit.textContent = "Este material se sumará al peso y al historial. No le asignamos equivalencias ambientales sin un factor confiable para su tratamiento.";
  }
  return true;
}

function showOutcome({ item, category, instruction, icon = "✦", confidence = null, source }) {
  activeOutcome = { item, category, source };
  resetResultDrawers();
  document.getElementById("outcome-icon").textContent = icon;
  document.getElementById("outcome-source").textContent = source === "photo" ? "RESULTADO DE LA FOTOGRAFÍA" : "RESPUESTA DEL ASISTENTE";
  document.getElementById("outcome-category").textContent = category || "Resultado no concluyente";
  document.getElementById("outcome-instruction").textContent = instruction || "Necesito más información para darte una recomendación segura.";
  const confidenceElement = document.getElementById("outcome-confidence");
  confidenceElement.hidden = !(Number.isFinite(confidence) && confidence >= 0);
  if (!confidenceElement.hidden) confidenceElement.textContent = `Confianza visual: ${Math.round(confidence * 100)} %`;

  const materialCheck = document.getElementById("outcome-material-check");
  const needsMaterial = category === "Material por confirmar" || category === "Resultado no concluyente";
  materialCheck.hidden = !needsMaterial;

  const impactLink = document.getElementById("outcome-impact-link");
  const hasImpact = !needsMaterial && prepareImpact(category || "");
  impactLink.hidden = !hasImpact;

  const hasIdea = !needsMaterial && prepareIdeas(item, category || "");
  const ideaLink = document.getElementById("outcome-ideas-link");
  ideaLink.hidden = !hasIdea;
  outcome.hidden = false;
  setFlowProgress(2);
  window.setTimeout(() => outcome.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
}

window.addEventListener("ecoguia:scan-result", event => {
  const result = event.detail;
  showOutcome({
    item: `objeto de ${(result.category || "material").toLowerCase()}`,
    category: result.category,
    instruction: result.instruction,
    icon: result.icon,
    confidence: result.confidence,
    source: "photo"
  });
});

window.addEventListener("ecoguia:text-result", event => {
  const match = event.detail.match;
  showOutcome({
    item: event.detail.query,
    category: match?.category || "Resultado no concluyente",
    instruction: match?.instruction || "No reconozco ese residuo con suficiente seguridad. Describe su material principal o prueba con otra palabra.",
    icon: match?.icon || "?",
    source: "text"
  });
});

document.getElementById("outcome-ideas-link")?.addEventListener("click", event => {
  event.preventDefault();
  if (!pendingIdea) return;
  impactSection.hidden = true;
  ideasSection.hidden = false;
  document.getElementById("ideas-context").textContent = pendingIdea.context;
  if (pendingIdea.type === "direct") window.ecoRenderProject?.(pendingIdea.project);
  else window.ecoGenerateProject?.();
  setFlowProgress(3);
  window.setTimeout(() => ideasSection.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
});

document.getElementById("outcome-impact-link")?.addEventListener("click", event => {
  event.preventDefault();
  ideasSection.hidden = true;
  impactSection.hidden = false;
  setFlowProgress(4);
  impactSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector(".ideas-next-action button")?.addEventListener("click", event => {
  event.preventDefault();
  ideasSection.hidden = true;
  impactSection.hidden = false;
  setFlowProgress(4);
  impactSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("outcome-material-check")?.addEventListener("click", event => {
  const button = event.target.closest("[data-outcome-material]");
  const result = manualOutcomeMaterials[button?.dataset.outcomeMaterial];
  if (!result || !activeOutcome) return;
  showOutcome({ item: activeOutcome.item, category: result.category, instruction: result.instruction, icon: result.icon, source: activeOutcome.source });
});

document.getElementById("recipe-reset")?.addEventListener("click", () => {
  ideasSection.hidden = true;
  if (activeOutcome) prepareIdeas(activeOutcome.item, activeOutcome.category || "");
  setFlowProgress(2);
  outcome.scrollIntoView({ behavior: "smooth", block: "start" });
});

flowImpactForm?.addEventListener("submit", event => {
  event.preventDefault();
  const impactApi = window.ecoImpact;
  const kilosField = document.getElementById("flow-impact-kilos");
  const dateField = document.getElementById("flow-impact-date");
  const status = document.getElementById("flow-impact-status");
  const kilos = Number(kilosField.value);
  const date = dateField.value;

  if (!impactApi || !impactApi.materials[activeImpactMaterial] || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(kilos) || kilos <= 0 || kilos > 10000) {
    status.textContent = "Revisa el peso y la fecha antes de guardar.";
    return;
  }

  const entry = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, material: activeImpactMaterial, kilos, date };
  const nextHistory = [...impactApi.readHistory(), entry];
  if (!impactApi.saveHistory(nextHistory)) {
    status.textContent = "El navegador no permitió guardar el registro.";
    return;
  }

  const metrics = impactApi.calculateMetrics([entry]);
  const monthMetrics = impactApi.calculateMetrics(nextHistory.filter(record => record.date.startsWith(date.slice(0, 7))));
  const material = impactApi.materials[activeImpactMaterial];
  const eligible = material.eligible;
  const isPaper = activeImpactMaterial === "paper";
  document.getElementById("flow-impact-total").textContent = impactApi.formatNumber(metrics.total, 2);
  document.getElementById("flow-impact-co2").textContent = eligible ? impactApi.formatNumber(metrics.co2, 1) : "—";
  document.getElementById("flow-impact-energy").textContent = eligible ? impactApi.formatNumber(metrics.energy, 1) : "—";
  document.getElementById("flow-impact-water").textContent = isPaper ? impactApi.formatNumber(metrics.water, 0) : "—";
  document.getElementById("flow-impact-trees").textContent = isPaper ? impactApi.formatNumber(metrics.trees, metrics.trees < 1 ? 2 : 1) : "—";
  document.getElementById("flow-impact-month-total").textContent = `${impactApi.formatNumber(monthMetrics.total, 2)} kg`;
  document.getElementById("flow-impact-result").hidden = false;
  status.textContent = `${impactApi.formatNumber(kilos, 2)} kg de ${material.label.toLowerCase()} se guardaron en tu estación.`;
  kilosField.value = "";
  setFlowProgress(4);
});

const hash = location.hash.slice(1);
selectIntakeMode(hash === "foto" ? "photo" : "text", { updateHash: false });
setFlowProgress(1);
const impactToday = window.ecoImpact?.localDateString();
const flowImpactDate = document.getElementById("flow-impact-date");
if (impactToday && flowImpactDate) {
  flowImpactDate.value = impactToday;
  flowImpactDate.max = impactToday;
}
if (hash === "reutilizar") {
  window.setTimeout(() => document.getElementById("waste-input")?.focus(), 0);
}
