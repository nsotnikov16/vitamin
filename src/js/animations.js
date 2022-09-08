// документация https://michalsnik.github.io/aos/

// :nth-child(odd) - нечетные
// :nth-child(even) - четные
// every - для каждого
// everyDelay - увеличивать задержку на определенное кол-во мс


const animations = [
    { selector: '.section__title', animations: { aos: 'fade-up', aosDelay: 200, aosDuration: 900 } },
    { selector: '.banner__title', animations: { aos: 'fade-up', aosDelay: 200, aosDuration: 900 } },
    { selector: '.banner__subtitle', animations: { aos: 'fade-right', aosDelay: 300, aosDuration: 900 } },
    { selector: '.banner > picture', animations: { aos: 'fade-left', aosDelay: 300, aosDuration: 900 } },
    { selector: '.banner > img', animations: { aos: 'fade-left', aosDelay: 300, aosDuration: 900 } },
    { selector: '.task:nth-child(odd)', animations: { aos: 'fade-left', aosDelay: 300, aosDuration: 900 } },
    { selector: '.task:nth-child(even)', animations: { aos: 'fade-right', aosDelay: 300, aosDuration: 900 } },
    { selector: '.case', animations: { aos: 'fade-up', aosDelay: 100, aosDuration: 400 }, every: true, everyDelay: 100 },
    { selector: '.pride__left', animations: { aos: 'fade-down', aosDelay: 300, aosDuration: 900 } },
    { selector: '.achievements li:nth-child(odd)', animations: { aos: 'fade-left', aosDelay: 200, aosDuration: 900 }, every: true, everyDelay: 100 },
    { selector: '.achievements li:nth-child(even)', animations: { aos: 'fade-right', aosDelay: 200, aosDuration: 900 }, every: true, everyDelay: 100 },
    { selector: '.form', animations: { aos: 'fade-up', aosDelay: 300, aosDuration: 900 } },
    { selector: '.doit__info', animations: { aos: 'fade-right', aosDelay: 300, aosDuration: 900 } },
    { selector: '.prices__left', animations: { aos: 'fade-right', aosDelay: 300, aosDuration: 900 } },
    { selector: '.spoilers', animations: { aos: 'fade-up', aosDelay: 300, aosDuration: 900 } },
]