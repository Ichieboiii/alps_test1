/**
 * ALPS courses.js
 * Handles:
 * 1. What We Build (index.html) — module tab switching
 * 2. Catalog cards — scroll reveal
 * 3. Course player (courses.html) — sidebar, iframe, locked wall
 * 4. Contact form — Google Sheets submission (index.html)
 */

/* ============================================================
   COURSE DATA — update src paths when Rise exports are ready
   ============================================================ */
const COURSES = {
    sped: {
        title: " Gamified Learning for Institutions: Driving Engagement and Results ",
        chapters: [
            {
                name: "Chapter 1 – The Engagement Problem ",
                lessons: [
                    { title: "What’s Happening in Today’s Learning",           src: "modules/sped/lesson1/index.html", locked: false },
                    { title: " Symptoms of Low Engagement",                     src: "modules/sped/lesson2/index.html", locked: false },
                    { title: "Why This Matters ",                             src: "modules/sped/lesson3/index.html", locked: false },
                ]
            },
            {
                name: "Chapter 2 – Introduction to Gamified Learning",
                locked: true,
                lessons: [
                    { title: "School-Based Advocacy Strategies",        src: "", locked: true },
                    { title: "Community Advocacy Frameworks",           src: "", locked: true },
                ]
            },
            {
                name: "Chapter 3 –  Why Gamification Works ",
                locked: true,
                lessons: [
                    { title: "Defining the Difference",                 src: "", locked: true },
                    { title: "Applying Modifications in Real Settings",  src: "", locked: true },
                ]
            },
            {
                name: "Chapter 4 – Interactive Demo Experience",
                locked: true,
                lessons: [
                    { title: "Branching Scenario: School Setting",      src: "", locked: true },
                    { title: "Case Study: Shared Decision Making",      src: "", locked: true },
                ]
            },
            {
                name: "Chapter 5 – Value for Your Organization ",
                locked: true,
                lessons: [
                    { title: "Branching Scenario: School Setting",      src: "", locked: true },
                    { title: "Case Study: Shared Decision Making",      src: "", locked: true },
                ]
            },
            {
                name: "Chapter 6 – Implementation and Next Steps ",
                locked: true,
                lessons: [
                    { title: "Branching Scenario: School Setting",      src: "", locked: true },
                    { title: "Case Study: Shared Decision Making",      src: "", locked: true },
                ]
            },
        ]
    },
    leadership: {
        title: "Leadership Strategies for Organizations",
        chapters: [
            {
                name: "Chapter 1 – Foundations of Modern Leadership",
                lessons: [
                    { title: "Transactional vs. Transformational Styles",   src: "modules/leadership/lesson1/index.html", locked: false },
                    { title: "Situational Leadership Overview",             src: "modules/leadership/lesson2/index.html", locked: false },
                    { title: "Self-Assessment: Your Leadership Baseline",   src: "modules/leadership/lesson3/index.html", locked: false },
                ]
            },
            {
                name: "Chapter 2 – Communication for Leaders",
                locked: true,
                lessons: [
                    { title: "Active Listening in Leadership",              src: "", locked: true },
                    { title: "Giving and Receiving Feedback",               src: "", locked: true },
                ]
            },
            {
                name: "Chapter 3 – Leading Through Change",
                locked: true,
                lessons: [
                    { title: "Change Management Models",                    src: "", locked: true },
                    { title: "Building Team Resilience",                    src: "", locked: true },
                ]
            },
            {
                name: "Chapter 4 – Team Diagnostics and Assessment",
                locked: true,
                lessons: [
                    { title: "Evidence-Based Diagnostic Tools",             src: "", locked: true },
                    { title: "Creating an Action Plan",                     src: "", locked: true },
                ]
            },
        ]
    }
};

/* ============================================================
   WHAT WE BUILD — module tab switching (index.html)
   ============================================================ */
const wwbModules = [
    { label: "Interactive Learning Module",  url: "modules/module-1/index.html", placeholder: true },
    { label: "Public Trust Module",          url: "modules/module-2/index.html", placeholder: true },
    { label: "Decision-Based Scenarios",     url: "modules/module-3/index.html", placeholder: true },
];

function initWWB() {
    const container = document.getElementById("wwb-frame-container");
    const urlEl     = document.getElementById("wwb-url");
    const tabs      = document.querySelectorAll(".wwb-tab");
    if (!container || !tabs.length) return;

    function loadModule(idx) {
        const mod = wwbModules[idx];
        if (urlEl) urlEl.textContent = mod.url;
        if (mod.placeholder) {
            container.innerHTML = `
                <div class="wwb-placeholder">
                    <div class="wwb-placeholder-icon">
                        <svg viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <path d="M9 9l6 3-6 3V9z"/>
                        </svg>
                    </div>
                    <h3>${mod.label}</h3>
                    <p>Your Rise360 HTML5 export will load here.<br>
                       Place the exported folder in <code style="color:var(--clr-accent);font-size:0.85em;">
                       ${mod.url.replace("/index.html", "/")}</code></p>
                </div>`;
        } else {
            container.innerHTML = `<iframe src="${mod.url}" title="${mod.label}" allowfullscreen style="width:100%;height:100%;border:none;"></iframe>`;
        }
    }

    tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            loadModule(i);
        });
    });

    loadModule(0);
}

/* ============================================================
   CATALOG CARD SCROLL REVEAL (index.html)
   ============================================================ */
function initCatalogReveal() {
    const cards = document.querySelectorAll(".catalog-card[data-aos]");
    if (!cards.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add("is-visible");
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    cards.forEach(c => obs.observe(c));
}

/* ============================================================
   CONTACT FORM — Google Sheets (index.html)
   ============================================================ */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwqrr15K1ZLlssChMnOQDZ8qBtaPfBg-qteZNZ8bhiRnsIQD4eIal4BvetbR6mfvnXa6g/exec";

function initContactForm() {
    const form      = document.getElementById("inquiry-form");
    const successEl = document.getElementById("form-success");
    const submitBtn = form ? form.querySelector(".contact-submit-btn") : null;
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        if (submitBtn) { submitBtn.textContent = "Sending…"; submitBtn.disabled = true; }
        fetch(SCRIPT_URL, { method: "POST", body: new FormData(form) })
            .then(() => {
                form.style.display = "none";
                if (successEl) successEl.style.display = "block";
            })
            .catch(() => {
                if (submitBtn) { submitBtn.textContent = "Error — please refresh."; submitBtn.disabled = false; }
            });
    });
}

/* ============================================================
   COURSE PLAYER (courses.html)
   ============================================================ */
function initPlayer() {
    const sidebar       = document.getElementById("player-sidebar");
    const sidebarScroll = document.getElementById("sidebar-scroll");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const iframe        = document.getElementById("player-iframe");
    const placeholder   = document.getElementById("player-placeholder");
    const lockedWall    = document.getElementById("player-locked-wall");
    const lessonInfo    = document.getElementById("player-lesson-info");
    const lessonNumEl   = document.getElementById("lesson-info-number");
    const lessonTitleEl = document.getElementById("lesson-info-title");
    const courseTitleEl = document.getElementById("player-course-title");

    if (!sidebar) return; // not on player page

    // Read ?course= param
    const params = new URLSearchParams(window.location.search);
    const courseKey = params.get("course") || "sped";
    const course = COURSES[courseKey] || COURSES.sped;

    if (courseTitleEl) courseTitleEl.textContent = course.title;
    document.title = `${course.title} — ALPS Preview`;

    // Build sidebar
    let lessonIndex = 0;
    course.chapters.forEach((chapter, ci) => {
        const chapterId = `ch-${ci}`;
        const chEl = document.createElement("div");
        chEl.className = "sidebar-chapter" + (chapter.locked ? " sidebar-chapter--locked" : "");

        const btnEl = document.createElement("button");
        btnEl.className = "sidebar-chapter-btn" + (ci === 0 ? " is-open" : "");
        btnEl.setAttribute("data-panel", chapterId);
        btnEl.innerHTML = `
            <svg class="sidebar-chapter-chevron" viewBox="0 0 16 16">
                <path d="M5 3l6 5-6 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ${chapter.name}`;

        const lessonsEl = document.createElement("div");
        lessonsEl.className = "sidebar-lessons" + (ci === 0 ? " is-open" : "");
        lessonsEl.id = chapterId;

        chapter.lessons.forEach((lesson, li) => {
            lessonIndex++;
            const lNum = lessonIndex;
            const lEl = document.createElement("div");
            lEl.className = "sidebar-lesson" + (lesson.locked ? " locked" : "");
            lEl.dataset.src     = lesson.src;
            lEl.dataset.title   = lesson.title;
            lEl.dataset.number  = `Lesson ${lNum}`;
            lEl.dataset.locked  = lesson.locked ? "1" : "0";

            const iconSvg = lesson.locked
                ? `<svg class="lesson-icon" viewBox="0 0 20 20"><rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
                : `<svg class="lesson-icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8 7l5 3-5 3V7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`;

            lEl.innerHTML = `${iconSvg}<span>${lesson.title}</span>`;
            lessonsEl.appendChild(lEl);
        });

        // Chapter toggle
        if (!chapter.locked) {
            btnEl.addEventListener("click", () => {
                const isOpen = btnEl.classList.contains("is-open");
                btnEl.classList.toggle("is-open", !isOpen);
                lessonsEl.classList.toggle("is-open", !isOpen);
            });
        }

        chEl.appendChild(btnEl);
        chEl.appendChild(lessonsEl);
        sidebarScroll.appendChild(chEl);
    });

    // Lesson click handler
    sidebarScroll.addEventListener("click", e => {
        const lessonEl = e.target.closest(".sidebar-lesson");
        if (!lessonEl) return;

        if (lessonEl.dataset.locked === "1") {
            // Show locked wall
            placeholder.style.display = "none";
            iframe.style.display = "none";
            if (lessonInfo) lessonInfo.style.display = "none";
            lockedWall.style.display = "flex";

            document.querySelectorAll(".sidebar-lesson").forEach(l => l.classList.remove("active"));
            lessonEl.classList.add("active");
            return;
        }

        // Load lesson
        const src = lessonEl.dataset.src;
        lockedWall.style.display = "none";
        placeholder.style.display = "none";

        if (src) {
            iframe.src = src;
            iframe.style.display = "block";
        } else {
            // Placeholder until Rise file is linked
            iframe.style.display = "none";
            placeholder.style.display = "flex";
            placeholder.querySelector("h3").textContent = lessonEl.dataset.title;
            placeholder.querySelector("p").textContent = "Rise360 export not yet linked for this lesson.";
        }

        if (lessonInfo) {
            lessonInfo.style.display = "flex";
            if (lessonNumEl)   lessonNumEl.textContent   = lessonEl.dataset.number;
            if (lessonTitleEl) lessonTitleEl.textContent = lessonEl.dataset.title;
        }

        document.querySelectorAll(".sidebar-lesson").forEach(l => l.classList.remove("active"));
        lessonEl.classList.add("active");
    });

    // Sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", () => {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                sidebar.classList.toggle("mobile-open");
            } else {
                sidebar.classList.toggle("collapsed");
            }
        });
    }

    // Auto-open first unlocked lesson
    const firstUnlocked = sidebarScroll.querySelector(".sidebar-lesson:not(.locked)");
    if (firstUnlocked) firstUnlocked.click();
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    initWWB();
    initCatalogReveal();
    initContactForm();
    initPlayer();
});
