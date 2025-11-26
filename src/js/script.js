document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SETUP ICONS ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 2. REMOVE LOADING CLASS ---
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 5100);

    // --- 3. NATIVE SCROLL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal, .image-reveal-wrapper img');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.15, rootMargin: "0px" });
    revealElements.forEach(el => revealObserver.observe(el));


    // --- 4. NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    // --- 5. MOBILE MENU TOGGLE ---
    const mobileBtn = document.getElementById('mobile-toggle');
    const body = document.body;
    let isMenuOpen = false;

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                body.classList.add('mobile-menu-active');
                mobileBtn.innerHTML = '<i data-lucide="x"></i>';
                lucide.createIcons();
            } else {
                body.classList.remove('mobile-menu-active');
                mobileBtn.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            body.classList.remove('mobile-menu-active');
            if (mobileBtn) {
                mobileBtn.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }
        });
    });
});
