document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

   
    if (localStorage.getItem('username')) {
        
        window.location.href = 'login.html';
    }

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

      
        if (password === confirmPassword) {
           
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            
            window.location.href = 'login.html';
        } else {
            alert('Passwords do not match.');
        }
    });
});





