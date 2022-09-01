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

/* Шапка */
const header = document.querySelector('.header')
const headerContactCopy = header.querySelector('.header__contact').cloneNode(true)
const headerMenuCopy = header.querySelector('.header__menu').cloneNode(true)
const headerMobile = header.querySelector('.header__mobile')
const burger = header.querySelector('.header__burger')
Array.from([headerMenuCopy, headerContactCopy]).forEach(element => {
    headerMobile.append(element)
});
burger.addEventListener('click', () => header.classList.toggle('open'))


/* Форма */
const form = document.querySelector('.form')
if (form) {
    const phone = form.querySelector('#phone')
    let maskPhone
    if (phone) {
        let im = new Inputmask("+7 (999)-999-99-99", { showMaskOnHover: false, alias: 'phonebe' });
        maskPhone = im.mask(phone)
    }

    const inputs = form.querySelectorAll('input')
    const textareas = form.querySelectorAll('textarea')
    Array.from([...inputs, ...textareas]).forEach(element => {
        const parent = element.parentNode
        const error = parent.querySelector('.form__error')
        const label = element.nextElementSibling
        if (error) error.dataset.text = error.textContent
        if (element.required) label.innerHTML = label.innerHTML + ' <span>*</span>'
        element.addEventListener('input', () => {
            const message = element.validationMessage
            if (parent.classList.contains('form__row_file')) return;


            if (element.value) {
                label.style.display = 'none'
                element.classList.add('no-empty')
            } else {
                label.style.display = ''
                element.classList.remove('no-empty')
            }

            if (element != phone) {
                if (!element.validity.valid && error) {
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
            } else if (element == phone) {
                if (!maskPhone.isComplete() && error) {
                    error.style.display = 'block'
                    element.classList.add('invalid')
                } else {
                    if (error) error.style.display = 'none'
                    element.classList.remove('invalid')
                }
            }


        })
    })
}

/* Спойлеры */
const spoilers = document.querySelectorAll('.spoiler')
if (spoilers.length > 0) {
    spoilers.forEach(spoiler => {
        const top = spoiler.querySelector('.spoiler__top')
        top.addEventListener('click', () => spoiler.classList.toggle('spoiler_open'))
    })
}