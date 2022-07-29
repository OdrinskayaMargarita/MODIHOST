export default class {
    constructor() {
        this.header = document.getElementById('header');
        // this.langMenu = this.header.querySelector('.header__langs');
        this.hamburger = this.header.querySelector('.hamburger__wrapper');
        this.mobileMenu = this.header.querySelector('.mobile-menu__wrapper');

        this.bindEvents();
    }

    openLangMenu() {
        this.langMenu.classList.add('is-opened');
        // this.langMenu.classList.add('is-opening');
        // setTimeout(()=> {
        //     this.langMenu.classList.remove('is-opening');
        // }, 300);
        this.langMenu.querySelector('#header-langs-btn svg').style.transform = 'rotate(180deg)';
    }

    closeLangMenu() {
        // this.langMenu.classList.add('is-closing');
        // setTimeout(()=> {
            // this.langMenu.classList.remove('is-closing');
            this.langMenu.classList.remove('is-opened');
            this.langMenu.querySelector('#header-langs-btn svg').style.transform = '';
        // }, 300);
    }

    // mobile menu control

    openMobileMenu() {
        this.header.classList.add('is-mobile-menu-oppened');
        this.mobileMenu.classList.add('is-visible');
        this.mobileMenu.style.height = "0px";
        this.mobileMenu.style.height = document.documentElement.clientHeight - this.header.clientHeight + 'px';
        this.hamburger.classList.add('is-opened');
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('is-opened');
        this.mobileMenu.style.height = "0px";
        setTimeout(()=> {
            this.mobileMenu.classList.remove('is-visible');
            this.header.classList.remove('is-mobile-menu-oppened');
        }, 400);
    }



    bindEvents() {
        // document.getElementById('header-langs-btn').addEventListener('click', () => {
        //     if ( !this.langMenu.classList.contains('is-opened') ) {
        //         this.openLangMenu();
        //     } else {
        //         this.closeLangMenu();
        //     }
        // });

        document.getElementById('mobile-menu-btn').addEventListener('click', () => {
            if ( getComputedStyle(this.mobileMenu).display == 'none' ) {
                this.openMobileMenu();
            } else {
                this.closeMobileMenu();
            }
        });

        document.querySelectorAll('.mobile-menu__list a').forEach(item => {
            item.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

}
