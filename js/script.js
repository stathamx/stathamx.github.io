// Модальное окно с мемом по клику на логотип
const modal = document.getElementById('memModal');
const logo = document.getElementById('logo');
const closeBtn = document.querySelector('.close');

// Открыть модалку
logo.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Закрыть по крестику
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрыть по клику вне окна
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Анимация появления блоков при скролле
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