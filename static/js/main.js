// main.js — students will add JavaScript here as features are built

// ------------------------------------------------------------------ //
// "See how it works" modal (landing page)                             //
// ------------------------------------------------------------------ //

(function () {
    const openBtn = document.getElementById("how-it-works-btn");
    const modal = document.getElementById("how-it-works-modal");

    if (!openBtn || !modal) return;

    const closeBtn = document.getElementById("how-it-works-close");
    const iframe = document.getElementById("how-it-works-iframe");

    function openModal(event) {
        event.preventDefault();
        iframe.src = iframe.dataset.src + "?autoplay=1";
        modal.classList.add("is-open");
    }

    function closeModal() {
        modal.classList.remove("is-open");
        iframe.src = "";
    }

    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });
})();
