// Проверка поддержки webp
function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
// Добавление класса _webp или _no-webp для HTML
testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
});


const header = document.querySelector('.header')
const headerContactCopy = header.querySelector('.header__contact').cloneNode(true)
const headerMenuCopy = header.querySelector('.header__menu').cloneNode(true)
const headerMobile = header.querySelector('.header__mobile')
const burger = header.querySelector('.header__burger')
Array.from([headerMenuCopy, headerContactCopy]).forEach(element => {
    headerMobile.append(element)
});
burger.addEventListener('click', () => header.classList.toggle('open'))


const form = document.querySelector('.form')
if (form) {
    const inputs = form.querySelectorAll('input')
    const textareas = form.querySelectorAll('textarea')
    Array.from([...inputs, ...textareas]).forEach(element => {
        const parent = element.parentNode
        const error = parent.querySelector('.form__error')
        if (error) error.dataset.text = error.textContent

        element.addEventListener('input', () => {
            if (parent.classList.contains('form__row_file')) return;
            const label = element.nextElementSibling
            if (element.value) {
                label.style.display = 'none'
                element.classList.add('no-empty')
            } else {
                label.style.display = ''
                element.classList.remove('no-empty')
            }

            if (!element.validity.valid && error) {
                const message = element.validationMessage
                if (message && element.value) {
                    error.textContent = message
                } else {
                    error.textContent = error.dataset.text
                }
                error.style.display = 'block'
                element.classList.add('invalid')
            } else {
                if (error) error.style.display = 'none'

                element.classList.remove('invalid')
            }
        })
    })
}