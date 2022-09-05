document.addEventListener('DOMContentLoaded', () => {
    const tag = document.querySelector('#nav-mobile');

    document.querySelector('.sidenav-trigger').addEventListener('click', (event) => {
        event.stopPropagation();
        tag.classList.add('active')
    });

    document.addEventListener('click', () => {
        tag.classList.remove('active')
    });

    document.addEventListener('scroll', () => {
        const value = window.scrollY
        const elem = document.querySelector('.scroll-top')
        if (value > 60) {
            elem.style.opacity = 1;
        }

        if (value < 50) {
            elem.style.opacity = 0;
        }
    });

    document.querySelector('.scroll-top').addEventListener('click', () => {
        window.scrollTo(0, 0)
    });

    const cookieElem = document.querySelector('.cookie');
    cookieElem.addEventListener('click', (event) => {
        window.localStorage.setItem('cookie', true);
        cookieElem.style.display = 'none';

    });
    const newVisitor = !window.localStorage.getItem('cookie');
    if (newVisitor) {
        cookieElem.style.display = 'block';
    }

    // const popUp = document.querySelector('.pop-up')
    // const popUpState = sessionStorage.getItem('popup')
    // if (!popUpState) {
    //     popUp.style.display = 'flex' ;
    // }


    // if ( popUp) {
    //     popUp.addEventListener('click',()=>{
    //         popUp.style.display = 'none' ;
    //         sessionStorage.setItem('popup', true)
    //     });
    // }
});