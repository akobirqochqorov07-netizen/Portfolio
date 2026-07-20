"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/language-context";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code, Target, HelpCircle, Flame, Settings, Send } from "lucide-react";
import { Instagram as InstagramIcon, Github as GithubIcon, Linkedin as LinkedinIcon } from "lucide-react";
import { asset } from "@/lib/base-path";

/* ─────────────────────────────────────────
   Auto-rotating carousel (Basketball / Tennis)
   3 videos side by side, auto advances on end
───────────────────────────────────────── */
function VideoCarousel({ srcs, enabled = true }: { srcs: string[]; enabled?: boolean }) {
    const [current, setCurrent] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const next = useCallback(() => {
        setCurrent((p) => (p + 1) % srcs.length);
    }, [srcs.length]);

    /* fallback timer: advance every 10 s */
    useEffect(() => {
        timerRef.current = setTimeout(next, 10000);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [current, next]);

    /* reload + play when clip changes */
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        v.load();
        v.play().catch(() => { });
    }, [current]);

    return (
        <div className="ivc-carousel">
            <video
                ref={videoRef}
                key={current}
                src={enabled ? srcs[current] : undefined}
                preload="none"
                autoPlay
                muted
                playsInline
                onEnded={next}
                className="ivc-video"
            />
            {/* dot indicators */}
            <div className="ivc-dots">
                {srcs.map((_, i) => (
                    <button
                        key={i}
                        className={`ivc-dot${i === current ? " active" : ""}`}
                        onClick={() => setCurrent(i)}
                        aria-label={`Video ${i + 1}`}
                    />
                ))}
            </div>
            {/* progress bar — resets per clip */}
            <div className="ivc-prog-track">
                <div key={current} className="ivc-prog-fill" />
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   Hobbies — Spline 3D robot inside the card
───────────────────────────────────────── */
function HobbiesBadgeGrid() {
    return (
        <div className="spline-card">
            {/* @ts-expect-error spline-viewer is a web component */}
            <spline-viewer
                url="https://prod.spline.design/zByuwhECsZfeV-LP/scene.splinecode"
                className="spline-el"
            />
        </div>
    );
}

export default function AboutTab({ active }: { active: boolean }) {
    const { t, lang } = useLanguage();
    const [section, setSection] = useState<0 | 1 | 2>(0);
    const [activePillar, setActivePillar] = useState<number>(0);
    const [activeInterest, setActiveInterest] = useState<string>("ai");

    const sections = [
        { key: "aboutMe", label: t.tabs.aboutMe },
        { key: "doing", label: t.tabs.doing },
        { key: "interests", label: t.tabs.interests },
    ];

    const videoRef0 = useRef<HTMLVideoElement | null>(null);
    const videoRef1 = useRef<HTMLVideoElement | null>(null);
    const videoRef2 = useRef<HTMLVideoElement | null>(null);
    const videoRefs = [videoRef0, videoRef1, videoRef2];

    const handleMouseEnter = (index: number) => {
        const video = videoRefs[index].current;
        if (video) { video.currentTime = 0; video.play().catch(() => { }); }
    };
    const handleMouseLeave = (index: number) => {
        videoRefs[index].current?.pause();
    };

    const getPillars = () => {
        if (lang === "uz") return [
            { title: "Soddalik & Savollar 🧐", badge: "Falsafam", desc: "Tugmalar va detallar ustida g'oyalar to'playman, qulaylik yarataman va doimo 'Nima uchun bu funksiya mavjud?' degan savolga javob izlayman.", icon: HelpCircle },
            { title: "Gibrid Yondashuv ⚡", badge: "Frontend + Business", desc: "Texnik ko'nikmalarimni biznes-tahlil bilan birlashtiraman - bu foydasiz yoki keraksiz kod yozishdan asraydi, haqiqiy foyda keltiradigan mahsulotlar yaratadi.", icon: Brain },
        ];
        if (lang === "ru") return [
            { title: "Простота & Вопросы 🧐", badge: "Моя философия", desc: "Я провожу часы над вопросом 'Зачем эта кнопка вообще здесь?' и нахожу баланс между технической пользой и потребностью клиента.", icon: HelpCircle },
            { title: "Гибридный подход ⚡", badge: "Фронтенд + Бизнес", desc: "Объединяю фронтенд с глубоким анализом бизнес-моделей — это экономит ресурсы и предотвращает разработку ненужных функций.", icon: Brain },
        ];
        return [
            { title: "Simplicity & Inquiries 🧐", badge: "My Philosophy", desc: "I spend hours pondering 'Why does this button exist?' and aim to streamline layouts to reduce clutter and make apps intuitive.", icon: HelpCircle },
            { title: "The Hybrid Synergy ⚡", badge: "Frontend + Analysis", desc: "Combining robust web engineering with sharp business analysis helps avoid useless code and build features that really add value.", icon: Brain },
        ];
    };

    const getInterestsList = () => {
        if (lang === "uz") return [
            { id: "ai", label: "Sun'iy Intellekt (AI)", emoji: "🤖", title: "AI & Innovatsiyalar", desc: t.interestsText[0] },
            { id: "basketball", label: "Basketbol", emoji: "🏀", title: "Jamoa & Taktika", desc: "Basketbol — bu shunchaki o'yin emas, balki maydondagi tezkor strategiya, jamoaviy ruh va soniyalar ichida to'g'ri qaror qabul qilish san'atidir." },
            { id: "tennis", label: "Stol Tennisi", emoji: "🏓", title: "Tezkor Reaksiya", desc: "Stol tennisi — bu soniyaning yuzdan bir qismida harakat qilish demakdir. Har bir zarba va to'p traektoriyasi maksimal diqqat talab etadi." },
            { id: "hobbies", label: "Multi-Hobbilar (20+)", emoji: "🎨", title: "Kashfiyotlar & Chegaralar", desc: t.interestsText[1] },
        ];
        if (lang === "ru") return [
            { id: "ai", label: "Искусственный Интеллект", emoji: "🤖", title: "ИИ и Инновации", desc: t.interestsText[0] },
            { id: "basketball", label: "Баскетбол", emoji: "🏀", title: "Команда и Тактика", desc: "Баскетбол — это тактическая химия, молниеносные пасы и умение принимать решения за сотую долю секунды." },
            { id: "tennis", label: "Настольный теннис", emoji: "🏓", title: "Фокус и Рефлексы", desc: "Настольный теннис — реактивные рефлексы. Каждая подкрутка и расчёт траектории за миллисекунды." },
            { id: "hobbies", label: "Мульти-Хобби (20+)", emoji: "🎨", title: "Исследования", desc: t.interestsText[1] },
        ];
        return [
            { id: "ai", label: "Artificial Intelligence", emoji: "🤖", title: "AI & Innovation Labs", desc: t.interestsText[0] },
            { id: "basketball", label: "Basketball", emoji: "🏀", title: "Tactical Chemistry", desc: "Basketball isn't just about shooting hoops — it's lightning-fast court vision, team chemistry, and split-second decisions under pressure." },
            { id: "tennis", label: "Table Tennis", emoji: "🏓", title: "Instant Coordination", desc: "Table tennis is high-speed physics and reflex. Calculating spin and trajectory within milliseconds is pure adrenaline." },
            { id: "hobbies", label: "Exploration (20+)", emoji: "🎨", title: "Continuous Drive", desc: t.interestsText[1] },
        ];
    };

    const pillars = getPillars();
    const interestsList = getInterestsList();
    const activeObj = interestsList.find((i) => i.id === activeInterest) ?? interestsList[0];

    return (
        <article className={`about ${active ? "active" : ""}`} data-page="about">
            <header>
                <h2 className="h2 article-title">{t.aboutTitle}</h2>
            </header>

            {/* ── Segmented tabs ── */}
            <div className="about-inner-tabs-container">
                <div className="about-inner-tabs">
                    {sections.map((s, i) => (
                        <button
                            key={s.key}
                            className={`about-tab-btn ${section === i ? "about-tab-btn--active" : ""}`}
                            onClick={() => setSection(i as 0 | 1 | 2)}
                        >
                            <span className="about-tab-icon">
                                {i === 0 && <HelpCircle size={15} />}
                                {i === 1 && <Target size={15} />}
                                {i === 2 && <Flame size={15} />}
                            </span>
                            <span className="about-tab-label-text">{s.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Sliding track ── */}
            <div className="about-content-slider">
                <div className="about-content-track">

                    {/* ── SLIDE 0: About Me ── */}
                    <div className={`about-content-slide ${section === 0 ? "about-content-slide--active" : ""}`}>
                        <div className="about-interactive-me">
                            <div className="about-me-intro">
                                <h3 className="about-me-name-title">{"Akobir Qo'chqorov"}</h3>
                                <p className="lead-paragraph">{t.aboutText[0]}</p>
                                <p className="lead-paragraph">{t.aboutText[1]}</p>
                            </div>
                            <div className="philosophy-grid">
                                <div className="philosophy-menu">
                                    {pillars.map((p, idx) => {
                                        const Icon = p.icon;
                                        return (
                                            <button
                                                key={idx}
                                                className={`philosophy-item ${activePillar === idx ? "active" : ""}`}
                                                onClick={() => setActivePillar(idx)}
                                            >
                                                <div className="ph-icon-circle"><Icon size={18} /></div>
                                                <div className="ph-meta">
                                                    <span className="ph-badge">{p.badge}</span>
                                                    <h5 className="ph-title">{p.title}</h5>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="philosophy-detail-card">
                                    <div className="glass-glow-effect" />
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activePillar}
                                            initial={{ opacity: 0, x: 15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -15 }}
                                            transition={{ duration: 0.25 }}
                                            className="ph-detail-content"
                                        >
                                            <div className="ph-detail-header">
                                                <span className="ph-card-badge">{pillars[activePillar]?.badge}</span>
                                            </div>
                                            <h4 className="ph-card-title">{pillars[activePillar]?.title}</h4>
                                            <p className="ph-card-desc">{pillars[activePillar]?.desc}</p>
                                            <div className="ph-card-footing">
                                                <span className="ph-highlight-tag"></span>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── SLIDE 1: What I Do ── */}
                    <div className={`about-content-slide ${section === 1 ? "about-content-slide--active" : ""}`}>
                        <section className="service-v2">
                            <div className="service-v2-grid">
                                {t.cards.map((card, i) => (
                                    <div
                                        key={i}
                                        className="video-service-card"
                                        onMouseEnter={() => handleMouseEnter(i)}
                                        onMouseLeave={() => handleMouseLeave(i)}
                                    >
                                        <div className="card-video-container">
                                            <video
                                                ref={videoRefs[i]}
                                                className="card-bg-video"
                                                src={asset(`/assets/images/video${[2, 1, 3][i]}.mp4`)}
                                                loop muted playsInline
                                            />
                                            <div className="video-glass-overlay" />
                                        </div>
                                        <div className="svc-card-content">
                                            <div className={`svc-icon-shield ${["sh-build", "sh-think", "sh-mix"][i]}`}>
                                                {i === 0 && <Code size={20} />}
                                                {i === 1 && <Brain size={20} />}
                                                {i === 2 && <Settings size={20} />}
                                            </div>
                                            <h4 className="svc-item-title">{card.title}</h4>
                                            <p className="svc-item-text">{card.text}</p>
                                        </div>
                                        <div className="hud-glow-corner top-left" />
                                        <div className="hud-glow-corner bottom-right" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* ── SLIDE 2: Interests ── */}
                    <div className={`about-content-slide ${section === 2 ? "about-content-slide--active" : ""}`}>
                        <div className="interests-showcase-container">
                            {/* Left: tag chips */}
                            <div className="interests-interactive-grid">
                                <div className="interests-tags-flex">
                                    {interestsList.map((interest) => (
                                        <button
                                            key={interest.id}
                                            onClick={() => setActiveInterest(interest.id)}
                                            className={`interest-tag-chip ${activeInterest === interest.id ? "active" : ""}`}
                                        >
                                            <span className="it-emoji">{interest.emoji}</span>
                                            <span className="it-label">{interest.label}</span>
                                            {activeInterest === interest.id && (
                                                <motion.span
                                                    layoutId="active-interest-indicator"
                                                    className="it-chip-active-bg"
                                                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Right: viewer box */}
                                <div className="interest-viewer-box">
                                    <div className="interest-viewer-scrollable-content">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeInterest}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="it-viewer-inner"
                                            >
                                                {/* Header */}
                                                <div className="it-header-group">
                                                    <div className="it-viewer-icon">
                                                        <span>{activeObj.emoji}</span>
                                                    </div>
                                                    <h4 className="it-viewer-title">{activeObj.title}</h4>
                                                </div>

                                                {/* Description */}
                                                <p className="it-viewer-desc">{activeObj.desc}</p>

                                                {/* ── Media section (replaces old 3-D icons) ── */}
                                                <div className="it-media-frame">
                                                    {activeInterest === "ai" && (
                                                        <video
                                                            src={active ? asset("/assets/images/video4.mp4") : undefined}
                                                            preload="none"
                                                            autoPlay loop muted playsInline
                                                            className="it-single-video"
                                                        />
                                                    )}
                                                    {activeInterest === "basketball" && (
                                                        <VideoCarousel
                                                            enabled={active}
                                                            srcs={[
                                                                asset("/assets/images/video5.mp4"),
                                                                asset("/assets/images/video6.mp4"),
                                                                asset("/assets/images/video7.mp4"),
                                                            ]}
                                                        />
                                                    )}
                                                    {activeInterest === "tennis" && (
                                                        <VideoCarousel
                                                            enabled={active}
                                                            srcs={[
                                                                asset("/assets/images/video8.mp4"),
                                                                asset("/assets/images/video9.mp4"),
                                                                asset("/assets/images/video10.mp4"),
                                                            ]}
                                                        />
                                                    )}
                                                    {activeInterest === "hobbies" && (
                                                        <HobbiesBadgeGrid />
                                                    )}
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Social links ── */}
            <section className="about-social">
                <h3 className="h3 service-title">{t.findOnline}</h3>
                <div className="about-social-list">
                    <a href="https://www.instagram.com/akbr.kv?igsh=NXl4cm1kZ2lhOWRt&utm_source=qr" className="about-social-btn instagram-btn" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon size={18} /> Instagram
                    </a>
                    <a href="https://github.com/akobirqochqorov07-netizen" className="about-social-btn github-btn" target="_blank" rel="noopener noreferrer">
                        <GithubIcon size={18} /> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/akobir-qochqorov-51b178345/" className="about-social-btn linkedin-btn" target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon size={18} /> LinkedIn
                    </a>
                    <a href="https://t.me/akoow_007" className="about-social-btn telegram-btn" target="_blank" rel="noopener noreferrer">
                        <Send size={18} /> Telegram
                    </a>
                </div>
            </section>
        </article>
    );
}
