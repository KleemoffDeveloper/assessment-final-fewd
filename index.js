const BASE_URL = "https://resource-ghibli-api.onrender.com/films";

// Global storage for all movies
let allMovies;

// Movie Selection
let displayh3;
let displayp1;
let displayp2;

// The titles select element
let titlesParent = document.getElementById('titles');

// All sections
let sections = document.querySelectorAll('section');

// Reviews
let reviewForm = document.querySelector('form');
let submitReviewButton = reviewForm.querySelectorAll('input')[1];
let reviewInput = document.getElementById('review');
let reviewsList = document.getElementById('reviews').querySelector('ul');
let resetReviewsButton = document.getElementById('reset-reviews');

// People
let peopleList = sections[3].querySelector('ol');
let showPeopleButton = document.getElementById('show-people');

window.onload = async () => {
    await populateSelectMenu(BASE_URL);

    generateDisplayElements();

    titlesParent.addEventListener('change', () => {
        let id = titlesParent.value;

        if(id) {
            displayh3.innerText = selectedMovie(id).title;
            displayp1.innerText = selectedMovie(id).release_date;
            displayp2.innerText = selectedMovie(id).description;
        }
        else {
            displayh3.innerText = '';
            displayp1.innerText = '';
            displayp2.innerText = '';
        }
    });

    reviewForm.onsubmit = (event) => {
        event.preventDefault();

        if(!selectedMovie(titlesParent.value)) {
            window.alert('Please select a movie first')
            return;
        }

        if(reviewInput.value.length < 1) {
            return;
        }

        let id = titlesParent.value;

        let title = selectedMovie(id).title;

        let listElement = document.createElement('li');

        listElement.innerHTML = `<strong>${title}</strong>: ${reviewInput.value}`;

        reviewsList.append(listElement);

        reviewInput.value = null;
    }

    resetReviewsButton.onclick = () => {
        let allReviews = reviewsList.querySelectorAll('li');
        for(let i = 0; i < allReviews.length; i++) {
            allReviews[i].remove();
        }
    }

    showPeopleButton.onclick = () => {
        let listElement = document.createElement('li');

        peopleList.append()
    }
}

async function populateSelectMenu(url) {
     await fetch(url)
    .then(response => response.json())
    .then(data => {
        allMovies = data;

        for(let i = 0; i < data.length; i++) {
            let movie = data[i];

            let movieOption = document.createElement('option');

            movieOption.value = movie.id;

            movieOption.innerText = movie.title;

            titlesParent.append(movieOption);
        }
    })
    .catch(error => {
        console.log(error);
    });
}  

function generateDisplayElements() {
    displayh3 = document.createElement('h3');
    displayp1 = document.createElement('p');
    displayp2 = document.createElement('p');

    sections[0].append(displayh3);
    sections[0].append(displayp1);
    sections[0].append(displayp2);
}

function selectedMovie(movieId) {
    for(const movie of allMovies) {
        if(movie.id === movieId) {
            return movie;
        }
    }
    return null;
}