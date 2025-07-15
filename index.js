// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded ✨');

    // Animate skill progress bars when they come into view
    const progressBars = document.querySelectorAll('progress');
    const skillSection = document.getElementById('skill-section');

    // Initially set progress to 0
    progressBars.forEach(bar => {
        const originalValue = bar.value;
        bar.setAttribute('data-value', originalValue);
        bar.value = 0;
    });

    // Function to animate progress bars
    function animateProgressBars() {
        const sectionPosition = skillSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if(sectionPosition < screenPosition) {
            progressBars.forEach(bar => {
                const targetValue = bar.getAttribute('data-value');
                let currentValue = 0;
                const increment = targetValue / 30; // Animate over 30 steps

                const interval = setInterval(() => {
                    currentValue += increment;
                    bar.value = currentValue;

                    if(currentValue >= targetValue) {
                        bar.value = targetValue;
                        clearInterval(interval);
                    }
                }, 20);
            });

            // Remove the scroll event once animation is triggered
            window.removeEventListener('scroll', animateProgressBars);
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', animateProgressBars);

    // Create and add back-to-top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.display = 'none';
    document.body.appendChild(backToTopBtn);

    // Show/hide back-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Check if progress bars should be animated on page load
    animateProgressBars();
});
