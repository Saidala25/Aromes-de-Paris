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
    window.confirmRes = function (id) {
        if (confirm("Confirmer cette réservation ?")) {
            const all = getAll();
            const res = all.find(r => r.id === id);
            if (res) { res.statut = "confirmee"; save(all); refreshBothTables(); }
        }
    };

    window.cancelRes = function (id) {
        if (confirm("Annuler cette réservation ?")) {
            const all = getAll();
            const res = all.find(r => r.id === id);
            if (res) { res.statut = "annulee"; save(all); refreshBothTables(); }
        }
    };

    window.deleteRes = function (id) {
        if (confirm("Supprimer définitivement ?")) {
            save(getAll().filter(r => r.id !== id));
            refreshBothTables();
        }
    };

    // === Nouvelle Réservation ===
    window.handleNewReservation = function (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const newRes = {
            id: "R" + Date.now().toString().slice(-6),
            nomComplet: formData.get("client"),
            date: formData.get("date"),
            heure: formData.get("heure"),
            nombrePersonnes: parseInt(formData.get("personnes")),
            statut: "en_attente" // Par défaut
        };

        const all = getAll();
        all.push(newRes);
        save(all);

        // Fermer le modal et rafraîchir
        if (window.closeModal) closeModal('newReservationModal');
        form.reset();
        refreshBothTables();
        alert("Réservation ajoutée avec succès !");
    };

    function updateReservationStats(reservations) {
        const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

        // --- 1. Common Calculations ---
        const todayCount = reservations.filter(r => r.date === todayStr).length;
        const confirmedCount = reservations.filter(r => r.statut === "confirmee").length;
        const pendingCount = reservations.filter(r => r.statut === "en_attente").length;
        const cancelledCount = reservations.filter(r => r.statut === "annulee").length;

        // --- 2. Update reservations.html ---
        const rToday = document.getElementById("stat-today-count");
        if (rToday) rToday.textContent = todayCount;

        const rConfirmed = document.getElementById("stat-confirmed-count");
        if (rConfirmed) rConfirmed.textContent = confirmedCount;

        const rPending = document.getElementById("stat-pending-count");
        if (rPending) rPending.textContent = pendingCount;

        const rCancelled = document.getElementById("stat-cancelled-count");
        if (rCancelled) rCancelled.textContent = cancelledCount;

        // --- 3. Update dashboard.html ---
        const dToday = document.getElementById("dash-stat-today");
        if (dToday) dToday.textContent = todayCount;

        // Tables Available
        const TOTAL_TABLES = 20;
        // Count confirmed reservations for TODAY specifically for table occupancy
        const todayConfirmed = reservations.filter(r => r.date === todayStr && r.statut === "confirmee").length;
        const tablesFree = Math.max(0, TOTAL_TABLES - todayConfirmed);
        const occupancyRate = Math.round((todayConfirmed / TOTAL_TABLES) * 100);

        const dTables = document.getElementById("dash-stat-tables");
        if (dTables) {
            dTables.textContent = `${tablesFree}/${TOTAL_TABLES}`;
            // Color coding
            dTables.style.color = tablesFree === 0 ? '#e74c3c' : tablesFree <= 5 ? '#f39c12' : '#2ecc71';
        }

        const dOccupancy = document.getElementById("dash-stat-occupancy");
        if (dOccupancy) dOccupancy.textContent = `${occupancyRate}% occupées`;
    }

    function updateEmployeeStats() {
        // Check if EmployeeDB is available (from employee-data.js)
        if (typeof EmployeeDB !== 'undefined') {
            const employees = EmployeeDB.getAll();
            const activeCount = employees.filter(e => e.status === 'active').length;
            const onLeaveCount = employees.filter(e => e.status === 'conge').length;

            const dEmployees = document.getElementById("dash-stat-employees");
            if (dEmployees) dEmployees.textContent = activeCount;

            const dEmployeesChange = document.getElementById("dash-stat-employees-change");
            if (dEmployeesChange) {
                if (onLeaveCount > 0) {
                    dEmployeesChange.textContent = `-${onLeaveCount} en congé`;
                    dEmployeesChange.className = "stat-change negative";
                } else {
                    dEmployeesChange.textContent = "Tous présents";
                    dEmployeesChange.className = "stat-change positive";
                }
            }
        }
    }

    function refreshBothTables() {
        const recentTbody = document.getElementById("recentReservationsBody");
        const fullTbody = document.getElementById("fullReservationsBody");

        const reservations = getAll()
            .sort((a, b) => new Date(b.date + " " + b.heure) - new Date(a.date + " " + a.heure));

        // Update Stats for BOTH pages
        updateReservationStats(reservations);
        updateEmployeeStats();

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
                        <td>${r.heure.slice(0, 5)}</td>
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
                        <td>${r.heure.slice(0, 5)}</td>
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
    setInterval(refreshBothTables, 5000);
});
