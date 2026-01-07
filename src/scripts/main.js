document.addEventListener('DOMContentLoaded', () => {
    initCarousels();
    initFaq();
    initFooter();
});

class Carousel {
    constructor({ listSelector, btnPrevSelector, btnNextSelector, scrollType = 'step' }) {
        this.list = document.querySelector(listSelector);
        this.btnPrev = document.querySelector(btnPrevSelector);
        this.btnNext = document.querySelector(btnNextSelector);
        this.scrollType = scrollType;

        if (!this.list || !this.btnPrev || !this.btnNext) return;

        this.init();
    }

    init() {
        this.addListeners();
        this.updateButtons();

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.updateButtons(), 100);
        });

        setTimeout(() => this.updateButtons(), 500);
    }

    addListeners() {
        this.list.addEventListener('scroll', () => this.updateButtons());

        this.btnPrev.addEventListener('click', () => this.scroll('prev'));
        this.btnNext.addEventListener('click', () => this.scroll('next'));

        if (this.scrollType === 'step') {
            this.btnPrev.addEventListener('mouseenter', () => this.scroll('prev'));
            this.btnNext.addEventListener('mouseenter', () => this.scroll('next'));
        }
    }

    scroll(direction) {
        const isNext = direction === 'next';

        if (this.scrollType === 'boundary') {
            const target = isNext ? (this.list.scrollWidth - this.list.clientWidth) : 0;
            const currentDiff = Math.abs(this.list.scrollLeft - target);

            if (currentDiff > 10) {
                this.list.scrollTo({ left: target, behavior: 'smooth' });
            }
        } else {
            const item = this.list.firstElementChild;
            if (!item) return;

            const itemWidth = (item.offsetWidth || item.querySelector('img').offsetWidth) + 16;
            const signal = isNext ? 1 : -1;

            this.list.scrollBy({ left: itemWidth * signal, behavior: 'smooth' });
        }
    }

    updateButtons() {
        const maxScrollLeft = this.list.scrollWidth - this.list.clientWidth;
        const isAtStart = this.list.scrollLeft <= 10;
        const isAtEnd = Math.abs(this.list.scrollLeft - maxScrollLeft) < 10;

        this.btnPrev.disabled = isAtStart;
        this.btnNext.disabled = isAtEnd;
    }
}

function initCarousels() {
    new Carousel({
        listSelector: '.sport__carousel',
        btnPrevSelector: '.sport__carousel__button.prev',
        btnNextSelector: '.sport__carousel__button.next',
        scrollType: 'boundary'
    });

    new Carousel({
        listSelector: '.ranking__carousel',
        btnPrevSelector: '.ranking__carousel__button.prev',
        btnNextSelector: '.ranking__carousel__button.next',
        scrollType: 'step'
    });
}

function initFaq() {
    const questions = document.querySelectorAll('[data-faq-question]');
    questions.forEach(question => {
        question.addEventListener('click', (e) => {
            const item = e.currentTarget.parentNode;
            item.classList.toggle('faq__questions__item--is-open');
        });
    });
}

function initFooter() {
    const footerToggles = document.querySelectorAll('[data-footer-toggle]');
    footerToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const column = toggle.closest('.footer__accordion');
            column.classList.toggle('footer__accordion--is-open');
        });
    });
}

window.toggleButtonPlay = function () {
    const btnPlay = document.querySelector('.carousel__indicator__icon--play');
    const icon = btnPlay.querySelector('i');
    const carouselEl = document.querySelector('#heroCarousel');

    const carouselBootstrap = bootstrap.Carousel.getOrCreateInstance(carouselEl);

    if (icon.classList.contains('fa-grip-lines-vertical')) {
        carouselBootstrap.pause();
        icon.classList.replace('fa-grip-lines-vertical', 'fa-play');
    } else {
        carouselBootstrap.cycle();
        icon.classList.replace('fa-play', 'fa-grip-lines-vertical');
    }
};