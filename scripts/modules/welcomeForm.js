import { disableElement, activateElement } from "../utils/elementsAvailability.js";
import addEventHandlersToInputsForStations from "./dropdown.js";

const welcomeForm = document.getElementById('welcome-section-form');
// Elements (radio buttons) to select the trip direction
const roundTripInput = document.getElementById('round-trip');
const oneWayInput = document.getElementById('one-way');
const returnDateInput = document.getElementById('return-date');

// Range elements for switching the number of passengers
const btnPlus = document.getElementById('btn-plus');
const btnMinus = document.getElementById('btn-minus');
const inputPassengerNumbers = document.getElementById('passenger-numbers');

export default function addEventHandlersToForm() {
    // Handle welcome section form submit
    welcomeForm.addEventListener('submit', (e) => {
        // don't reload the page
        e.preventDefault();
    });

    // disable/activate Return input when switching radio buttons
    roundTripInput.addEventListener('focus', () => {
        activateElement(returnDateInput);
    });

    oneWayInput.addEventListener('focus', () => {
        disableElement(returnDateInput);
    });

    // switching the number of passengers
    inputPassengerNumbers.addEventListener('input', validateInputPassengerNumbers);
    btnPlus.addEventListener('click', increaseNumOfPassengers);
    btnMinus.addEventListener('click', decreaseNumOfPassengers);

    // implement dropdown with stations in inputs
    addEventHandlersToInputsForStations();
}

function validateInputPassengerNumbers(e) {
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
}

function increaseNumOfPassengers() {
    inputPassengerNumbers.value++;
    if (inputPassengerNumbers.value > 1) {
        activateElement(btnMinus);
    }

    if (inputPassengerNumbers.value >= 12) {
        disableElement(btnPlus);
    }
}

function decreaseNumOfPassengers() {
    inputPassengerNumbers.value--;
    if (inputPassengerNumbers.value <= 1) {
        disableElement(btnMinus);
    }

    if (inputPassengerNumbers.value < 12) {
        activateElement(btnPlus);
    }
}

//TODO: сделать валидацию формы поиска: проверка корректности выбора станций (чтобы не совпадали), проверка даты (чтобы не была в прошлом)