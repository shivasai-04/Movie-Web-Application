document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Clear user data and ratings from localStorage
            localStorage.removeItem('movieRatings');
            localStorage.removeItem('reviewCounts');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('averageRating');
            localStorage.removeItem('password');

            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
});

