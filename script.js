document.addEventListener('DOMContentLoaded', () => {
    initPortfolioModal();
    initContactForm();
});

/**
 * Portfolio modal: open/close, click-outside, Escape key,
 * and page-flip interaction for the magazine spreads.
 */
function initPortfolioModal() {
    const trigger = document.getElementById('portfolioTrigger');
    const modal = document.getElementById('magazineModal');
    const closeBtn = document.getElementById('closeModal');
    const pages = Array.from(document.querySelectorAll('.magazine .page'));

    if (!trigger || !modal || !closeBtn) return;

    let lastFocused = null;

    const openModal = () => {
        lastFocused = document.activeElement;
        modal.hidden = false;
        closeBtn.focus();
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.hidden = true;
        document.body.style.overflow = '';
        resetPages();
        if (lastFocused) lastFocused.focus();
    };

    const resetPages = () => {
        pages.forEach((page) => page.classList.remove('flipped'));
    };

    trigger.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) closeModal();
    });

    // Flip a page forward on click; click again to flip it back.
    pages.forEach((page) => {
        page.addEventListener('click', () => {
            page.classList.toggle('flipped');
        });
    });
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
