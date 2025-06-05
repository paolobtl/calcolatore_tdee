document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tdee-form');
    const results = document.getElementById('results');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateTDEE();
    });

    function calculateTDEE() {
        // Get form values
        const gender = document.getElementById('gender').value;
        const age = parseFloat(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const bodyfat = document.getElementById('bodyfat').value;
        const activity = parseFloat(document.getElementById('activity').value);
        const goal = document.getElementById('goal').value;

        let bmr;

        // Calculate BMR using Katch-McArdle if bodyfat is provided, otherwise use Mifflin-St Jeor
        if (bodyfat && bodyfat > 0) {
            // Katch-McArdle Formula
            const leanMass = weight * (1 - (bodyfat / 100));
            bmr = 370 + (21.6 * leanMass);
        } else {
            // Mifflin-St Jeor Formula
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }
        }

        // Calculate TDEE
        let tdee = bmr * activity;

        // Adjust calories based on goal and gender
        let adjustedCalories = tdee;
        if (goal === 'lose') {
            // Reduce calories based on gender
            if (gender === 'male') {
                adjustedCalories = tdee - 500; // -500 kcal per uomini
            } else {
                adjustedCalories = tdee - 350; // -350 kcal per donne
            }
        } else if (goal === 'gain') {
            // Increase calories based on gender
            if (gender === 'male') {
                adjustedCalories = tdee + 500; // +500 kcal per uomini
            } else {
                adjustedCalories = tdee + 350; // +350 kcal per donne
            }
        }

        // Display results
        document.getElementById('base-tdee').textContent = Math.round(tdee);
        document.getElementById('adjusted-tdee').textContent = Math.round(adjustedCalories);
        results.classList.remove('hidden');

        // Scroll to results
        results.scrollIntoView({ behavior: 'smooth' });
    }
}); 