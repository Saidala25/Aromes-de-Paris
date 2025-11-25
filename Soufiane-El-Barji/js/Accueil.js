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


    // --- 4. PARALLAX EFFECT ---
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        });
    }

    // --- 5. NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    // --- 6. MOBILE MENU TOGGLE ---
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
            if(mobileBtn) {
                mobileBtn.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }
        });
    });


    // --- 7. ADVANCED TESTIMONIAL CAROUSEL (MOCKED API) ---
    
    // A. "API" Data - Replace these texts with your real reviews later
    const reviewsData = [
        {
            text: "Une expérience culinaire exceptionnelle! Le cadre est magnifique et le service impeccable. Le mélange des saveurs est juste parfait.",
            author: "Marie Dubois",
            role: "Cliente Fidèle",
            location: "Agadir Bay",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150"
        },
        {
            text: "Les saveurs authentiques de la France en plein cœur d'Agadir. Le petit déjeuner est un must absolu pour bien commencer la journée.",
            author: "Jean Pierre",
            role: "Visiteur",
            location: "Centre Ville",
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150"
        },
        {
            text: "L'ambiance est cosy et raffinée. J'ai adoré les pâtisseries qui me rappellent mon voyage à Paris. Bravo au chef !",
            author: "Sophie Martin",
            role: "Local Guide",
            location: "Agadir Bay",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150"
        },
        {
            text: "Service au top et plats délicieux. C'est devenu notre cantine du dimanche midi. Je recommande vivement.",
            author: "Ahmed Bennani",
            role: "Habitué",
            location: "Centre Ville",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
        },
        {
            text: "Un endroit magique pour un dîner en amoureux. La lumière, la musique, tout est fait pour passer un bon moment.",
            author: "Laura & Thomas",
            role: "Touristes",
            location: "Agadir Bay",
            img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=150"
        }
    ];

    const track = document.querySelector('.testimonial-track');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (track && reviewsData.length > 0) {
        
        // B. Render Cards
        reviewsData.forEach((review, index) => {
            // Card
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="client-info">
                    <img src="${review.img}" class="client-avatar" alt="${review.author}">
                    <div style="margin-bottom: 1rem;">
                        <strong class="text-gold" style="font-size: 1.1rem; display:block;">${review.author}</strong>
                        <span style="font-size: 0.85rem; color: #888;">${review.role}</span>
                    </div>
                </div>
                <blockquote>"${review.text}"</blockquote>
                <div class="review-source"><i data-lucide="map-pin" style="width:12px; display:inline;"></i> ${review.location}</div>
            `;
            track.appendChild(card);

            // Dot
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                resetTimer();
            });
            dotsContainer.appendChild(dot);
        });

        // Re-init icons inside dynamic content
        lucide.createIcons();

        // C. Logic variables
        let currentIndex = 1; // Start at second item (looks better centered initially)
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        let autoSlideInterval;

        // D. Update Function
        const updateCarousel = () => {
            // 1. Calculate Widths
            // On desktop, card is 40% + 4% margin = 44% width effectively.
            // On mobile, card is 85% + 15% margin = 100% width.
            const isMobile = window.innerWidth <= 768;
            const cardWidthPercent = isMobile ? 100 : 44; 
            
            // 2. Center Logic
            // We want 'currentIndex' to be in the center.
            // Center of screen = 50%. Center of card = cardWidth / 2.
            // Offset = 50 - (cardWidth / 2).
            // Position of card N = N * cardWidth.
            // TranslateX = Offset - Position.
            
            const offset = 50 - (cardWidthPercent / 2);
            const position = currentIndex * cardWidthPercent;
            const translateX = offset - position;

            track.style.transform = `translateX(${translateX}%)`;

            // 3. Update Visual Classes
            cards.forEach((card, idx) => {
                if (idx === currentIndex) {
                    card.classList.add('active');
                    card.style.opacity = '1';
                } else {
                    card.classList.remove('active');
                    card.style.opacity = '0.4'; // Slight opacity for sides
                }
            });

            // 4. Update Dots
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        // E. Next Slide Logic (Looping)
        const nextSlide = () => {
            currentIndex++;
            if (currentIndex >= reviewsData.length) {
                currentIndex = 0; // Loop back to start
            }
            updateCarousel();
        };

        // F. Timer Management
        const startTimer = () => {
            // "Focus on the middle for 2 sec and then a slide"
            // Total interval = 2s focus + transition time approx.
            autoSlideInterval = setInterval(nextSlide, 3000); 
        };

        const resetTimer = () => {
            clearInterval(autoSlideInterval);
            startTimer();
        };

        // G. Init
        updateCarousel(); // Initial render
        startTimer();     // Start loop
        
        // Handle Resize to fix centering math
        window.addEventListener('resize', updateCarousel);
    }
});