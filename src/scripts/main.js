document.addEventListener('DOMContentLoaded', () => {
    // Carousel Sports
    const carouselSport = document.querySelector('.sport__carousel');
    const btnPrevSport = document.querySelector('.sport__carousel__button.prev');
    const btnNextSport = document.querySelector('.sport__carousel__button.next');

    const goToStart = () => {
        carouselSport.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    };

    const goToEnd = () => {
        const maxScrollLeft = carouselSport.scrollWidth - carouselSport.clientWidth;
        carouselSport.scrollTo({
            left: maxScrollLeft,
            behavior: 'smooth'
        });
    };

    btnNextSport.addEventListener('click', () => {
        const maxScrollLeft = carouselSport.scrollWidth - carouselSport.clientWidth;
        const isAtEnd = Math.abs(carouselSport.scrollLeft - maxScrollLeft) < 10;

        if (!isAtEnd) {
            goToEnd();
        }
    });

    btnPrevSport.addEventListener('click', () => {
        const isAtStart = carouselSport.scrollLeft <= 10;

        if (!isAtStart) {
            goToStart();
        }
    });

    const updateButtonsSport = () => {
        const maxScrollLeft = carouselSport.scrollWidth - carouselSport.clientWidth;

        const isAtStart = carouselSport.scrollLeft <= 10;

        const isAtEnd = Math.abs(carouselSport.scrollLeft - maxScrollLeft) < 10;
        btnPrevSport.disabled = isAtStart;
        btnNextSport.disabled = isAtEnd;
    };

    carouselSport.addEventListener('scroll', updateButtonsSport);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateButtonsSport, 100);
    });

    updateButtonsSport();

    setTimeout(updateButtonsSport, 500);

    // Carousel Ranking
    const carouselRanking = document.querySelector('.ranking__carousel');
    const btnPrevRanking = document.querySelector('.ranking__carousel__button.prev');
    const btnNextRanking = document.querySelector('.ranking__carousel__button.next');

    const item = carouselRanking.querySelector('.ranking__carousel__item');
    const itemWidth = item.offsetWidth + 16;

    const updateButtonsRanking = () => {
        const maxScrollLeft = carouselRanking.scrollWidth - carouselRanking.clientWidth;

        const isAtStart = carouselRanking.scrollLeft <= 10;
        const isAtEnd = Math.abs(carouselRanking.scrollLeft - maxScrollLeft) < 10;

        btnPrevRanking.disabled = isAtStart;
        btnNextRanking.disabled = isAtEnd;
    };

    const scrollNextRanking = () => {
        carouselRanking.scrollBy({
            left: itemWidth,
            behavior: 'smooth'
        });
    };

    btnNextRanking.addEventListener('click', scrollNextRanking);
    btnNextRanking.addEventListener('mouseenter', scrollNextRanking);


    const scrollPrevRanking = () => {
        carouselRanking.scrollBy({
            left: -itemWidth,
            behavior: 'smooth'
        });
    };

    btnPrevRanking.addEventListener('click', scrollPrevRanking);
    btnPrevRanking.addEventListener('mouseenter', scrollPrevRanking);

    carouselRanking.addEventListener('scroll', updateButtonsRanking);
    window.addEventListener('resize', updateButtonsRanking);

    updateButtonsRanking();

    setTimeout(updateButtonsRanking, 500);

    // FAQ
    const questions = document.querySelectorAll('[data-faq-question]')

    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', openFaq)
    }

    // Footer Mobile
    const footerToggles = document.querySelectorAll('[data-footer-toggle]');

    footerToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const column = toggle.closest('.footer__accordion');
            column.classList.toggle('footer__accordion--is-open');
        });
    });
});

function toggleButtonPlay() {
    const btnPlay = document.querySelector('.carousel__indicator__icon--play')
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
}

function openFaq(element) {
    const father = element.target.parentNode;

    father.classList.toggle('faq__questions__item--is-open')
}