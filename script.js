(() => {
    "use strict";

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Header state + scroll progress */
    const header = $(".header");
    const progressBar = $(".progress span");

    const updateScrollUI = () => {
        header?.classList.toggle("is-scrolled", window.scrollY > 10);
        if (progressBar) {
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            progressBar.style.transform = `scaleX(${max > 0 ? Math.min(doc.scrollTop / max, 1) : 0})`;
        }
    };

    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    /* Mobile navigation */
    const body = document.body;
    const nav = $("#nav");
    const navToggle = $(".nav-toggle");

    const closeNav = () => {
        body.classList.remove("nav-open");
        navToggle?.setAttribute("aria-expanded", "false");
    };

    navToggle?.addEventListener("click", () => {
        const isOpen = body.classList.toggle("nav-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    $$("#nav a").forEach((link) => link.addEventListener("click", closeNav));

    document.addEventListener("click", (event) => {
        if (!body.classList.contains("nav-open")) return;
        if (!nav?.contains(event.target) && !navToggle?.contains(event.target)) closeNav();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeNav();
    });

    /* Reveal on scroll */
    const revealElements = $$(".reveal");
    if (revealElements.length) {
        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            revealElements.forEach((el) => el.classList.add("is-in"));
        } else {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        entry.target.classList.add("is-in");
                        observer.unobserve(entry.target);
                    });
                },
                { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
            );
            revealElements.forEach((el) => observer.observe(el));
        }
    }

    /* Pointer spotlight + card glow */
    if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
        const root = document.documentElement;
        let frame = null;

        window.addEventListener(
            "pointermove",
            (event) => {
                if (frame) return;
                frame = requestAnimationFrame(() => {
                    root.style.setProperty("--mx", `${event.clientX}px`);
                    root.style.setProperty("--my", `${event.clientY}px`);
                    frame = null;
                });
            },
            { passive: true }
        );

        $$(".card, .video-card, .repo-card, .story").forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty("--cx", `${event.clientX - rect.left}px`);
                card.style.setProperty("--cy", `${event.clientY - rect.top}px`);
            });
        });
    }

    /* Typed roles (home page only) */
    const typedTarget = $(".typed");
    if (typedTarget && window.Typed) {
        new window.Typed(".typed", {
            strings: [
                "Work Student",
                "Video Editor",
                "Graphic Designer",
                "Photographer",
                "Web Developer",
                "Programmer",
                "Cisco Networker",
            ],
            typeSpeed: 65,
            backSpeed: 38,
            backDelay: 1600,
            startDelay: 600,
            loop: true,
            smartBackspace: true,
        });
    }

    /* Video facades: load the Drive player only when asked */
    $$(".video-card[data-video]").forEach((card) => {
        const media = $(".video-media", card);
        const playButton = $(".play", card);
        if (!media || !playButton) return;

        playButton.addEventListener("click", () => {
            const iframe = document.createElement("iframe");
            iframe.src = `https://drive.google.com/file/d/${card.dataset.video}/preview`;
            iframe.title = card.dataset.title || "Video player";
            iframe.allow = "autoplay; fullscreen";
            iframe.allowFullscreen = true;
            iframe.loading = "lazy";
            media.innerHTML = "";
            media.appendChild(iframe);
            media.classList.add("is-playing");
        });
    });

    /* Accessible gallery lightbox */
    const lightbox = $("#lightbox");
    const galleryItems = $$("[data-full]");

    if (lightbox && galleryItems.length) {
        const lightboxImage = $("#lightbox-image");
        const placeholderSrc = lightboxImage.getAttribute("src");
        const lightboxCaption = $("#lightbox-caption");
        const lightboxCount = $("#lightbox-count");
        const closeButton = $(".lightbox-close", lightbox);
        let currentIndex = 0;
        let lastFocused = null;

        const render = () => {
            const item = galleryItems[currentIndex];
            lightboxImage.src = item.dataset.full;
            lightboxImage.alt = item.dataset.caption || "Gallery image";
            lightboxCaption.textContent = item.dataset.caption || "";
            lightboxCount.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
        };

        const open = (index) => {
            currentIndex = index;
            lastFocused = document.activeElement;
            render();
            lightbox.hidden = false;
            requestAnimationFrame(() => lightbox.classList.add("is-open"));
            body.classList.add("lightbox-open");
            closeButton?.focus();
        };

        const close = () => {
            lightbox.classList.remove("is-open");
            body.classList.remove("lightbox-open");
            window.setTimeout(() => {
                if (lightbox.classList.contains("is-open")) return;
                lightbox.hidden = true;
                lightboxImage.src = placeholderSrc;
            }, 260);
            lastFocused?.focus?.();
        };

        const step = (delta) => {
            currentIndex = (currentIndex + delta + galleryItems.length) % galleryItems.length;
            render();
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener("click", () => open(index));
            item.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    open(index);
                }
            });
        });

        $$("[data-lightbox-close]", lightbox).forEach((el) =>
            el.addEventListener("click", close)
        );
        $(".lightbox-prev", lightbox)?.addEventListener("click", () => step(-1));
        $(".lightbox-next", lightbox)?.addEventListener("click", () => step(1));

        document.addEventListener("keydown", (event) => {
            if (lightbox.hidden) return;
            if (event.key === "Escape") close();
            if (event.key === "ArrowLeft") step(-1);
            if (event.key === "ArrowRight") step(1);
        });

        let touchStartX = null;
        lightbox.addEventListener(
            "touchstart",
            (event) => {
                touchStartX = event.touches[0].clientX;
            },
            { passive: true }
        );
        lightbox.addEventListener(
            "touchend",
            (event) => {
                if (touchStartX === null) return;
                const delta = event.changedTouches[0].clientX - touchStartX;
                if (Math.abs(delta) > 50) step(delta > 0 ? -1 : 1);
                touchStartX = null;
            },
            { passive: true }
        );
    }

    /* Footer year */
    const yearTarget = $("#year");
    if (yearTarget) yearTarget.textContent = new Date().getFullYear();
})();
