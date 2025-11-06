export function addErrorClass(...elements) {
    elements.forEach(element => element.classList.add('--error'));
}

export function removeErrorClass(...elements) {
    elements.forEach(element => element.classList.remove('--error'));
}