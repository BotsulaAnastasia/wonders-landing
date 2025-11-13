import debounce from "./utils/debounce.js";
import { switchEventHandlersOnBurgerElements } from "./modules/burger.js";
import addEventHandlersToForm from "./modules/welcomeForm.js";

const burgerIcon = document.querySelector('.burger');
const welcomeForm = document.getElementById('welcome-section-form');

// Implement open/close burger menu
if (burgerIcon) switchEventHandlersOnBurgerElements();

// handling welcome section form element events
if (welcomeForm) addEventHandlersToForm();

window.addEventListener('resize', debounce(handleWindowResize, 200));

function handleWindowResize() {
    if (burgerIcon) switchEventHandlersOnBurgerElements();
}
