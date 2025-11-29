// Initialisation d'EmailJS
(function () {
    emailjs.init("OaV2YxkwiZPyCz64x");
    console.log("✅ EmailJS initialisé");
})();

// Fonction simple pour afficher les messages
function showMessage(message, isError = false) {
    const messageElement = document.getElementById('formMessage');
    messageElement.textContent = message;
    messageElement.style.display = 'block';

    if (isError) {
        messageElement.style.background = 'rgba(255, 0, 0, 0.1)';
        messageElement.style.color = '#ff6b6b';
        messageElement.style.border = '1px solid #ff6b6b';
    } else {
        messageElement.style.background = 'rgba(212, 175, 55, 0.1)';
        messageElement.style.color = '#d4af37';
        messageElement.style.border = '1px solid #d4af37';
    }

    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

// Fonction de validation
function isValidPhone(phone) {
    return phone.length >= 10;
}

function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Récupération des valeurs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !phone || !message) {
            showMessage('Veuillez remplir tous les champs obligatoires (*).', true);
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Veuillez entrer une adresse email valide.', true);
            return;
        }

        if (!isValidPhone(phone)) {
            showMessage('Veuillez entrer un numéro de téléphone valide (au moins 10 chiffres).', true);
            return;
        }

        // Désactiver le bouton
        submitBtn.disabled = true;
        const originalText = btnText.textContent;
        btnText.textContent = 'Envoi en cours...';

        // Construction du message complet pour s'assurer que toutes les infos sont visibles
        // même si le template EmailJS n'a pas toutes les variables configurées
        const fullMessage = `
Nouveau message de contact :
----------------------------------------
Nom : ${name}
Email : ${email}
Téléphone : ${phone}
Sujet : ${subject || 'Non spécifié'}
----------------------------------------
Message :
${message}
        `.trim();

        // PARAMÈTRES AVEC TOUTES LES VARIABLES POSSIBLES
        const templateParams = {
            // Variabl
            //es standard
            from_name: name,
            from_email: email,
            message: fullMessage, // On envoie le message complet ici
            reply_to: email,

            // Toutes les variations possibles pour le téléphone (gardées au cas où)
            phone: phone,
            telephone: phone,
            phone_number: phone,
            tel: phone,
            mobile: phone,
            numero: phone,

            // Toutes les variations pour le nom et email
            name: name,
            user_name: name,
            email: email,
            user_email: email,

            subject: subject || 'Message de contact site web'
        };

        console.log('📤 Données envoyées à EmailJS:', templateParams);

        // Envoi via EmailJS
        emailjs.send('service_kl4u19p', 'template_8hc0jas', templateParams)
            .then(function (response) {
                console.log('✅ Email envoyé avec succès');
                console.log('Réponse EmailJS:', response);
                showMessage('Merci pour votre message ! Nous vous contacterons par téléphone dans les plus brefs délais.');
                contactForm.reset();
            })
            .catch(function (error) {
                console.error('❌ Erreur EmailJS:', error);
                showMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.', true);
            })
            .finally(function () {
                // Réactiver le bouton
                submitBtn.disabled = false;
                btnText.textContent = originalText;
            });
    });
});