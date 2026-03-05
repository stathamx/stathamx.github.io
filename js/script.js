document.addEventListener('DOMContentLoaded', () => {
    
    const setupModal = (modalId, btnId, closeId) => {
        const modal = document.getElementById(modalId);
        const btn = document.getElementById(btnId);
        const close = document.getElementById(closeId);

        if (btn && modal) {
            btn.onclick = (e) => {
                e.preventDefault();
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            };
            
            const closeModal = () => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            };

            close.onclick = closeModal;
            
            window.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }
    };

    setupModal('calcModal', 'calcBtn', 'closeCalc');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});