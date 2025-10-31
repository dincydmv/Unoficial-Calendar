// Get DOM elements
const monthDays = document.querySelector('.days');
const dateDisplay = document.querySelector('.date h1');
const dateText = document.querySelector('.date p');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Initialize date
let currentDate = new Date();

// Array of month names
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Function to render calendar
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Display month and year in header
    dateDisplay.textContent = months[month];
    dateText.textContent = currentDate.toDateString();

    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Get last date of current month
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    // Get last date of previous month
    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    let days = '';
    // Add previous month's trailing days
    for (let i = firstDayOfMonth; i > 0; i--) {
        days += `<div class="day prev-date">${lastDateOfPrevMonth - i + 1}</div>`;
    }

    // Add current month days
    for (let i = 1; i <= lastDateOfMonth; i++) {
        // Check if it's today
        const today = new Date();
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            days += `<div class="day today">${i}</div>`;
        } else {
            days += `<div class="day">${i}</div>`;
        }
    }

    // Add next month's days to complete the grid
    const totalCells = firstDayOfMonth + lastDateOfMonth;
    const remainingCells = 7 - (totalCells % 7);

    if (remainingCells < 7) {
        for (let i = 1; i <= remainingCells; i++) {
            days += `<div class="day next-date">${i}</div>`;
        }
    }

    // Update the DOM
    monthDays.innerHTML = days;
}

// Event listeners for prev/next buttons
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initial render
renderCalendar();