/* ============================================================
   COURSES CTA BUTTON — append to script.js
   (or add as a separate <script src="cta-button.js"> before </body> in index.html)
   ============================================================ */

(function () {
    const btn = document.querySelector(".courses-cta-btn");
    if (!btn) return;

    // Fire a single pulse ring animation the first time
    // the button enters the viewport
    const pulseObserver = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Small delay so the reveal animation finishes first
                    setTimeout(() => {
                        btn.classList.add("pulse-once");

                        // Remove class after animation so it doesn't repeat
                        btn.addEventListener(
                            "animationend",
                            () => btn.classList.remove("pulse-once"),
                            { once: true }
                        );
                    }, 500);

                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.6 }
    );

    pulseObserver.observe(btn);
})();
