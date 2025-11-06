import { addErrorClass, removeErrorClass } from "../utils/elementsAppearance.js";

export function validateInputsForStations() {
    const errorId = 'error-stations'
    const errorNode = document.getElementById(errorId);

    const departureInput = document.getElementById('departure');
    const arrivalInput = document.getElementById('arrival');

    // pre-delete the error
    if (errorNode !== null) {
        errorNode.remove();
        removeErrorClass(departureInput, arrivalInput);
    }

    if (departureInput.value === arrivalInput.value &&
        departureInput.value !== '' &&
        arrivalInput.value !== '') {
        const errorMessage = 'The stations can\'t be the same';
        return reportError(errorMessage, errorId, departureInput, arrivalInput); // return false
    }

    return true; // there are no errors
}

const inputsForDate = document.querySelectorAll('.text-input.--date');

inputsForDate.forEach(input => {
    input.addEventListener('input', validateInputsForDate);
});

export function validateInputsForDate() {
    const errorId = 'error-date';
    const errorNode = document.getElementById(errorId);

    const departDateInput = document.getElementById('depart-date');
    const returnDateInput = document.getElementById('return-date');

    const inputs = [departDateInput, returnDateInput];

    const currentDate = new Date();

    // pre-delete the error
    if (errorNode !== null) {
        errorNode.remove();
        removeErrorClass(...inputs);
    }

    // the first check is that both dates are not in the past
    const invalidInputs = inputs.filter(input => new Date(input.value) < currentDate);
    if (invalidInputs.length > 0) {
        const errorMessage = 'The date can\'t be earlier or the same as the current one';
        return reportError(errorMessage, errorId, ...invalidInputs); // return false
    } else if (new Date(returnDateInput.value) < new Date(departDateInput.value)) {
        // the second check is that the return date is not earlier than the departure date.
        const errorMessage = 'The date of return can\'t be earlier than the date of departure';
        return reportError(errorMessage, errorId, departDateInput, returnDateInput); // return false
    }

    return true; // there are no errors
}

function reportError(errorMessage, errorId, ...inputs) {
    // find the parent element of the inputs, after which to add the error
    const inputsGroup = inputs[0].closest('fieldset');
    // create and add error element to the DOM
    inputsGroup.after(createErrorElement(errorMessage, errorId));
    // add a red outline
    addErrorClass(...inputs);

    return false;
}

function createErrorElement(errorMessage, errorId) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.id = errorId;
    errorElement.innerText = errorMessage;

    return errorElement;
}