/**
 * ALPS Courses Page Script — courses.js
 */

document.addEventListener("DOMContentLoaded", () => {

    // ---- Header scroll state ----
    const header = document.getElementById("main-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) header?.classList.add("scrolled");
        else header?.classList.remove("scrolled");
    }, { passive: true });

    // ---- Syllabus chapter expand/collapse ----
    document.querySelectorAll(".syl-chapter-btn:not(:disabled)").forEach(btn => {
        const panelId = btn.getAttribute("data-panel");
        const panel = document.getElementById(panelId);
        if (!panel) return;

        // Open by default if btn has is-open
        if (btn.classList.contains("is-open")) {
            panel.classList.add("is-open");
        }

        btn.addEventListener("click", () => {
            const isOpen = btn.classList.contains("is-open");
            btn.classList.toggle("is-open", !isOpen);
            panel.classList.toggle("is-open", !isOpen);
        });
    });

    // ---- Scroll reveal for cards ----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll(".course-card[data-aos]").forEach(card => {
        observer.observe(card);
    });

    // ---- CTA pulse on scroll into view ----
    const ctaBtn = document.querySelector(".courses-cta-btn");
    if (ctaBtn) {
        const pulseObs = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        ctaBtn.classList.add("pulse-once");
                        ctaBtn.addEventListener("animationend",
                            () => ctaBtn.classList.remove("pulse-once"),
                            { once: true }
                        );
                    }, 500);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        pulseObs.observe(ctaBtn);
    }

});
