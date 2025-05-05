document.querySelectorAll('.accordion-question').forEach((question) => {
    question.addEventListener('click', () => {
        const targetId = question.getAttribute('data-target');
        const targetAnswer = document.getElementById(targetId);
        targetAnswer.classList.toggle('expanded');
    });
});