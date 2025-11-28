/* la partie alert  */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".booking-form");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Succès !",
            text: "Vous avez rempli la formulaire avec succès.",
            
            // 🔥 Ajouter ton logo
            imageUrl: "assets/Logos/Aromes-LOGO-H.png",
            imageWidth: 120,
            imageHeight: 120,
            imageAlt: "Logo",

            // 🎨 Tes couleurs luxe
            background: "#194238",
            color: "#ddc670",
            confirmButtonColor: "#b6923f",

            customClass: {
                popup: "swal2-luxe-popup",
                title: "swal2-luxe-title",
                htmlContainer: "swal2-luxe-text",
                confirmButton: "swal2-luxe-button"
            }
        });
    });
});
