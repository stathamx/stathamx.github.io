document.addEventListener('DOMContentLoaded', () => {
    
    // --- Модальные окна ---
    const setupModal = (modalId, btnId, closeId) => {
        const modal = document.getElementById(modalId);
        const btn = document.getElementById(btnId);
        const close = document.getElementById(closeId);

        if (btn && modal) {
            btn.onclick = () => modal.style.display = 'flex';
            close.onclick = () => modal.style.display = 'none';
            window.addEventListener('click', (e) => {
                if (e.target === modal) modal.style.display = 'none';
            });
        }
    };

    setupModal('memModal', 'memBtn', 'closeMem');
    setupModal('calcModal', 'calcBtn', 'closeCalc');

    // --- Калькулятор КБЖУ ---
    window.calculateKBJU = () => {
        const gender = document.getElementById('gender').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const age = parseFloat(document.getElementById('age').value);
        const activity = parseFloat(document.getElementById('activity').value);
        const goal = document.getElementById('goal').value;

        if (!weight || !height || !age) {
            alert('Заполни все поля, боец!');
            return;
        }

        // Формула Миффлина-Сан Жеора
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        bmr = (gender === 'male') ? bmr + 5 : bmr - 161;

        let tdee = bmr * activity; // Поддержание
        
        let targetCalories;
        if (goal === 'weight_loss') targetCalories = tdee * 0.8;
        else if (goal === 'weight_gain') targetCalories = tdee * 1.2;
        else targetCalories = tdee;

        // Расчет макросов
        const protein = weight * 2; // 2г на кг
        const fats = weight * 1;    // 1г на кг
        const carbs = (targetCalories - (protein * 4) - (fats * 9)) / 4;

        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'grid';
        resultDiv.innerHTML = `
            <div class="res-card">
                <span class="res-val">${Math.round(targetCalories)}</span>
                <span class="res-label">ККАЛ / ДЕНЬ</span>
            </div>
            <div class="res-card">
                <span class="res-val">${Math.round(protein)}г</span>
                <span class="res-label">БЕЛКИ</span>
            </div>
            <div class="res-card">
                <span class="res-val">${Math.round(fats)}г</span>
                <span class="res-label">ЖИРЫ</span>
            </div>
            <div class="res-card">
                <span class="res-val">${Math.round(carbs)}г</span>
                <span class="res-label">УГЛЕВОДЫ</span>
            </div>
        `;
    };

    // --- Анимация появления ---
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Плавный скролл для ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});