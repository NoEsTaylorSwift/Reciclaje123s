const menuButton = document.querySelector(".menu-button");
const navLinks = document.getElementById("nav-links");
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => { const open = navLinks.classList.toggle("open"); menuButton.setAttribute("aria-expanded", String(open)); });
  navLinks.addEventListener("click", event => { if (event.target.closest("a")) { navLinks.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); } });
}
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); } }), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
