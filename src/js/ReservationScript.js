/* la partie alert  */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".booking-form");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        Swal.fire({
            title: "bienvenue !",
            text: "Vous avez réservée votre table  avec succès.",
            icon: "success",

            background: "#194238",
            color: "#ddc670",
            iconColor: "#ddc670",
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
