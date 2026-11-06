/* =========================================================
   SHMAQ STUDIO — interactions (vanilla, no dependencies)
   1. Content (i18n + projects)   5. Scroll engine
   2. Helpers                     6. Work grid & case study
   3. Language                    7. Film strip, approach, clients
   4. Loader, hero, cursor        8. Boot
   ========================================================= */
(() => {
  "use strict";

  /* ---------- 1. Content ---------- */
  const IMG = "./assets/img/";

  const T = {
    en: {
      loader: "We simply bet on stories",
      "nav.work": "Work", "nav.studio": "Studio", "nav.craft": "Craft", "nav.clients": "Clients", "nav.contact": "Let’s talk",
      "menu.foot": "Independent creative house · Saudi Arabia",
      "hero.kicker": "Your creative studio",
      "hero.statement": "Our roots & the stories we live — that’s what drives us every single day.",
      "hero.reel": "Play the film", "hero.scroll": "Scroll",
      "studio.label": "The birth of Shmagh",
      manifesto: "Founded in 2015 alongside “8ies”, the company stepped out in 2020 as an [img:roots-pool] independent creative house, dedicated to crafting the idea & everything that *breathes life* into it. Shmagh is the trusted partner you rely on [img:bsf-poet] — from the initial spark of a story to the *music hook.*",
      "stat.founded": "Founded alongside “8ies”",
      "stat.independent": "Stepped out as an independent creative house",
      "stat.clients": "Brands that trusted the story",
      "stat.ideas": "For ideas worth to be told, remembered, and celebrated.",
      band: ["Beyond ads", "*we create loyalty*", "We simply bet on stories", "*Raw & real*"],
      "work.label": "Selected work",
      "work.title1": "Stories that", "work.title2": "took over", "work.title3": "the timeline.",
      "filter.all": "All", "filter.film": "Films", "filter.photo": "Photoshoots",
      "craft.label": "Behind the craft", "craft.title1": "Shot on", "craft.title2": "film.",
      "craft.sub": "Raw & real. Real characters, real backyards, real hospitality — built to trigger pure nostalgia.",
      "approach.label": "How we work",
      "step1.t": "Research", "step1.d": "We dig into our community, our habits and our places to find the truth worth telling.",
      "step2.t": "Write", "step2.d": "From the initial spark of a story to the music hook — poems, scripts and lines people repeat.",
      "step3.t": "Produce", "step3.d": "Film, music and photography crafted with the obsession of an independent studio.",
      "step4.t": "Leave a mark", "step4.d": "Work that people share organically — because it isn’t an ad, it’s a reflection of them.",
      "clients.label": "Clients",
      "contact.lead": "We’re here for those who truly want to connect with the Saudi audience & speak straight to the heart of this land.",
      "contact.t1": "Have a story?", "contact.t2": "Let’s tell it.", "contact.btn": "Start a project",
      "footer.line": "We research, write, produce, and leave a mark.", "footer.top": "Back to top ↑",
      "case.close": "Close ✕", "case.next": "Next project",
      watch: "Watch the film", insta: "View on Instagram", view: "View", play: "Play", drag: "Drag"
    },
    ar: {
      loader: "ببساطة: نؤمن بالقصة",
      "nav.work": "أعمالنا", "nav.studio": "الاستديو", "nav.craft": "الصنعة", "nav.clients": "عملاؤنا", "nav.contact": "تواصل معنا",
      "menu.foot": "بيت إبداعي مستقل · المملكة العربية السعودية",
      "hero.kicker": "استديو إبداعي",
      "hero.statement": "مجتمعنا، عاداتنا، أماكننا والأهم قصصنا؛ هي الروح اللي تحركنا كل يوم.",
      "hero.reel": "شغّل الفيلم", "hero.scroll": "انزل",
      "studio.label": "ولادة شماغ",
      manifesto: "تأسست شماغ عام 2015 مع «8ies»، وانطلقت في 2020 [img:roots-pool] كبيت إبداعي مستقل، مهمته صناعة الفكرة وكل *ما يبث فيها الحياة.* شماغ شريكك اللي تعتمد عليه [img:bsf-poet] من شرارة القصص لين *مطلع الأغاني.*",
      "stat.founded": "سنة التأسيس مع «8ies»",
      "stat.independent": "انطلقنا كبيت إبداعي مستقل",
      "stat.clients": "علامة وثقت بالقصة",
      "stat.ideas": "أفكار تستحق أن تُروى، تبقى، ويُحتفى بها.",
      band: ["حنا ما نصنع إعلانات", "*حنا نبني انتماء*", "ببساطة نؤمن بالقصة", "*حقيقي وخام*"],
      "work.label": "شغلنا",
      "work.title1": "قصص", "work.title2": "تصدّرت", "work.title3": "التايملاين.",
      "filter.all": "الكل", "filter.film": "أفلام", "filter.photo": "جلسات تصوير",
      "craft.label": "خلف الصنعة", "craft.title1": "مصوّر على فيلم", "craft.title2": "",
      "craft.sub": "حقيقي وخام. شخصيات حقيقية، أحواش حقيقية، وكرم حقيقي — مصنوع ليحرك الحنين.",
      "approach.label": "طريقتنا",
      "step1.t": "نبحث", "step1.d": "ندخل في تفاصيل مجتمعنا وعاداتنا وأماكننا عشان نلقى الحقيقة اللي تستاهل تنحكى.",
      "step2.t": "نكتب", "step2.d": "من شرارة القصة لين مطلع الأغنية — قصائد ونصوص وجمل يرددها الناس.",
      "step3.t": "ننتج", "step3.d": "فيلم وموسيقى وتصوير، نصنعها بشغف استديو مستقل.",
      "step4.t": "نترك أثر", "step4.d": "شغل ينتشر طبيعي — لأنه مو إعلان، هو انعكاس للناس.",
      "clients.label": "عملاؤنا",
      "contact.lead": "حنا هنا لكل من يبي يوصل للجمهور السعودي ويكلم قلب هالأرض مباشرة.",
      "contact.t1": "عندك قصة؟", "contact.t2": "خلنا نحكيها.", "contact.btn": "ابدأ مشروعك",
      "footer.line": "نبحث، نكتب، ننتج، ونترك أثر.", "footer.top": "للأعلى ↑",
      "case.close": "إغلاق ✕", "case.next": "المشروع التالي",
      watch: "شاهد الفيلم", insta: "شاهد على إنستغرام", view: "شوف", play: "شغّل", drag: "اسحب"
    }
  };

  // type: film | photo   video: "vimeo:<id>" | "ig:<url>"
  const PROJECTS = [
    {
      slug: "bsf-saudi-league", type: "film", cover: "bsf-podium", alt: "bsf-poet",
      gallery: ["bsf-car", "bsf-fans", "bsf-face", "bsf-crowd", "bsf-cafe", "bsf-studio"],
      video: "vimeo:1194088581",
      en: {
        client: "BSF × Saudi League", cat: "Campaign film", title: "The Poet of the League",
        desc: "We picked poet Ali Bin Hamri for his polarizing character — deeply loved across Saudi football culture. A custom poem for the league, from Jeddah to the Dammam coast.",
        tags: ["Orchestral × Hip-Hop", "Pure hype lines", "Pure Saudi street-culture spirit"]
      },
      ar: {
        client: "البنك السعودي الفرنسي × الدوري السعودي", cat: "فيلم حملة", title: "شاعر الدوري",
        desc: "اخترنا الشاعر علي بن حمري كشخصية مثيرة للجدل وعنده اطلاع كروي، ومحبوب عند جمهور الكورة السعودي. قصيدة خاصة للدوري وأهازيج من جدة لساحل الدمام.",
        tags: ["أوركسترا بروح الهيب هوب", "فيديو حماسي يثير الجماهير", "روح الشارع السعودي"]
      }
    },
    {
      slug: "qassab-salt-marble", type: "photo", cover: "salt-mountain", alt: "salt-steak",
      gallery: ["salt-call", "salt-steak", "salt-case"],
      video: "ig:https://www.instagram.com/p/CGQL5iMhiCL/",
      en: {
        client: "Qassab Salt × Marble", cat: "Creative photoshoot", title: "A Steak in a Mountain of Salt",
        desc: "For Marble’s launch campaign we turned product quality into a visual experience. Placing the steak right in the heart of a pure salt mound blew up on social media — putting Al-Qassab salt on the map while spotlighting the raw quality of Marble’s meat.",
        tags: ["Launch campaign", "Product as hero", "Viral on social"]
      },
      ar: {
        client: "ملحة القصب × مطعم ماربل", cat: "جلسة تصوير إبداعية", title: "ستيك في قلب المملحة",
        desc: "عرّفنا الناس على افتتاح مطعم ماربل بفكرة قدرت توصل إحساس المنتج بصرياً. وجود اللحم وسط المملحة أخذ تفاعل كبير في السوشل ميديا، وساهم في إبراز جمال ملحة القصب وبساطة المنتج.",
        tags: ["حملة افتتاح", "المنتج هو البطل", "انتشار واسع"]
      }
    },
    {
      slug: "dolmat-ommy", type: "film", cover: "dolma-feast", alt: "dolma-walk",
      gallery: ["dolma-serve", "dolma-a", "dolma-kitchen", "dolma-pots", "dolma-bukhour", "dolma-c"],
      video: "vimeo:1190988365",
      en: {
        client: "Dolmat Ommy", cat: "Musical film · Case study", title: "60 Years Standing by the Host’s Side",
        desc: "A cinematic musical project inspired by Saudi Arabia’s most famous tribute to hospitality. It brings the traditional Saudi feast to life, spotlighting Chef Om Abdullah, who blends nostalgia and today’s taste effortlessly — deep-rooted warmth, generosity, authenticity.",
        tags: ["Real characters", "Rugs & backyards", "Coffee & tea craft tools", "Bukhour", "A timeless poem"],
        impact: [["Visual impact", "Pure simplicity: everyday home moments Saudis know by heart, creating a deep emotional bond."], ["Social impact", "It wasn’t an ad — it was a reflection of them. It took over people’s Stories organically."]]
      },
      ar: {
        client: "مطعم دولمة أمي", cat: "عمل غنائي سينمائي · دراسة حالة", title: "ستين عام واقف في المضيف",
        desc: "عمل غنائي سينمائي مبني على أشهر ما قيل في الكرم السعودي، يوثق تفاصيل العزيمة والمائدة السعودية على يد المرأة، ويحتفي بالأكل اللي تصنعه الشيف «أم عبدالله» بروح الماضي والحاضر ببساطة دافئة.",
        tags: ["شخصيات حقيقية", "الزل والأحواش", "المعاميل", "بخور العزايم", "قصيدة جزلة"],
        impact: [["الأثر البصري", "نجاح المفهوم اعتمد على سحر البساطة: لحظات بيت يعرفها كل سعودي، صنعت رابط عاطفي عميق."], ["الأثر الاجتماعي", "ما كان إعلان، كان انعكاس للناس. انتشر في الستوريات بشكل طبيعي."]]
      }
    },
    {
      slug: "easy-bakery", type: "film", cover: "easy-oud", alt: "easy-ball",
      gallery: ["easy-tailor", "easy-bike", "loyalty", "easy-movie", "easy-movie2"],
      video: "vimeo:1187005016",
      en: {
        client: "Easy Bakery", cat: "Opening film", title: "Where You At, Suwaidi Residents?",
        desc: "We started the ad around a heartfelt question for anyone rooted in the block — street football, singer Saad Jumaah, the “Tasali” cafeteria, tailor shops — and brought iconic movie scenes in so the audience instantly feels at home with the story.",
        tags: ["Street football", "Singer, Saad Jumaah", "Ambient product placement", "Iconic movie scenes"],
        impact: [["Viral reach & commercial impact", "The ad took over the neighborhood group chats, converting into a long line around the block for the grand opening."]]
      },
      ar: {
        client: "إيزي بيكري", cat: "فيلم افتتاح", title: "وينكم يا أهل السويدي؟",
        desc: "بحث عميق عن شخصيات مما خلق حالة من الكوميديا والارتباط العاطفي بسلوكيات أهل السويدي — كورة الحارة، الفنان سعد جمعة، كافتيريا «تسالي» ومحلات الخياطة — مع مشاهد أفلام أيقونية تخلي الجمهور يحس إنه في بيته.",
        tags: ["كورة الحارة", "الفنان سعد جمعة", "ظهور طبيعي للمنتج", "مشاهد أفلام أيقونية"],
        impact: [["انتشار وأثر تجاري", "الإعلان سيطر على قروبات الحي، وتحول لطابور طويل حول المبنى يوم الافتتاح."]]
      }
    },
    {
      slug: "marble-50-best", type: "film", cover: "win-rug", alt: "win-sax",
      gallery: ["win-chef", "win-samri", "win-platters", "win-table", "win-poet"],
      video: "ig:https://www.instagram.com/reel/DGTz28wuE1W/",
      en: {
        client: "Marble", cat: "Musical ad", title: "#1 in Saudi — 50 Best Restaurants",
        desc: "Celebrating Marble’s win: the chef as main character, Samri folklore beats with a modern soul, raw woodfire and high-grade cuts, a saxophone in the salt flats — tying our win to the pride of Saudi camel competitions.",
        tags: ["Chef = main character", "Samri, different", "Saxophone", "Crafted poem"]
      },
      ar: {
        client: "مطعم ماربل", cat: "إعلان غنائي", title: "الأول في السعودية — أفضل ٥٠ مطعم",
        desc: "احتفال بفوز ماربل: الشيف هو البطل، سامري بروح عصرية، حطب ولحوم فاخرة، وساكسفون في قلب السبخة — ربطنا الفوز بفخر مزاين الإبل.",
        tags: ["الشيف هو البطل", "سامري بروح عصرية", "ساكسفون", "قصيدة مصنوعة"]
      }
    },
    {
      slug: "ithraa-mother-of-palms", type: "film", cover: "palm-pool", alt: "palm-mother",
      gallery: ["palm-water", "palm-alley", "palm-dates", "palm-boy", "palm-mother"],
      video: "vimeo:1190984033",
      en: {
        client: "Ithraa", cat: "Creative film · 16mm", title: "Mother of Palm Trees",
        desc: "Re-imagining Ghazi Al-Gosaibi’s “Mother of Palms” (Umm Alnakheel) by blending spoken poetry with local folklore (Al-Haydah). A soulful story of homecoming, shot on 16mm film built to trigger pure nostalgia.",
        tags: ["Shot on 16mm", "Spoken poetry", "Al-Haydah folklore", "Authentic roots"]
      },
      ar: {
        client: "إثراء", cat: "فيلم إبداعي · 16 ملم", title: "أم النخيل",
        desc: "إعادة تخيّل قصيدة غازي القصيبي «أم النخيل» بمزج الشعر المحكي مع الفلكلور المحلي (الحيدة). قصة عودة للديار، مصوّرة على فيلم 16 ملم لتحرّك الحنين.",
        tags: ["فيلم 16 ملم", "شعر محكي", "فن الحيدة", "جذور أصيلة"]
      }
    },
    {
      slug: "marble-summer-drinks", type: "photo", cover: "drinks-parrot", alt: "drinks-chef",
      gallery: ["drinks-line", "drinks-chef", "drinks-flat"],
      video: "ig:https://www.instagram.com/p/C09HK3eoWWS/",
      en: {
        client: "Marble", cat: "Creative photoshoot", title: "Summer Soul — Drinks Menu",
        desc: "Nothing says summer like a parrot. So we used its vibrant colors to bring Marble’s new lineup of fruity summer drinks to life.",
        tags: ["Summer soul", "Human touch", "Menu launch"]
      },
      ar: {
        client: "مطعم ماربل", cat: "جلسة تصوير إبداعية", title: "روح الصيف — قائمة المشروبات",
        desc: "ما في شي يقول «صيف» مثل الببغاء. استخدمنا ألوانه الحيوية عشان نعطي الحياة لتشكيلة مشروبات ماربل الصيفية.",
        tags: ["روح الصيف", "لمسة إنسانية", "إطلاق قائمة"]
      }
    },
    {
      slug: "kabab-zahr", type: "photo", cover: "kabab-b", alt: "kabab-d",
      gallery: ["kabab-a", "kabab-c", "kabab-d"],
      video: null,
      en: {
        client: "Kabab Zahr", cat: "Opening photoshoot", title: "Behind the Craft",
        desc: "The hero here is the kabab chef — the real artist. We created a shoot that captures the food’s authentic feel & taste that makes people want to walk right through the door.",
        tags: ["Chef as artist", "Authentic feel & taste", "Grand opening"]
      },
      ar: {
        client: "كباب زهر", cat: "تصوير افتتاح", title: "خلف الصنعة",
        desc: "البطل هنا هو شيف الكباب — الفنان الحقيقي. صنعنا جلسة تصوير تلتقط إحساس وطعم الأكل الأصيل اللي يخلي الناس تبي تدخل المحل على طول.",
        tags: ["الشيف فنان", "الطعم الأصيل", "افتتاح"]
      }
    }
  ];

  const HERO = [
    { img: "hero-cello", en: "Shmaq — Your creative studio", ar: "شماغ — استديو إبداعي" },
    { img: "bsf-podium", en: "BSF × Saudi League", ar: "البنك السعودي الفرنسي × الدوري" },
    { img: "salt-mountain", en: "Qassab Salt × Marble", ar: "ملحة القصب × ماربل" },
    { img: "dolma-feast", en: "Dolmat Ommy — 60 years", ar: "دولمة أمي — ستين عام" },
    { img: "easy-ball", en: "Easy Bakery — Suwaidi", ar: "إيزي بيكري — السويدي" },
    { img: "drinks-parrot", en: "Marble — Summer Soul", ar: "ماربل — روح الصيف" }
  ];

  const STRIP = ["palm-alley", "roots-pool", "dolma-walk", "palm-mother", "easy-bike", "win-sax", "palm-dates", "kabab-c", "bsf-face", "palm-boy"];
  const CLIENTS = [
    ["bsf", "marble", "dolmat-ommy", "ithraa", "easy-bakery", "kabab-zahr"],
    ["alrajhi", "riyad-bank", "moh", "uae-culture", "sayyar", "gazelle"]
  ];

  /* ---------- 2. Helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const srcset = (n) => `${IMG}${n}-760.webp 760w, ${IMG}${n}-1600.webp 1600w`;
  const img = (n, sizes = "100vw", cls = "", lazy = true) =>
    `<img ${cls ? `class="${cls}"` : ""} src="${IMG}${n}-760.webp" srcset="${srcset(n)}" sizes="${sizes}" alt="" ${lazy ? 'loading="lazy"' : ""} decoding="async" />`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } } };

  let lang = store.get("shmaq-lang") || ((navigator.language || "").toLowerCase().startsWith("ar") ? "ar" : "en");
  const t = (k) => T[lang][k] ?? T.en[k] ?? "";
  const P = (p) => p[lang];

  /* ---------- 3. Language ---------- */
  function applyLang() {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    renderManifesto();
    renderBand();
    renderCards();
    updateHeroCaption();
    if (caseIndex > -1) fillCase(caseIndex);
    requestTick();
  }
  $(".lang").addEventListener("click", () => {
    lang = lang === "en" ? "ar" : "en";
    store.set("shmaq-lang", lang);
    document.body.classList.add("is-switching");
    applyLang();
  });

  /* ---------- 4. Loader, hero, cursor ---------- */
  const loader = $(".loader");
  const loaderFill = $(".loader .logo-fill");
  const loaderCount = $(".loader-count");

  const slidesEl = $(".hero-slides");
  slidesEl.innerHTML = HERO.map((h, i) =>
    `<img ${i === 0 ? `src="${IMG}${h.img}-1600.webp" srcset="${srcset(h.img)}" fetchpriority="high" class="is-active"` : `data-src="${h.img}"`} sizes="100vw" alt="" decoding="async" />`
  ).join("");
  const slides = $$("img", slidesEl);
  let heroIdx = 0, heroTimer = 0;

  function updateHeroCaption() {
    $(".hero-index").textContent = `${String(heroIdx + 1).padStart(2, "0")} / ${String(HERO.length).padStart(2, "0")}`;
    $(".hero-title").textContent = HERO[heroIdx][lang];
  }
  function restartBar() {
    const bar = $(".hero-bar");
    bar.innerHTML = "<i></i>";
  }
  function nextSlide() {
    const prev = slides[heroIdx];
    heroIdx = (heroIdx + 1) % slides.length;
    const next = slides[heroIdx];
    const show = () => {
      prev.classList.remove("is-active");
      next.classList.remove("is-active");
      void next.offsetWidth; // restart ken burns
      next.classList.add("is-active");
      updateHeroCaption();
      restartBar();
    };
    if (next.complete && next.naturalWidth) show(); else next.addEventListener("load", show, { once: true });
  }
  function startHero() {
    // lazy-hydrate remaining slides only after the first paint
    slides.forEach((s) => { if (s.dataset.src) { s.srcset = srcset(s.dataset.src); s.src = `${IMG}${s.dataset.src}-760.webp`; } });
    updateHeroCaption();
    restartBar();
    if (!reduce) heroTimer = setInterval(() => { if (heroVisible && !document.hidden) nextSlide(); }, 5000);
  }

  function runLoader() {
    const start = performance.now();
    let target = 0, shown = 0, done = false;
    const first = slides[0];
    const imgReady = first.complete ? Promise.resolve() : new Promise((r) => { first.onload = r; first.onerror = r; });
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.race([Promise.all([imgReady, fonts]), new Promise((r) => setTimeout(r, 3500))]).then(() => { done = true; });
    (function frame(now) {
      const el = now - start;
      target = done ? 100 : Math.min(88, el / 14);
      shown = lerp(shown, target, done ? 0.14 : 0.08);
      const v = Math.round(shown);
      loaderCount.textContent = v;
      loaderFill.style.setProperty("--p", v + "%");
      if (done && v >= 99 && el > (reduce ? 0 : 1100)) {
        loaderCount.textContent = 100;
        loaderFill.style.setProperty("--p", "100%");
        setTimeout(() => {
          loader.classList.add("is-done");
          document.body.classList.remove("is-loading");
          document.body.classList.add("is-ready");
          startHero();
          setTimeout(() => loader.remove(), 1200);
        }, 180);
        return;
      }
      requestAnimationFrame(frame);
    })(start);
  }

  // Cursor
  const cursor = $(".cursor");
  const cDot = $(".cursor-dot"), cRing = $(".cursor-ring"), cLabel = $(".cursor-label");
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  const ring = { x: mouse.x, y: mouse.y };
  let cursorRunning = false;
  function cursorLoop() {
    ring.x = lerp(ring.x, mouse.x, 0.18);
    ring.y = lerp(ring.y, mouse.y, 0.18);
    cRing.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
    if (Math.abs(ring.x - mouse.x) + Math.abs(ring.y - mouse.y) > 0.3) requestAnimationFrame(cursorLoop);
    else cursorRunning = false;
  }
  if (finePointer) {
    addEventListener("pointermove", (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      cDot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      if (!cursorRunning) { cursorRunning = true; requestAnimationFrame(cursorLoop); }
    }, { passive: true });
    document.addEventListener("pointerover", (e) => {
      const el = e.target.closest("[data-cursor], .card, .case-gallery, .case-next");
      let label = "";
      let hidden = false;
      if (el) {
        const c = el.dataset.cursor || (el.classList.contains("card") ? "view" : el.classList.contains("case-gallery") ? "drag" : "view");
        if (c === "hide") hidden = true; else label = t(c);
      }
      cLabel.textContent = label;
      cursor.classList.toggle("is-label", !!label);
      cursor.classList.toggle("is-hidden", hidden);
    });
  }

  // Magnetic elements
  $$(".magnetic").forEach((el) => {
    if (!finePointer) return;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.3;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transition = "transform .8s cubic-bezier(.16,1,.3,1), background .4s, color .4s"; el.style.transform = ""; setTimeout(() => (el.style.transition = ""), 800); });
  });

  // Nav + mobile menu
  const nav = $(".nav");
  const burger = $(".burger");
  const menu = $("#menu");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    document.body.classList.toggle("is-locked", open);
    burger.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open);
  }
  burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- 5. Scroll engine (single rAF, transforms only) ---------- */
  let vh = innerHeight, vw = innerWidth, ticking = false, lastY = scrollY, heroVisible = true;
  const hero = $(".hero"), heroFrame = $(".hero-frame"), wordmark = $(".wordmark");
  const heroUI = [$(".hero-top"), $(".hero-bottom")];
  const manifestoEl = $(".manifesto-text");
  const strip = $(".strip"), stripTrack = $(".strip-track"), stripBar = $(".strip-progress");
  const visibleCards = new Set();

  function requestTick() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  function update() {
    ticking = false;
    const y = scrollY;

    // nav hide/show
    if (!document.body.classList.contains("menu-open")) nav.classList.toggle("is-hidden", y > vh * 0.9 && y > lastY + 2);
    if (y < lastY - 2 || y < vh * 0.9) nav.classList.remove("is-hidden");
    lastY = y;

    // hero: frame shrinks into a rounded card, wordmark drifts
    const hr = hero.getBoundingClientRect();
    heroVisible = hr.bottom > 0;
    if (heroVisible && !reduce) {
      const p = clamp(-hr.top / (hr.height - vh));
      const e = p * p * (3 - 2 * p);
      heroFrame.style.setProperty("--cx", (e * Math.min(vw * 0.08, 110)).toFixed(1) + "px");
      heroFrame.style.setProperty("--ci", (e * vh * 0.1).toFixed(1) + "px");
      heroFrame.style.setProperty("--cr", (e * 22).toFixed(1) + "px");
      slidesEl.style.setProperty("--hs", (1 + e * 0.08).toFixed(4));
      wordmark.style.setProperty("--wy", (-e * vh * 0.22).toFixed(1) + "px");
      const fade = clamp(1 - p * 2.2).toFixed(3);
      heroUI.forEach((el) => (el.style.opacity = fade));
      wordmark.style.opacity = clamp(1.6 - p * 2).toFixed(3);
    }

    // manifesto word reveal
    const mr = manifestoEl.getBoundingClientRect();
    if (mr.top < vh && mr.bottom > 0) {
      const p = clamp((vh * 0.82 - mr.top) / (mr.height + vh * 0.1));
      const words = manifestoEl._words || [];
      const n = Math.floor(p * words.length * 1.05);
      for (let i = 0; i < words.length; i++) words[i].classList.toggle("on", i < n);
    }

    // card parallax
    if (!reduce) visibleCards.forEach((c) => {
      const r = c.getBoundingClientRect();
      const off = (r.top + r.height / 2 - vh / 2) / vh;
      c._imgs.forEach((im) => im.style.setProperty("--py", (off * -6).toFixed(2) + "%"));
    });

    // film strip horizontal travel
    const sr = strip.getBoundingClientRect();
    if (sr.top < vh && sr.bottom > 0) {
      const p = clamp(-sr.top / (sr.height - vh));
      const dist = Math.max(0, stripTrack.scrollWidth - vw);
      stripTrack.style.setProperty("--sx", (-p * dist).toFixed(1) + "px");
      stripBar.style.setProperty("--sp", p.toFixed(4));
      if (!reduce) stripTrack._imgs.forEach((im, i) => im.style.setProperty("--fx", ((p * 2 - 1) * -6 + (i % 2) * 2).toFixed(2) + "%"));
    }
  }
  addEventListener("scroll", requestTick, { passive: true });
  addEventListener("resize", () => { vh = innerHeight; vw = innerWidth; requestTick(); }, { passive: true });

  // Reveal-on-view + counters
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      if (en.target.dataset.count) countUp(en.target);
      io.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -12% 0px" });
  function countUp(el) {
    const to = +el.dataset.count, from = to > 100 ? to - 40 : 0, dur = 1400, s = performance.now();
    (function f(n) { const p = clamp((n - s) / dur); el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(s);
  }

  // Manifesto
  function renderManifesto() {
    let italic = false;
    const html = t("manifesto").split(/\s+/).map((tok) => {
      const m = tok.match(/^\[img:([\w-]+)\]$/);
      if (m) return `<span class="w pill">${img(m[1], "120px")}</span>`;
      if (tok.startsWith("*")) { italic = true; tok = tok.slice(1); }
      let end = false;
      if (tok.includes("*")) { end = true; tok = tok.replace("*", ""); }
      const out = italic ? `<span class="w"><em>${esc(tok)}</em></span>` : `<span class="w">${esc(tok)}</span>`;
      if (end) italic = false;
      return out;
    }).join(" ");
    manifestoEl.innerHTML = html;
    manifestoEl._words = $$(".w", manifestoEl);
  }

  // Marquee band with scroll-velocity boost
  const bandTrack = $(".band-track");
  function renderBand() {
    const items = t("band").map((s) => s.startsWith("*") ? `<span><em>${esc(s.replace(/\*/g, ""))}</em></span>` : `<span>${esc(s)}</span>`).join('<span class="dot"></span>');
    const row = `<div class="band-row">${items}<span class="dot"></span></div>`;
    bandTrack.innerHTML = row + row + row;
  }
  (function band() {
    if (reduce) return;
    let x = 0, vel = 0, last = scrollY, on = false, w = 0;
    new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) requestAnimationFrame(loop); }).observe($(".band"));
    function loop() {
      if (!on) return;
      const y = scrollY; vel = lerp(vel, (y - last) * 0.6, 0.12); last = y;
      w = bandTrack.firstElementChild ? bandTrack.firstElementChild.offsetWidth : 1;
      x -= 1.1 + Math.abs(vel);
      if (x <= -w) x += w;
      bandTrack.style.transform = `translate3d(${x}px,0,0) skewX(${clamp(-vel * 0.4, -10, 10).toFixed(2)}deg)`;
      requestAnimationFrame(loop);
    }
  })();

  /* ---------- 6. Work grid & case study ---------- */
  const grid = $(".work-grid");
  const cardIO = new IntersectionObserver((ents) => ents.forEach((e) => { e.isIntersecting ? visibleCards.add(e.target) : visibleCards.delete(e.target); }), { rootMargin: "10% 0px" });
  let filter = "all";

  function renderCards() {
    visibleCards.clear();
    grid.innerHTML = PROJECTS.map((p, i) => {
      const d = P(p);
      return `<article class="card in" data-i="${i}" data-type="${p.type}" tabindex="0" role="button" aria-label="${esc(d.client + " — " + d.title)}">
        <div class="card-media">
          <span class="card-tag">${esc(d.cat)}</span>
          ${img(p.cover, "(max-width: 900px) 100vw, 50vw")}
          ${img(p.alt, "(max-width: 900px) 100vw, 50vw", "card-alt")}
        </div>
        <div class="card-cap">
          <span class="card-no">${String(i + 1).padStart(2, "0")}</span>
          <h3 class="card-title">${esc(d.title)}<small>${esc(d.client)}</small></h3>
          <span class="card-arrow" aria-hidden="true">→</span>
        </div>
      </article>`;
    }).join("");
    $$(".card", grid).forEach((c) => {
      c._imgs = $$("img", c);
      cardIO.observe(c); io.observe(c);
      c.classList.toggle("is-dim", filter !== "all" && c.dataset.type !== filter);
      c.addEventListener("pointermove", (e) => {
        const r = c.querySelector(".card-media").getBoundingClientRect();
        c.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
        c.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
      });
      c.addEventListener("click", () => openCase(+c.dataset.i));
      c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCase(+c.dataset.i); } });
    });
  }
  $$(".filters button").forEach((b) => b.addEventListener("click", () => {
    filter = b.dataset.filter;
    $$(".filters button").forEach((x) => x.classList.toggle("is-active", x === b));
    $$(".card", grid).forEach((c) => c.classList.toggle("is-dim", filter !== "all" && c.dataset.type !== filter));
  }));

  const caseEl = $(".case"), caseScroll = $(".case-scroll");
  let caseIndex = -1, lastFocus = null;
  function fillCase(i) {
    const p = PROJECTS[i], d = P(p), nx = PROJECTS[(i + 1) % PROJECTS.length];
    $(".case-count", caseEl).textContent = `${String(i + 1).padStart(2, "0")} / ${String(PROJECTS.length).padStart(2, "0")}`;
    const hero = $(".case-hero img", caseEl);
    hero.srcset = srcset(p.cover); hero.sizes = "100vw"; hero.src = `${IMG}${p.cover}-1600.webp`; hero.alt = d.title;
    $(".case-client", caseEl).textContent = d.client;
    $(".case-cat", caseEl).textContent = d.cat;
    $(".case-title", caseEl).textContent = d.title;
    $(".case-desc", caseEl).textContent = d.desc;
    $(".case-tags", caseEl).innerHTML = d.tags.map((x) => `<li>${esc(x)}</li>`).join("");
    $(".case-impact", caseEl).innerHTML = (d.impact || []).map(([h, b]) => `<div><b>${esc(h)}</b><p>${esc(b)}</p></div>`).join("");
    const w = $(".case-watch", caseEl);
    w.hidden = !p.video;
    if (p.video) { w.dataset.video = p.video; w.lastElementChild.textContent = p.video.startsWith("ig:") ? t("insta") : t("watch"); }
    $(".case-gallery", caseEl).innerHTML = p.gallery.map((g) => img(g, "(max-width: 900px) 90vw, 60vw")).join("");
    $(".case-next-title", caseEl).textContent = P(nx).title;
    const ni = $(".case-next img", caseEl); ni.src = `${IMG}${nx.cover}-760.webp`;
  }
  function openCase(i, fromHash) {
    caseIndex = i;
    fillCase(i);
    caseScroll.scrollTop = 0;
    lastFocus = document.activeElement;
    caseEl.classList.add("is-open");
    caseEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    if (!fromHash) history.replaceState(null, "", "#work/" + PROJECTS[i].slug);
    setTimeout(() => $(".case-close", caseEl).focus({ preventScroll: true }), 400);
  }
  function closeCase() {
    if (caseIndex < 0) return;
    caseIndex = -1;
    caseEl.classList.remove("is-open");
    caseEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $(".case-close").addEventListener("click", closeCase);
  $(".case-next").addEventListener("click", () => {
    caseScroll.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    const n = (caseIndex + 1) % PROJECTS.length;
    setTimeout(() => openCase(n), reduce ? 0 : 350);
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") { if (videoEl.classList.contains("is-open")) closeVideo(); else if (caseIndex > -1) closeCase(); else setMenu(false); }
    if (caseIndex > -1 && !videoEl.classList.contains("is-open")) {
      const fwd = lang === "ar" ? "ArrowLeft" : "ArrowRight", back = lang === "ar" ? "ArrowRight" : "ArrowLeft";
      if (e.key === fwd) openCase((caseIndex + 1) % PROJECTS.length);
      if (e.key === back) openCase((caseIndex - 1 + PROJECTS.length) % PROJECTS.length);
    }
  });

  // drag-to-scroll gallery (mouse only; touch scrolls natively)
  (() => {
    const g = $(".case-gallery");
    let down = false, sx = 0, sl = 0, moved = false;
    g.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = g.scrollLeft; g.classList.add("is-drag"); });
    addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 3) moved = true; g.scrollLeft = sl - dx; });
    addEventListener("pointerup", () => { down = false; g.classList.remove("is-drag"); });
    g.addEventListener("click", (e) => { if (moved) e.preventDefault(); }, true);
  })();

  // Video modal (iframe injected only on demand => zero cost until clicked)
  const videoEl = $(".video"), videoFrame = $(".video-frame");
  function openVideo(spec) {
    if (!spec) return;
    if (spec.startsWith("ig:")) { window.open(spec.slice(3), "_blank", "noopener"); return; }
    const id = spec.split(":")[1];
    videoFrame.innerHTML = `<iframe src="https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&dnt=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="SHMAQ film"></iframe>`;
    videoEl.classList.add("is-open");
    videoEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
  }
  function closeVideo() {
    videoEl.classList.remove("is-open");
    videoEl.setAttribute("aria-hidden", "true");
    setTimeout(() => (videoFrame.innerHTML = ""), 500);
    if (caseIndex < 0) document.body.classList.remove("is-locked");
  }
  $(".video-close").addEventListener("click", closeVideo);
  videoEl.addEventListener("click", (e) => { if (e.target === videoEl) closeVideo(); });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-video]"); if (b) openVideo(b.dataset.video); });

  /* ---------- 7. Film strip, approach, clients ---------- */
  stripTrack.innerHTML = STRIP.map((n, i) =>
    `<figure class="frame"><div class="frame-in">${img(n, "(max-width: 900px) 70vw, 45vw")}</div><figcaption>KODAK ${String(i + 1).padStart(2, "0")}A ▸ 16MM</figcaption></figure>`
  ).join("");
  stripTrack._imgs = $$("img", stripTrack);

  // Approach: floating image follows cursor
  (() => {
    const fl = $(".float-img"), fi = $("img", fl);
    if (!finePointer) return;
    const pos = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    let active = false, raf = 0;
    function loop() {
      cur.x = lerp(cur.x, pos.x, 0.14); cur.y = lerp(cur.y, pos.y, 0.14);
      const rot = clamp((pos.x - cur.x) * 0.05, -8, 8);
      fl.style.transform = `translate3d(${cur.x - 150}px, ${cur.y - 112}px, 0) rotate(${rot}deg)`;
      raf = active ? requestAnimationFrame(loop) : 0;
    }
    $$(".steps li").forEach((li) => {
      li.addEventListener("pointerenter", (e) => {
        fi.src = `${IMG}${li.dataset.img}-760.webp`;
        if (!active) { cur.x = pos.x = e.clientX; cur.y = pos.y = e.clientY; }
        active = true; fl.classList.add("is-on");
        if (!raf) raf = requestAnimationFrame(loop);
      });
      li.addEventListener("pointermove", (e) => { pos.x = e.clientX; pos.y = e.clientY; });
      li.addEventListener("pointerleave", () => { active = false; fl.classList.remove("is-on"); });
    });
  })();

  // Clients marquee
  $$(".logos").forEach((row) => {
    const set = `<div class="logos-set">${CLIENTS[+row.dataset.row].map((c) => `<img src="./assets/clients/${c}.png" alt="${c.replace(/-/g, " ")}" height="96" decoding="async" />`).join("")}</div>`;
    row.innerHTML = set + set.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');
  });

  /* ---------- 8. Boot ---------- */
  $(".year").textContent = new Date().getFullYear();
  applyLang();
  $$("[data-count]").forEach((el) => io.observe(el));
  io.observe($(".contact-title"));
  $$(".manifesto-foot > *, .steps li, .work-head > *, .contact-lead").forEach((el) => { el.classList.add("in"); io.observe(el); });
  runLoader();
  requestTick();

  // Deep link: #work/<slug>
  const m = location.hash.match(/^#work\/([\w-]+)/);
  if (m) { const i = PROJECTS.findIndex((p) => p.slug === m[1]); if (i > -1) setTimeout(() => openCase(i, true), 1600); }
})();
