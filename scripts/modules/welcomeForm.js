import { disableElement, activateElement } from "../utils/elementsAvailability.js";
import addEventHandlersToInputsForStations from "./dropdown.js";
import { validateInputsForStations, validateInputsForDate} from "./validateForm.js";

const welcomeForm = document.getElementById('welcome-section-form');
// Elements (radio buttons) to select the trip direction
const roundTripInput = document.getElementById('round-trip');
const oneWayInput = document.getElementById('one-way');
const departDateInput = document.getElementById('depart-date');
const returnDateInput = document.getElementById('return-date');

// Range elements for switching the number of passengers
const btnPlus = document.getElementById('btn-plus');
const btnMinus = document.getElementById('btn-minus');
const inputPassengerNumbers = document.getElementById('passenger-numbers');

export function customizeCalendar() {
    const config = {
        dateFormat: "j F Y",
        "locale": {
            "firstDayOfWeek": 1 // start week on Monday
        },
        disableMobile: "true",
    }
    flatpickr(departDateInput, config);
    flatpickr(returnDateInput, config);
}

export function addEventHandlersToForm() {
    // Handle welcome section form submit
    welcomeForm.addEventListener('submit', (e) => {
        handleFormSubmit(e);
    });

    // disable/activate Return input when switching radio buttons
    roundTripInput.addEventListener('focus', () => {
        activateElement(returnDateInput);
    });

    oneWayInput.addEventListener('focus', () => {
        returnDateInput.value = '';
        disableElement(returnDateInput);
        // remove the error if it was previously on return-date input
        validateInputsForDate();
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

function handleFormSubmit(e) {
    // don't reload the page
    e.preventDefault();

    const isFormValid = validateInputsForStations() && validateInputsForDate();
    if (isFormValid) {
        e.target.submit();

        const data = new FormData(e.target);
        const dataObject = Object.fromEntries(data);
        console.log(dataObject);
    }
}
