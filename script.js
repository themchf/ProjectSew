document.addEventListener('DOMContentLoaded', () => {
    const patientForm = document.getElementById('patientForm');
    const patientTableBody = document.getElementById('patientTableBody');
    const searchInput = document.getElementById('searchInput');

    // Load data from LocalStorage
    let patients = JSON.parse(localStorage.getItem('drRazhanPatients')) || [];

    function saveToLocalStorage() {
        localStorage.setItem('drRazhanPatients', JSON.stringify(patients));
    }

    function renderTable(filter = '') {
        patientTableBody.innerHTML = '';
        
        const filteredPatients = patients.filter(p => 
            p.name.toLowerCase().includes(filter.toLowerCase()) || 
            p.phone.includes(filter)
        );

        filteredPatients.forEach((p, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${p.date}</td>
                <td><strong>${p.name}</strong></td>
                <td>${p.phone}</td>
                <td>${p.age} / ${p.gender}</td>
                <td>${p.history || 'N/A'}</td>
                <td><span class="tag">${p.procedure}</span></td>
                <td><button class="delete-btn" onclick="deletePatient(${index})">Delete</button></td>
            `;
            patientTableBody.appendChild(row);
        });
    }

    // Handle Form Submission
    patientForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newPatient = {
            date: new Date().toLocaleDateString(),
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            gender: document.getElementById('gender').value,
            age: document.getElementById('age').value,
            history: document.getElementById('medicalHistory').value,
            procedure: document.getElementById('procedure').value
        };

        patients.unshift(newPatient); // Add to the top of the list
        saveToLocalStorage();
        renderTable();
        patientForm.reset();
    });

    // Search Functionality
    searchInput.addEventListener('input', (e) => {
        renderTable(e.target.value);
    });

    // Global Delete Function
    window.deletePatient = (index) => {
        if(confirm('Are you sure you want to delete this record?')) {
            patients.splice(index, 1);
            saveToLocalStorage();
            renderTable();
        }
    };

    renderTable();
});