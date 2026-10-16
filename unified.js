const unifiedTabs = [...document.querySelectorAll("[data-tool-tab]")];
const unifiedPanels = [...document.querySelectorAll("[data-tool-panel]")];
const materialByCategory = {
  "Plástico reciclable": "plastic",
  Vidrio: "glass",
  "Papel y cartón": "paper",
  "Metal reciclable": "metal"
};

let latestScan = null;
let latestQuestion = null;

function openToolPanel(panelName, { focus = false, updateHash = true } = {}) {
  const selectedTab = unifiedTabs.find(tab => tab.dataset.toolTab === panelName) || unifiedTabs[0];
  unifiedTabs.forEach(tab => {
    const active = tab === selectedTab;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  unifiedPanels.forEach(panel => { panel.hidden = panel.dataset.toolPanel !== selectedTab.dataset.toolTab; });
  if (updateHash) history.replaceState(null, "", `#${selectedTab.dataset.toolTab}`);
  if (focus) selectedTab.focus();
}

unifiedTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => openToolPanel(tab.dataset.toolTab));
  tab.addEventListener("keydown", event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = unifiedTabs[(index + direction + unifiedTabs.length) % unifiedTabs.length];
    openToolPanel(next.dataset.toolTab, { focus: true });
  });
});

document.querySelectorAll("[data-open-panel]").forEach(link => link.addEventListener("click", event => {
  event.preventDefault();
  openToolPanel(link.dataset.openPanel);
  document.getElementById("herramienta")?.scrollIntoView({ behavior: "smooth", block: "start" });
}));

function fillUpcycle(item, material) {
  const itemField = document.getElementById("upcycle-item");
  const materialField = document.getElementById("upcycle-material");
  if (itemField) itemField.value = item;
  if (materialField && material) materialField.value = material;
  const status = document.getElementById("upcycle-photo-status");
  if (status) status.textContent = "Información transferida. Confirma el estado y el propósito antes de generar el proyecto.";
  openToolPanel("reutilizar");
  document.getElementById("herramienta")?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => itemField?.focus(), 450);
}

function updateNextAction(prefix, context) {
  const button = document.getElementById(`${prefix}-to-create`);
  const note = document.getElementById(`${prefix}-next-note`);
  const material = materialByCategory[context?.category];
  if (button) button.hidden = !material;
  if (!note) return;
  if (material) note.textContent = "También puede tener una segunda vida. Puedes convertirlo en un proyecto paso a paso.";
  else if (context?.category?.startsWith("Orgánico")) note.textContent = "Su mejor segunda vida puede ser la composta; sigue la preparación indicada antes de mezclarlo.";
  else if (context?.category === "Residuo especial") note.textContent = "Por seguridad, no se recomienda desmontarlo. Entrégalo en un punto autorizado.";
  else if (context?.category === "No reciclable") note.textContent = "No hay una reutilización segura sugerida. Reduce su uso y sigue la indicación de descarte.";
  else note.textContent = "Si el resultado no es claro, confirma el material antes de reutilizar o desechar.";
}

window.addEventListener("ecoguia:scan-result", event => {
  latestScan = event.detail;
  updateNextAction("scan", latestScan);
});

window.addEventListener("ecoguia:text-result", event => {
  latestQuestion = { query: event.detail.query, category: event.detail.match?.category || "" };
  const actions = document.getElementById("ask-actions");
  if (actions) actions.hidden = false;
  updateNextAction("ask", latestQuestion);
});

document.getElementById("scan-to-create")?.addEventListener("click", () => {
  const material = materialByCategory[latestScan?.category];
  if (material) fillUpcycle(`Objeto de ${latestScan.category.toLowerCase()}`, material);
});

document.getElementById("ask-to-create")?.addEventListener("click", () => {
  const material = materialByCategory[latestQuestion?.category];
  if (material) fillUpcycle(latestQuestion.query, material);
});

const initialPanel = ["foto", "consulta", "reutilizar"].includes(location.hash.slice(1)) ? location.hash.slice(1) : "foto";
openToolPanel(initialPanel, { updateHash: false });
