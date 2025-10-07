import {Stations as STATIONS} from "./stations.js";

// Implement open/close burger menu
const burgerIcon = document.querySelector('.burger');
const headerMenu = document.querySelector('.header-menu');
const HTML = document.querySelector('html');

// add an event listener if the screen width is < 768 (i.e. if there is a burger menu icon)
if (burgerIcon && window.innerWidth <= 768) {
    burgerIcon.addEventListener('click', handleBurgerIconClick);
}

// when changing the screen width > 768 (i.e. when there are no burger menu icon), delete the event listener, otherwise add it
window.addEventListener('resize', debounce(handleWindowResize, 200));

function debounce(func, wait) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
}

function handleWindowResize() {
    if (window.innerWidth > 768) {
        burgerIcon.removeEventListener('click', handleBurgerIconClick);
        headerMenu.removeEventListener('click', handleHeaderMenuClick);

        if (burgerIcon.classList.contains('--open')) {
            toggleMenu();
        }
    } else {
        burgerIcon.addEventListener('click', handleBurgerIconClick);
    }
}

function toggleMenu () {
    burgerIcon.classList.toggle('--open');
    headerMenu.classList.toggle('--open');
    HTML.classList.toggle('--lock');
}

function  handleBurgerIconClick () {
    toggleMenu();

    if (burgerIcon.classList.contains('--open')) {
        headerMenu.addEventListener('click', handleHeaderMenuClick)
    }
}

function handleHeaderMenuClick (e) {
    if (e.target.classList.contains('header-menu-item') ||
        e.target.closest('.header-menu-item')) {
        toggleMenu();
        headerMenu.removeEventListener('click', handleHeaderMenuClick);
    }
}

// Handle welcome section form submit
const welcomeForm = document.getElementById('welcome-section-form');

welcomeForm.addEventListener('submit', (e) => {
    // don't reload the page
    e.preventDefault();
})

// Switching the number of passengers in the welcome section form
const btnPlus = document.getElementById('btn-plus');
const btnMinus = document.getElementById('btn-minus');
const inputPassengerNumbers = document.getElementById('passenger-numbers');

inputPassengerNumbers.addEventListener('input', (e) => {
    activateElement(btnMinus);
    activateElement(btnPlus);

    // if you have entered a value less than 1, then set the default value to 1 and disable the minus button
    if (e.target.value <= 1) {
        e.target.value = 1;
        disableElement(btnMinus);
    }

    // if you have entered a value more than 12, then set the default value to 12 and disable the plus button
    if (e.target.value >= 12) {
        e.target.value = 12;
        disableElement(btnPlus);
    }
})

btnPlus.addEventListener('click', () => {
    inputPassengerNumbers.value++;
    if (inputPassengerNumbers.value > 1) {
        activateElement(btnMinus);
    }

    if (inputPassengerNumbers.value >= 12) {
        disableElement(btnPlus);
    }
})

btnMinus.addEventListener('click', () => {
    inputPassengerNumbers.value--;
    if (inputPassengerNumbers.value <= 1) {
        disableElement(btnMinus);
    }

    if (inputPassengerNumbers.value < 12) {
        activateElement(btnPlus);
    }
})

// disable/activate Return input when switching radio buttons
const roundTripInput = document.getElementById('round-trip');
const oneWayInput = document.getElementById('one-way');
const returnDateInput = document.getElementById('return-date');

roundTripInput.addEventListener('focus', () => {
    activateElement(returnDateInput);
})

oneWayInput.addEventListener('focus', () => {
    disableElement(returnDateInput);
})

function disableElement(el) {
    el.setAttribute('disabled', '');
}

function activateElement(el) {
    el.removeAttribute('disabled');
}

// Implement dropdown with stations in inputs
const inputsForStations = document.querySelectorAll('.text-input.--stations');

inputsForStations.forEach((input) => {
    input.addEventListener('focus', (e) => {
        // Show the dropdown after focus on the input
        toggleNextSiblingElement(e.target);

        renderDropdownContent(e);
    });

    // Hidden the dropdown after blur the input
    input.addEventListener('blur', (e) => toggleNextSiblingElement(e.target));

    input.addEventListener('keyup', debounce(renderDropdownContent, 200));
})

function renderDropdownContent(e) {
    const inputValue = e.target.value.toLowerCase().trim();
    let filteredStations = STATIONS;

    if (inputValue !== '') {
        filteredStations = STATIONS.filter((station) => station.toLowerCase().includes(inputValue));
    }

    const dropdown = e.target.nextElementSibling;
    dropdown.innerHTML = '';

    if (filteredStations.length === 0) {
        dropdown.innerHTML = `<span class="not-found-span">Station not found</span>`;
    } else {
        // fill in the dropdown with filtered stations
        filteredStations.forEach((station) => createDropdownItems(station, dropdown));

        dropdown.addEventListener('mousedown', handleDropdownClick);
    }
}

function createDropdownItems(itemText, dropdownElement) {
    const listItem = document.createElement('li');
    listItem.innerText = itemText;
    dropdownElement.appendChild(listItem);
}

function handleDropdownClick (e) {
    if (e.target.tagName === 'LI') {
        const input = e.currentTarget.previousElementSibling;
        input.value = e.target.innerText;
    }
}

function toggleNextSiblingElement(el) {
    const nextSibling = el.nextElementSibling;
    nextSibling.classList.toggle('--hidden');
}
//TODO: сделать валидацию формы поиска: проверка корректности выбора станций (чтобы не совпадали), проверка даты (чтобы не была в прошлом)
