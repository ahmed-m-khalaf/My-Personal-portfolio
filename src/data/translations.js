/**
 * Lightweight i18n — zero-dependency translations.
 * getT(lang) returns a resolver:  t('nav.home')  →  string
 */

export const translations = {
  /* ─────────────────  ENGLISH  ───────────────── */
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      services: "Services",
      projects: "Projects",
      certificates: "Certificates",
      blog: "Blog",
      contact: "Contact",
      letsTalk: "Let's Talk",
      toggleLang: "العربية",
    },
    hero: {
      name: "Ahmed M Khalaf",
      title: "Front-End Developer",
      roles: ["Front-End Developer", "React Specialist", "UI/UX Enthusiast", "Performance Optimizer", "Firebase Developer"],
      tagline:
        "Crafting immersive, high-performance web experiences where motion meets functionality to captivate and convert.",
      ctas: {
        viewWork: "View My Work",
        letsTalk: "Let's Talk",
      },
      socialsTooltip: "Follow me on",
    },
    sections: {
      about: "About Me",
      skills: "My Skills",
      servicesTitle: "What I Do",
      servicesSubtitle: "Services",
      projectsTitle: "My Projects",
      projectsSubtitle: "Featured Work",
      certificatesTitle: "Achievements",
      certificatesSubtitle: "Certificates",
      contactTitle: "Get In Touch",
      contactSubtitle: "Let's work together",
      contactHeader: "Let's Create Something Amazing",
      contactBody:
        "Have a project in mind or just want to say hello? I'd love to hear from you. Drop me a message and I'll get back to you as soon as possible.",
      followMe: "Follow Me",
      footerQuickLinks: "Quick Links",
      footerConnect: "Connect",
      hireMe: "Hire Me",
      downloadCv: "Download CV",
    },
    contact: {
      labels: {
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
      },
      placeholders: {
        name: "John Doe",
        email: "john@example.com",
        message: "Tell me about your project...",
      },
      buttons: {
        sendMessage: "Send Message",
        sending: "Sending...",
      },
      status: {
        success: "Message sent successfully! I'll get back to you soon.",
        error: "Something went wrong. Please try again later.",
      },
      infoLabels: {
        email: "Email",
        phone: "Phone",
        location: "Location",
      },
    },
    ui: {
      featured: "Featured",
      liveDemo: "Live Demo",
      github: "GitHub",
      issued: "Issued:",
      previous: "Previous",
      next: "Next",
      pause: "Pause",
      play: "Play",
    },
    aria: {
      projectsCarousel: (active, total, title) =>
        `Projects carousel - ${active} of ${total}: ${title}`,
      certificatesCarousel: (active, total, title) =>
        `Certificates carousel - ${active} of ${total}: ${title}`,
      previousProject: "Previous project",
      nextProject: "Next project",
      goToProject: (index) => `Go to project ${index}`,
      viewProject: (title) => `View ${title}`,
      goToSlide: (index) => `Go to slide ${index}`,
      previousCertificate: "Previous certificate",
      nextCertificate: "Next certificate",
    },
    footer: {
      description:
        "Crafting digital experiences that matter. Let's build something amazing together.",
      copyright: "All rights reserved.",
      madeBy: "Made By Dev",
      madeBySuffix: "Ahmed.",
    },
    /* Content translations — keyed by ID */
    content: {
      about: {
        email: "ahmdalmhmwd939@gmail.com",
        phone: "+20 1125388495",
        location: "Suhag, Egypt",
        bio:
          "A UX-focused front-end developer with 2+ years of experience designing and building responsive, user-centered web experiences. I've delivered 12+ projects that balance clean UI, smooth interactions, and real usability.",
        resume: "/resume.pdf",
      },
      skills: [
        { id: 1, name: "React.js", category: "Frontend" },
        { id: 2, name: "JavaScript", category: "Frontend" },
        { id: 3, name: "Tailwind CSS", category: "Frontend" },
        { id: 4, name: "GitHub", category: "Tools" },
        { id: 5, name: "Responsive Design", category: "Frontend" },
        { id: 6, name: "Performance Optimization", category: "Frontend" },
        { id: 7, name: "GSAP", category: "Animation" },
        { id: 8, name: "Framer Motion", category: "Animation" },
        { id: 9, name: "HTML5", category: "Frontend" },
        { id: 10, name: "CSS3", category: "Frontend" },
        { id: 11, name: "Redux", category: "State Management" },
        { id: 12, name: "Vite", category: "Tools" },
        { id: 13, name: "Firebase", category: "Backend" },
      ],
      services: [
        { id: 1, title: "Modern Web Development", description: "Building highly scalable, SSR/SSG optimized web applications using React, Next.js, and Tailwind CSS." },
        { id: 2, title: "Interactive UI & Animations", description: "Crafting immersive, award-winning user experiences with GPU-accelerated animations using GSAP and Framer Motion." },
        { id: 3, title: "Performance Optimization", description: "Auditing and optimizing Core Web Vitals to ensure lightning-fast load times and seamless rendering." },
        { id: 4, title: "Technical SEO", description: "Implementing advanced SEO strategies, dynamic meta tags, and semantic HTML for maximum search engine visibility." },
        { id: 5, title: "API & CMS Integration", description: "Connecting scalable frontends with Headless CMS (Sanity, Strapi) and integrating complex REST/GraphQL APIs." },
        { id: 6, title: "Design Systems", description: "Developing robust, accessible, and reusable component libraries to ensure visual consistency across large platforms." },
      ],
      projects: [
        { id: 9, title: "SkyReserve X", description: "A full-stack flight booking platform built with a modern serverless architecture using Firebase. The project focuses on performance, scalability, and a premium user experience. It includes authentication, real-time database integration, advanced UI animations, and strict TypeScript for reliability." },
        { id: 1, title: "My Portfolio", description: "A modern, high-performance personal portfolio featuring stunning animations, smooth interactions, and optimized SEO for maximum reach." },
        { id: 2, title: "SmartSpend", description: "A smart expense tracking dashboard that helps you manage your finances with beautiful charts, transaction history, and budget insights." },
        { id: 3, title: "Estate Elite", description: "A modern real estate platform showcasing luxury properties with an elegant UI and smooth user experience." },
        { id: 4, title: "StockSphere", description: "A comprehensive stock market dashboard with real-time data visualization, watchlists, and market insights." },
        { id: 5, title: "Todo List App", description: "A clean and intuitive task management application to organize your daily tasks efficiently." },
        { id: 6, title: "Nexora Store", description: "An e-commerce storefront with a modern design, product galleries, and seamless shopping experience." },
        { id: 7, title: "Word Ladder Solver", description: "An algorithm visualizer that finds the shortest path between two words using BFS (Breadth-First Search)." },
        { id: 8, title: "DriveLux", description: "A premium car rental platform featuring an extensive fleet catalog, vehicle comparison, wishlist, dashboard, and a seamless booking experience." },
      ],
      certificates: [
        { id: 1, title: "Canva Essentials", issuer: "Canva", date: "2025" },
        { id: 2, title: "Professional Soft Skills Learning Pathway", issuer: "LinkedIn Learning", date: "Jun 2025" },
        { id: 3, title: "McKinsey Forward Program", issuer: "McKinsey & Company", date: "Dec 2025" },
        { id: 4, title: "Forward Program Badge (Adaptability & Resilience)", issuer: "McKinsey.org", date: "Dec 2025" },
        { id: 5, title: "Security, Compliance, and Identity Fundamentals", issuer: "Microsoft", date: "Sep 2025" },
        { id: 6, title: "HTML, CSS, JS for Modern Web Developers", issuer: "Udemy", date: "July 2025" },
        { id: 7, title: "CCNA: Switching, Routing, and Wireless Essentials", issuer: "Cisco Networking Academy", date: "Feb 2026" },
      ],
    },
  },

  /* ─────────────────  ARABIC  ───────────────── */
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من أنا",
      skills: "المهارات",
      services: "الخدمات",
      projects: "المشاريع",
      certificates: "الشهادات",
      blog: "المدونة",
      contact: "تواصل معي",
      letsTalk: "تحدث معي",
      toggleLang: "English",
    },
    hero: {
      name: "أحمد م. خلف",
      title: "مطور واجهات أمامية",
      roles: ["مطور واجهات أمامية", "متخصص React", "مهتم بتجربة المستخدم", "محسّن أداء المواقع", "مطور Firebase"],
      tagline:
        "أصنع تجارب ويب غامرة وعالية الأداء حيث تلتقي الحركة بالوظيفة لتجذب وتحوّل.",
      ctas: {
        viewWork: "شاهد أعمالي",
        letsTalk: "تحدث معي",
      },
      socialsTooltip: "تابعني على",
    },
    sections: {
      about: "من أنا",
      skills: "مهاراتي",
      servicesTitle: "ما أقدمه",
      servicesSubtitle: "الخدمات",
      projectsTitle: "مشاريعي",
      projectsSubtitle: "أعمال مميزة",
      certificatesTitle: "الإنجازات",
      certificatesSubtitle: "الشهادات",
      contactTitle: "تواصل معي",
      contactSubtitle: "لنعمل معًا",
      contactHeader: "لنصنع شيئًا مذهلاً معًا",
      contactBody:
        "لديك مشروع في ذهنك أو تريد فقط إلقاء التحية؟ أحب أن أسمع منك. أرسل لي رسالة وسأرد عليك في أقرب وقت.",
      followMe: "تابعني",
      footerQuickLinks: "روابط سريعة",
      footerConnect: "تواصل",
      hireMe: "وظّفني",
      downloadCv: "تحميل السيرة الذاتية",
    },
    contact: {
      labels: {
        name: "اسمك",
        email: "بريدك الإلكتروني",
        message: "رسالتك",
      },
      placeholders: {
        name: "أحمد محمد",
        email: "ahmed@example.com",
        message: "أخبرني عن مشروعك...",
      },
      buttons: {
        sendMessage: "إرسال الرسالة",
        sending: "جاري الإرسال...",
      },
      status: {
        success: "تم إرسال الرسالة بنجاح! سأرد عليك قريبًا.",
        error: "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا.",
      },
      infoLabels: {
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        location: "الموقع",
      },
    },
    ui: {
      featured: "مميز",
      liveDemo: "عرض مباشر",
      github: "GitHub",
      issued: "صدر في:",
      previous: "السابق",
      next: "التالي",
      pause: "إيقاف",
      play: "تشغيل",
    },
    aria: {
      projectsCarousel: (active, total, title) =>
        `عرض المشاريع - ${active} من ${total}: ${title}`,
      certificatesCarousel: (active, total, title) =>
        `عرض الشهادات - ${active} من ${total}: ${title}`,
      previousProject: "المشروع السابق",
      nextProject: "المشروع التالي",
      goToProject: (index) => `الذهاب للمشروع ${index}`,
      viewProject: (title) => `عرض ${title}`,
      goToSlide: (index) => `الذهاب للشريحة ${index}`,
      previousCertificate: "الشهادة السابقة",
      nextCertificate: "الشهادة التالية",
    },
    footer: {
      description:
        "أصنع تجارب رقمية ذات قيمة. لنبني شيئًا مذهلاً معًا.",
      copyright: "جميع الحقوق محفوظة.",
      madeBy: "صنع بواسطة المطور",
      madeBySuffix: "أحمد.",
    },
    content: {
      about: {
        email: "ahmdalmhmwd939@gmail.com",
        phone: "+20 1125388495",
        location: "سوهاج، مصر",
        bio:
          "مطور واجهات أمامية متخصص في تجربة المستخدم بخبرة تزيد عن سنتين في تصميم وبناء تجارب ويب متجاوبة ومرتكزة على المستخدم. أنجزت أكثر من 12 مشروعًا يجمع بين واجهة نظيفة وتفاعلات سلسة وسهولة استخدام حقيقية.",
        resume: "/resume.pdf",
      },
      skills: [
        { id: 1, name: "React.js", category: "الواجهة الأمامية" },
        { id: 2, name: "JavaScript", category: "الواجهة الأمامية" },
        { id: 3, name: "Tailwind CSS", category: "الواجهة الأمامية" },
        { id: 4, name: "GitHub", category: "الأدوات" },
        { id: 5, name: "التصميم المتجاوب", category: "الواجهة الأمامية" },
        { id: 6, name: "تحسين الأداء", category: "الواجهة الأمامية" },
        { id: 7, name: "GSAP", category: "الحركة" },
        { id: 8, name: "Framer Motion", category: "الحركة" },
        { id: 9, name: "HTML5", category: "الواجهة الأمامية" },
        { id: 10, name: "CSS3", category: "الواجهة الأمامية" },
        { id: 11, name: "Redux", category: "إدارة الحالة" },
        { id: 12, name: "Vite", category: "الأدوات" },
        { id: 13, name: "Firebase", category: "باك إند" },
      ],
      services: [
        { id: 1, title: "تطوير الويب الحديث", description: "بناء تطبيقات ويب متدرجة وذات أداء فائق باستخدام تقنيات React و Next.js و Tailwind CSS." },
        { id: 2, title: "واجهات تفاعلية وأنيميشن", description: "تصميم تجارب مستخدم غامرة واحترافية باستخدام تأثيرات حركية متقدمة مع GSAP و Framer Motion." },
        { id: 3, title: "تحسين الأداء", description: "مراجعة وتحسين مؤشرات الويب الأساسية (Core Web Vitals) لضمان سرعة تحميل فائقة وعرض سلس." },
        { id: 4, title: "تحسين محركات البحث التقني", description: "تطبيق استراتيجيات SEO متقدمة، وعلامات وصفية ديناميكية، و Semantic HTML لضمان أقصى ظهور في محركات البحث." },
        { id: 5, title: "ربط الأنظمة و APIs", description: "ربط الواجهات الأمامية بأنظمة إدارة المحتوى (Headless CMS) وتكاملها مع APIs المعقدة (REST/GraphQL)." },
        { id: 6, title: "أنظمة التصميم", description: "تطوير مكتبات مكونات قوية وسهلة الوصول وقابلة لإعادة الاستخدام لضمان التناسق البصري عبر المشاريع الكبيرة." },
      ],
      projects: [
        { id: 9, title: "SkyReserve X", description: "منصة حجز طيران متكاملة مبنية بمعمارية حديثة بدون خوادم باستخدام Firebase. يركز المشروع على الأداء وقابلية التوسع وتجربة مستخدم متميزة." },
        { id: 1, title: "بورتفوليو شخصي", description: "موقع بورتفوليو شخصي حديث وعالي الأداء يتميز بحركات مذهلة وتفاعلات سلسة وتحسين SEO." },
        { id: 2, title: "SmartSpend", description: "لوحة تحكم ذكية لتتبع المصاريف تساعدك على إدارة أموالك برسوم بيانية جميلة وسجل المعاملات." },
        { id: 3, title: "Estate Elite", description: "منصة عقارات حديثة تعرض العقارات الفاخرة بواجهة أنيقة وتجربة مستخدم سلسة." },
        { id: 4, title: "StockSphere", description: "لوحة تحكم شاملة لسوق الأسهم مع تصور بيانات في الوقت الفعلي وقوائم مراقبة." },
        { id: 5, title: "تطبيق قائمة المهام", description: "تطبيق نظيف وبديهي لإدارة المهام لتنظيم مهامك اليومية بكفاءة." },
        { id: 6, title: "Nexora Store", description: "واجهة متجر إلكتروني بتصميم حديث ومعارض منتجات وتجربة تسوق سلسة." },
        { id: 7, title: "Word Ladder Solver", description: "أداة تصور خوارزميات تجد أقصر مسار بين كلمتين باستخدام خوارزمية BFS." },
        { id: 8, title: "DriveLux", description: "منصة تأجير سيارات فاخرة تتميز بكتالوج شامل ومقارنة المركبات وقائمة الأمنيات ولوحة التحكم." },
      ],
      certificates: [
        { id: 1, title: "أساسيات Canva", issuer: "Canva", date: "2025" },
        { id: 2, title: "مسار تعلم المهارات الشخصية المهنية", issuer: "LinkedIn Learning", date: "يونيو 2025" },
        { id: 3, title: "برنامج McKinsey Forward", issuer: "McKinsey & Company", date: "ديسمبر 2025" },
        { id: 4, title: "شارة برنامج Forward (التكيف والمرونة)", issuer: "McKinsey.org", date: "ديسمبر 2025" },
        { id: 5, title: "أساسيات الأمان والامتثال والهوية", issuer: "Microsoft", date: "سبتمبر 2025" },
        { id: 6, title: "HTML, CSS, JS لمطوري الويب الحديثين", issuer: "Udemy", date: "يوليو 2025" },
        { id: 7, title: "CCNA: التبديل والتوجيه وأساسيات اللاسلكي", issuer: "Cisco Networking Academy", date: "فبراير 2026" },
      ],
    },
  },
};

/* ─── Helper ─────────────────────────────────── */

/**
 * Returns a resolver for the given language.
 *
 *   const t = getT('ar');
 *   t('nav.home')           → "الرئيسية"
 *   t('hero.ctas.viewWork') → "شاهد أعمالي"
 *
 * Falls back to English, then to the fallback string, then to the key itself.
 */
export function getT(lang = 'en') {
  const dict = translations[lang] || translations.en;
  const fallbackDict = translations.en;

  return function t(path, fallback) {
    const resolve = (obj, keys) => {
      let current = obj;
      for (const k of keys) {
        if (current == null || typeof current !== 'object') return undefined;
        current = current[k];
      }
      return current;
    };

    const keys = path.split('.');
    const value = resolve(dict, keys);
    if (value !== undefined) return value;

    const fb = resolve(fallbackDict, keys);
    if (fb !== undefined) return fb;

    return fallback !== undefined ? fallback : path;
  };
}

/**
 * Get translated content item by ID from the content arrays.
 *   getContentById('ar', 'projects', 9) → { id:9, title:"SkyReserve X", ... }
 */
export function getContentById(lang, section, id) {
  const t = getT(lang);
  const items = t(`content.${section}`);
  if (Array.isArray(items)) {
    return items.find((item) => item.id === id);
  }
  return null;
}
