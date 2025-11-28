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
    const navLinks = document.querySelector('.nav-links'); 
    const body = document.body;

    // Check if elements exist
    if (mobileBtn && navLinks) {
        console.log("Mobile menu initialized"); 

        mobileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Button Clicked!"); // Check console for this when you click

            // Toggle Class
            navLinks.classList.toggle('active'); 
            const isOpen = navLinks.classList.contains('active');

            // Toggle Icon & Scroll Lock
            if (isOpen) {
                body.style.overflow = 'hidden';
                mobileBtn.innerHTML = '<i data-lucide="x"></i>';
            } else {
                body.style.overflow = 'auto';
                mobileBtn.innerHTML = '<i data-lucide="menu"></i>';
            }
            
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });

        // Close when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                body.style.overflow = 'auto';
                mobileBtn.innerHTML = '<i data-lucide="menu"></i>';
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        });
    } else {
        console.error("Error: Mobile menu elements not found in HTML");
    }
});