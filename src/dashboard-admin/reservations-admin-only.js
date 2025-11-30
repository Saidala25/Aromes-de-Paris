// admin/js/reservations-admin-only.js
// VERSION FINALE – EXACTEMENT COMME TU VEUX

document.addEventListener("DOMContentLoaded", function () {
    const KEY = "reservations_restaurant";

    function getAll() {
        try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
        catch (e) { return []; }
    }

    function save(data) {
        localStorage.setItem(KEY, JSON.stringify(data));
    }

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
    }

    // === Actions (seulement pour la page complète) ===
    window.confirmRes = function(id) {
        if (confirm("Confirmer cette réservation ?")) {
            const all = getAll();
            const res = all.find(r => r.id === id);
            if (res) { res.statut = "confirmee"; save(all); refreshBothTables(); }
        }
    };

    window.cancelRes = function(id) {
        if (confirm("Annuler cette réservation ?")) {
            const all = getAll();
            const res = all.find(r => r.id === id);
            if (res) { res.statut = "annulee"; save(all); refreshBothTables(); }
        }
    };

    window.deleteRes = function(id) {
        if (confirm("Supprimer définitivement ?")) {
            save(getAll().filter(r => r.id !== id));
            refreshBothTables();
        }
    };

    function refreshBothTables() {
        const recentTbody = document.getElementById("recentReservationsBody");
        const fullTbody = document.getElementById("fullReservationsBody");

        const reservations = getAll()
            .sort((a, b) => new Date(b.date + " " + b.heure) - new Date(a.date + " " + a.heure));

        // === DASHBOARD : seulement le statut, PAS de boutons ===
        if (recentTbody) {
            recentTbody.innerHTML = "";
            const recent = reservations.slice(0, 5);

            if (recent.length === 0) {
                recentTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:40px; color:#999;">Aucune réservation</td></tr>`;
            } else {
                recent.forEach(r => {
                    const statusClass = r.statut === "confirmee" ? "confirmed" :
                                      r.statut === "en_attente" ? "pending" : "cancelled";
                    const statusText = r.statut === "confirmee" ? "Confirmée" :
                                     r.statut === "en_attente" ? "En attente" : "Annulée";

                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${r.nomComplet}</td>
                        <td>${formatDate(r.date)}</td>
                        <td>${r.heure.slice(0,5)}</td>
                        <td>${r.nombrePersonnes}</td>
                        <td><span class="status ${statusClass}">${statusText}</span></td>
                    `;
                    recentTbody.appendChild(row);
                });
            }
        }

        // === PAGE COMPLÈTE : avec les boutons d'action ===
        if (fullTbody) {
            fullTbody.innerHTML = "";
            if (reservations.length === 0) {
                fullTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:60px; color:#999;">Aucune réservation</td></tr>`;
            } else {
                reservations.forEach(r => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>#${r.id.slice(-6)}</td>
                        <td>${r.nomComplet}</td>
                        <td>${formatDate(r.date)}</td>
                        <td>${r.heure.slice(0,5)}</td>
                        <td>${r.nombrePersonnes}</td>
                    `;

                    // --- STATUT ---
                    const statutCell = document.createElement("td");
                    const statusText = r.statut === "confirmee" ? "Confirmée" :
                                    r.statut === "en_attente" ? "En attente" : "Annulée";
                    const statusClass = r.statut === "confirmee" ? "confirmed" :
                                    r.statut === "en_attente" ? "pending" : "cancelled";
                    statutCell.innerHTML = `<span class="status ${statusClass}">${statusText}</span>`;
                    row.appendChild(statutCell);

                    // --- ACTIONS ---
                    const actionsCell = document.createElement("td");
                    actionsCell.style.whiteSpace = "nowrap";

                    let actions = "";

                    if (r.statut === "en_attente") {
                        actions += `<button class="btn-icon" onclick="confirmRes('${r.id}')" title="Confirmer"><i data-lucide="check"></i></button>`;
                    }

                    if (r.statut === "en_attente" || r.statut === "confirmee") {
                        actions += `<button class="btn-icon" onclick="cancelRes('${r.id}')" title="Annuler"><i data-lucide="x"></i></button>`;
                    }

                    actions += `<button class="btn-icon" onclick="deleteRes('${r.id}')" title="Supprimer"><i data-lucide="trash-2"></i></button>`;

                    actionsCell.innerHTML = actions;
                    row.appendChild(actionsCell);

                    fullTbody.appendChild(row);
                });
            }
        }

        if (window.lucide) lucide.createIcons();
    }

    refreshBothTables();
    setInterval(refreshBothTables, 10000);


    // AJOUTE ÇA À LA TOUTE FIN DE TON FICHIER (avant le dernier }); )
// ===== MÉTHODE ULTRA SIMPLE QUI MARCHE À TOUS LES COUPS =====
    const TOTAL_TABLES = 20; // ← Change ici si tu as 18, 25, etc.

    function updateTablesMaintenant() {
        const aujourdhui = new Date().toISOString().slice(0,10); // 2025-11-30
        const toutes = getAll();

        const reservees = toutes.filter(r => r.date === aujourdhui && r.statut === "confirmee").length;
        const libres = TOTAL_TABLES - reservees;
        const pourcentage = Math.round((reservees / TOTAL_TABLES) * 100);

        // On cible DIRECTEMENT les éléments avec le texte exact (aucune erreur possible)
        document.querySelectorAll('.stat-value').forEach(el => {
            if (el.textContent.includes('/20') || el.textContent.includes('/')) { // c'est bien notre bloc tables
                el.textContent = `${libres}/${TOTAL_TABLES}`;

                // Couleur du gros chiffre
                el.style.color = libres === 0 ? '#e74c3c' :
                                libres <= 5 ? '#f39c12' : '#2ecc71';
            }
        });

        document.querySelectorAll('.stat-change').forEach(el => {
            if (el.textContent.includes('%')) { // c'est bien le pourcentage
                el.textContent = `${pourcentage}% occupées`;
            }
        });
    }

    // On force la mise à jour à chaque refresh + toutes les 5 secondes
    const ancienRefresh = refreshBothTables;
    refreshBothTables = function() {
        ancienRefresh();
        updateTablesMaintenant();
    };

    // Première mise à jour immédiate
    updateTablesMaintenant();
    setInterval(updateTablesMaintenant, 5000); // au cas où
});





