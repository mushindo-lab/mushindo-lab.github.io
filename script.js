document.addEventListener('DOMContentLoaded', () => {
    initPortfolioModal();
    initContactForm();
});

/**
 * Portfolio modal: open/close, click-outside, Escape key,
 * and Prev/Next navigation through the portfolio slides.
 */
function initPortfolioModal() {
    const trigger = document.getElementById('portfolioTrigger');
    const modal = document.getElementById('magazineModal');
    const closeBtn = document.getElementById('closeModal');
    const track = document.getElementById('magazineTrack');
    const slides = track ? Array.from(track.children) : [];
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const counter = document.getElementById('slideCounter');

    if (!trigger || !modal || !closeBtn || !track) return;

    let lastFocused = null;
    let currentIndex = 0;

    const render = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        if (counter) counter.textContent = `${currentIndex + 1} / ${slides.length}`;
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;
    };

    const goTo = (index) => {
        currentIndex = Math.max(0, Math.min(slides.length - 1, index));
        render();
    };

    const openModal = () => {
        lastFocused = document.activeElement;
        modal.hidden = false;
        closeBtn.focus();
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.hidden = true;
        document.body.style.overflow = '';
        goTo(0);
        if (lastFocused) lastFocused.focus();
    };

    trigger.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (modal.hidden) return;
        if (event.key === 'Escape') closeModal();
        if (event.key === 'ArrowRight') goTo(currentIndex + 1);
        if (event.key === 'ArrowLeft') goTo(currentIndex - 1);
    });

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    render();
}

/**
 * Contact form: basic client-side validation feedback.
 * Replace the simulated submission with a real endpoint call when available.
 */
function initContactForm() {
    const form = document.getElementById('projectForm');
    const status = document.getElementById('formStatus');
    if (!form || !status) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            status.textContent = 'Please complete all required fields.';
            form.reportValidity();
            return;
        }

        // Placeholder for real submission logic (fetch/AJAX call to backend).
        status.textContent = 'Thanks — your request has been received. An analyst will follow up shortly.';
        form.reset();
    });
}
