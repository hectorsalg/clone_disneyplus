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
});