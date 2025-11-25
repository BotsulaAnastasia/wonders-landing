const burgerIcon = document.querySelector('.burger');
const headerMenu = document.querySelector('.header-menu');
const HTML = document.querySelector('html');

// when changing the screen width > 768 (i.e. when there are no burger menu icon), delete the event listener, otherwise add it
export function switchEventHandlersOnBurgerElements() {
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

function handleBurgerIconClick() {
    toggleMenu();

    if (burgerIcon.classList.contains('--open')) {
        headerMenu.addEventListener('click', handleHeaderMenuClick)
    }
}

function handleHeaderMenuClick(e) {
    if (e.target.classList.contains('header-menu-item') ||
        e.target.closest('.header-menu-item')) {
        toggleMenu();
        headerMenu.removeEventListener('click', handleHeaderMenuClick);
    }
}

function toggleMenu() {
    burgerIcon.classList.toggle('--open');
    headerMenu.classList.toggle('--open');
    HTML.classList.toggle('--lock');
}
