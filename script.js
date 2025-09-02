const burgerIcon = document.querySelector('.burger');
const headerMenu = document.querySelector('.header-menu');
const HTML = document.querySelector('html');

function toggleMenu () {
    burgerIcon.classList.toggle('--open');
    headerMenu.classList.toggle('--open');
    HTML.classList.toggle('--lock');
}

if (burgerIcon) {
    burgerIcon.addEventListener('click', toggleMenu)

    headerMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('header-menu-item') ||
            e.target.parentNode.classList.contains('header-menu-item')) {
            toggleMenu();
        }
    })
}
