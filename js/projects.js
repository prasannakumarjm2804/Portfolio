// projects.js

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                        // Add animation for reappearance
                        card.classList.add('animate-fade-up');
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('animate-fade-up');
                    }
                });
            });
        });
    }
});
