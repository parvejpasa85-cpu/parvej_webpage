/* =========================================================
   Abdul Gaffar — Digital Space
   Vanilla JS: cursor, navbar, mobile menu, scroll reveal,
   gallery, music filter, hero carousel, achievement stagger
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. Custom cursor ---------- */
  const ring = document.getElementById("cursorRing");
  const dot = document.getElementById("cursorDot");
  const isFine = window.matchMedia("(pointer: fine)").matches;

  if (isFine && ring && dot) {
    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";

      const t = e.target;
      const hover = t.closest("a, button, .card-glow, .window, .music-item, .cred-row, .ach-card, .moment, .tab, .filter-btn, .lb-btn");
      ring.classList.toggle("hover", !!hover);
    });

    function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    }
    loop();
  } else {
    if (ring) ring.style.display = "none";
    if (dot) dot.style.display = "none";
  }

  /* ---------- 2. Navbar scroll state ---------- */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 3. Mobile menu toggle ---------- */
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("open"));
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => mobileMenu.classList.remove("open"))
    );
  }

  /* ---------- 4. Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const delay = Math.min(i * 40, 240);
            setTimeout(() => entry.target.classList.add("in"), delay);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- 4b. Stagger achievement cards ---------- */
  document.querySelectorAll(".ach-grid").forEach((grid) => {
    const cards = grid.querySelectorAll(".ach-card");
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${Math.min(i * 70, 420)}ms`;
      card.addEventListener(
        "transitionend",
        () => { card.style.transitionDelay = "0ms"; },
        { once: true }
      );
    });
  });

  /* ---------- 5. Magnetic back-to-top button ---------- */
  const magnetic = document.querySelector(".magnetic");
  if (magnetic && isFine) {
    magnetic.addEventListener("mousemove", (e) => {
      const r = magnetic.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      magnetic.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    magnetic.addEventListener("mouseleave", () => {
      magnetic.style.transform = "translate(0, 0)";
    });
  }

  /* ---------- 6. Subtle parallax on hero orbs ---------- */
  if (isFine) {
    const orbs = document.querySelectorAll(".orb");
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      orbs.forEach((orb, i) => {
        const f = (i + 1) * 0.5;
        orb.style.transform = `translate(${x * f}px, ${y * f}px)`;
      });
    });
  }

  /* ---------- 7. Moments gallery — hardcoded file list ---------- */
  (function initMoments() {
    const grid = document.getElementById("momentsGrid");
    const tabs = document.querySelectorAll(".moment-tabs .tab");
    if (!grid || !tabs.length) return;

    const DATA = {
      rajshahi: {
        base: "assets/images/moments/rajshahi_photos/",
        files: [
          "rajshahi1.jpg",
          "rajshahi2.jpeg",
          "rajshahi3.jpg",
          "rajshahi4.jpg",
          "rajshahi5.jpg",
          "rajshahi6.jpg",
        ],
      },
      visits: {
        base: "assets/images/moments/photos/visits/",
        files: [
          "5thaug24.jpeg",
          "bookfair1.jpeg",
          "bookfair2.jpeg",
          "bookfair3.jpeg",
          "chillox1.jpeg",
          "chillox2.jpeg",
          "chillox3.jpeg",
          "nationalmuseumvisit.jpeg",
          "raj-me_tanvir_mridul.jpeg",
          "tsc.jpeg",
        ],
      },
      hostel: {
        base: "assets/images/moments/photos/hostel_related/",
        files: [
          "hostel1.jpeg",
          "hostel2.jpeg",
          "hostel3.jpeg",
          "hostel4.jpeg",
          "hostel5.jpeg",
          "hostel6.jpeg",
          "hostel7.jpeg",
          "hostel8.jpeg",
        ],
      },
      college: {
        base: "assets/images/moments/photos/college_related/",
        files: [
          "clgfr1.jpeg",
          "clgfr2.jpeg",
          "clgfr3.jpeg",
          "clgfr4.jpeg",
          "clgfr5.jpeg",
          "clgfr6.jpeg",
          "clgfr7.jpeg",
          "clgfr8.jpeg",
          "clgfr9.jpeg",
          "clgfr10.jpeg",
        ],
      },
      self: {
        base: "assets/images/moments/photos/self/",
        files: [
          "me1.jpeg",
          "me2.jpeg",
          "me3.jpeg",
          "me4.jpeg",
          "me5.jpeg",
          "me6.jpeg",
          "me7.jpeg",
          "me8.jpeg",
          "me9.jpeg",
          "me10.jpeg",
          "me11.jpeg",
        ],
      },
      university: {
        base: "assets/images/moments/university_photos/",
        files: ["ruet1.jpg", "ruet2.jpg", "ruet3.jpg", "ruet4.jpg"],
      },
      ndc: {
        base: "assets/images/moments/college/",
        files: [
          "ndc1.jpg",
          "ndc2.jpg",
          "ndc3.jpg",
          "ndc4.jpg",
          "ndc5.jpg",
          "ndc6.jpg",
          "ndc7.JPG",
          "ndc8.jpg",
        ],
      },
    };

    function render(tabKey) {
      const data = DATA[tabKey];
      if (!data) return;

      grid.innerHTML = "";
      data.files.forEach((file, idx) => {
        const src = data.base + file;

        const div = document.createElement("div");
        div.className = "moment reveal";

        const img = document.createElement("img");
        img.src = src;
        img.alt = file.replace(/\.[^.]+$/, "");
        img.loading = "lazy";
        img.onerror = () => {
          console.warn("[moment] missing:", src);
          img.style.opacity = "0";
        };
        img.onload = () => {
          img.style.opacity = "1";
        };

        const span = document.createElement("span");
        span.textContent = file;

        div.appendChild(img);
        div.appendChild(span);
        grid.appendChild(div);

        div.style.setProperty("--d", idx * 60 + "ms");
        div.classList.add("pop");
        requestAnimationFrame(() => div.classList.add("in"));
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        render(tab.dataset.tab);
      });
    });

    render(tabs[0].dataset.tab);
  })();

  /* ---------- 8. Music filter (All / Bangla / English / Hindi / Urdu) ---------- */
  (function initMusicFilter() {
    const filterBtns = document.querySelectorAll(".music-filter .filter-btn");
    const items = document.querySelectorAll(".music-item");
    if (!filterBtns.length || !items.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        items.forEach((item) => {
          const lang = item.dataset.lang;
          if (filter === "all" || lang === filter) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
      });
    });
  })();

  /* ---------- 9. Hero carousel (coverflow) ---------- */
  (function initHeroCarousel() {
    const stage = document.getElementById("carouselStage");
    const dotsWrap = document.getElementById("carouselDots");
    if (!stage || !dotsWrap) return;

    // ⬇️ এখানে তোমার ৫টা ছবি দাও — 순서대로
    const IMAGES = [
      "assets/images/moments/abdul_gaffar_casual_picture.JPG",
      "assets/images/moments/photos/self/me4.jpeg",
      "assets/images/moments/photos/self/me1.jpeg",
      "assets/images/moments/photos/self/me9.jpeg",
      "assets/images/moments/photos/self/me5.jpeg",
    ];

    const N = IMAGES.length;
    const slides = [];
    let currentIndex = 0;
    let autoTimer = null;

    // Create slides
    IMAGES.forEach((src, i) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.dataset.index = i;

      const img = document.createElement("img");
      img.src = src;
      img.alt = `Hero ${i + 1}`;
      img.draggable = false;

      slide.appendChild(img);
      stage.appendChild(slide);
      slides.push(slide);
    });

    // Create dots
    IMAGES.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Go to image ${i + 1}`);
      dot.addEventListener("click", () => {
        goTo(i);
        restartAuto();
      });
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll(".carousel-dot");

    // Position helpers
    function positionFor(offset) {
      // offset: 0 = center, ±1 = near, ±2 = far, else hidden
      const half = Math.floor(N / 2);
      let o = offset;
      while (o > half) o -= N;
      while (o < -half) o += N;

      if (o === 0) return "pos-center";
      if (o === 1) return "pos-near-right";
      if (o === -1) return "pos-near-left";
      if (o === 2) return "pos-far-right";
      if (o === -2) return "pos-far-left";
      return "pos-hidden";
    }

    function update() {
      slides.forEach((slide, i) => {
        let offset = i - currentIndex;
        const half = Math.floor(N / 2);
        if (offset > half) offset -= N;
        if (offset < -half) offset += N;

        slide.className = "carousel-slide " + positionFor(offset);
      });

      dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
    }

    function next() {
      currentIndex = (currentIndex + 1) % N;
      update();
    }
    function prev() {
      currentIndex = (currentIndex - 1 + N) % N;
      update();
    }
    function goTo(i) {
      currentIndex = i;
      update();
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(next, 3200);
    }
    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = null;
    }
    function restartAuto() {
      startAuto();
    }

    // Pause on hover
    const carousel = document.getElementById("heroCarousel");
    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);

    // Keyboard arrows (accessibility)
    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") { next(); restartAuto(); }
      if (e.key === "ArrowLeft") { prev(); restartAuto(); }
    });

    // Swipe / drag to change slide
    let sx = null;
    carousel.addEventListener("pointerdown", (e) => { sx = e.clientX; });
    window.addEventListener("pointerup", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 45) { dx < 0 ? next() : prev(); restartAuto(); }
    });

    // Depth tilt following the pointer
    if (isFine) {
      carousel.addEventListener("mousemove", (e) => {
        const r = carousel.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        stage.style.transform = `rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg)`;
      });
      carousel.addEventListener("mouseleave", () => { stage.style.transform = ""; });
    }

    // Init
    update();
    startAuto();
  })();

  /* ---------- 10. PDF thumbnail fallback (if a PDF iframe fails) ---------- */
  document.querySelectorAll(".ach-preview iframe").forEach((iframe) => {
    iframe.addEventListener("error", () => {
      const parent = iframe.parentElement;
      parent.classList.add("pdf-preview");
      iframe.style.display = "none";
      if (!parent.querySelector(".pdf-icon")) {
        parent.insertAdjacentHTML(
          "beforeend",
          '<div class="pdf-icon"><svg viewBox="0 0 24 24" width="54" height="54" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg><span>PDF</span></div>'
        );
      }
    });
  });

})();

/* =========================================================
   V2 ADDITIONS: progress, scrollspy, timeline fill, roles,
   count-up, card tilt/spotlight, equalizer, lightbox
   ========================================================= */
(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- A. Scroll progress, navbar hide, scrollspy, timeline ---------- */
  const bar = document.getElementById("progress");
  const wrap = document.querySelector(".navbar-wrap");
  const menu = document.getElementById("mobileMenu");
  const links = [...document.querySelectorAll(".nav-links a")];
  const tl = document.querySelector(".timeline");
  const tlItems = tl ? [...tl.querySelectorAll(".tl-item")] : [];
  let lastY = window.scrollY;
  let ticking = false;

  function updateTimeline() {
    if (!tl) return;
    const line = window.innerHeight * 0.62;
    const r = tl.getBoundingClientRect();
    tl.style.setProperty("--h", clamp(line - r.top, 0, r.height) + "px");
    tlItems.forEach((it) => {
      it.classList.toggle("lit", it.getBoundingClientRect().top + 8 < line);
    });
  }

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`;

    if (wrap) {
      const menuOpen = menu && menu.classList.contains("open");
      if (y > lastY + 4 && y > 400 && !menuOpen) wrap.classList.add("hide");
      else if (y < lastY - 4 || y < 400) wrap.classList.remove("hide");
    }
    if (Math.abs(y - lastY) > 4) lastY = y;

    if (y < 300) links.forEach((a) => a.classList.remove("active"));
    updateTimeline();
    ticking = false;
  }

  if ("IntersectionObserver" in window) {
    const secs = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && window.scrollY >= 300) {
            links.forEach((a) =>
              a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    secs.forEach((s) => spy.observe(s));
  }

  window.addEventListener(
    "scroll",
    () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } },
    { passive: true }
  );
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- B. Hero typed roles ---------- */
  const roleEl = document.getElementById("roleText");
  if (roleEl) {
    const roles = ["EEE student at RUET", "Photographer", "Lifelong learner", "C & Python tinkerer"];
    if (reduce) {
      roleEl.textContent = roles[0];
    } else {
      let ri = 0, ci = roles[0].length, del = true;
      (function tick() {
        const w = roles[ri];
        let delay = del ? 35 : 70;
        ci += del ? -1 : 1;
        roleEl.textContent = w.slice(0, ci);
        if (!del && ci === w.length) { del = true; delay = 1500; }
        else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; delay = 350; }
        setTimeout(tick, delay);
      })();
    }
  }

  /* ---------- C. Count-up numbers ---------- */
  function runCount(el) {
    const raw = el.textContent.trim();
    const m = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!m || reduce) return;
    const end = parseFloat(m[1]);
    const dec = (m[1].split(".")[1] || "").length;
    const t0 = performance.now();
    const dur = 1400;
    (function step(t) {
      const p = clamp((t - t0) / dur, 0, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = p < 1 ? (end * e).toFixed(dec) : raw;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  const counters = document.querySelectorAll(".status-grid strong, .scores-grid strong");
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => cio.observe(c));
  }

  /* ---------- D. Card spotlight + 3D tilt ---------- */
  if (fine && !reduce) {
    document.querySelectorAll(".ach-card, .interest-card, .social-card").forEach((el) => {
      el.classList.add("spot");
      el.addEventListener("pointerenter", () => el.classList.add("tilt-on"), { once: true });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        el.style.setProperty("--ry", ((px - 0.5) * 8).toFixed(2) + "deg");
        el.style.setProperty("--rx", ((0.5 - py) * 8).toFixed(2) + "deg");
      });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------- E. Music equalizer ---------- */
  document.querySelectorAll(".music-thumb").forEach((t) => {
    t.insertAdjacentHTML("beforeend", '<i class="eq" aria-hidden="true"><b></b><b></b><b></b></i>');
  });

  /* ---------- F. Moments lightbox ---------- */
  const grid = document.getElementById("momentsGrid");
  if (grid) {
    const lb = document.createElement("div");
    lb.className = "lb";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Close">✕</button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous photo">‹</button>' +
      '<figure class="lb-fig"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>' +
      '<button class="lb-btn lb-next" aria-label="Next photo">›</button>';
    document.body.appendChild(lb);

    const img = lb.querySelector(".lb-img");
    const cap = lb.querySelector(".lb-cap");
    let list = [], idx = 0, isOpen = false;

    function show(i) {
      idx = (i + list.length) % list.length;
      img.classList.remove("on");
      img.onload = () => img.classList.add("on");
      img.src = list[idx].src;
      img.alt = list[idx].alt;
      cap.textContent = `${idx + 1} / ${list.length}`;
      if (img.complete) img.classList.add("on");
    }
    function openAt(i) {
      isOpen = true;
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
      show(i);
    }
    function close() {
      isOpen = false;
      lb.classList.remove("open");
      document.body.style.overflow = "";
    }

    grid.addEventListener("click", (e) => {
      const m = e.target.closest(".moment");
      if (!m) return;
      const tiles = [...grid.querySelectorAll(".moment")];
      list = tiles.map((t) => { const im = t.querySelector("img"); return { src: im.src, alt: im.alt }; });
      openAt(tiles.indexOf(m));
    });

    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", () => show(idx - 1));
    lb.querySelector(".lb-next").addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb-fig")) close(); });

    // capture phase so the hero carousel's arrow-key handler stays quiet while open
    window.addEventListener(
      "keydown",
      (e) => {
        if (!isOpen) return;
        if (e.key === "Escape") close();
        else if (e.key === "ArrowRight") show(idx + 1);
        else if (e.key === "ArrowLeft") show(idx - 1);
        else return;
        e.stopPropagation();
      },
      true
    );

    let sx = null;
    lb.addEventListener("pointerdown", (e) => { sx = e.clientX; });
    lb.addEventListener("pointerup", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 50) show(dx < 0 ? idx + 1 : idx - 1);
    });
  }
})();
