/* la partie alert  */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".booking-form");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        Swal.fire({
            title: "BIENVENUE !",
            text: "Vous avez réservée votre table  avec succès.",
            
            // Logo avec dimensions réduites
            imageUrl: "assets/Logos/Aromes-LOGO-H.png",
            imageWidth: 150,        // Réduit de 120
            imageHeight: 60,        // Ajusté pour garder les proportions
            imageAlt: "Arômes de Paris",
            
            // Couleurs 
            background: "#194238",
            color: "#ddc670",
            confirmButtonColor: "#b6923f",
            confirmButtonText: "OK",
            
            customClass: {
                popup: "swal2-luxe-popup",
                title: "swal2-luxe-title",
                htmlContainer: "swal2-luxe-text",
                confirmButton: "swal2-luxe-button",
                image: "swal2-luxe-logo"  //Classe pour le logo
            }
        });
    });
});

