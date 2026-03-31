document.addEventListener('DOMContentLoaded', () => {
    const patientForm = document.getElementById('patientForm');
    const patientTableBody = document.getElementById('patientTableBody');
    const searchInput = document.getElementById('searchInput');

    let patients = JSON.parse(localStorage.getItem('drRazhanRecords')) || [];

    function renderTable(filter = '') {
        patientTableBody.innerHTML = '';
        
        const filtered = patients.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

        filtered.forEach((p, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${p.date}</td>
                <td><strong>${p.name}</strong><br><small>${p.phone}</small></td>
                <td>${p.age}y / ${p.gender}</td>
                <td style="max-width: 150px; color: #d63031;">${p.history || '-'}</td>
                <td><span class="tag">${p.procedure}</span></td>
                <td style="max-width: 200px; font-style: italic; color: #636e72;">${p.notes || '-'}</td>
                <td><button class="delete-btn" onclick="deleteRecord(${index})">Delete</button></td>
            `;
            patientTableBody.appendChild(row);
        });
    }

    patientForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newEntry = {
            date: new Date().toLocaleDateString(),
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            gender: document.getElementById('gender').value,
            age: document.getElementById('age').value,
            history: document.getElementById('medicalHistory').value,
            notes: document.getElementById('clinicalNotes').value, // Saved here
            procedure: document.getElementById('procedure').value
        };

        patients.unshift(newEntry);
        localStorage.setItem('drRazhanRecords', JSON.stringify(patients));
        renderTable();
        patientForm.reset();
    });

    searchInput.addEventListener('input', (e) => renderTable(e.target.value));

    window.deleteRecord = (index) => {
        if(confirm('Delete this patient record?')) {
            patients.splice(index, 1);
            localStorage.setItem('drRazhanRecords', JSON.stringify(patients));
            renderTable();
        }
    };

    renderTable();
});
