function adjustFontSizeToFit(element, initFontSize) {
    const containerHeight = element.clientHeight;
    let contentHeight;

    do {
        contentHeight = 0;
        element.style.fontSize = `${initFontSize}px`;
        contentHeight = element.scrollHeight;
        initFontSize--;
    } while ((contentHeight > containerHeight) && initFontSize > 0);

}

function setRating(star) {

    let temp = star;
    while (temp != null) {
        temp.style.color = "#e50914";
        temp = temp.previousElementSibling;
    }
    temp = star.nextElementSibling;
    while (temp != null) {
        temp.style.color = "Gray";
        temp = temp.nextElementSibling;
    }

}


document.addEventListener("DOMContentLoaded", function () {
    const dropdownContents = document.getElementsByClassName('movie-dropdown-content');
    Array.from(dropdownContents).forEach(dropdownContent => {
        const movieElement = dropdownContent.closest('.movie');
        let movieBasicInfo = movieElement.querySelector('.movie-basic-info');

        let button_info = movieBasicInfo.querySelector('.info').querySelector('Button');
        if (button_info) {
            button_info.addEventListener('mouseover', function () {
                dropdownContent.style.display = 'Block';
                adjustFontSizeToFit(dropdownContent.querySelector('ul'), 20);
            });
            button_info.addEventListener('mouseleave', function () {
                dropdownContent.style.display = 'None';
            });
        }

        let star_div = movieBasicInfo.querySelector('.stars');
        if (star_div) {
            const stars = document.querySelectorAll('i');
            stars.forEach(star => {
                star.addEventListener('click', function () {
                    setRating(star)
                });
            });

        }

        let button_watchlist = movieBasicInfo.querySelector('.add-to-watchlist').querySelector('Button');
        if (button_watchlist) {

            const movieName = movieElement.querySelector('p').innerHTML;
            button_watchlist.addEventListener('click', function () {

                const navdropdowns = document.querySelectorAll('.nav-dropdown');
                let watchListContent;
                navdropdowns.forEach(navdropdown => {
                    if (navdropdown.querySelector('i.fas.fa-list'))
                        watchListContent = navdropdown.querySelector('.nav-dropdown-content');
                });

                let button_icon = button_watchlist.querySelector('i');
                let content = '<a href="#" style = "font-size:10px;line-height: 20px;" >' + movieName + '</a>';
                if (button_icon.innerHTML == 'playlist_add') {
                    button_icon.innerHTML = 'playlist_add_check';
                    watchListContent.innerHTML += content;
                }
                else if (button_icon.innerHTML == 'playlist_add_check') {
                    button_icon.innerHTML = 'playlist_add';
                    let elementsToRemove = watchListContent.querySelectorAll('a[href="#"][style="font-size:10px;line-height: 20px;"]');
                    elementsToRemove.forEach(element => {
                        if (element.outerHTML.replace(/\s/g, "") == content.replace(/\s/g, "")) {
                            element.parentNode.removeChild(element);
                        }
                    });
                }

            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-form input[name="search"]');
    const searchButton = document.querySelector('.search-form button');
    const movieInfoElements = document.querySelectorAll('.movie');
    const noResultsMessage = document.querySelector('.no-results');

    function filterMovies() {
        const query = searchInput.value.toLowerCase().trim();
        let resultsFound = false;

        movieInfoElements.forEach(movie => {
            const movieTitle = movie.querySelector('.movie-basic-info p').textContent.toLowerCase();
            if (movieTitle.includes(query) || query === '') {
                movie.style.display = ''; 
                resultsFound = true;
            } else {
                movie.style.display = 'none'; 
            }
        });

        noResultsMessage.style.display = resultsFound ? 'none' : 'block';
    }

    searchButton.addEventListener('click', (event) => {
        event.preventDefault();
        filterMovies();
    });

    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            filterMovies();
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const loginSignupElement = document.getElementById('login-signup');
    const username = localStorage.getItem('username');

    if (username) {
        loginSignupElement.innerHTML = `
            <a href="#" id="user-menu"><i class="fas fa-user"></i> ${username}</a>
        `;

        const userMenu = document.getElementById('user-menu');
        const userMenuDropdown = document.getElementById('user-menu-dropdown');

        userMenu.addEventListener('click', (event) => {
            event.preventDefault();

            userMenuDropdown.style.display = userMenuDropdown.style.display === 'none' ? 'block' : 'none';
        });
    } else {
        loginSignupElement.innerHTML = `<a href="login.html"><i class="fas fa-sign-in-alt"></i> Login/Signup</a>`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const ratingButtons = document.querySelectorAll('.stars i');

    ratingButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const movieTitle = event.target.closest('.movie').querySelector('p').innerText;
            const rating = Array.from(event.target.parentElement.children).indexOf(event.target) + 1;

            saveRating(movieTitle, rating);
        });
    });
});

function saveRating(movieTitle, rating) {

    let ratings = JSON.parse(localStorage.getItem('movieRatings')) || {};
    let reviewCounts = JSON.parse(localStorage.getItem('reviewCounts')) || {};

    
    if (!ratings[movieTitle]) {
        ratings[movieTitle] = rating;
        reviewCounts[movieTitle] = (reviewCounts[movieTitle] || 0) + 1;
    } else {
    
        ratings[movieTitle] = rating;
    }

    
    localStorage.setItem('movieRatings', JSON.stringify(ratings));
    localStorage.setItem('reviewCounts', JSON.stringify(reviewCounts));
}








