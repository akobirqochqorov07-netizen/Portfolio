"use client";

import React, { createContext, useContext, useState } from "react";

export type Lang = "en" | "ru" | "uz";

export interface Translations {
    aboutTitle: string;
    tabs: { aboutMe: string; doing: string; interests: string };
    aboutText: string[];
    doingTitle: string;
    cards: { title: string; text: string }[];
    interestsTitle: string;
    interestsText: string[];
    findOnline: string;
    navAbout: string;
    navResume: string;
    navPortfolio: string;

    // Portfolio
    portfolioTitle: string;
    portfolioSubtitle: string;
    portfolioViewBtn: string;
    portfolioExpandOpen: string;
    portfolioExpandClose: string;
    portfolioSoon: string;
    portfolioSoonSub: string;
    portfolioProjectDescs: string[];

    // Sidebar
    sidebarShowContacts: string;
    sidebarEmail: string;
    sidebarTelegram: string;
    sidebarLocation: string;
    sidebarJobTitle: string;
    sidebarMapExpand: string;
    sidebarMapCollapse: string;

    // Resume
    resumeTitle: string;
    resumeFilterAll: string;
    resumeFilterWork: string;
    resumeFilterEdu: string;
    timelineWork: string;
    timelineEducation: string;
    timelineExperience: string;
    skillsTitle: string;

    // Skills descriptions
    skillDescs: string[];
    pdpTitle: string;
    pdpDesc: string;
    schoolTitle: string;
    schoolDesc: string;
    payfintechTitle: string;
    payfintechDesc: string;
    greenbytTitle: string;
    greenbytDesc: string;
    humansTitle: string;
    humansDesc: string;
    comnetTitle: string;
    comnetDesc: string;
}

export const translations: Record<Lang, Translations> = {
    en: {
        aboutTitle: "About Me",
        tabs: { aboutMe: "About Me", doing: "What I Do", interests: "Interests" },
        aboutText: [
            "Hey there! I'm Akobir, a 21-year-old developer who lives and breathes software. Currently, I'm a 4th-year Business Analytics student at PDP University in Tashkent, always eager to push boundaries.",
            "My absolute superpower is combining Frontend Development with Business Analysis. This synergy saves me from coding features just for the sake of it, instead ensuring every line of code solves a real human problem and builds something worth using.",
        ],
        doingTitle: "What I'm Doing",
        cards: [
            {
                title: "Building",
                text: "Crafting fast, modern web experiences with React, Next.js, TypeScript, and Tailwind CSS—where every pixel has a purpose and every interaction should feel natural.",
            },
            {
                title: "Thinking",
                text: "Connecting business goals with technical solutions. I enjoy understanding how users think, what businesses need, and translating both into products that actually make sense.",
            },
            {
                title: "Combining Both",
                text: "The fun part is where these two worlds meet. Business analysis tells me what should be built; frontend development lets me bring it to life—making sure I'm not just shipping features, but building something worth using.",
            },
        ],
        interestsTitle: "Interests",
        interestsText: [
            "Curiosity is what drives me. No matter what field I work in, AI will dominate the future and shape our daily routines. That's why I am intensely passionate about test-driving every single new AI tool and release.",
            "Beyond tech, I have over 20 diverse hobbies, mostly sports like basketball and table tennis. For me, a hobby isn't just a way to pass time—it's an arena to test my extremes. I aim to achieve wins in each, then move to new challenges. My goal isn't to live for work, but to love what I do and live life to the absolute maximum. We only get one shot at this life, and I intend to make every single second count!",
        ],
        findOnline: "Find Me Online",
        navAbout: "About",
        navResume: "Resume",
        navPortfolio: "Portfolio",

        // Portfolio
        portfolioTitle: "Portfolio",
        portfolioSubtitle: "Projects I've worked on",
        portfolioViewBtn: "View Project",
        portfolioExpandOpen: "Show all projects",
        portfolioExpandClose: "Collapse",
        portfolioSoon: "Soon",
        portfolioSoonSub: "New project incoming",
        portfolioProjectDescs: [
            "Energy analytics platform with real-time data visualization and a responsive dark-mode dashboard.",
            "Online travel booking platform for Uzbekistan destinations with tour packages, guides, and seamless reservation flow.",
            "Modern banking interface with transaction flows, card management widgets, and secure form patterns.",
            "Task & productivity workspace with boards, reminders, and a focus-first, distraction-free layout.",
            "P2P payment platform unifying bank accounts and e-wallets into one intuitive financial interface.",
            "AI productivity assistant with conversational UI, prompt management, and real-time streaming.",
        ],

        // Sidebar
        sidebarShowContacts: "Show Contacts",
        sidebarEmail: "Email",
        sidebarTelegram: "Telegram",
        sidebarLocation: "Location",
        sidebarJobTitle: "Frontend & Business Analyst",
        sidebarMapExpand: "Click to explore",
        sidebarMapCollapse: "Click to collapse",

        // Resume
        resumeFilterAll: "All",
        resumeFilterWork: "Work",
        resumeFilterEdu: "Education",

        // Skills descriptions (9 items matching skills array)
        skillDescs: [
            "Semantic HTML5, advanced layouts, flex, grid, and hardware-accelerated CSS animations.",
            "Asynchronous flows, type safety, closure mechanics, and functional coding patterns.",
            "Server Actions, route optimization, state structures, and optimized virtual DOM updates.",
            "Utility-first architectures, responsiveness parameters, and theme setups.",
            "Designing complex business process flows, sequence charts, and logic models.",
            "Query design, relation mappings, information processing, and stats dashboards.",
            "Managing sprint backlogs, organizing ticket stories, and running daily standups.",
            "Writing user stories, defining scope metrics, and specifying functional parameters.",
            "Wireframing interfaces, visual components, interaction mockups, and glassmorphism styling.",
        ],

        // Resume
        resumeTitle: "Resume",
        timelineWork: "Work Experience",
        timelineEducation: "Education",
        timelineExperience: "Career Path",
        skillsTitle: "My Professional Skills",

        pdpTitle: "PDP University",
        pdpDesc: "Software Engineering, Bachelor's Degree. Developing strong foundations in algorithms, system architecture, and modern web frameworks.",
        schoolTitle: "Specialized School №160",
        schoolDesc: "Focused studies in physics and mathematics, building logical thinking and analytical skills.",
        payfintechTitle: "PayFintech",
        payfintechDesc: "Designing banking interfaces, frontend widgets, and translating transaction requirements into slick UI logic.",
        greenbytTitle: "Greenbyt",
        greenbytDesc: "Developing modular frontend architectures, managing client dashboards, and optimizing web performance.",
        humansTitle: "Humans & Uztelecom",
        humansDesc: "Interacted with hundreds of customers daily, resolving technical issues and mastering natural communication dynamics.",
        comnetTitle: "Comnet",
        comnetDesc: "Diagnosed gateway configuration issues and supported users on network/broadband connection setups.",
    },
    ru: {
        aboutTitle: "Обо мне",
        tabs: { aboutMe: "Обо мне", doing: "Что я делаю", interests: "Интересы" },
        aboutText: [
            "Привет! Я Акобир, мне 21 лет. Я студент 4-го курса направления Business Analytics в PDP University в Ташкенте, и я безумно влюблен в технологии и дизайн.",
            "Моя суперсила — объединение фронтенд-разработки с бизнес-анализом. Это спасает меня от написания бесполезного кода, позволяя создавать живые, востребованные продукты, которыми удобно пользоваться.",
        ],
        doingTitle: "Чем я занимаюсь",
        cards: [
            {
                title: "Разработка",
                text: "Создаю быстрые современные продукты с React, Next.js, TypeScript и Tailwind CSS — где у каждого пикселя есть цель, а взаимодействие ощущается естественно.",
            },
            {
                title: "Мышление",
                text: "Связываю бизнес-цели с техническими решениями. Мне нравится понимать, как думают пользователи, что нужно бизнесу, и превращать это в реальные продукты.",
            },
            {
                title: "Оба мира",
                text: "Самое интересное — там, где эти миры встречаются. Бизнес-анализ говорит ЧТО строить, а фронтенд воплощает это в жизнь. Не просто функции — а нечто стоящее.",
            },
        ],
        interestsTitle: "Интересы",
        interestsText: [
            "Любопытство движет мной. Независимо от сферы работы, ИИ скоро трансформирует наше будущее и станет частью рутины. Я искренне обожаю тестировать новые AI-инструменты сразу по их выходу.",
            "У меня свыше 20 хобби, преимущественно спортивных (баскетбол, настольный теннис). Для меня хобби — это вызов самому себе. Я стремлюсь достигать успехов в каждом деле и постоянно расширять список. Моя цель — не стать рабом работы, а искренне любить то, что делаю, и получать от жизни абсолютный максимум. Мы здесь только один раз, поэтому важна каждая секунда!",
        ],
        findOnline: "Найти меня",
        navAbout: "Обо мне",
        navResume: "Резюме",
        navPortfolio: "Портфолио",

        // Portfolio
        portfolioTitle: "Портфолио",
        portfolioSubtitle: "Проекты, над которыми я работал",
        portfolioViewBtn: "Открыть проект",
        portfolioExpandOpen: "Показать все проекты",
        portfolioExpandClose: "Свернуть",
        portfolioSoon: "Скоро",
        portfolioSoonSub: "Новый проект в разработке",
        portfolioProjectDescs: [
            "Аналитическая платформа энергетики с визуализацией данных в реальном времени и тёмной темой.",
            "Онлайн-платформа для бронирования туров по Узбекистану с пакетами, гидами и удобным процессом бронирования.",
            "Современный банковский интерфейс с потоками транзакций и управлением картами.",
            "Рабочее пространство для задач и продуктивности с досками, напоминаниями и минималистичным интерфейсом.",
            "P2P-платёжная платформа, объединяющая банковские счета и электронные кошельки.",
            "ИИ-ассистент продуктивности с диалоговым интерфейсом и потоковой передачей ответов.",
        ],

        // Sidebar
        sidebarShowContacts: "Показать контакты",
        sidebarEmail: "Эл. почта",
        sidebarTelegram: "Telegram",
        sidebarLocation: "Местоположение",
        sidebarJobTitle: "Frontend-разработчик & Бизнес-аналитик",
        sidebarMapExpand: "Нажмите для просмотра",
        sidebarMapCollapse: "Свернуть",

        // Resume
        resumeFilterAll: "Все",
        resumeFilterWork: "Работа",
        resumeFilterEdu: "Образование",

        // Skills descriptions
        skillDescs: [
            "Семантический HTML5, продвинутые макеты, flex, grid и CSS-анимации с аппаратным ускорением.",
            "Асинхронные потоки, безопасность типов, механика замыканий и функциональные паттерны.",
            "Server Actions, оптимизация маршрутов, структуры состояния и обновления виртуального DOM.",
            "Утилитарная архитектура, параметры адаптивности и настройка тем.",
            "Проектирование бизнес-процессов, диаграммы последовательности и логические модели.",
            "Проектирование запросов, связывание данных, обработка информации и дашборды.",
            "Управление беклогами, организация задач и проведение daily-встреч.",
            "Написание пользовательских историй, определение метрик и функциональных параметров.",
            "Вайрфреймы, визуальные компоненты, интерактивные мокапы и glassmorphism.",
        ],

        // Resume
        resumeTitle: "Резюме",
        timelineWork: "Опыт работы",
        timelineEducation: "Образование",
        timelineExperience: "Карьерный путь",
        skillsTitle: "Профессиональные навыки",

        pdpTitle: "PDP University",
        pdpDesc: "Специальность: Программная инженерия. Формирование базы по алгоритмам, архитектуре систем и современным фреймворкам.",
        schoolTitle: "Специализированная школа №160",
        schoolDesc: "Углубленное изучение математики и физики, развитие аналитического мышления.",
        payfintechTitle: "PayFintech",
        payfintechDesc: "Проектирование банковских веб-интерфейсов, оптимизация модулей и перевод сложных транзакционных путей в лаконичный код.",
        greenbytTitle: "Greenbyt",
        greenbytDesc: "Разработка модульной архитектуры веб-приложений, проектирование дашбордов для управления энергоданными.",
        humansTitle: "Humans и Узтелеком",
        humansDesc: "Работа в поддержке клиентов, разбор технических неполадок, развитие эмпатии и навыков ведения переговоров.",
        comnetTitle: "Comnet",
        comnetDesc: "Диагностика сетевых настроек маршрутизаторов, техническая помощь клиентам провайдера.",
    },
    uz: {
        aboutTitle: "Men haqimda",
        tabs: { aboutMe: "Men haqimda", doing: "Nima qilaman", interests: "Qiziqishlar" },
        aboutText: [
            "Salom! Men Akobirman, yoshim 21 da. Men PDP Universiteti Business Analytics yo'nalishi 4-kurs talabasiman, Toshkentda yashayman va o'z kasbining chinakam ishqiboziman!",
            "Mening asosiy kuchim va farqim — Frontend dasturlash bilan Biznes Tahlilni birlashtirishdir. Bu esa menga shunchaki chiroyli interfeys yasab qo'ymasdan, balki biznesga va foydalanuvchiga haqiqiy foyda keltiradigan, odamlar chin dildan sevib ishlatadigan mahsulotlar yaratish imkonini beradi.",
        ],
        doingTitle: "Nima qilaman",
        cards: [
            {
                title: "Yaratish",
                text: "React, Next.js, TypeScript va Tailwind CSS bilan tez va zamonaviy veb-tajribalar yarataman — har bir piksel maqsadga ega, har bir ta'sir tabiiy his etiladi.",
            },
            {
                title: "O'ylash",
                text: "Biznes maqsadlarini texnik yechimlar bilan bog'layman. Foydalanuvchilar va biznes ehtiyojlarini tushunib, mantiqli mahsulotlarga aylantirishni yaxshi ko'raman.",
            },
            {
                title: "Ikkalasini birlashtirish",
                text: "Eng qiziqarli joy — ikkala dunyo kesishgan nuqta. Biznes-tahlil NIMA qurish kerakligini aytadi, frontend esa uni amalga oshiradi — faqat funksiya emas, balki qadrli narsa.",
            },
        ],
        interestsTitle: "Qiziqishlar",
        interestsText: [
            "AI tool larni qanaqa turidan qat'iy nazar barchasini sinab ko'rishni va test qilib ko'rishni xohlayman. Sababi, qaysi yo'nalishda ishlashimizdan qat'i nazar, AI kelajakni to'liq bosib oladi. Shuning uchun AI bilan predicts qilish mening asosiy rutinamga aylanmoqda.",
            "Undan tashqari hobbilarim 20 dan ortiq, juda ko'p narsalarga qiziqaman, asosiylari esa basketbol va stol tennisi. Men uchun hobbi bu shunchaki nimadir bilan shug'ullanish emas, balki har bir narsada o'zimni sinab ko'rish va unda g'alaba qozonishdir. Barchasidan katta yutuqlarga erishib, yangi sport turlarini qo'shishni istayman. Maqsadim butun hayotimni faqat ishga bag'ishlash emas, balki ishimni astoydil sevgan holda dunyoni kashf qilishdir. Baribir bu dunyoga faqat bir marta kelamiz, shunday ekan har bir daqiqadan maksimal darajada foydalanish lozim!",
        ],
        findOnline: "Meni toping",
        navAbout: "Haqimda",
        navResume: "Rezyume",
        navPortfolio: "Portfolio",

        // Portfolio
        portfolioTitle: "Portfolio",
        portfolioSubtitle: "Men ishtirok etgan loyihalar",
        portfolioViewBtn: "Loyihani ko'rish",
        portfolioExpandOpen: "Barcha loyihalarni ko'rish",
        portfolioExpandClose: "Yig'ish",
        portfolioSoon: "Tez kunda",
        portfolioSoonSub: "Yangi loyiha tayyorlanmoqda",
        portfolioProjectDescs: [
            "Real vaqt ma'lumotlar vizualizatsiyasi va qorong'u rejimli boshqaruv paneli bilan energetika tahlil platformasi.",
            "O'zbekiston bo'ylab sayohat va tur paketlarini bron qilish platformasi — gidlar, paketlar va qulay rezervatsiya jarayoni.",
            "Tranzaksiya oqimlari, karta boshqaruvi va xavfsiz forma naqshlari bilan zamonaviy bank interfeysi.",
            "Vazifalar va samaradorlik uchun ish maydoni — doskalar, eslatmalar va diqqatni jamlovchi sodda interfeys.",
            "Bank hisoblar va elektron hamyonlarni birlashtiradigan P2P to'lov platformasi.",
            "Suhbat interfeysi va real vaqt oqim javoblari bilan sun'iy intellekt yordamchisi.",
        ],

        // Sidebar
        sidebarShowContacts: "Kontaktlarni ko'rish",
        sidebarEmail: "Elektron pochta",
        sidebarTelegram: "Telegram",
        sidebarLocation: "Joylashuv",
        sidebarJobTitle: "Frontend & Biznes Tahlilchi",
        sidebarMapExpand: "Batafsil ko'rish",
        sidebarMapCollapse: "Yopish",

        // Resume
        resumeFilterAll: "Barchasi",
        resumeFilterWork: "Ish",
        resumeFilterEdu: "Ta'lim",

        // Skills descriptions
        skillDescs: [
            "Semantik HTML5, murakkab layout'lar, flex, grid va CSS animatsiyalari.",
            "Asinxron oqimlar, tip xavfsizligi, closure mexanikasi va funksional dasturlash.",
            "Server Actions, marshrutni optimallashtirish, holat tuzilmalari va virtual DOM yangilanishlari.",
            "Utility-first arxitektura, responsivlik parametrlari va tema sozlamalari.",
            "Murakkab biznes jarayonlari, ketma-ketlik diagrammalari va mantiqiy modellar.",
            "So'rovlarni loyihalash, aloqalarni xaritalash, ma'lumotlarni qayta ishlash va dashboardlar.",
            "Sprint backlog'larini boshqarish, vazifalarni tashkil etish va daily standuplar.",
            "Foydalanuvchi tariflari yozish, qamrov metrikalarini aniqlash va funksional parametrlar.",
            "Interfeys wireframe'lari, vizual komponentlar, interaktiv maketlar va glassmorphism.",
        ],

        // Resume
        resumeTitle: "Rezyume",
        timelineWork: "Ish Tajribasi",
        timelineEducation: "Ta'lim",
        timelineExperience: "Karyera Yo'li",
        skillsTitle: "Kompentensiyalarim",

        pdpTitle: "PDP Universiteti",
        pdpDesc: "Dasturiy Ta'minot Muhandisligi bakalavri. Algoritmlar, ma'lumotlar bazasi arxitekturasi va ilg'or veb-freymvorklar bo'yicha kuchli baza.",
        schoolTitle: "Iqtisoslashtirilgan Maktab №160",
        schoolDesc: "Fizika-matematika fanlariga iqtisoslashgan chuqurlashtirilgan o'quv dasturi, texnik o'ylashni shakllantirish.",
        payfintechTitle: "PayFintech",
        payfintechDesc: "Bank-to'lov tizimlari frontend interfeyslarini loyihalash, tranzaksiyalar mantiqini UI kodga o'tkazish.",
        greenbytTitle: "Greenbyt",
        greenbytDesc: "Frontend arxitekturasini ishlab chiqish, boshqaruv asboblar panellarini (dashboards) yaratish va UI yuklanishini tezlashtirish.",
        humansTitle: "Humans & Uztelecom",
        humansDesc: "Mijozlarni qo'llab-quvvatlash call-markazi operatori, texnik nosozliklarni bartaraf etish va faol muloqottni o'rganish.",
        comnetTitle: "Comnet",
        comnetDesc: "Kommunikatsiya provayderi liniyasida router sozlamalari va abonent tarmoq ulanishlarini to'g'irlash.",
    },
};

interface LangCtx {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: Translations;
}

const LanguageContext = createContext<LangCtx>({
    lang: "en",
    setLang: () => { },
    t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>("uz"); // Default to Uzbek to demonstrate immediate quality
    return (
        <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
