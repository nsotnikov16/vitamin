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