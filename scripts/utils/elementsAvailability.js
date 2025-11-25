export function disableElement(el) {
    el.setAttribute('disabled', '');
}

export function activateElement(el) {
    el.removeAttribute('disabled');
}

export function toggleNextSiblingElement(el) {
    const nextSibling = el.nextElementSibling;
    nextSibling.classList.toggle('--hidden');
}
