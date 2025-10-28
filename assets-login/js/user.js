// ---------- Utilidades de vista ----------
const homeSections = () => ([
  document.querySelector(".welcome"),
  document.querySelector(".cards-grid")
]);

const formSections = () => document.querySelectorAll(".form-section");

function hideAllForms() {
  formSections().forEach(s => s.classList.add("hidden"));
}

function showHome() {
  hideAllForms();
  homeSections().forEach(s => s && s.classList.remove("hidden"));
}

function showForm(id) {
  homeSections().forEach(s => s && s.classList.add("hidden"));
  hideAllForms();
  const el = document.getElementById(id);
  if (el) el.classList.remove("hidden");
}

function setActiveLink(link) {
  document.querySelectorAll(".navbar nav a").forEach(a => a.classList.remove("active"));
  link.classList.add("active");
}

// ---------- Nav funcional (sin tocar estilos) ----------
document.addEventListener("DOMContentLoaded", () => {
  // Clicks del menú superior
  document.querySelectorAll(".navbar nav a").forEach(a => {
    a.addEventListener("click", (e) => {
      const target = a.getAttribute("data-section");
      const isLogout = a.id === "logoutLink";
      if (!target && !isLogout) return; // deja funcionar enlaces sin destino
      e.preventDefault();

      if (isLogout) {
        // Aquí puedes redirigir a tu login real si quieres
        alert("Sesión cerrada");
        return;
      }

      setActiveLink(a);
      if (target === "inicio") showHome();
      else showForm(target);
    });
  });

  // Arrancar en Inicio
  showHome();
});

// ---------- Botones de las cards (reutilizan la misma lógica) ----------
function toggleForm(id) {
  showForm(id);
  const link = document.querySelector(`.navbar nav a[data-section="${id}"]`);
  if (link) setActiveLink(link);
}

// ---------- Acciones de formularios ----------
function guardarPerfil(e) {
  e.preventDefault();
  const nombre = document.getElementById("inputNombre").value;
  const email = document.getElementById("inputEmail").value;
  document.getElementById("perfilNombre").textContent = nombre;
  document.getElementById("perfilEmail").textContent = email;
  alert("Perfil actualizado ✅");
}

function guardarDireccion(e) {
  e.preventDefault();
  const dir = document.getElementById("inputDireccion").value;
  document.getElementById("direccionPrincipal").textContent = dir;
  alert("Dirección guardada ✅");
}

function guardarPago(e) {
  e.preventDefault();
  const tar = document.getElementById("inputTarjeta").value.trim();
  if (tar.length >= 4) {
    document.getElementById("pagoTarjeta").textContent = tar.slice(-4);
  }
  alert("Método de pago actualizado ✅");
}
