document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SETUP ICONS ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 2. LOADER CURTAIN SEQUENCE ---
    // The CSS animations (Green/Gold wipes) take about 4.5 seconds total.
    // We trigger the curtain lift right after they finish.
    
    setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) {
            // This adds the class that triggers the CSS transition (TranslateY -100%)
            loader.classList.add('slide-up');
        }
    }, 4600); // 4.6 seconds: Start lifting the curtain

    // Remove the 'loading' class (enables scrolling) after the curtain is gone
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 6100); // 4.6s start + 1.5s duration = 6.1s total

    // --- 3. SCROLL REVEAL ---
    const revealElements = document.querySelectorAll('.reveal, .image-reveal-wrapper img');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));


    // --- 4. NAVBAR SCROLL ---
    const navbar = document.querySelector('.navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }
    
    // --- 7. ADVANCED TESTIMONIAL CAROUSEL ---
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
        reviewsData.forEach((review, index) => {
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

            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                resetTimer();
            });
            dotsContainer.appendChild(dot);
        });

        lucide.createIcons();

        let currentIndex = 1; 
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        let autoSlideInterval;

        const updateCarousel = () => {
            const isMobile = window.innerWidth <= 768;
            const cardWidthPercent = isMobile ? 100 : 44; 
            const offset = 50 - (cardWidthPercent / 2);
            const position = currentIndex * cardWidthPercent;
            const translateX = offset - position;

            track.style.transform = `translateX(${translateX}%)`;

            cards.forEach((card, idx) => {
                if (idx === currentIndex) {
                    card.classList.add('active');
                    card.style.opacity = '1';
                } else {
                    card.classList.remove('active');
                    card.style.opacity = '0.4'; 
                }
            });

            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        const nextSlide = () => {
            currentIndex++;
            if (currentIndex >= reviewsData.length) currentIndex = 0; 
            updateCarousel();
        };

        const startTimer = () => {
            autoSlideInterval = setInterval(nextSlide, 3000); 
        };

        const resetTimer = () => {
            clearInterval(autoSlideInterval);
            startTimer();
        };

        updateCarousel(); 
        startTimer();     
        window.addEventListener('resize', updateCarousel);
    }
});