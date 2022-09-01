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

window.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll('.tel'), function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = ""
        }
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)
    });
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
    const inputs = form.querySelectorAll('input')
    const textareas = form.querySelectorAll('textarea')
    Array.from([...inputs, ...textareas]).forEach(element => {
        const isTel = element.classList.contains('tel')
        const parent = element.parentNode
        const error = parent.querySelector('.form__error')
        const label = element.nextElementSibling
        if (error) error.dataset.text = error.textContent
        if (element.required) label.innerHTML = label.innerHTML + ' <span>*</span>'
        element.addEventListener('input', () => {
            const message = element.validationMessage
            if (parent.classList.contains('form__row_file')) return;

            if(isTel && element.value == '+7') element.value = ''

            if (element.value) {
                label.style.display = 'none'
                element.classList.add('no-empty')
            } else {
                label.style.display = ''
                element.classList.remove('no-empty')
            }


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

            if (isTel && element.value.length < 18 && error) {
                error.style.display = 'block'
                element.classList.add('invalid')
            } else if (isTel) {
                if (error) error.style.display = 'none'
                element.classList.remove('invalid')
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