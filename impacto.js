const IMPACT_STORAGE_KEY = "ecoguia-impact-history";

const IMPACT_FACTORS = Object.freeze({
  co2KgPerKg: 3.119,
  energyKwhPerKg: 4.81,
  paperWaterLitersPerKg: 29.2,
  paperTreesPerKg: 0.0187
});

const MATERIALS = Object.freeze({
  paper: { label: "Papel y cartón", color: "#d6a763", eligible: true },
  plastic: { label: "Plástico", color: "#5b9bb1", eligible: true },
  glass: { label: "Vidrio", color: "#67b89a", eligible: true },
  metal: { label: "Metal", color: "#8a94a0", eligible: true },
  mixed: { label: "Mezcla de reciclables", color: "#91aa51", eligible: true },
  electronics: { label: "Electrónicos", color: "#8c78a8", eligible: false }
});

const impactForm = document.getElementById("impact-form");
const impactMaterial = document.getElementById("impact-material");
const impactKilos = document.getElementById("impact-kilos");
const impactDate = document.getElementById("impact-date");
const impactMonth = document.getElementById("impact-month");
const impactFormStatus = document.getElementById("impact-form-status");
const impactHistoryBody = document.getElementById("impact-history-body");
const impactBreakdown = document.getElementById("impact-breakdown");
const impactInsight = document.getElementById("impact-insight");
const impactClearMonth = document.getElementById("impact-clear-month");

const metricElements = {
  total: document.getElementById("impact-total"),
  co2: document.getElementById("impact-co2"),
  energy: document.getElementById("impact-energy"),
  water: document.getElementById("impact-water"),
  trees: document.getElementById("impact-trees"),
  count: document.getElementById("impact-record-count")
};

function localDateString(date = new Date()) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function monthBefore(monthValue) {
  const [year, month] = monthValue.split("-").map(Number);
  const date = new Date(year, month - 2, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function readHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(IMPACT_STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(item => item && MATERIALS[item.material] && /^\d{4}-\d{2}-\d{2}$/.test(item.date) && Number.isFinite(Number(item.kilos)) && Number(item.kilos) > 0)
      .map(item => ({ id: String(item.id), material: item.material, date: item.date, kilos: Number(item.kilos) }));
  } catch {
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(IMPACT_STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch {
    return false;
  }
}

let impactHistory = readHistory();

function formatNumber(value, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("es-GT", { maximumFractionDigits, minimumFractionDigits: 0 }).format(value);
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Intl.DateTimeFormat("es-GT", { day: "numeric", month: "short", year: "numeric" }).format(new Date(year, month - 1, day));
}

function recordsForMonth(monthValue) {
  return impactHistory.filter(record => record.date.startsWith(monthValue));
}

function calculateMetrics(records) {
  const total = records.reduce((sum, record) => sum + record.kilos, 0);
  const eligible = records.reduce((sum, record) => sum + (MATERIALS[record.material].eligible ? record.kilos : 0), 0);
  const paper = records.reduce((sum, record) => sum + (record.material === "paper" ? record.kilos : 0), 0);
  return {
    total,
    eligible,
    paper,
    co2: eligible * IMPACT_FACTORS.co2KgPerKg,
    energy: eligible * IMPACT_FACTORS.energyKwhPerKg,
    water: paper * IMPACT_FACTORS.paperWaterLitersPerKg,
    trees: paper * IMPACT_FACTORS.paperTreesPerKg
  };
}

function materialTotals(records) {
  return records.reduce((totals, record) => {
    totals[record.material] = (totals[record.material] || 0) + record.kilos;
    return totals;
  }, {});
}

function renderMetrics(metrics, count) {
  metricElements.total.textContent = formatNumber(metrics.total, 2);
  metricElements.co2.textContent = formatNumber(metrics.co2, 1);
  metricElements.energy.textContent = formatNumber(metrics.energy, 1);
  metricElements.water.textContent = formatNumber(metrics.water, 0);
  metricElements.trees.textContent = formatNumber(metrics.trees, metrics.trees < 1 ? 2 : 1);
  metricElements.count.textContent = `${count} ${count === 1 ? "registro" : "registros"}`;
}

function renderInsight(records, metrics, monthValue) {
  const paragraph = impactInsight.querySelector("p");
  if (!records.length) {
    paragraph.textContent = "Agrega tu primer registro para descubrir tu impacto.";
    return;
  }

  const totals = materialTotals(records);
  const topKey = Object.keys(totals).sort((a, b) => totals[b] - totals[a])[0];
  const previousMetrics = calculateMetrics(recordsForMonth(monthBefore(monthValue)));
  let comparison = "Este es tu primer mes con datos para comparar.";
  if (previousMetrics.total > 0) {
    const change = ((metrics.total - previousMetrics.total) / previousMetrics.total) * 100;
    if (Math.abs(change) < 1) comparison = "Registraste prácticamente el mismo peso que el mes anterior.";
    else comparison = `Registraste un ${formatNumber(Math.abs(change), 0)} % ${change > 0 ? "más" : "menos"} que el mes anterior.`;
  }

  const paperNote = metrics.paper > 0
    ? ` El papel y el cartón aportaron una equivalencia de ${formatNumber(metrics.water, 0)} litros de agua y ${formatNumber(metrics.trees, 2)} árboles.`
    : " Registra papel o cartón para estimar también agua y árboles.";
  paragraph.textContent = `${MATERIALS[topKey].label} fue tu material principal con ${formatNumber(totals[topKey], 2)} kg. ${comparison}${paperNote}`;
}

function renderBreakdown(records) {
  impactBreakdown.replaceChildren();
  const totals = materialTotals(records);
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "impact-empty";
    empty.textContent = "Todavía no hay materiales para comparar.";
    impactBreakdown.append(empty);
    return;
  }

  const max = entries[0][1];
  entries.forEach(([key, kilos]) => {
    const row = document.createElement("div");
    row.className = "impact-bar-row";
    const head = document.createElement("div");
    const label = document.createElement("span");
    const value = document.createElement("b");
    label.textContent = MATERIALS[key].label;
    value.textContent = `${formatNumber(kilos, 2)} kg`;
    head.append(label, value);
    const track = document.createElement("div");
    track.className = "impact-bar-track";
    const bar = document.createElement("i");
    bar.style.width = `${Math.max(5, (kilos / max) * 100)}%`;
    bar.style.background = MATERIALS[key].color;
    track.append(bar);
    row.append(head, track);
    impactBreakdown.append(row);
  });
}

function renderHistory(records) {
  impactHistoryBody.replaceChildren();
  if (!records.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.className = "impact-empty-row";
    cell.textContent = "Aún no has registrado materiales en este mes.";
    row.append(cell);
    impactHistoryBody.append(row);
    impactClearMonth.disabled = true;
    return;
  }

  [...records].sort((a, b) => b.date.localeCompare(a.date)).forEach(record => {
    const row = document.createElement("tr");
    const date = document.createElement("td");
    const material = document.createElement("td");
    const weight = document.createElement("td");
    const actions = document.createElement("td");
    const dot = document.createElement("i");
    const remove = document.createElement("button");
    date.textContent = formatDate(record.date);
    dot.style.background = MATERIALS[record.material].color;
    material.append(dot, document.createTextNode(MATERIALS[record.material].label));
    weight.textContent = `${formatNumber(record.kilos, 2)} kg`;
    remove.type = "button";
    remove.className = "impact-remove";
    remove.dataset.id = record.id;
    remove.setAttribute("aria-label", `Eliminar registro de ${MATERIALS[record.material].label}, ${formatNumber(record.kilos, 2)} kg`);
    remove.textContent = "Eliminar";
    actions.append(remove);
    row.append(date, material, weight, actions);
    impactHistoryBody.append(row);
  });
  impactClearMonth.disabled = false;
}

function renderDashboard() {
  const monthValue = impactMonth.value || localDateString().slice(0, 7);
  const records = recordsForMonth(monthValue);
  const metrics = calculateMetrics(records);
  renderMetrics(metrics, records.length);
  renderInsight(records, metrics, monthValue);
  renderBreakdown(records);
  renderHistory(records);
}

impactForm?.addEventListener("submit", event => {
  event.preventDefault();
  const kilos = Number(impactKilos.value);
  const date = impactDate.value;
  const material = impactMaterial.value;
  if (!MATERIALS[material] || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(kilos) || kilos <= 0 || kilos > 10000) {
    impactFormStatus.textContent = "Revisa el material, la fecha y el peso ingresados.";
    return;
  }

  const entry = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, material, kilos, date };
  const nextHistory = [...impactHistory, entry];
  if (!saveHistory(nextHistory)) {
    impactFormStatus.textContent = "El navegador no permitió guardar el registro.";
    return;
  }
  impactHistory = nextHistory;
  impactMonth.value = date.slice(0, 7);
  impactKilos.value = "";
  impactFormStatus.textContent = `${formatNumber(kilos, 2)} kg de ${MATERIALS[material].label.toLowerCase()} se agregaron al historial.`;
  renderDashboard();
});

impactMonth?.addEventListener("change", renderDashboard);

impactHistoryBody?.addEventListener("click", event => {
  const button = event.target.closest(".impact-remove");
  if (!button) return;
  const nextHistory = impactHistory.filter(record => record.id !== button.dataset.id);
  if (!saveHistory(nextHistory)) {
    impactFormStatus.textContent = "No fue posible eliminar el registro.";
    return;
  }
  impactHistory = nextHistory;
  impactFormStatus.textContent = "Registro eliminado.";
  renderDashboard();
});

impactClearMonth?.addEventListener("click", () => {
  const monthValue = impactMonth.value;
  const records = recordsForMonth(monthValue);
  if (!records.length || !window.confirm("¿Quieres borrar todos los registros del mes seleccionado?")) return;
  const nextHistory = impactHistory.filter(record => !record.date.startsWith(monthValue));
  if (!saveHistory(nextHistory)) {
    impactFormStatus.textContent = "No fue posible borrar los registros.";
    return;
  }
  impactHistory = nextHistory;
  impactFormStatus.textContent = "Los registros del mes se borraron.";
  renderDashboard();
});

const today = localDateString();
if (impactDate) {
  impactDate.value = today;
  impactDate.max = today;
}
if (impactMonth) {
  impactMonth.value = today.slice(0, 7);
  impactMonth.max = today.slice(0, 7);
}
const suggestedMaterial = new URLSearchParams(window.location.search).get("material");
if (impactMaterial && MATERIALS[suggestedMaterial]) impactMaterial.value = suggestedMaterial;
renderDashboard();
