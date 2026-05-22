// Initialize local storage with sample data
function initializeDatabase() {
    if (!localStorage.getItem('cats')) {
        const sampleCats = [
            {
                chipNumber: '123456789012345',
                name: 'Whiskers',
                breed: 'Maine Coon',
                color: 'Orange Tabby',
                age: 3,
                ownerName: 'John Smith',
                ownerPhone: '555-0123',
                ownerEmail: 'john@example.com',
                lastLocation: 'Austin, Texas',
                status: 'Safe at home'
            },
            {
                chipNumber: '987654321098765',
                name: 'Luna',
                breed: 'Siamese',
                color: 'Cream and Brown',
                age: 5,
                ownerName: 'Sarah Johnson',
                ownerPhone: '555-0456',
                ownerEmail: 'sarah@example.com',
                lastLocation: 'Dallas, Texas',
                status: 'Missing - Last seen 3 days ago'
            }
        ];
        localStorage.setItem('cats', JSON.stringify(sampleCats));
    }
}

// Search functionality
document.getElementById('searchBtn').addEventListener('click', searchCat);
document.getElementById('chipInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCat();
});

function searchCat() {
    const chipNumber = document.getElementById('chipInput').value.trim();
    const errorMsg = document.getElementById('errorMessage');
    const resultsSection = document.getElementById('resultsSection');

    errorMsg.textContent = '';

    if (!chipNumber) {
        errorMsg.textContent = 'Please enter a microchip number';
        return;
    }

    const cats = JSON.parse(localStorage.getItem('cats')) || [];
    const cat = cats.find(c => c.chipNumber === chipNumber);

    if (cat) {
        displayResults(cat);
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        errorMsg.textContent = 'Microchip number not found. Make sure you entered it correctly.';
        resultsSection.classList.add('hidden');
    }
}

function displayResults(cat) {
    document.getElementById('catName').textContent = cat.name;
    document.getElementById('catChip').textContent = cat.chipNumber;
    document.getElementById('catBreed').textContent = cat.breed;
    document.getElementById('catColor').textContent = cat.color;
    document.getElementById('catAge').textContent = cat.age;
    document.getElementById('ownerName').textContent = cat.ownerName;
    document.getElementById('ownerPhone').textContent = cat.ownerPhone;
    document.getElementById('ownerEmail').textContent = cat.ownerEmail;
    document.getElementById('lastLocation').textContent = cat.lastLocation;
    document.getElementById('catStatus').textContent = cat.status;
}

// Reset button
document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('chipInput').value = '';
    document.getElementById('resultsSection').classList.add('hidden');
    document.getElementById('errorMessage').textContent = '';
});

// Register form
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const newCat = {
        chipNumber: document.getElementById('newChipNumber').value.trim(),
        name: document.getElementById('newCatName').value.trim(),
        breed: document.getElementById('newBreed').value.trim(),
        color: document.getElementById('newColor').value.trim(),
        age: parseInt(document.getElementById('newAge').value),
        ownerName: document.getElementById('ownerFullName').value.trim(),
        ownerPhone: document.getElementById('ownerPhoneNumber').value.trim(),
        ownerEmail: document.getElementById('ownerEmailAddress').value.trim(),
        lastLocation: document.getElementById('lastKnownLocation').value.trim(),
        status: 'Safe at home'
    };

    // Validate chip number
    if (newCat.chipNumber.length < 10 || newCat.chipNumber.length > 20) {
        showRegisterMessage('Microchip number must be between 10 and 20 digits', 'error');
        return;
    }

    let cats = JSON.parse(localStorage.getItem('cats')) || [];

    // Check for duplicate
    if (cats.some(c => c.chipNumber === newCat.chipNumber)) {
        showRegisterMessage('A cat with this microchip number is already registered', 'error');
        return;
    }

    cats.push(newCat);
    localStorage.setItem('cats', JSON.stringify(cats));

    showRegisterMessage(`${newCat.name} has been successfully registered!`, 'success');
    document.getElementById('registerForm').reset();

    // Clear message after 3 seconds
    setTimeout(() => {
        showRegisterMessage('', '');
    }, 3000);
});

function showRegisterMessage(message, type) {
    const msgElement = document.getElementById('registerMessage');
    msgElement.textContent = message;
    msgElement.className = 'register-message ' + type;
}

// Initialize on page load
window.addEventListener('load', initializeDatabase);
