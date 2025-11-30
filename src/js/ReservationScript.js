// Système de Réservation - Arômes de Paris
// Fonction pour générer un ID unique pour chaque réservation
function genererIdReservation() {
    return 'RES-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Fonction pour formater la date en français
function formaterDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
}

// Fonction principale pour gérer la soumission du formulaire
function gererReservation(event) {
    event.preventDefault();

    const form = event.target;

    // Récupération des données du formulaire selon votre structure HTML
    const reservation = {
        id: genererIdReservation(),
        nomComplet: form.name.value.trim(),
        telephone: form.phone.value.trim(),
        email: form.email.value.trim() || 'Non renseigné',
        date: form.date.value,
        heure: form.time.value,
        nombrePersonnes: form.people.value,
        preferenceTable: form.table.value || 'Aucune préférence',
        statut: 'en_attente',
        dateCreation: new Date().toISOString()
    };

    console.log(' Nouvelle réservation:', reservation);

    // Validation des données
    if (!validerReservation(reservation)) {
        return false;
    }

    // Sauvegarde de la réservation
    if (sauvegarderReservation(reservation)) {
        afficherConfirmation(reservation);
        form.reset();
    }

    return false;
}

// Fonction de validation
function validerReservation(reservation) {
    // Validation du nom complet
    if (reservation.nomComplet.length < 3) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Veuillez entrer un nom complet valide',
            confirmButtonColor: '#d4af37'
        });
        return false;
    }

    // Validation du téléphone (format français/marocain)
    const telRegex = /^[0-9\s+]{10,15}$/;
    if (!telRegex.test(reservation.telephone)) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Veuillez entrer un numéro de téléphone valide',
            confirmButtonColor: '#d4af37'
        });
        return false;
    }

    // Validation de l'email (si renseigné)
    if (reservation.email !== 'Non renseigné') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(reservation.email)) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Veuillez entrer un email valide',
                confirmButtonColor: '#d4af37'
            });
            return false;
        }
    }

    // Validation de la date (ne peut pas être dans le passé)
    const dateReservation = new Date(reservation.date);
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);

    if (dateReservation < aujourdhui) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'La date de réservation ne peut pas être dans le passé',
            confirmButtonColor: '#d4af37'
        });
        return false;
    }

    // Validation de l'heure
    if (!reservation.heure) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Veuillez sélectionner une heure',
            confirmButtonColor: '#d4af37'
        });
        return false;
    }

    return true;
}

// Fonction pour sauvegarder la réservation
function sauvegarderReservation(reservation) {
    try {
        // Récupérer les réservations existantes
        let reservations = obtenirToutesReservations();

        // Ajouter la nouvelle réservation
        reservations.push(reservation);

        // Sauvegarder dans localStorage
        localStorage.setItem('reservations_restaurant', JSON.stringify(reservations));

        console.log(' Réservation sauvegardée avec succès');
        console.log(' Total réservations:', reservations.length);

        // Mettre à jour le compteur de réservations actives pour le client
        mettreAJourStatistiquesClient();

        return true;
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la sauvegarde',
            confirmButtonColor: '#d4af37'
        });
        return false;
    }
}

// Fonction pour obtenir toutes les réservations
function obtenirToutesReservations() {
    try {
        const data = localStorage.getItem('reservations_restaurant');
        const reservations = data ? JSON.parse(data) : [];
        console.log(' Réservations récupérées:', reservations.length);
        return reservations;
    } catch (error) {
        console.error('Erreur lors de la récupération:', error);
        return [];
    }
}

// Fonction pour afficher la confirmation avec SweetAlert2
function afficherConfirmation(reservation) {
    Swal.fire({
        title: "BIENVENUE !",
        text: "Réservation effectuée. Veuillez attendre  la confirmation par téléphone.",

        // Logo avec dimensions réduites
        imageUrl: "assets/Logos/Aromes-LOGO-H.png",
        imageWidth: 150,        // Réduit de 120
        imageHeight: 60,        // Ajusté pour garder les proportions
        imageAlt: "Arômes de Paris",

        // Couleurs 
        background: "#194238",
        color: "#ddc670",
        confirmButtonColor: "#b6923f",
        confirmButtonText: "OK",

        customClass: {
            popup: "swal2-luxe-popup",
            title: "swal2-luxe-title",
            htmlContainer: "swal2-luxe-text",
            confirmButton: "swal2-luxe-button",
            image: "swal2-luxe-logo"  //Classe pour le logo
        }
    }).then((result) => {
        // Rediriger vers la page Mes Réservations après avoir cliqué sur OK
        if (result.isConfirmed) {
            // Vérifier si l'utilisateur a déjà un compte (est connecté)
            const utilisateurConnecte = localStorage.getItem('currentUser');

            if (utilisateurConnecte) {
                // Si l'utilisateur a déjà un compte, sauvegarder et rediriger
                localStorage.setItem('userData', JSON.stringify({ nom: reservation.nomComplet }));
                window.location.href = 'dashboard-client/MesReservations.html';
            } else {
                // Si pas de compte, afficher message et rester sur la page
                Swal.fire({
                    title: "CONNEXION REQUISE",
                    text: "Vous devez avoir un compte pour accéder à vos réservations. Veuillez vous connecter ou créer un compte.",
                    icon: "info",
                    background: "#194238",
                    color: "#ddc670",
                    confirmButtonColor: "#b6923f",
                    confirmButtonText: "Se connecter",
                    showCancelButton: true,
                    cancelButtonText: "Rester ici",
                    customClass: {
                        popup: "swal2-luxe-popup",
                        title: "swal2-luxe-title",
                        htmlContainer: "swal2-luxe-text",
                        confirmButton: "swal2-luxe-button"
                    }
                }).then((choix) => {
                    if (choix.isConfirmed) {
                        // Rediriger vers la page de connexion
                        window.location.href = 'connexion.html';
                    }
                    // Sinon, reste sur la page de formulaire (ne rien faire)
                });
            }
        }
    });

}

// Fonction pour mettre à jour les statistiques du client
function mettreAJourStatistiquesClient() {
    const reservations = obtenirToutesReservations();
    const reservationsActives = reservations.filter(r => r.statut === 'en_attente' || r.statut === 'confirmee');

    // Sauvegarder le nombre de réservations actives
    localStorage.setItem('reservations_actives_count', reservationsActives.length);

    console.log(' Statistiques mises à jour:', reservationsActives.length, 'réservations actives');
}

// Fonction pour obtenir les réservations d'un client spécifique
function obtenirReservationsClient(nomClient) {
    const reservations = obtenirToutesReservations();
    return reservations.filter(r =>
        r.nomComplet.toLowerCase().includes(nomClient.toLowerCase())
    );
}

// Fonction pour obtenir une réservation par ID
function obtenirReservationParId(id) {
    const reservations = obtenirToutesReservations();
    return reservations.find(res => res.id === id);
}

// Fonction pour mettre à jour le statut d'une réservation
function mettreAJourStatut(id, nouveauStatut) {
    try {
        let reservations = obtenirToutesReservations();
        const index = reservations.findIndex(res => res.id === id);

        if (index !== -1) {
            reservations[index].statut = nouveauStatut;
            reservations[index].dateModification = new Date().toISOString();
            localStorage.setItem('reservations_restaurant', JSON.stringify(reservations));
            mettreAJourStatistiquesClient();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        return false;
    }
}

// Fonction pour annuler une réservation
function annulerReservation(id) {
    return mettreAJourStatut(id, 'annulee');
}

// Fonction pour supprimer une réservation
function supprimerReservation(id) {
    try {
        let reservations = obtenirToutesReservations();
        reservations = reservations.filter(res => res.id !== id);
        localStorage.setItem('reservations_restaurant', JSON.stringify(reservations));
        mettreAJourStatistiquesClient();
        return true;
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        return false;
    }
}

// Fonction pour obtenir les statistiques globales
function obtenirStatistiques() {
    const reservations = obtenirToutesReservations();
    return {
        total: reservations.length,
        enAttente: reservations.filter(r => r.statut === 'en_attente').length,
        confirmees: reservations.filter(r => r.statut === 'confirmee').length,
        annulees: reservations.filter(r => r.statut === 'annulee').length
    };
}

// Fonction pour obtenir les réservations du jour
function obtenirReservationsDuJour() {
    const reservations = obtenirToutesReservations();
    const aujourdhui = new Date().toISOString().split('T')[0];
    return reservations.filter(res => res.date === aujourdhui);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    console.log(' Système de réservation Arômes de Paris initialisé');

    // Attacher le gestionnaire au formulaire de réservation
    const formulaire = document.querySelector('.booking-form');

    if (formulaire) {
        formulaire.addEventListener('submit', gererReservation);
        console.log('Formulaire de réservation détecté et connecté');

        // Configurer la date minimum (aujourd'hui)
        const champDate = formulaire.querySelector('input[name="date"]');
        if (champDate) {
            const aujourdhui = new Date().toISOString().split('T')[0];
            champDate.setAttribute('min', aujourdhui);
        }
    }

    // Afficher les statistiques dans la console
    const stats = obtenirStatistiques();
    console.log(' Statistiques des réservations:', stats);

    // Mettre à jour les statistiques du dashboard si on est sur la page client
    mettreAJourStatistiquesClient();
});

// Export des fonctions pour utilisation externe
window.AromesParis = {
    // Fonctions principales
    reservations: {
        obtenir: obtenirToutesReservations,
        obtenirParId: obtenirReservationParId,
        obtenirClient: obtenirReservationsClient,
        obtenirDuJour: obtenirReservationsDuJour,
        supprimer: supprimerReservation,
        annuler: annulerReservation,
        changerStatut: mettreAJourStatut
    },

    // Statistiques
    stats: obtenirStatistiques,

    // Utilitaires
    utils: {
        formaterDate: formaterDate
    }
};

console.log(' API AromesParis.reservations disponible dans window.AromesParis');


//scripte de Mesreservations 
// Charger le nom du client
const loadClientName = () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const name = userData.nom || 'Client';
    document.getElementById('clientName').textContent = name;
    return name;
};

// Formater la date en français
function formaterDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
}

// Obtenir toutes les réservations
function obtenirReservations() {
    try {
        const data = localStorage.getItem('reservations_restaurant');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
}

// Obtenir les réservations du client connecté
function obtenirReservationsClient() {
    const clientName = loadClientName();
    const reservations = obtenirReservations();

    console.log(' Nom du client:', clientName);
    console.log(' Total réservations dans le système:', reservations.length);
    console.log(' Toutes les réservations:', reservations);

    // Afficher les infos de debug
    const debugDiv = document.getElementById('debugInfo');
    const debugContent = document.getElementById('debugContent');
    debugDiv.style.display = 'block';
    debugContent.innerHTML = `
                <p><strong>Nom du client:</strong> ${clientName}</p>
                <p><strong>Total réservations:</strong> ${reservations.length}</p>
                <p><strong>Réservations:</strong></p>
                <pre>${JSON.stringify(reservations, null, 2)}</pre>
            `;

    // AFFICHE TOUTES LES RÉSERVATIONS (pour tester)
    console.log(' Affichage de toutes les réservations');
    return reservations;

    // DÉCOMMENTEZ CES LIGNES quand vous voulez filtrer par client
    // const reservationsFiltrees = reservations.filter(r => 
    //     r.nomComplet.toLowerCase().includes(clientName.toLowerCase())
    // );
    // console.log(' Réservations du client:', reservationsFiltrees.length);
    // return reservationsFiltrees;
}

// Afficher les statistiques
function afficherStatistiques(reservations) {
    const enAttente = reservations.filter(r => r.statut === 'en_attente').length;
    const confirmee = reservations.filter(r => r.statut === 'confirmee').length;
    const annulee = reservations.filter(r => r.statut === 'annulee').length;

    document.getElementById('countEnAttente').textContent = enAttente;
    document.getElementById('countConfirmee').textContent = confirmee;
    document.getElementById('countAnnulee').textContent = annulee;
    document.getElementById('countTotal').textContent = reservations.length;
}

// Créer une carte de réservation
function creerCarteReservation(reservation) {
    const statusText = {
        'en_attente': 'En attente',
        'confirmee': 'Confirmée',
        'annulee': 'Annulée'
    };

    const preferenceTexte = {
        'inside': 'À l\'intérieur',
        'terrace': 'En terrasse',
        'window': 'Près de la fenêtre',
        '': 'Aucune préférence'
    };

    return `
                <div class="reservation-card" data-statut="${reservation.statut}">
                    <div class="reservation-header-card">
                        <div class="reservation-id">#${reservation.id.slice(-8)}</div>
                        <span class="reservation-status status-${reservation.statut}">
                            ${statusText[reservation.statut]}
                        </span>
                    </div>
                    
                    <div class="reservation-details">
                        <div class="detail-row">
                            <i class="fas fa-user"></i>
                            <span class="detail-value">${reservation.nomComplet}</span>
                        </div>
                        <div class="detail-row">
                            <i class="fas fa-calendar"></i>
                            <span class="detail-value">${formaterDate(reservation.date)}</span>
                        </div>
                        <div class="detail-row">
                            <i class="fas fa-clock"></i>
                            <span class="detail-value">${reservation.heure}</span>
                        </div>
                        <div class="detail-row">
                            <i class="fas fa-users"></i>
                            <span class="detail-value">${reservation.nombrePersonnes} personne(s)</span>
                        </div>
                        <div class="detail-row">
                            <i class="fas fa-chair"></i>
                            <span class="detail-value">${preferenceTexte[reservation.preferenceTable]}</span>
                        </div>
                        <div class="detail-row">
                            <i class="fas fa-phone"></i>
                            <span class="detail-value">${reservation.telephone}</span>
                        </div>
                    </div>
                    
                    <div class="reservation-actions">
                        <button class="btn-action btn-details" onclick="voirDetails('${reservation.id}')">
                            <i class="fas fa-eye"></i> Détails
                        </button>
                        ${reservation.statut !== 'annulee' ? `
                            <button class="btn-action btn-cancel" onclick="annulerReservation('${reservation.id}')">
                                <i class="fas fa-ban"></i> Annuler
                            </button>
                        ` : `
                            <button class="btn-action btn-delete" onclick="supprimerReservation('${reservation.id}')">
                                <i class="fas fa-trash"></i> Supprimer
                            </button>
                        `}
                    </div>
                </div>
            `;
}

// Afficher les réservations
function afficherReservations(filtre = 'toutes') {
    console.log('Affichage des réservations avec filtre:', filtre);
    const reservations = obtenirReservationsClient();
    const grid = document.getElementById('reservationsGrid');

    let reservationsFiltrees = reservations;
    if (filtre !== 'toutes') {
        reservationsFiltrees = reservations.filter(r => r.statut === filtre);
    }

    // Trier par date décroissante
    reservationsFiltrees.sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log('Réservations à afficher:', reservationsFiltrees.length);

    if (reservationsFiltrees.length === 0) {
        grid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                        <i class="fas fa-calendar-times"></i>
                        <h3>Aucune réservation trouvée</h3>
                        <p>Vous n'avez pas encore de réservation${filtre !== 'toutes' ? ' avec ce statut' : ''}.</p>
                        <a href="../reservation.html" class="btn-primary">
                            <i class="fas fa-plus"></i> Nouvelle Réservation
                        </a>
                    </div>
                `;
    } else {
        grid.innerHTML = reservationsFiltrees.map(r => creerCarteReservation(r)).join('');
        console.log('Réservations affichées avec succès');
    }

    afficherStatistiques(reservations);
}

// Voir les détails d'une réservation
function voirDetails(id) {
    const reservations = obtenirReservations();
    const reservation = reservations.find(r => r.id === id);

    if (!reservation) return;

    const preferenceTexte = {
        'inside': 'À l\'intérieur',
        'terrace': 'En terrasse',
        'window': 'Près de la fenêtre',
        '': 'Aucune préférence'
    };

    Swal.fire({
        title: 'Détails de la réservation',
        html: `
                    <div style="text-align: left; padding: 20px;">
                        <table style="width: 100%; font-size: 14px;">
                            <tr>
                                <td style="padding: 10px; color: #666; font-weight: 600;">Numéro :</td>
                                <td style="padding: 10px;">${reservation.id}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; color: #666; font-weight: 600;">Nom :</td>
                                <td style="padding: 10px;">${reservation.nomComplet}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; color: #666; font-weight: 600;">Date :</td>
                                <td style="padding: 10px;">${formaterDate(reservation.date)}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; color: #666; font-weight: 600;">Heure :</td>
                                <td style="padding: 10px;">${reservation.heure}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; color: #666; font-weight: 600;">Personnes :</td>
                                <td style="padding: 10px;">${reservation.nombrePersonnes}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; color: #666; font-weight: 600;">Table :</td>
                                <td style="padding: 10px;">${preferenceTexte[reservation.preferenceTable]}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; color: #666; font-weight: 600;">Téléphone :</td>
                                <td style="padding: 10px;">${reservation.telephone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; color: #666; font-weight: 600;">Email :</td>
                                <td style="padding: 10px;">${reservation.email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; color: #666; font-weight: 600;">Statut :</td>
                                <td style="padding: 10px;"><strong>${reservation.statut.replace('_', ' ').toUpperCase()}</strong></td>
                            </tr>
                        </table>
                    </div>
                `,
        confirmButtonColor: '#d4af37',
        confirmButtonText: 'Fermer',
        width: '600px'
    });
}

// Annuler une réservation
function annulerReservation(id) {
    Swal.fire({
        title: 'Annuler la réservation ?',
        text: 'Êtes-vous sûr de vouloir annuler cette réservation ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Oui, annuler',
        cancelButtonText: 'Non, garder'
    }).then((result) => {
        if (result.isConfirmed) {
            let reservations = obtenirReservations();
            const index = reservations.findIndex(r => r.id === id);

            if (index !== -1) {
                reservations[index].statut = 'annulee';
                reservations[index].dateModification = new Date().toISOString();
                localStorage.setItem('reservations_restaurant', JSON.stringify(reservations));

                Swal.fire({
                    icon: 'success',
                    title: 'Réservation annulée',
                    text: 'Votre réservation a été annulée avec succès.',
                    confirmButtonColor: '#d4af37'
                });

                afficherReservations(filtreActuel);
            }
        }
    });
}

// Supprimer une réservation
function supprimerReservation(id) {
    Swal.fire({
        title: 'Supprimer la réservation ?',
        text: 'Cette action est irréversible !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.isConfirmed) {
            let reservations = obtenirReservations();
            reservations = reservations.filter(r => r.id !== id);
            localStorage.setItem('reservations_restaurant', JSON.stringify(reservations));

            Swal.fire({
                icon: 'success',
                title: 'Supprimée',
                text: 'La réservation a été supprimée.',
                confirmButtonColor: '#d4af37'
            });

            afficherReservations(filtreActuel);
        }
    });
}

// Gestion des filtres
let filtreActuel = 'toutes';
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        filtreActuel = this.dataset.filter;
        afficherReservations(filtreActuel);
    });
});

// Mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');

mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
});

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initialisation de la page Mes Réservations');
    loadClientName();
    afficherReservations();
    console.log(' Page chargée avec succès');
});