/**
 * Portfolio content — edit this file to add, remove or reorder work.
 * Image names refer to assets/img/<name>-760.webp and <name>-1600.webp.
 * type:  "film" | "photo"  (drives the filter buttons)
 * video: "vimeo:<id>" plays in the on-site player, "ig:<url>" opens Instagram, null hides the button.
 */
export const PROJECTS = [
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

/** Hero slideshow, in order (caption per language). */
export const HERO = [
  { img: "hero-cello", en: "Shmaq — Your creative studio", ar: "شماغ — استديو إبداعي" },
  { img: "bsf-podium", en: "BSF × Saudi League", ar: "البنك السعودي الفرنسي × الدوري" },
  { img: "salt-mountain", en: "Qassab Salt × Marble", ar: "ملحة القصب × ماربل" },
  { img: "dolma-feast", en: "Dolmat Ommy — 60 years", ar: "دولمة أمي — ستين عام" },
  { img: "easy-ball", en: "Easy Bakery — Suwaidi", ar: "إيزي بيكري — السويدي" },
  { img: "drinks-parrot", en: "Marble — Summer Soul", ar: "ماربل — روح الصيف" }
];

/** Frames shown in the pinned 16mm film strip. */
export const STRIP = ["palm-alley", "roots-pool", "dolma-walk", "palm-mother", "easy-bike", "win-sax", "palm-dates", "kabab-c", "bsf-face", "palm-boy"];

/** Client logos (assets/clients/<name>.png), one array per marquee row. */
export const CLIENTS = [
  ["bsf", "marble", "dolmat-ommy", "ithraa", "easy-bakery", "kabab-zahr"],
  ["alrajhi", "riyad-bank", "moh", "uae-culture", "sayyar", "gazelle"]
];
