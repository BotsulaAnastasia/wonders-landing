import debounce from "../utils/debounce.js";
import { Stations as STATIONS } from "../mocks/stations.js";
import { toggleNextSiblingElement } from "../utils/elementsAvailability.js";

const inputsForStations = document.querySelectorAll('.text-input.--stations');

export default function addEventHandlersToInputsForStations() {
    inputsForStations.forEach((input) => {
        input.addEventListener('focus', (e) => {
            // Show the dropdown after focus on the input
            toggleNextSiblingElement(e.target);

            renderDropdownContent(e);
        });

        // Hidden the dropdown after blur the input
        input.addEventListener('blur', (e) => toggleNextSiblingElement(e.target));

        input.addEventListener('keyup', debounce(renderDropdownContent, 200));
    });
}

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