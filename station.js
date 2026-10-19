/* Estación doméstica: libras en pantalla, factores ambientales por kilogramo. */
(() => {
'use strict';
if (!document.getElementById('station-result')) return;
const ecoStorage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); return true; } catch { return false; } }
};
const stationMaterials = {
  organic: { name: "Orgánico", color: "#4b9d61", icon: "♧", recovery: .9, action: "Separar los restos de cocina puede reducir rápidamente la basura general. Empieza una composta o define una entrega frecuente." },
  plastic: { name: "Plástico", color: "#529eb4", icon: "♳", recovery: .65, action: "Prioriza envases limpios y secos. Reduce primero los empaques de un solo uso y compacta las botellas." },
  paper: { name: "Papel", color: "#c69258", icon: "▤", recovery: .8, action: "Mantén papel y cartón secos. Dobla las cajas para que tu estación ocupe menos espacio." },
  glass: { name: "Vidrio", color: "#7769a9", icon: "◇", recovery: .95, action: "Reserva un contenedor firme. Retira tapas y lleva los envases juntos para reducir viajes." }
};
const STATION_KG_PER_POUND = 0.45359237;
const stationBinInstructions = { organic: 'Restos de cocina, separados de empaques.', plastic: 'Envases vacíos, limpios y secos.', paper: 'Papel seco y cartón sin grasa.', glass: 'Botellas y frascos; sin cerámica ni espejos.' };
const stationReductionTips = {
  organic: { title: "Aprovecha lo que ya tienes", text: "Planea las comidas con lo que hay en casa, sirve porciones pequeñas y congela los sobrantes. Separa las cáscaras para composta si tienes un sistema adecuado." },
  plastic: { title: "Cambia un desechable por algo que dure", text: "Lleva una botella y una bolsa reutilizables. Elige recargas o productos con menos empaque y separa los envases que acepte tu recolector." },
  paper: { title: "Dale más usos al papel", text: "Usa las hojas por ambos lados, evita impresiones innecesarias y reutiliza cajas. Guarda seco y sin grasa el papel que vas a reciclar." },
  glass: { title: "Haz que el envase vuelva a usarse", text: "Prefiere botellas retornables y reutiliza frascos en buen estado. Separa los envases de vidrio; espejos y cerámica requieren otro manejo." }
};
let peopleCount = 3;
const stationRanges = Object.fromEntries(Object.keys(stationMaterials).map(key => [key, document.getElementById(key + '-range')]));
function updateStationControls() {
  const peopleValue = document.getElementById('people-value');
  if (!peopleValue) return;
  peopleValue.textContent = peopleCount;
  Object.entries(stationRanges).forEach(([key, field]) => {
    document.getElementById(key + '-output').textContent = 'lb / semana';
  });
}
function buildStationPlan(plan, shouldSave = true) {
  peopleCount = plan.people;
  updateStationControls();
  const active = Object.entries(plan.amounts).filter(([, kilos]) => kilos > 0).sort((a, b) => b[1] - a[1]);
  const rawMetrics = window.ecoImpact.calculateMetrics(active.map(([material, pounds]) => ({ material, kilos: pounds * STATION_KG_PER_POUND })));
  const metrics = { ...rawMetrics, total: active.reduce((sum, [, pounds]) => sum + pounds, 0), co2: rawMetrics.co2 / STATION_KG_PER_POUND };
  const fmt = window.ecoImpact.formatNumber;
  for (const key of ['total', 'co2', 'energy', 'water', 'trees']) {
    document.getElementById('station-' + key).textContent = fmt(metrics[key], key === 'trees' ? 3 : 2);
  }
  document.getElementById('station-projection-note').textContent = 'Ahorro potencial semanal si reciclas el plástico, papel y vidrio indicados, frente a enviarlos al vertedero. Los orgánicos se incluyen en el peso, pero no tienen equivalencias asignadas. * Agua y árboles solo para papel y cartón. Son equivalencias educativas de ahorro potencial.';
  document.getElementById('plan-title').textContent = peopleCount === 1 ? 'Tu estación personal' : 'Una estación para ' + peopleCount + ' personas';
  document.getElementById('station-overview').textContent = metrics.total ? fmt(metrics.total, 2) + ' lb por semana · ' + active.length + ' materiales para separar en casa.' : 'Estos son tus cuatro espacios de separación. Añade las cantidades para adaptar tu estación.';
  document.getElementById('station-footprint-total').textContent = fmt(metrics.total, 2) + ' lb por semana';
  document.getElementById('station-footprint-detail').textContent = metrics.total
    ? fmt(metrics.total / peopleCount, 2) + ' lb por persona a la semana. Si mantienes este ritmo durante 52 semanas, serían ' + fmt(metrics.total * 52, 1) + ' lb al año en tu hogar.'
    : 'Empieza con un material. Al escribir las libras verás tu resumen y consejos para reducirlos.';
  document.getElementById('station-material-shares').innerHTML = active.map(([key, kilos]) => '<div><span>' + stationMaterials[key].name + '</span><strong>' + fmt(kilos, 2) + ' lb · ' + fmt(kilos / metrics.total * 100, 1) + '%</strong><div class="station-share-track"><span style="width:' + (kilos / metrics.total * 100) + '%;background:' + stationMaterials[key].color + '"></span></div></div>').join('');
  document.getElementById('station-reduction-goal').textContent = metrics.total
    ? 'Tu material más abundante es ' + stationMaterials[active[0][0]].name.toLowerCase() + '. Como reto inicial, intenta generar un 20% menos en total: ' + fmt(metrics.total * .8, 2) + ' lb la próxima semana (' + fmt(metrics.total * .2, 2) + ' lb menos). Es una meta sugerida; ajústala a tu hogar.'
    : 'Pesa lo que desechas durante una semana. Esa será tu referencia para elegir un cambio pequeño y comparar después.';
  document.getElementById('station-advice-list').innerHTML = active.map(([key, kilos], index) => '<article><span class="station-advice-icon" aria-hidden="true">' + stationMaterials[key].icon + '</span><div><span class="station-advice-material">' + (index === 0 ? 'EMPIEZA AQUÍ · ' : '') + stationMaterials[key].name + ' · ' + fmt(kilos, 2) + ' lb/semana</span><h5>' + stationReductionTips[key].title + '</h5><p>' + stationReductionTips[key].text + '</p></div></article>').join('');
  document.getElementById('recommended-bins').innerHTML = Object.entries(stationMaterials).map(([key, material]) => {
    const pounds = plan.amounts[key];
    return '<article class="recommended-bin' + (pounds ? '' : ' station-bin-inactive') + '"><div class="station-bin-illustration" style="--bin-color:' + material.color + '"><span aria-hidden="true">' + material.icon + '</span></div><strong>' + material.name + '</strong><span>' + fmt(pounds, 2) + ' lb / semana</span><b>' + (pounds ? 'Separación activa' : 'Listo cuando lo necesites') + '</b><small>' + stationBinInstructions[key] + '</small></article>';
  }).join('');
  document.getElementById('routine-text').textContent = active.length ? 'Separa los materiales al usarlos. Revisa los contenedores al final de la semana y acuerda una entrega con tu recolector. Los orgánicos necesitan atención más frecuente para evitar olores.' : 'Añade tus cantidades para adaptar la organización a tu hogar.';
  document.getElementById('result-placeholder').hidden = true;
  document.getElementById('result-content').hidden = false;
  const saved = shouldSave ? ecoStorage.set('ecoguia-station', JSON.stringify(plan)) : true;
  document.getElementById('saved-pill').textContent = shouldSave ? (saved ? 'Actualizado y guardado' : 'Actualizado · sin guardar') : 'Tu último resumen';
}
function generateStationFromInputs() {
  const invalid = Object.values(stationRanges).find(field => !field.checkValidity());
  const error = document.getElementById('station-input-error');
  error.textContent = invalid ? 'Escribe libras entre 0 y 100,000, con hasta dos decimales. El resumen se actualizará cuando corrijas la cantidad.' : '';
  Object.values(stationRanges).forEach(field => field.setAttribute('aria-invalid', String(!field.checkValidity())));
  if (invalid) {
    document.getElementById('result-content').hidden = true;
    document.getElementById('result-placeholder').hidden = false;
    document.getElementById('result-placeholder').innerHTML = '<h3>Revisa la cantidad</h3><p>Usa un número desde cero, con hasta dos decimales, para ver el impacto actualizado.</p>';
    return;
  }
  const amounts = Object.fromEntries(Object.entries(stationRanges).map(([key, field]) => [key, Number(field.value || 0)]));
  buildStationPlan({ version: 3, unit: 'lb', people: peopleCount, amounts });
}
function setStationImpactOpen(open) {
  const disclosure = document.getElementById('station-impact-disclosure');
  if (disclosure) disclosure.open = open;
}
document.getElementById('station-impact-disclosure')?.addEventListener('toggle', () => {
  const open = document.getElementById('station-impact-disclosure').open;
  document.getElementById('station-impact-toggle-label').textContent = open ? 'Ocultar impacto y consejos' : 'Ver mi impacto y cómo mejorar';
  document.getElementById('station-impact-toggle-icon').textContent = open ? '−' : '+';
});
function openStationImpactFromHash() {
  if (window.location.hash !== '#consejos' || !document.getElementById('station-impact-panel')) return;
  setStationImpactOpen(true);
  document.getElementById('consejos').scrollIntoView({ block: 'start' });
}
if (document.getElementById('station-impact-panel')) {
  window.addEventListener('hashchange', openStationImpactFromHash);
}
document.getElementById('people-minus')?.addEventListener('click', () => { peopleCount = Math.max(1, peopleCount - 1); generateStationFromInputs(); });
document.getElementById('people-plus')?.addEventListener('click', () => { peopleCount = Math.min(8, peopleCount + 1); generateStationFromInputs(); });
Object.values(stationRanges).filter(Boolean).forEach(field => field.addEventListener('input', generateStationFromInputs));
document.getElementById('reset-station')?.addEventListener('click', () => {
  setStationImpactOpen(false);
  Object.values(stationRanges).forEach(field => { field.value = 0; });
  generateStationFromInputs();
});
function isValidStationPlan(plan) {
  return Boolean(plan && plan.version === 3 && plan.unit === 'lb' && Number.isInteger(plan.people) && plan.people >= 1 && plan.people <= 8 && plan.amounts && Object.keys(stationMaterials).every(key => Number.isFinite(plan.amounts[key]) && plan.amounts[key] >= 0 && plan.amounts[key] <= 100000 && Math.abs(plan.amounts[key] * 100 - Math.round(plan.amounts[key] * 100)) < 1e-6));
}
if (document.getElementById('station-result')) {
  let restored = false;
  try {
    let saved = JSON.parse(ecoStorage.get('ecoguia-station'));
    if (saved?.version === 2 && saved.amounts) {
      const converted = Object.fromEntries(Object.entries(saved.amounts).map(([key, value]) => [key, Math.round(value / STATION_KG_PER_POUND * 100) / 100]));
      saved = { ...saved, version: 3, unit: 'lb', amounts: converted };
      if (isValidStationPlan(saved)) ecoStorage.set('ecoguia-station', JSON.stringify(saved));
    }
    if (isValidStationPlan(saved)) {
      Object.entries(saved.amounts).forEach(([key, value]) => { stationRanges[key].value = value; });
      buildStationPlan(saved, false);
      restored = true;
    }
  } catch { /* Los controles siguen disponibles sin datos guardados. */ }
  if (!restored) generateStationFromInputs();
  openStationImpactFromHash();
}


})();
