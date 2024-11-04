document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (username === storedUsername && password === storedPassword) {
           
            localStorage.removeItem('movieRatings');
            localStorage.removeItem('reviewCounts');

            
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password.');
        }
    });
});
