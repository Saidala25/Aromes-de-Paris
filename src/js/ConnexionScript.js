document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const container = document.querySelector('.connexion-container');
    
    // 1. Select the logo image element
    const logoImage = document.querySelector('.logo-image');

    // 2. Define your image paths here
    const logoForGreenBg = 'assets/Logos/Aromes-LOGO-H-Green.png'; // Logo for Login (Green side)
    const logoForGoldBg  = 'assets/Logos/Aromes-LOGO-H.png'; // Logo for Signup (Gold side)
    console.log('JavaScript chargé !');

    // Switch vers inscription (Switch to Gold/Inverse)
    switchToSignup.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Clic sur Créer un compte');

        loginForm.classList.remove('active-form');
        loginForm.classList.add('hidden-form');
        signupForm.classList.remove('hidden-form');
        signupForm.classList.add('active-form');

        container.classList.add('inverse');

        // 3. Change the logo to the Gold/Inverse version
        // We add a small timeout so it changes while the logo is spinning (optional, looks smoother)
        setTimeout(() => {
            logoImage.src = logoForGoldBg;
        }, 200); 
    });

    // Switch vers connexion (Switch back to Green)
    switchToLogin.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Clic sur Se connecter');

        signupForm.classList.remove('active-form');
        signupForm.classList.add('hidden-form');
        loginForm.classList.remove('hidden-form');
        loginForm.classList.add('active-form');

        container.classList.remove('inverse');

        // 4. Change the logo back to the Green/Default version
        setTimeout(() => {
            logoImage.src = logoForGreenBg;
        }, 200);
    });

    // Validation formulaire connexion
    document.querySelector('#login-form .form').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;

        if (email && password) {
            alert('Connexion réussie !');
        } else {
            alert('Veuillez remplir tous les champs');
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

        alert('Inscription réussie !');
    });
});