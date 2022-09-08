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

// Анимации

function addAnimate(elementSelector, animations, every = false, everyDelay = false) {
    const elements = Array.from(document.querySelectorAll(elementSelector))
    if (!elements.length) return
    elements.forEach(element => Object.entries(animations).forEach(animation => element.dataset[animation[0]] = animation[1]))
    if (every && everyDelay) {
        animations.aosDelay += everyDelay
        elements.filter(element => element.dataset.aosDelay && element.dataset.aos).forEach((element, index) => {
            if (index != 0) {
                element.dataset.aosDelay = animations.aosDelay
                animations.aosDelay += everyDelay
            }
        })
    }
}

function customDelay(elementSelector, delay) {
    const elements = document.querySelectorAll(elementSelector)
    if (!elements.length) return
    elements.forEach(element => {
        element.classList.remove('aos-animate')
        setTimeout(() => {
            element.classList.add('aos-animate')
        }, delay);
    })
}

animations.forEach(animation => addAnimate(animation.selector, animation.animations, animation.every ?? false, animation.everyDelay ?? false))

AOS.init({
    once: true
});

// Запуск анимаций на старте (без прокрутки)
document.addEventListener('DOMContentLoaded', () => {
    customDelay('.banner__title', 200)
    customDelay('.banner__subtitle', 300)
    customDelay('.banner >img', 500)
    customDelay('.doit .section__title', 200)
    customDelay('.doit__info', 200)
})

/* Маска */
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
burger.addEventListener('click', () => {
    header.classList.toggle('open')
    if (header.classList.contains('open_fixed')) header.classList.remove('open_fixed')
})


/* Кнопка все кейсы */
const btnAllCases = document.querySelector('.btn-cases')
const cases = document.querySelectorAll('.case')
const MAX_CASES = 8
if (cases.length <= MAX_CASES) {
    btnAllCases.remove()
} else {
    cases.forEach((item, index) => index + 1 > MAX_CASES ? item.style.display = 'none' : '')
    btnAllCases.addEventListener('click', () => {
        btnAllCases.remove()
        cases.forEach((item, index) => index + 1 > MAX_CASES ? item.style.display = 'block' : '')
    })
}

cases.forEach(item => {
    item.addEventListener('mousemove', () => item.style.transitionDelay = '0s')
})


/* Форма */
const form = document.querySelector('.form')
if (form) {
    let files = [];

    const inputs = form.querySelectorAll('input')
    const textareas = form.querySelectorAll('textarea')
    const formElements = Array.from([...inputs, ...textareas])
    formElements.forEach(element => {
        const isTel = element.classList.contains('tel')
        const parent = element.parentNode
        const error = parent.querySelector('.form__error')
        const label = element.nextElementSibling
        label.dataset.text = label.textContent
        if (error) error.dataset.text = error.textContent
        if (element.required) label.innerHTML = label.innerHTML + ' <span>*</span>'
        element.addEventListener('input', () => {
            const message = element.validationMessage

            if (element.type === 'file') {
                files = [...element.files]
                let fileName = files[0].name
                if (files.length > 0) {
                    const fileNameText = parent.querySelector('.form__filename')
                    if (fileNameText) fileNameText.remove()
                    parent.insertAdjacentHTML('beforeend', `<div class="form__filename">${fileName.length > 40 ? '...' + fileName.slice(fileName.length - 40) : fileName} <button type="button"></button></div>`);
                    label.textContent = ''
                    const button = parent.querySelector('.form__filename button')
                    if (button) button.addEventListener('click', () => {
                        parent.querySelector('.form__filename').remove()
                        label.textContent = label.dataset.text
                        files = []
                    })
                }
            }

            if (parent.classList.contains('form__row_file')) return;

            if (isTel && element.value == '+7') element.value = ''

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

    form.addEventListener('submit', (e) => {
        e.preventDefault()

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


// Плавный скролл
const anchors = [].slice.call(document.querySelectorAll('.scroll')),
    animationTime = 400,
    framesCount = 20;

function scroll(item) {
    let element = document.querySelector(item.getAttribute('href'))
    if (!element) return
    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = element.getBoundingClientRect().top + window.pageYOffset;

    // запускаем интервал, в котором
    let scroller = setInterval(function () {
        // считаем на сколько скроллить за 1 такт
        let scrollBy = coordY / framesCount;

        // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
        // и дно страницы не достигнуто
        if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {

            // то скроллим на к-во пикселей, которое соответствует одному такту
            window.scrollBy(0, scrollBy);
        } else {
            // иначе добираемся до элемента и выходим из интервала
            window.scrollTo(0, coordY);
            clearInterval(scroller);
        }
        // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);

}

anchors.forEach(item => item.addEventListener('click', (e) => {
    e.preventDefault()
    if (item.closest('.header')) header.className = 'header'
    scroll(item)
}))

function up() {
    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if (top > 0) {
        window.scrollBy(0, ((top + 300) / -10));
        t = setTimeout('up()', 20);
    } else clearTimeout(t);
    return false;
}



/* Нижняя панель на мобилке */
const panel = document.querySelector('.panel')
if (panel) {
    const setPositionPanel = () => {
        const scroll = Math.ceil(window.scrollY)
        if (scroll > 560) panel.classList.remove('no-fixed')
        if (scroll <= 560) panel.classList.add('no-fixed')
    }
    setPositionPanel()
    window.addEventListener('scroll', setPositionPanel)

    const panelSocials = panel.querySelector('.panel__socials')
    const links = panelSocials.querySelectorAll('a')
    links.forEach((link, index) => {
        if (index === 0) {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                panelSocials.classList.toggle('panel__socials_open')
            })
        } else {
            link.addEventListener('click', ({ target }) => {
                console.log(target)
                links[0].setAttribute('class', link.className)
                panelSocials.classList.remove('panel__socials_open')
            })
        }
    })

    const menuButton = panel.querySelector('.panel__item')
    menuButton.addEventListener('click', () => header.className = 'header open open_fixed')
}

// Popups
class Popup {
    constructor(popupElement) {
        this.popupElement = popupElement;
        this._closeButton = this.popupElement.querySelector('.popup__close');
        this._img = this.popupElement.querySelector('.popup__img') ?? ''
        this._video = this.popupElement.querySelector('.video') ?? ''
        this._videoClone = this._video ? this._video.innerHTML : ''
        this._handleEscClose = this._handleEscClose.bind(this)
        this._openingLinks = document.querySelectorAll(`[data-pointer="${this.popupElement.id}"]`)
        this.setEventListeners()
    }

    open(el) {
        document.body.style.overflow = "hidden";
        this.popupElement.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose);
        if (this._img && el.src) this._img.src = el.src
        if (this._video) this._video.innerHTML = this._videoClone
    }

    close() {
        this.popupElement.classList.remove('popup_opened');
        document.body.style.overflow = "visible";
        document.removeEventListener('keydown', this._handleEscClose);
        if (this.popupElement.id === 'stories') stories.reset()
        if (this._video) this._video.innerHTML = ''
    }

    _handleEscClose(evt) {
        if (evt.keyCode === 27) {
            this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._openingLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); this.open(e.target) }))
        this._closeButton.addEventListener('click', () => this.close());
        this.popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
    }
}

const popups = document.querySelectorAll('.popup')
let arrPopups = {}
document.addEventListener('DOMContentLoaded', () => {
    if (popups.length > 0) popups.forEach(item => {
        const popup = new Popup(item)
        arrPopups[item.id] = popup
    })
})


/* const anim = lottie
const a = anim.loadAnimation({
    container: document.querySelector('#lottie-test'),
    render: 'canvas',
    loop: true,
    autoplay: true, 
    path: './js/lottie.json'
}) */
