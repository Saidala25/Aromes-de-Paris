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
    }, 3900); // 4.6 seconds: Start lifting the curtain

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
            text: "Les meilleurs plats et mocktails que j'aie jamais mangés ! La nourriture est d'une fraîcheur exceptionnelle et absolument délicieuse ! Tout est parfait. J'y retournerai sans hésiter. Le service est également excellent : le personnel est accueillant et chaleureux !",
            author: "Roumayssa El Yahyaoui",
            role: "Local Guide",
            location: "Agadir Bay",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjWWeBdeT8DCEGmnzbYjhf1F-aqkNvy1g-mlIHWkg4gF2ATWB117=w72-h72-p-rp-mo-br100"
        },
        {
            text: "Honnêtement, c'est l'un des meilleurs restaurants où j'ai mangé, et même au Maroc. La cuisine était exceptionnelle, notamment le poisson, d'une fraîcheur et d'une préparation remarquables. Le personnel était aux petits soins, toujours prêt à rendre service avec gentillesse. Une adresse incontournable lors d'un séjour à Agadir !",
            author: "Filip Valkov",
            role: "Visiteur",
            location: "Centre Ville",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjXvZCDbpsex4sfRLe8jzqyaz_ltgeuVgKouYN9GWE8-NDyHkF7a=w72-h72-p-rp-mo-br100"
        },
        {
            text: "Ma première expérience ici a été absolument incroyable. La décoration était très contemporaine et élégante. Le service était impeccable, très attentionné, et la cuisine divine. Je recommande vivement cet endroit et j'y retournerai sans hésiter.",
            author: "Shah Ali",
            role: "Local Guide",
            location: "Agadir Bay",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjUx9P0lDHM5hvHLt1ilf_bUCiI56Yfx9CUKcO7gttSsFqCnLGQ=w72-h72-p-rp-mo-ba4-br100"
        },
        {
            text: "Ce restaurant est mon préféré depuis la première fois. La nourriture est excellente, les serveurs sont très sympathiques et attentionnés, je ne saurais trop vous recommander celui-ci.",
            author: "Francesca Spennato",
            role: "Habitué",
            location: "Centre Ville",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjUZGDfnYx6-dg0PN55n9BAwlsjufRCpyNMdQFtFjh1644JmeGcE=w72-h72-p-rp-mo-ba3-br100"
        },
        {
            text: "Fabulous experience all together. First time in Agadir and we were searching for a good value for money place to eat. Everything about this place is amazing. We will start with the taste: just fabulous. The service by Ilyas, our server, was amazing. Very friendly and great menu suggestions. If you are in Agadir, this place is your best choice for taste/value for money. Well done to the team at Arômes de Paris. We will come back.",
            author: "Stefan Fetica",
            role: "Visiteur",
            location: "Agadir Bay",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjXYv69V5af8408cNCeuB96THox_NDEBRB8KAkQzuUbQ5v-MF7Uh=w72-h72-p-rp-mo-ba2-br100"
        },
        {
            text: "Excellent place to have meals or coffee. Impeccable service. Warm atmosphere. Refined French design. I love it and highly recommend it.",
            author: "HASSAN GOUZROU",
            role: "Local Guide",
            location: "Agadir Bay",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjUcQ5oEJ-l6Dsd1Yt_gBKqofsSxzEs4Vmzpi2KKer_p2_AZaN0=w72-h72-p-rp-mo-ba4-br100"
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

        // --- Mobile Interaction: Pause on Touch ---
        track.addEventListener('touchstart', () => {
            clearInterval(autoSlideInterval); // Stop the timer when finger touches screen
        });

        track.addEventListener('touchend', () => {
            startTimer(); // Restart the timer when finger leaves screen
        });
        
        // Restart if the touch is interrupted (e.g. by a system alert)
        track.addEventListener('touchcancel', () => {
            startTimer(); 
        });
    }

    /* ### Javascript PopUp🙄 ### */
    class PopupSlider {
        constructor() {
            this.popup = document.getElementById('eventPopup');
            this.closeBtn = document.getElementById('closePopup');
            this.slidesContainer = document.getElementById('slides');
            this.prev = document.getElementById('prev');
            this.next = document.getElementById('next');
            this.dotsContainer = document.getElementById('dots');

            // === DONNÉES DES ÉVÉNEMENTS (ajoute ou modifie ici très facilement) ===
            this.events = [
                {
                    img: "src/assets/Images/Events/evenement.jpg",
                    instagram: "https://www.instagram.com/p/DRDAdubiKOI/",
                    title: "BUFFET",
                    subtitle: "Votre rendez-vous du dimanche à Agadir !",
                    details: [
                        "Boulevard du 20 Août, Agadir",
                        "Chaque dimanche à partir de 15h",
                        "Adultes : 200 DH | Enfants : 100 DH | -5 ans : Gratuit"
                    ],
                    reservation: "+212 6 21 58 89 38"
                },
                {
                    img: "src/assets/Images/Events/special1.png",
                    instagram: "https://www.instagram.com/p/DPn4TmvCALt/",
                    title: "Couscous Marocain",
                    subtitle: "Chaque vendredi soir dès 20h",
                    details: [
                        "Danseuses, musique live & buffet oriental",
                        "250 DH par personne"
                    ],
                    reservation: "+212 6 21 58 89 38"
                },
                {
                    img: "src/assets/Images/Events/evenement2.jpg",
                    instagram: "https://www.instagram.com/p/DRT-uESiIR4/",
                    title: "BUFFET",
                    subtitle: "Bienvenue Dimanche à Agadir",
                    details: [
                        "Boulevard du 20 Août, Agadir",
                        "250 DH par personne, enfant gratuit"
                    ],
                    reservation: "+212 6 21 58 89 38"
                }
                // Ajoute autant d'événements que tu veux ici !
            ];

            this.currentSlide = 1;
            this.isAnimating = false;
            this.autoSlide = null;

            this.init();
        }

        createSlide(event) {
            const slide = document.createElement('div');
            slide.className = 'slide';

            slide.innerHTML = `
                <div class="slide-img" onclick="window.open('${event.instagram}', '_blank')">
                    <img src="${event.img}" alt="${event.title}">
                    <div class="instagram-badge">Voir sur Instagram</div>
                </div>
                <div class="slide-content">
                    <h1>${event.title}</h1>
                    <h2>${event.subtitle}</h2>
                    ${event.details.map(line => {
                        if (line.includes('DH')) return `<p class="price">${line}</p>`;
                        return `<p style = "color: #004d40;">${line}</p>`;
                    }).join('')}
                    <p class="reservation" style = "color: #004d40;">☎ Réservations : ${event.reservation}</p>
                </div>
            `;

            return slide;
        }

        init() {
            // Générer tous les slides
            this.events.forEach(event => {
                this.slidesContainer.appendChild(this.createSlide(event));
            });

            this.originalSlides = Array.from(this.slidesContainer.children);
            this.totalSlides = this.originalSlides.length;

            this.setupClones();
            this.createDots();
            this.addEvents();

            // Position initiale
            this.goToSlide(1);
        }

        setupClones() {
            const firstClone = this.originalSlides[0].cloneNode(true);
            const lastClone = this.originalSlides[this.totalSlides - 1].cloneNode(true);
            firstClone.classList.add('clone');
            lastClone.classList.add('clone');

            this.slidesContainer.insertBefore(lastClone, this.originalSlides[0]);
            this.slidesContainer.appendChild(firstClone);
        }

        createDots() {
            for (let i = 0; i < this.totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot-s';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    this.goToRealSlide(i + 1);
                    this.resetAuto();
                });
                this.dotsContainer.appendChild(dot);
            }
            this.dots = this.dotsContainer.querySelectorAll('.dot-s');
        }

        updateDots() {
            let realIndex = (this.currentSlide - 1) % this.totalSlides;
            if (realIndex < 0) realIndex = this.totalSlides - 1;

            this.dots.forEach((dot, i) => dot.classList.toggle('active', i === realIndex));
        }

        goToSlide(n) {
            this.currentSlide = n;
            this.slidesContainer.style.transition = "transform 0.6s ease-in-out";
            this.slidesContainer.style.transform = `translateX(-${n * 100}%)`;
            this.updateDots();
        }

        goToRealSlide(n) {
            this.goToSlide(n);
        }

        nextSlide() {
            if (this.isAnimating) return;
            this.isAnimating = true;

            this.goToSlide(this.currentSlide + 1);

            this.slidesContainer.addEventListener('transitionend', () => {
                if (this.currentSlide === this.totalSlides + 1) {
                    this.slidesContainer.style.transition = 'none';
                    this.currentSlide = 1;
                    this.slidesContainer.style.transform = `translateX(-${this.currentSlide * 100}%)`;
                }
                this.isAnimating = false;
            }, { once: true });
        }

        prevSlide() {
            if (this.isAnimating) return;
            this.isAnimating = true;

            this.goToSlide(this.currentSlide - 1);

            this.slidesContainer.addEventListener('transitionend', () => {
                if (this.currentSlide === 0) {
                    this.slidesContainer.style.transition = 'none';
                    this.currentSlide = this.totalSlides;
                    this.slidesContainer.style.transform = `translateX(-${this.currentSlide * 100}%)`;
                }
                this.isAnimating = false;
            }, { once: true });
        }

        startAutoSlide() {
            this.autoSlide = setInterval(() => this.nextSlide(), 5000);
        }

        stopAutoSlide() {
            clearInterval(this.autoSlide);
        }

        resetAuto() {
            this.stopAutoSlide();
            this.startAutoSlide();
        }

        addEvents() {
            this.next.addEventListener('click', () => { this.nextSlide(); this.resetAuto(); });
            this.prev.addEventListener('click', () => { this.prevSlide(); this.resetAuto(); });
            this.closeBtn.addEventListener('click', () => this.hide());
            this.popup.addEventListener('click', (e) => {
                if (e.target === this.popup) this.hide();
            });
        }

        show() {
            this.popup.classList.add('active');
            this.startAutoSlide();
        }

        hide() {
            this.popup.classList.remove('active');
            this.stopAutoSlide();
        }
    }

    // === GESTION DES COOKIES – VERSION CORRIGÉE ET SIMPLIFIÉE ===
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// On affiche le popup seulement si on ne l’a pas montré dans les dernières 24h
function shouldShowPopup() {
    const lastShown = getCookie('eventPopupLastShown');
    if (!lastShown) return true;

    const oneDayMs = 24 * 60 * 60 * 1000;   // 2. Recommandé en production → 1 fois toutes les 24 heures
    return Date.now() - parseInt(lastShown) > oneDayMs;
}

function markPopupShown() {
    setCookie('eventPopupLastShown', Date.now(), 30); // 30 jours de durée de vie (sécurité)
}

// === Lancement du popup avec délai après le loader ===
window.addEventListener('load', () => {
    const slider = new PopupSlider();

    // On attend la fin du loader (6.5s comme chez toi)
    setTimeout(() => {
        if (shouldShowPopup()) {
            slider.show();

            // Quand l’utilisateur ferme → on marque l’heure
            const originalHide = slider.hide;
            slider.hide = function () {
                originalHide.call(this);
                markPopupShown();
            };
        }
    }, 6500);
});
});