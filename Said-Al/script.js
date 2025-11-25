// On sélectionne le hamburger et la liste de liens
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Quand on clique sur le hamburger
hamburger.addEventListener("click", () => {
// On ajoute ou enlève la classe "active" au hamburger (pour l'animation croix)
hamburger.classList.toggle("active");
// On ajoute ou enlève la classe "active" au menu (pour le faire glisser)
navLinks.classList.toggle("active");
});

// Optionnel : Fermer le menu quand on clique sur un lien
document.querySelectorAll(".nav-links li a").forEach(n => n.addEventListener("click", () => {
hamburger.classList.remove("active");
navLinks.classList.remove("active");
}));



// Sélection du logo annimation du logo lors de mouseover
const logo = document.querySelector(".logo-img");

logo.addEventListener("mouseover", () => {
    // Si l'animation est déjà en cours, on la réinitialise
    logo.classList.remove("animate");
    
    // Force le recalcul pour que l'animation puisse redémarrer
    void logo.offsetWidth; 
    
    // Ajout de la classe pour déclencher l'animation
    logo.classList.add("animate");
});

