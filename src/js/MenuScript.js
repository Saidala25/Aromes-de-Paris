// ----------------------------------------------------
// 1. GESTION DU MENU BURGER (Handled in Script.js)
// ----------------------------------------------------


// ----------------------------------------------------
// 2. ANIMATIONS DE LA PAGE
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    // Animation d'entrée : Fade In + Slide Up des textes
    const contents = document.querySelectorAll(".card-text")

    contents.forEach((content, index) => {
        // Reset initial styles for animation
        content.style.opacity = "0"
        // Garde le skewX(10deg) important pour le desktop
        const isMobile = window.innerWidth <= 900
        const transformBase = isMobile ? "translate(-50%, -50%)" : "skewX(10deg) translate(-50%, -50%)"

        content.style.transform = `${transformBase} translateY(30px)`
        content.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"

        // Délai en cascade (300ms, 500ms, 700ms...)
        setTimeout(
            () => {
                content.style.opacity = "1"
                content.style.transform = `${transformBase} translateY(0)`
            },
            300 + index * 200,
        )
    })

    // Effet Parallaxe sur la souris (Desktop uniquement)
    const cards = document.querySelectorAll(".card")

    if (window.innerWidth > 900) {
        document.addEventListener("mousemove", (e) => {
            const x = (window.innerWidth - e.pageX) / 50
            const y = (window.innerHeight - e.pageY) / 50

            cards.forEach((card) => {
                const title = card.querySelector(".font-cursive")
                if (title) {
                    title.style.transform = `translate(${x}px, ${y}px)`
                    title.style.transition = "transform 0.1s ease-out"
                }
            })
        })
    }
})

// ----------------------------------------------------
// 3. DONNÉES DU MENU (AVEC LIENS D'IMAGES)
// ----------------------------------------------------
const menuData = {
    food: {
        categories: [
            { id: "all", name: "Tout" },
            { id: "salades", name: "Salades" },
            { id: "entrees", name: "Entrées" },
            { id: "viandes", name: "Viandes & Volailles" },
            { id: "poissons", name: "Poissons & Mer" },
            { id: "pizzas", name: "Pizzas" },
            { id: "sandwichs", name: "Sandwichs & Burgers" },
            { id: "dej", name: "Pt Déj & À la Carte" },
        ],
        items: [
            {
                category: "salades",
                name: "Salade Tiède au Saumon",
                desc: "Saumon fumé, avocat, mangue, orange, fromages.",
                price: "85 DH",
                image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
            },
            {
                category: "salades",
                name: "Salade César",
                desc: "Poulet mariné et grillé, parmesan, croûtons, anchois.",
                price: "75 DH",
                image: "https://i.pinimg.com/1200x/00/38/9d/00389ddab812fdc051465e0d21b83ee8.jpg"
            },
            {
                category: "salades",
                name: "Salade Aromes de Paris",
                desc: "Saumon fumé, gambas, feta, noix, cœur de palmier.",
                price: "95 DH",
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
            },
            {
                category: "salades",
                name: "Salade Méditerranéenne",
                desc: "Thon, œuf poché, pomme de terre, olive, cœur de palmier.",
                price: "70 DH",
                image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop"
            },
            {
                category: "salades",
                name: "Salade Thaï aux Gambas",
                desc: "Gambas, surimi, mangue, gingembre, chou.",
                price: "80 DH",
                image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop"
            },
            {
                category: "salades",
                name: "Antipasti à l'Italienne",
                desc: "Légumes grillés, mozzarella, roquette, orange brûlée.",
                price: "65 DH",
                image: "https://i.pinimg.com/1200x/7b/b7/82/7bb7829b45127385cb77ae3a1e109c22.jpg"
            },
            {
                category: "entrees",
                name: "Guacamole aux crevettes",
                desc: "Entrée Froide",
                price: "60 DH",
                image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop"
            },
            {
                category: "entrees",
                name: "Carpaccio de bœuf",
                desc: "Entrée Froide",
                price: "70 DH",
                image: "https://i.pinimg.com/1200x/ee/91/7b/ee917b235d82c76907c79b10bfad18c1.jpg"
            },
            {
                category: "entrees",
                name: "Tartare d'avocat",
                desc: "Entrée Froide",
                price: "55 DH",
                image: "https://i.pinimg.com/1200x/41/22/29/4122290abd67f84a7fbe1c08c7ab9f48.jpg"
            },
            {
                category: "entrees",
                name: "Soupe de poisson",
                desc: "Entrée Chaude",
                price: "65 DH",
                image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
            },
            {
                category: "entrees",
                name: "Calamars frits",
                desc: "Entrée Chaude",
                price: "60 DH",
                image: "https://i.pinimg.com/1200x/59/09/a3/5909a3e9c4561e3bc89d2fd98742ec36.jpg"
            },
            {
                category: "entrees",
                name: "Gambas croustillantes",
                desc: "Entrée Chaude",
                price: "75 DH",
                image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop"
            },
            {
                category: "entrees",
                name: "Nems au poulet",
                desc: "Entrée Chaude",
                price: "50 DH",
                image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop"
            },
            {
                category: "viandes",
                name: "Filet de Bœuf Grillé",
                desc: "200g - Servis avec purée et légumes",
                price: "140 DH",
                image: "https://i.pinimg.com/1200x/85/3d/51/853d519ed9afe8a0526cbbd281c8d473.jpg"
            },
            {
                category: "viandes",
                name: "Entrecôte Grillée",
                desc: "190g - Servis avec purée et légumes",
                price: "130 DH",
                image: "https://i.pinimg.com/1200x/20/5e/b2/205eb24f30fd9037da60744fcdd120de.jpg"
            },
            {
                category: "viandes",
                name: "Souris d'Agneau Revisitée",
                desc: "160g - Servis avec purée et légumes",
                price: "150 DH",
                image: "https://i.pinimg.com/1200x/3c/f3/92/3cf392ec753ceddc0e1709ca70495555.jpg"
            },
            {
                category: "viandes",
                name: "Émincé de Bœuf aux Champignons",
                desc: "100g - Servis avec purée et légumes",
                price: "110 DH",
                image: "https://i.pinimg.com/1200x/e5/42/40/e5424041754f4e33471f7bad7b284a7e.jpg"
            },
            {
                category: "viandes",
                name: "Blanc de Poulet à Basse Température",
                desc: "90g - Servis avec purée et légumes",
                price: "95 DH",
                image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop"
            },
            {
                category: "viandes",
                name: "Brochettes de Poulet Grillé",
                desc: "90g - Servis avec purée et légumes",
                price: "90 DH",
                image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop"
            },
            {
                category: "viandes",
                name: "Wings de Poulet Sriracha",
                desc: "75g - Servis avec purée et légumes",
                price: "80 DH",
                image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop"
            },
            {
                category: "poissons",
                name: "Parillada Aromes de Paris",
                desc: "Plateau de fruits de mer",
                price: "180 DH",
                image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop"
            },
            {
                category: "poissons",
                name: "Pavé de Saumon",
                desc: "Grillé ou à l'aneth",
                price: "120 DH",
                image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop"
            },
            {
                category: "poissons",
                name: "Filet de Saint-Pierre",
                desc: "Grillé ou à la crème de crevettes",
                price: "130 DH",
                image: "https://i.pinimg.com/1200x/59/e2/b9/59e2b98d6b10a3e21a5d79f02c8428a1.jpg"
            },
            {
                category: "poissons",
                name: "Poisson en Croûte de Sel",
                desc: "",
                price: "140 DH",
                image: "https://i.pinimg.com/736x/e2/20/b2/e220b2df3b23ce9ed58581735f640835.jpg"
            },
            {
                category: "poissons",
                name: "Risotto Fruits de Mer",
                desc: "",
                price: "110 DH",
                image: "https://i.pinimg.com/1200x/f7/7c/98/f77c98da8da1479d87f314b559cb80e7.jpg"
            },
            {
                category: "poissons",
                name: "Paella",
                desc: "",
                price: "130 DH",
                image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop"
            },
            {
                category: "pizzas",
                name: "Fruits de Mer",
                desc: "",
                price: "85 DH",
                image: "https://i.pinimg.com/1200x/11/b2/e7/11b2e7d0ba85cd969be159d1fb763c54.jpg"
            },
            {
                category: "pizzas",
                name: "Aromes de Paris",
                desc: "Poulet, roquette, huile de truffe",
                price: "75 DH",
                image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop"
            },
            {
                category: "pizzas",
                name: "Saumon",
                desc: "",
                price: "80 DH",
                image: "https://i.pinimg.com/1200x/24/b7/95/24b795605e3ecee87c440d67e0019899.jpg"
            },
            {
                category: "pizzas",
                name: "Cinq Fromages",
                desc: "",
                price: "70 DH",
                image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop"
            },
            {
                category: "pizzas",
                name: "Margherita",
                desc: "",
                price: "55 DH",
                image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop"
            },
            {
                category: "pizzas",
                name: "Végétarienne",
                desc: "",
                price: "60 DH",
                image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop"
            },
            {
                category: "sandwichs",
                name: "Sandwich Poulet",
                desc: "",
                price: "50 DH",
                image: "https://i.pinimg.com/1200x/97/8a/10/978a10c00d025a17c7e710801b136def.jpg"
            },
            {
                category: "sandwichs",
                name: "Sandwich Thon",
                desc: "",
                price: "50 DH",
                image: "https://i.pinimg.com/1200x/c3/60/32/c36032d15cba299f75701eaf5bd234a8.jpg"
            },
            {
                category: "sandwichs",
                name: "American Burger",
                desc: "Gourmet Burger",
                price: "75 DH",
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
            },
            {
                category: "sandwichs",
                name: "Burger du Chef",
                desc: "Gourmet Burger",
                price: "80 DH",
                image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop"
            },
            {
                category: "sandwichs",
                name: "Chicken Burger",
                desc: "Gourmet Burger",
                price: "65 DH",
                image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop"
            },
            {
                category: "sandwichs",
                name: "Black Burger",
                desc: "Gourmet Burger",
                price: "85 DH",
                image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop"
            },
            {
                category: "dej",
                name: "Formules Petit Déjeuner",
                desc: "Express, Américain, Berbère, Espagnol, Français, Italien",
                price: "35-80 DH",
                image: "https://i.pinimg.com/736x/9d/f3/3d/9df33db6136fe6014e8ba452c13a5ab2.jpg"
            },
            {
                category: "dej",
                name: "Omelettes & Œufs",
                desc: "Plats à la Carte",
                price: "",
                image: "https://i.pinimg.com/1200x/b3/56/25/b35625a12c6d7aa57a54ccc2e4cfaf3a.jpg"
            },
            {
                category: "dej",
                name: "Crêpes marocaines",
                desc: "Plats à la Carte",
                price: "",
                image: "https://i.pinimg.com/1200x/1a/bd/d7/1abdd7b10a08c81a7ec72dc6ecbd6fa5.jpg"
            }
        ],
    },
    drinks: {
        categories: [
            { id: "all", name: "Tout" },
            { id: "thes", name: "Thés & Infusions" },
            { id: "cafes", name: "Cafés & Thés Glacés" },
            { id: "jus", name: "Jus & Smoothies" },
            { id: "shakes", name: "Milkshakes" },
            { id: "mocktails", name: "Mocktails" },
            { id: "sodas", name: "Boissons Gazeuses" },
        ],
        items: [
            { category: "thes", name: "Thé à la Menthe", desc: "Thé Chaud", price: "24 DH", image: "https://i.pinimg.com/736x/c5/d4/97/c5d497de82d32e21735d7131272006fa.jpg" },
            { category: "thes", name: "Thé Noir", desc: "Thé Chaud", price: "24 DH", image: "https://i.pinimg.com/1200x/7b/01/3c/7b013cfdf70d03f47056fa3d73e16dd4.jpg" },
            { category: "thes", name: "Verveine", desc: "Infusion", price: "24 DH", image: "https://i.pinimg.com/736x/d3/11/aa/d311aa5886fa7ebb909c4f4b48542f61.jpg" },
            { category: "thes", name: "Fruits Rouges", desc: "Infusion", price: "24 DH", image: "https://i.pinimg.com/736x/3e/54/08/3e5408be3eec48df4d486262b7d05e49.jpg" },
            { category: "cafes", name: "Latte Café Glacé", desc: "Classique ou aux arômes", price: "35 DH", image: "https://i.pinimg.com/1200x/0d/87/b7/0d87b7503518acbce8cc2284f608b2d0.jpg" },
            { category: "cafes", name: "Americano Glacé", desc: "", price: "28 DH", image: "https://i.pinimg.com/1200x/fa/6b/84/fa6b84e04255e7f0b20918866a4b8352.jpg" },
            { category: "cafes", name: "Thé Glacé Pêche", desc: "", price: "30 DH", image: "https://i.pinimg.com/1200x/d1/a6/52/d1a652e265389eaf6e0ddb7d54b4893a.jpg" },
            { category: "cafes", name: "Chocolat Glacé", desc: "Classique ou Strawberry", price: "38 DH", image: "https://i.pinimg.com/736x/fb/04/cb/fb04cb2d64bab0b098e23169f45e1f38.jpg" },
            { category: "jus", name: "Jus d'Orange", desc: "Jus Pressé", price: "28 DH", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop" },
            { category: "jus", name: "Jus de Mangue", desc: "Jus Pressé", price: "35 DH", image: "https://i.pinimg.com/1200x/78/4e/4b/784e4b5150a434e91b5cb3e9de41a32a.jpg" },
            { category: "jus", name: "Jus Citron Gingembre", desc: "Jus Pressé", price: "30 DH", image: "https://i.pinimg.com/1200x/5e/d5/e2/5ed5e2d4f98c86a7511fe889506ab89a.jpg" },
            { category: "jus", name: "Cocktail d'Amour", desc: "Smoothie", price: "45 DH", image: "https://i.pinimg.com/1200x/56/85/4e/56854ebe847b4961386e561838a98f96.jpg" },
            { category: "jus", name: "Détox", desc: "Smoothie", price: "45 DH", image: "https://i.pinimg.com/1200x/ec/6d/c2/ec6dc2d1e6b68f5df471515c7b4e1ce5.jpg" },
            { category: "shakes", name: "Vanille", desc: "", price: "42 DH", image: "https://i.pinimg.com/1200x/15/3b/4b/153b4bb58c9f29313f3187dae2d28f55.jpg" },
            { category: "shakes", name: "Chocolat", desc: "", price: "42 DH", image: "https://i.pinimg.com/736x/55/76/2d/55762da024203a9cf2c6dae55977c735.jpg" },
            { category: "shakes", name: "Oreo", desc: "", price: "42 DH", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop" },
            { category: "mocktails", name: "Mojito Classique", desc: "Ou aux fruits", price: "45 DH", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop" },
            { category: "mocktails", name: "Vergin Dieu Lagoon", desc: "", price: "48 DH", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop" },
            { category: "mocktails", name: "Vergin Colada", desc: "", price: "48 DH", image: "https://i.pinimg.com/1200x/af/a3/c3/afa3c3af6cc6bf19b9b059fa5847810d.jpg" },
            { category: "sodas", name: "Sodas", desc: "Coca, Sprite, etc.", price: "20 DH", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop" },
            { category: "sodas", name: "Red Bull", desc: "", price: "35 DH", image: "https://i.pinimg.com/1200x/c9/d8/25/c9d825f9d26f0fd7a6c03d75441b1e29.jpg" },
            { category: "sodas", name: "Eaux Minérales", desc: "Sidi Ali, Oulmes, San Pellegrino", price: "15-25 DH", image: "https://admin-store.leseauxmineralesdoulmes-store.ma/api/image/2339" }
        ],
    },
    dessert: {
        categories: [
            { id: "all", name: "Tout" },
            { id: "assiette", name: "Desserts à l'Assiette" },
            { id: "glaces", name: "Glaces Maison" },
            { id: "gouter", name: "Formule Goûter" },
        ],
        items: [
            {
                category: "assiette",
                name: "Fondant Chocolat",
                desc: "Servi avec une boule de glace",
                price: "45 DH",
                image: "https://i.pinimg.com/736x/fa/43/20/fa43209746c24963c6b5371a14007fab.jpg"
            },
            {
                category: "assiette",
                name: "Crème Brûlée Vanille",
                desc: "Servi avec une boule de glace",
                price: "45 DH",
                image: "https://i.pinimg.com/1200x/94/c1/55/94c155f4b2759a837df65f7fab554d14.jpg"
            },
            {
                category: "assiette",
                name: "San Sebastian",
                desc: "Servi avec une boule de glace",
                price: "50 DH",
                image: "https://i.pinimg.com/736x/33/04/5d/33045d34012feff40248a3e48332b0bc.jpg"
            },
            {
                category: "assiette",
                name: "Tiramisu",
                desc: "Servi avec une boule de glace",
                price: "40 DH",
                image: "https://i.pinimg.com/736x/04/d7/ab/04d7ab79c70a6338dd9b546034e95a41.jpg"
            },
            {
                category: "assiette",
                name: "Carpaccio d'Ananas au Romarin",
                desc: "Servi avec une boule de glace",
                price: "45 DH",
                image: "https://i.pinimg.com/1200x/c3/5d/12/c35d1217e9cdee22eb90a115ebc92fa2.jpg"
            },
            {
                category: "glaces",
                name: "2 Boules au choix",
                desc: "Chocolat, Vanille, Caramel, Fraise, Oreo",
                price: "30 DH",
                image: "https://i.pinimg.com/1200x/c9/ea/ee/c9eaeebb52bb424e75763e7ff5ad123b.jpg"
            },
            {
                category: "glaces",
                name: "3 Boules (Assortiment)",
                desc: "Chocolat, Vanille, Caramel, Fraise, Oreo",
                price: "45 DH",
                image: "https://i.pinimg.com/1200x/92/bc/59/92bc59bf4d05a7e108ae42e8003af5e6.jpg"
            },
            {
                category: "gouter",
                name: "Formule Goûter (2 pers)",
                desc: "Boissons chaudes, viennoiseries, tartines, cakes, etc.",
                price: "140 DH",
                image: "https://i.pinimg.com/736x/55/26/d5/5526d5a7519a2a71522a6f614f0a1111.jpg"
            }
        ],
    },
}

// ----------------------------------------------------
// 4. GESTION DE L'AFFICHAGE ET RENDU
// ----------------------------------------------------

function showSection(sectionId) {
    // Hide all sections
    const sections = ["food-section", "drinks-section", "dessert-section"]
    sections.forEach((id) => {
        const el = document.getElementById(id)
        if (el) {
            el.classList.add("hidden")
            el.classList.remove("active")
        }
    })

    // Determine type based on sectionId for rendering
    let type = ""
    if (sectionId === "food-section") type = "food"
    else if (sectionId === "drinks-section") type = "drinks"
    else if (sectionId === "dessert-section") type = "dessert"

    // Show requested section
    const activeSection = document.getElementById(sectionId)
    if (activeSection) {
        activeSection.classList.remove("hidden")

        // Render content for this section
        renderMenu(type)

        // Small delay to trigger animation
        setTimeout(() => activeSection.classList.add("active"), 10)

        // Scroll to section
        activeSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
}

function renderMenu(type, filter = "all") {
    if (!type || !menuData[type]) return

    const sectionId = type + "-section"
    const filtersContainer = document.querySelector(`#${sectionId} .filters`)
    const itemsContainer = document.querySelector(`#${sectionId} .menu-items`)
    const data = menuData[type]

    if (!filtersContainer || !itemsContainer) return

    // 1. Générer les boutons de filtre (une seule fois)
    if (filtersContainer.children.length === 0) {
        data.categories.forEach((cat) => {
            const btn = document.createElement("button")
            btn.className = `filter-btn ${cat.id === "all" ? "active" : ""}`
            btn.textContent = cat.name
            btn.dataset.category = cat.id  // On stocke la catégorie dans data-category

            btn.addEventListener("click", () => {
                // Retirer "active" de tous les boutons
                filtersContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"))
                // Ajouter "active" au bouton cliqué
                btn.classList.add("active")
                // Relancer le rendu avec le bon filtre
                renderMenu(type, cat.id)
            })

            filtersContainer.appendChild(btn)
        })
    }

    // 2. Mettre à jour le bouton actif si on arrive avec un filtre précis
    filtersContainer.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.category === filter)
    })

    // 3. Filtrer et afficher les items
    itemsContainer.innerHTML = ""
    const itemsToRender = filter === "all"
        ? data.items
        : data.items.filter(item => item.category === filter)

    // Appliquer la bonne classe au conteneur selon le type
    if (type === "drinks") {
        itemsContainer.className = "menu-items drinks-container"
    } else if (type === "dessert") {
        itemsContainer.className = "menu-items dessert-grid"
    } else if (type === "food") {
        itemsContainer.className = "menu-items food-grid"
    } else {
        itemsContainer.className = "menu-items"
    }

    // Générer les cartes
    itemsToRender.forEach((item) => {
        const imageUrl = item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"

        let html = ""

        if (type === "drinks") {
            html = `
                <div class="drink-row">
                    <div class="drink-img-box">
                        <img src="${imageUrl}" alt="${item.name}" loading="lazy">
                    </div>
                    <div class="drink-text-box">
                        <div class="drink-title">${item.name}</div>
                        <div class="drink-desc">${item.desc || ""}</div>
                        <div class="drink-price">${item.price}</div>
                    </div>
                </div>
            `
        } else if (type === "dessert") {
            html = `
                <div class="dessert-card">
                    <div class="dessert-img-box">
                        <img src="${imageUrl}" alt="${item.name}" loading="lazy">
                    </div>
                    <div class="dessert-info">
                        <div class="dessert-name">${item.name}</div>
                        <div class="dessert-desc">${item.desc}</div>
                        <div class="dessert-price">${item.price}</div>
                    </div>
                </div>
            `
        } else if (type === "food") {
            html = `
                <div class="food-plate">
                    <div class="food-img-circle">
                        <img src="${imageUrl}" alt="${item.name}" loading="lazy">
                    </div>
                    <div class="food-info">
                        <div class="food-title">
                            ${item.name}
                            ${item.desc ? `<span>${item.desc}</span>` : ""}
                        </div>
                        <div class="food-price">${item.price}</div>
                    </div>
                </div>
            `
        }

        itemsContainer.innerHTML += html
    })

    // Si aucun item → message
    if (itemsToRender.length === 0) {
        itemsContainer.innerHTML = "<p style='text-align:center; color:#999; padding:40px;'>Aucun plat dans cette catégorie pour le moment.</p>"
    }
}

