// Ждём загрузку DOM
document.addEventListener('DOMContentLoaded', () => {
    // --- Модальное окно для мема ---
    const memModal = document.getElementById('memModal');
    const logo = document.getElementById('logo');
    const memBtn = document.getElementById('memBtn');
    const closeMem = memModal?.querySelector('.close');

    if (memModal && logo && memBtn && closeMem) {
        function openMemModal() {
            memModal.style.display = 'flex';
        }

        logo.addEventListener('click', openMemModal);
        memBtn.addEventListener('click', openMemModal);

        closeMem.addEventListener('click', () => {
            memModal.style.display = 'none';
        });
    }

    // --- Модальное окно для калькулятора ---
    const calcModal = document.getElementById('calcModal');
    const calcBtn = document.getElementById('calcBtn');
    const closeCalc = document.getElementById('closeCalc');

    if (calcModal && calcBtn && closeCalc) {
        calcBtn.addEventListener('click', () => {
            calcModal.style.display = 'flex';
        });

        closeCalc.addEventListener('click', () => {
            calcModal.style.display = 'none';
        });
    }

    // --- Закрытие модалок по клику вне окна ---
    window.addEventListener('click', (event) => {
        if (memModal && event.target === memModal) {
            memModal.style.display = 'none';
        }
        if (calcModal && event.target === calcModal) {
            calcModal.style.display = 'none';
        }
    });

    // --- Анимация появления блоков при скролле ---
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    fadeElements.forEach(el => observer.observe(el));
});