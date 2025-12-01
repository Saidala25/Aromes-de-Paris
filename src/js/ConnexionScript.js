document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const container = document.querySelector('.connexion-container');

    // 1. Select the logo image element
    const logoImage = document.querySelector('.logo-image');

    // 2. Define your image paths here - CORRIGÉ
    const logoForGreenBg = 'assets/Logos/Aromes-LOGO-H.png'; // Logo JAUNE pour fond VERT (Signup)
    const logoForGoldBg = 'assets/Logos/Aromes-LOGO-H-Green.png'; // Logo VERT pour fond JAUNE (Login)
    console.log('JavaScript chargé !');

    // Au chargement initial, on est sur le formulaire de connexion (fond JAUNE)
    // Donc le logo doit être VERT
    logoImage.src = logoForGoldBg;

    // Switch vers inscription (Switch to Green Background)
    switchToSignup.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Clic sur Créer un compte');

        loginForm.classList.remove('active-form');
        loginForm.classList.add('hidden-form');
        signupForm.classList.remove('hidden-form');
        signupForm.classList.add('active-form');

        container.classList.add('inverse');

        // 3. Change le logo pour la version JAUNE (car fond devient VERT)
        setTimeout(() => {
            logoImage.src = logoForGreenBg;
        }, 200);
    });

    // Switch vers connexion (Switch back to Gold Background)
    switchToLogin.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Clic sur Se connecter');

        signupForm.classList.remove('active-form');
        signupForm.classList.add('hidden-form');
        loginForm.classList.remove('hidden-form');
        loginForm.classList.add('active-form');

        container.classList.remove('inverse');

        // 4. Change le logo pour la version VERTE (car fond redevient JAUNE)
        setTimeout(() => {
            logoImage.src = logoForGoldBg;
        }, 200);
    });

    // Validation formulaire connexion
    //
    document.querySelector('#login-form .form').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;

        // ... (Admin check logic remains here) ...

        // Vérifier les clients
        const utilisateurs = obtenirUtilisateurs();
        const utilisateur = utilisateurs.find(u => u.email === email && u.password === password);

        if (utilisateur) {
            // --- ADD THIS LINE HERE ---
            // Clear old profile data to prevent "Ghost" users
            localStorage.removeItem('userData'); 
            // --------------------------

            // Mettre à jour la date de connexion
            utilisateur.derniereConnexion = new Date().toISOString();
            sauvegarderUtilisateurs(utilisateurs);
            definirUtilisateurCourant(utilisateur);

            redirigerVersClient();
        }
    });

    // Validation formulaire inscription
    document.querySelector('#signup-form .form').addEventListener('submit', function (e) {
        e.preventDefault();
        const password = this.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
    });
});




/*l'interactive des formulaires*/
// js/ConnexionScript.js - CODE CORRIGÉ
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const container = document.querySelector('.connexion-container');
    const logoImage = document.querySelector('.logo-image');

    // Chemins des logos
    const logoForGreenBg = 'assets/Logos/Aromes-LOGO-H.png';
    const logoForGoldBg = 'assets/Logos/Aromes-LOGO-H-Green.png';

    // Identifiants admin
    const ADMIN_EMAIL = 'adminRestaurant@gmail.com';
    const ADMIN_PASSWORD = '1234';

    console.log('JavaScript chargé !');

    // Au chargement initial
    logoImage.src = logoForGoldBg;

    // Vérifier si déjà connecté (SEULEMENT pour rediriger, pas pour empêcher l'accès)
    if (estConnecte() && !window.location.href.includes('connexion.html')) {
        redirigerSelonRole();
        return;
    }

    // Switch vers inscription
    switchToSignup.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Clic sur Créer un compte');

        loginForm.classList.remove('active-form');
        loginForm.classList.add('hidden-form');
        signupForm.classList.remove('hidden-form');
        signupForm.classList.add('active-form');
        container.classList.add('inverse');

        setTimeout(() => {
            logoImage.src = logoForGreenBg;
        }, 200);
    });

    // Switch vers connexion
    switchToLogin.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Clic sur Se connecter');

        signupForm.classList.remove('active-form');
        signupForm.classList.add('hidden-form');
        loginForm.classList.remove('hidden-form');
        loginForm.classList.add('active-form');
        container.classList.remove('inverse');

        setTimeout(() => {
            logoImage.src = logoForGoldBg;
        }, 200);
    });

    // GESTION INSCRIPTION - CORRIGÉ
    document.querySelector('#signup-form .form').addEventListener('submit', function (e) {
        e.preventDefault();

        const fullName = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

        // Validation
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        if (password.length < 6) {
            alert('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        // Empêcher inscription avec email admin
        if (email === ADMIN_EMAIL) {
            alert('Cet email est réservé à l\'administration');
            return;
        }

        // Vérifier si utilisateur existe déjà
        const utilisateurs = obtenirUtilisateurs();
        const utilisateurExiste = utilisateurs.find(user => user.email === email);

        if (utilisateurExiste) {
            alert('Un compte avec cet email existe déjà');
            return;
        }

        // Créer nouvel utilisateur
        const nouvelUtilisateur = {
            id: Date.now(),
            fullName: fullName,
            email: email,
            password: password,
            role: 'client',
            dateCreation: new Date().toISOString()
        };

        // Sauvegarder
        utilisateurs.push(nouvelUtilisateur);
        sauvegarderUtilisateurs(utilisateurs);

        // Connecter automatiquement l'utilisateur
        definirUtilisateurCourant(nouvelUtilisateur);

        alert('Inscription réussie! Bienvenue ' + fullName + ' !');

        // Rediriger vers le dashboard client
        redirigerVersClient();
    });

    // GESTION CONNEXION
    document.querySelector('#login-form .form').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;

        // Vérifier si c'est l'admin
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const adminUser = {
                id: 'admin',
                fullName: 'Administrateur',
                email: ADMIN_EMAIL,
                role: 'admin',
                dateConnexion: new Date().toISOString()
            };

            definirUtilisateurCourant(adminUser);
            alert('Connexion admin réussie!');
            redirigerVersAdmin();
            return;
        }

        // Vérifier les clients
        const utilisateurs = obtenirUtilisateurs();
        const utilisateur = utilisateurs.find(u => u.email === email && u.password === password);

        if (utilisateur) {
            // Mettre à jour la date de connexion
            utilisateur.derniereConnexion = new Date().toISOString();
            sauvegarderUtilisateurs(utilisateurs);
            definirUtilisateurCourant(utilisateur);

            alert('Connexion réussie! Bienvenue ' + utilisateur.fullName + '!');
            redirigerVersClient();
        } else {
            alert('Email ou mot de passe incorrect!');
        }
    });
});

// FONCTIONS DE REDIRECTION

function redirigerVersAdmin() {
    window.location.href = 'dashboard-admin/dashboard.html';
}

function redirigerVersClient() {
    window.location.href = 'dashboard-client/Client.html';
}

function redirigerSelonRole() {
    const utilisateur = obtenirUtilisateurCourant();
    if (utilisateur) {
        if (utilisateur.role === 'admin') {
            redirigerVersAdmin();
        } else {
            redirigerVersClient();
        }
    }
}

// FONCTIONS UTILITAIRES

// Obtenir tous les utilisateurs
function obtenirUtilisateurs() {
    const utilisateurs = localStorage.getItem('users');
    return utilisateurs ? JSON.parse(utilisateurs) : [];
}

// Sauvegarder les utilisateurs
function sauvegarderUtilisateurs(utilisateurs) {
    localStorage.setItem('users', JSON.stringify(utilisateurs));
}

// Définir l'utilisateur connecté
function definirUtilisateurCourant(utilisateur) {
    localStorage.setItem('currentUser', JSON.stringify(utilisateur));
}

// Vérifier si un utilisateur est connecté
function estConnecte() {
    return localStorage.getItem('currentUser') !== null;
}

// Obtenir l'utilisateur actuellement connecté
function obtenirUtilisateurCourant() {
    const utilisateur = localStorage.getItem('currentUser');
    return utilisateur ? JSON.parse(utilisateur) : null;
}

// Vérifier si l'utilisateur est admin
function estAdmin() {
    const utilisateur = obtenirUtilisateurCourant();
    return utilisateur && utilisateur.role === 'admin';
}

// Déconnexion
function deconnexion() {
    localStorage.removeItem('currentUser');
    window.location.href = 'connexion.html';
}

// Mettre à jour la navigation (pour les autres pages)
function mettreAJourNavigation() {
    const utilisateur = obtenirUtilisateurCourant();
    const liensNavigation = document.querySelector('.nav-links');

    if (!utilisateur || !liensNavigation) return;

    // Supprimer ancien affichage si existe
    const ancienneInfo = document.querySelector('.info-utilisateur');
    if (ancienneInfo) {
        ancienneInfo.remove();
    }

    // Ajouter les infos utilisateur
    const infoUtilisateur = document.createElement('li');
    infoUtilisateur.className = 'info-utilisateur';
    infoUtilisateur.innerHTML = `
        <span style="color: #c29c3d; font-weight: 500;">
            <i class="fas fa-user"></i> 
            ${utilisateur.fullName || utilisateur.email}
            ${utilisateur.role === 'admin' ? ' (Admin)' : ''}
        </span>
        <button onclick="deconnexion()" style="margin-left: 10px; background: none; border: 1px solid #c29c3d; color: #c29c3d; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px;">
            Déconnexion
        </button>
    `;
    liensNavigation.appendChild(infoUtilisateur);

    // Mettre à jour le bouton connexion
    const boutonConnexion = document.querySelector('.btn-reserve');
    if (boutonConnexion) {
        boutonConnexion.textContent = 'Mon Compte';
        boutonConnexion.onclick = function (e) {
            e.preventDefault();
            alert(`Connecté en tant que: ${utilisateur.fullName || utilisateur.email}`);
        };
    }
}

// Initialiser l'affichage sur les autres pages
function initialiserAffichageUtilisateur() {
    if (estConnecte()) {
        mettreAJourNavigation();
    }
}

// Appeler cette fonction sur toutes les pages (sauf connexion)
document.addEventListener('DOMContentLoaded', function () {
    // Ne pas appeler sur la page de connexion
    if (!window.location.href.includes('connexion.html')) {
        initialiserAffichageUtilisateur();
    }
});