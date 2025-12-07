document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const container = document.querySelector('.connexion-container');
    const logoImage = document.querySelector('.logo-image');

    const logoForGreenBg = 'assets/Logos/Aromes-LOGO-H.png';
    const logoForGoldBg = 'assets/Logos/Aromes-LOGO-H-Green.png';

    // ===== SECURITY CONFIGURATION =====
    const ADMIN_EMAIL = 'adminRestaurant@gmail.com';
    const DEFAULT_ADMIN_HASH = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4';

    console.log('Secure Login Loaded');
    logoImage.src = logoForGoldBg;

    // ===== CRYPTO FUNCTIONS =====
    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function encryptData(data) { return btoa(btoa(JSON.stringify(data))); }
    
    function decryptData(cipherText) {
        try { return JSON.parse(atob(atob(cipherText))); } catch (e) { return []; }
    }

    function obtenirUtilisateurs() {
        const stored = localStorage.getItem('users_secure_db');
        return stored ? decryptData(stored) : [];
    }

    function sauvegarderUtilisateurs(utilisateurs) {
        localStorage.setItem('users_secure_db', encryptData(utilisateurs));
    }

    // ===== UI TRANSITIONS =====
    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.replace('active-form', 'hidden-form');
        signupForm.classList.replace('hidden-form', 'active-form');
        container.classList.add('inverse');
        setTimeout(() => { logoImage.src = logoForGreenBg; }, 200);
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.replace('active-form', 'hidden-form');
        loginForm.classList.replace('hidden-form', 'active-form');
        container.classList.remove('inverse');
        setTimeout(() => { logoImage.src = logoForGoldBg; }, 200);
    });

    // ===== SIGN UP LOGIC (CLIENT) =====
    document.querySelector('#signup-form .form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const fullName = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

        if (password !== confirmPassword) return alert('Les mots de passe ne correspondent pas');
        if (password.length < 4) return alert('Le mot de passe doit contenir au moins 4 caractères');
        if (email === ADMIN_EMAIL) return alert('Cet email est réservé à l\'administration');

        const utilisateurs = obtenirUtilisateurs();
        if (utilisateurs.find(user => user.email === email)) return alert('Un compte avec cet email existe déjà');

        const passwordHash = await sha256(password);

        const newUser = {
            id: Date.now(),
            fullName: fullName,
            email: email,
            password: passwordHash,
            role: 'client',
            dateCreation: new Date().toISOString()
        };

        utilisateurs.push(newUser);
        sauvegarderUtilisateurs(utilisateurs);

        localStorage.setItem('currentUser', JSON.stringify({
            id: newUser.id, fullName: fullName, email: email, role: 'client'
        }));
        localStorage.removeItem('userData'); // Clear stale profile data

        alert('Inscription réussie! Bienvenue ' + fullName);
        window.location.href = 'dashboard-client/Client.html';
    });

    // ===== LOGIN LOGIC (ADMIN & CLIENT) =====
    document.querySelector('#login-form .form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        const inputHash = await sha256(password);

        // --- 1. ADMIN CHECK ---
        if (email === ADMIN_EMAIL) {
            // Check if Admin changed their password (stored in LocalStorage)
            const savedAdminData = JSON.parse(localStorage.getItem('adminData') || 'null');
            
            let isAdminAuth = false;

            if (savedAdminData && savedAdminData.password) {
                // Priority: Check saved password
                if (inputHash === savedAdminData.password) isAdminAuth = true;
            } else {
                // Fallback: Check default password (1234)
                if (inputHash === DEFAULT_ADMIN_HASH) isAdminAuth = true;
            }

            if (isAdminAuth) {
                const adminSession = {
                    id: 'admin',
                    fullName: (savedAdminData && savedAdminData.firstName) ? 
                              `${savedAdminData.firstName} ${savedAdminData.lastName}` : 'Administrateur',
                    email: ADMIN_EMAIL,
                    role: 'admin',
                    dateConnexion: new Date().toISOString()
                };
                localStorage.setItem('currentUser', JSON.stringify(adminSession));
                alert('Connexion admin réussie!');
                window.location.href = 'dashboard-admin/dashboard.html';
                return;
            }
        }

        // --- 2. CLIENT CHECK ---
        const utilisateurs = obtenirUtilisateurs();
        const utilisateur = utilisateurs.find(u => u.email === email);

        if (utilisateur && utilisateur.password === inputHash) {
            utilisateur.derniereConnexion = new Date().toISOString();
            sauvegarderUtilisateurs(utilisateurs);

            localStorage.setItem('currentUser', JSON.stringify({
                id: utilisateur.id, fullName: utilisateur.fullName, email: utilisateur.email, role: 'client'
            }));
            localStorage.removeItem('userData'); // Clear stale profile data

            alert('Connexion réussie! Bienvenue ' + utilisateur.fullName);
            window.location.href = 'dashboard-client/Client.html';
        } else {
            alert('Email ou mot de passe incorrect!');
        }
    });
});