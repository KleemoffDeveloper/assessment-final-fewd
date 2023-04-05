const BASE_URL = "https://resource-ghibli-api.onrender.com";

// Global storage for all movies
let allMovies;
let allPeople;

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
    let moviesJSON = await fetch(BASE_URL + '/films')
    .then(response => response.json())
    .then(data => {
        allMovies = data;
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });

    allMovies.forEach(movie => {
        populateSelectMenu(movie);
    });

    let peopleJSON = await fetch(BASE_URL + '/people')
    .then(response => response.json())
    .then(data => {
        allPeople = data;
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });

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
        let movie = selectedMovie(titlesParent.value);
        displayPeople(movie);
    }
}

function populateSelectMenu(movie) {
    let movieOption = document.createElement('option');

    movieOption.value = movie.id;

    movieOption.innerText = movie.title;

    titlesParent.append(movieOption);
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

function displayPeople(movie) {
    let allListElements = peopleList.querySelectorAll('li');
    for(let i = 0; i < allListElements.length; i++) {
        allListElements[i].remove();
    }

    allPeople.forEach(person => {
        movie.people.forEach(moviePerson => {
            if(person.url === moviePerson) {
                let li = document.createElement('li');
                li.innerText = person.name;
                peopleList.append(li);
            }
        });
    });
}