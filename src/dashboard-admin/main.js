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

// ===== AUTHENTICATION CHECK & HEADER UPDATE =====
document.addEventListener('DOMContentLoaded', function () {
  // 1. Check Auth
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (!user || user.role !== 'admin') {
    // Optional: Add a check to avoid redirecting loop on login page if included there
    if (!window.location.href.includes('connexion.html')) {
        alert('Accès non autorisé');
        window.location.href = '../connexion.html';
        return;
    }
  } else {
      console.log('Admin connecté:', user.email);
  }

  // 2. Update Header Name/Avatar Globally
  updateAdminHeader();
});

// ===== HEADER UPDATE FUNCTION =====
function updateAdminHeader() {
    // Try to get updated Admin Data first, then fall back to Session
    const savedAdmin = JSON.parse(localStorage.getItem('adminData') || '{}');
    const session = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // Logic: adminData > currentUser > Default "Jean Dupont"
    const firstName = savedAdmin.firstName || session.firstName || 'Jean';
    const lastName = savedAdmin.lastName || session.lastName || 'Dupont';
    
    const fullName = `${firstName} ${lastName}`;
    const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

    // Select elements using classes (works on ALL pages)
    const nameElements = document.querySelectorAll('.user-name');
    const avatarElements = document.querySelectorAll('.user .avatar');

    // Update all matching elements found on the page
    nameElements.forEach(el => el.textContent = fullName);
    avatarElements.forEach(el => el.textContent = initials);
}

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