document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const averageRating = localStorage.getItem('averageRating') || '4.2'; 

    if (username) {
        document.getElementById('profile-username').textContent = username;
        document.getElementById('email').textContent = `Email: ${email}`;
        document.getElementById('average-rating').textContent = averageRating;
    } else {
        window.location.href = 'login.html'; 
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const ratings = JSON.parse(localStorage.getItem('movieRatings')) || {};
    const reviewCounts = JSON.parse(localStorage.getItem('reviewCounts')) || {};

    displayRatings(ratings);
});

function displayRatings(ratings) {
    const reviewsList = document.querySelector('.activity-overview ul');

    reviewsList.innerHTML = '';

    if (Object.keys(ratings).length === 0) {
        reviewsList.innerHTML = '<li>No ratings available.</li>';
        return;
    }

    let totalReviews = 0;

    for (const [movieTitle, rating] of Object.entries(ratings)) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${movieTitle} - ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`;
        reviewsList.appendChild(listItem);
        
        
        totalReviews += (JSON.parse(localStorage.getItem('reviewCounts'))[movieTitle] || 0);
    }

}





