document.addEventListener("DOMContentLoaded", () => {
    const trigger = document.getElementById("portfolioTrigger");
    const modal = document.getElementById("magazineModal");
    const closeBtn = document.getElementById("closeModal");
    const pages = document.querySelectorAll(".magazine .page");

    // Open Modal
    trigger.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Close Modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        // Reset pages on close
        pages.forEach(page => page.classList.remove("flipped"));
        resetZIndex();
    });

    // Handle Page Flipping Mechanics
    pages.forEach((page, index) => {
        page.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!page.classList.contains("flipped")) {
                page.classList.add("flipped");
                // Adjust z-index layers dynamically so backward pages do not clip
                setTimeout(() => { page.style.zIndex = index + 1; }, 300);
            } else {
                page.classList.remove("flipped");
                setTimeout(() => { resetZIndex(); }, 300);
            }
        });
    });

    function resetZIndex() {
        pages.forEach((page, index) => {
            page.style.zIndex = pages.length - index;
        });
    }
    resetZIndex();
});
