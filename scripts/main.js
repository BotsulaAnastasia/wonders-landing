import debounce from "./utils/debounce.js";
import { switchEventHandlersOnBurgerElements } from "./modules/burger.js";
import addEventHandlersToForm from "./modules/welcomeForm.js";

// Implement open/close burger menu
switchEventHandlersOnBurgerElements();

// handling welcome section form element events
addEventHandlersToForm();

window.addEventListener('resize', debounce(handleWindowResize, 200));

function handleWindowResize() {
    switchEventHandlersOnBurgerElements();
}
