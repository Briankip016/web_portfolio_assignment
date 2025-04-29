document.addEventListener('DOMContentLoaded', () => {
    // Counting animation (previous implementation)
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const animationDuration = 2000;
        const frameDuration = 1000 / 60;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const totalFrames = Math.round(animationDuration / frameDuration);
            let frame = 0;
            
            const counterAnimation = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const currentCount = Math.round(target * progress);
                
                counter.textContent = currentCount.toLocaleString();
                
                if (frame === totalFrames) {
                    clearInterval(counterAnimation);
                }
            }, frameDuration);
        });
    };

    // Read More functionality
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.service-card');
            card.classList.toggle('expanded');
            
            // Update button text
            btn.textContent = card.classList.contains('expanded') ? 'Read Less' : 'Read More';
            
            // Smooth scroll to maintain visibility
            if (card.classList.contains('expanded')) {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
});