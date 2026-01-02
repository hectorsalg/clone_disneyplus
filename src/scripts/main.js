document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.sport__carousel');
    const btnPrev = document.querySelector('.sport__carousel__button.prev');
    const btnNext = document.querySelector('.sport__carousel__button.next');

    const goToStart = () => {
        carousel.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    };

    const goToEnd = () => {
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        carousel.scrollTo({
            left: maxScrollLeft,
            behavior: 'smooth'
        });
    };

    btnNext.addEventListener('click', () => {
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        const isAtEnd = Math.abs(carousel.scrollLeft - maxScrollLeft) < 10;

        if (!isAtEnd) {
            goToEnd();
        }
    });

    btnPrev.addEventListener('click', () => {
        const isAtStart = carousel.scrollLeft <= 10;

        if (!isAtStart) {
            goToStart();
        }
    });

    const updateButtons = () => {
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

        const isAtStart = carousel.scrollLeft <= 10;

        const isAtEnd = Math.abs(carousel.scrollLeft - maxScrollLeft) < 10;

        btnPrev.disabled = isAtStart;
        btnNext.disabled = isAtEnd;
    };

    carousel.addEventListener('scroll', updateButtons);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateButtons, 100);
    });

    updateButtons();

    setTimeout(updateButtons, 500);
});