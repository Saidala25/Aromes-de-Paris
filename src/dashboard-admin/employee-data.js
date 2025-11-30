/**
 * employee-data.js
 * Handles Data, SHA-256 Security, and "File" Storage
 */

const STORAGE_KEY = 'aromes_employees_secure_db';

// ===== SECURITY FUNCTIONS =====

// Real SHA-256 Hashing for Passwords (Async)
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Simulate File Encryption (Obfuscation) so it looks "hashed" in LocalStorage
function encryptData(data) {
    return btoa(btoa(JSON.stringify(data)));
}

function decryptData(cipherText) {
    try {
        return JSON.parse(atob(atob(cipherText)));
    } catch (e) {
        console.error("Tampered Data");
        return [];
    }
}

// ===== DATABASE OPERATIONS =====

const EmployeeDB = {
    // Load all data
    getAll: () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return []; 
        return decryptData(stored);
    },

    // Get single employee by ID
    getById: (id) => {
        const employees = EmployeeDB.getAll();
        return employees.find(e => e.id == id);
    },

    // Add new employee (Async because of SHA-256)
    add: async (employee) => {
        const employees = EmployeeDB.getAll();
        
        // Add ID
        employee.id = Date.now();
        employee.status = employee.status || 'active';
        
        // Hash the temporary password before saving
        if(employee.tempPassword) {
            employee.passwordHash = await sha256(employee.tempPassword);
            delete employee.tempPassword; // Don't save clear text
        }

        employees.push(employee);
        localStorage.setItem(STORAGE_KEY, encryptData(employees));
        return employee;
    },

    // Update existing employee
    update: (updatedEmp) => {
        let employees = EmployeeDB.getAll();
        const index = employees.findIndex(e => e.id == updatedEmp.id);
        if (index !== -1) {
            employees[index] = updatedEmp;
            localStorage.setItem(STORAGE_KEY, encryptData(employees));
        }
    },

    // Delete employee
    delete: (id) => {
        let employees = EmployeeDB.getAll();
        employees = employees.filter(e => e.id != id);
        localStorage.setItem(STORAGE_KEY, encryptData(employees));
    }
};

// Seed data for testing if empty
if (!localStorage.getItem(STORAGE_KEY)) {
    const seeds = [
        { id: 1, firstName: "Abderrahman", lastName: "Garouaz", role: "chef", email: "abderrahman@aromes.ma", status: "active", hireDate: "2021-01-01" },
    ];
    localStorage.setItem(STORAGE_KEY, encryptData(seeds));
}