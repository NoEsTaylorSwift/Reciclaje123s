const menuButton = document.querySelector(".menu-button");
const navLinks = document.getElementById("nav-links");
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => { const open = navLinks.classList.toggle("open"); menuButton.setAttribute("aria-expanded", String(open)); });
  navLinks.addEventListener("click", event => { if (event.target.closest("a")) { navLinks.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); } });
}
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); } }), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

const ecoGuiaStorageKeys = ["ecoguia-station", "ecoguia-best", "eco-points", "eco-rewards", "ecoguia-impact-history"];
const localDataSummary = document.getElementById("local-data-summary");
const clearLocalDataButton = document.getElementById("clear-local-data");
const dataStatus = document.getElementById("data-status");

function storedEcoGuiaItemCount() {
  try {
    return ecoGuiaStorageKeys.filter(key => localStorage.getItem(key) !== null).length;
  } catch {
    return null;
  }
}

function renderLocalDataSummary() {
  if (!localDataSummary) return;
  const count = storedEcoGuiaItemCount();
  if (count === null) {
    localDataSummary.textContent = "Este navegador no permite consultar el almacenamiento local.";
    if (clearLocalDataButton) clearLocalDataButton.disabled = true;
    return;
  }
  localDataSummary.textContent = count
    ? `EcoGuía tiene ${count} ${count === 1 ? "elemento guardado" : "elementos guardados"} en este navegador.`
    : "EcoGuía no tiene progreso guardado en este navegador.";
  if (clearLocalDataButton) clearLocalDataButton.disabled = count === 0;
}

clearLocalDataButton?.addEventListener("click", () => {
  try {
    ecoGuiaStorageKeys.forEach(key => localStorage.removeItem(key));
    if (dataStatus) dataStatus.textContent = "El progreso local de EcoGuía se borró correctamente.";
  } catch {
    if (dataStatus) dataStatus.textContent = "El navegador no permitió borrar los datos. Revisa su configuración de privacidad.";
  }
  renderLocalDataSummary();
});

renderLocalDataSummary();
