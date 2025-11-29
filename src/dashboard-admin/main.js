// ===== THEME TOGGLE =====
function toggleTheme() {
  document.body.classList.toggle("dark-mode")
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"))
}

// Load saved theme
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode")
}

// ===== SUBMENU TOGGLE =====
function toggleSubmenu(id) {
  const submenu = document.getElementById("submenu-" + id)
  if (submenu) {
    submenu.classList.toggle("open")
  }
}

// ===== MOBILE SIDEBAR TOGGLE =====
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar")
  if (sidebar) {
    sidebar.classList.toggle("open")
  }
}

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  const sidebar = document.getElementById("sidebar")
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

  if (window.innerWidth <= 768 && sidebar && mobileMenuBtn) {
    if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      sidebar.classList.remove("open")
    }
  }
})

// ===== LOGOUT =====
function logout() {
  if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
    localStorage.removeItem('currentUser');
    window.location.href = '../connexion.html';
  }
}

// Vérifier que l'admin est connecté au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (!user || user.role !== 'admin') {
    alert('Accès non autorisé');
    window.location.href = '../connexion.html';
    return;
  }
  console.log('Admin connecté:', user.email);

});

// ===== MODAL FUNCTIONS =====
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("active")
  }
}

// Close modal when clicking overlay
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("active")
    }
  })
})

// ===== SEARCH FUNCTIONALITY =====
function setupSearch(inputId, tableId) {
  const input = document.getElementById(inputId)
  const table = document.getElementById(tableId)

  if (input && table) {
    input.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      const rows = table.querySelectorAll("tbody tr")

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase()
        row.style.display = text.includes(searchTerm) ? "" : "none"
      })
    })
  }
}

// ===== DATE FORMATTING =====
function formatDate(date) {
  const options = { day: "2-digit", month: "short", year: "numeric" }
  return new Date(date).toLocaleDateString("fr-FR", options)
}

// ===== INITIALIZE ICONS =====
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});