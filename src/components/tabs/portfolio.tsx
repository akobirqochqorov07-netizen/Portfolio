"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { LogoCarousel, type LogoItem } from "@/components/ui/logo-carousel";
import { ProjectCard } from "@/components/ui/project-card";
import { asset } from "@/lib/base-path";

const LOGOS: LogoItem[] = [
    { id: 1, name: "Greenbyte",  img: asset("/assets/images/Greenbyte.webp"),  href: "https://akobirqochqorov07-netizen.github.io/GreenByte/" },
    { id: 2, name: "Bahola",     img: asset("/assets/images/Bahola.webp"),     href: "https://akobirqochqorov07-netizen.github.io/Bahola/" },
    { id: 3, name: "Payfintech", img: asset("/assets/images/Payfintech.webp"), href: "https://payfintech.uz/" },
    { id: 4, name: "SkillSwap",  img: asset("/assets/images/Skillswap.webp"),  href: "https://akobirqochqorov07-netizen.github.io/SkillSwap2/" },
    { id: 5, name: "Pully",      img: asset("/assets/images/Pully.webp"),      href: "https://pully.uz/" },
    { id: 6, name: "Arlo",       img: asset("/assets/images/Arlo.webp"),       href: "https://akobirqochqorov07-netizen.github.io/ARLO-Ai/" },
    { id: 7, name: "Intask",     img: asset("/assets/images/Intask.webp"),     href: "https://intask.uz/" },
    { id: 8, name: "Tozago",     img: asset("/assets/images/Tozago.webp"),     href: "https://akobirqochqorov07-netizen.github.io/tozago/" },
    { id: 9, name: "Oxen",       img: asset("/assets/images/Oxen.webp"),       href: "https://azimboyevshuxrux-mvp1.rork.app" },
];

const PROJECTS = [
    { name: "Greenbyte",  img: asset("/assets/images/Greenbyte.webp"),  href: "https://akobirqochqorov07-netizen.github.io/GreenByte/",  tag: "Web App" },
    { name: "Bahola",     img: asset("/assets/images/Bahola.webp"),     href: "https://akobirqochqorov07-netizen.github.io/Bahola/",     tag: "Frontend" },
    { name: "Payfintech", img: asset("/assets/images/Payfintech.webp"), href: "https://payfintech.uz/",                                  tag: "Fintech" },
    { name: "SkillSwap",  img: asset("/assets/images/Skillswap.webp"),  href: "https://akobirqochqorov07-netizen.github.io/SkillSwap2/", tag: "Ed-Tech" },
    { name: "Pully",      img: asset("/assets/images/Pully.webp"),      href: "https://pully.uz/",                                      tag: "Fintech" },
    { name: "Arlo AI",    img: asset("/assets/images/Arlo.webp"),       href: "https://akobirqochqorov07-netizen.github.io/ARLO-Ai/",   tag: "AI / SaaS" },
    { name: "Intask",     img: asset("/assets/images/Intask.webp"),     href: "https://intask.uz/",                                     tag: "Productivity" },
    { name: "Tozago",     img: asset("/assets/images/Tozago.webp"),     href: "https://akobirqochqorov07-netizen.github.io/tozago/",    tag: "Services" },
    { name: "Oxen",       img: asset("/assets/images/Oxen.webp"),       href: "https://azimboyevshuxrux-mvp1.rork.app",                 tag: "Mobile" },
];

const CARD_LINKS = [
    "https://akobirqochqorov07-netizen.github.io/GreenByte/",
    "https://akobirqochqorov07-netizen.github.io/tozago/",
    "https://payfintech.uz/",
    "https://intask.uz/",
    "https://pully.uz/",
    "https://akobirqochqorov07-netizen.github.io/ARLO-Ai/",
];

const CARD_TITLES = ["Greenbyte", "Tozago", "Payfintech", "Intask", "Pully", "Arlo AI"];
const CARD_IMGS   = [
    asset("/assets/images/project04.webp"),
    asset("/assets/images/project02.webp"),
    asset("/assets/images/project05.webp"),
    asset("/assets/images/project03.webp"),
    asset("/assets/images/project01.webp"),
    asset("/assets/images/project06.webp"),
];

export default function PortfolioTab({ active }: { active: boolean }) {
    const { t } = useLanguage();
    const [expanded, setExpanded] = useState(false);

    return (
        <article className={`portfolio ${active ? "active" : ""}`} data-page="portfolio">
            <header>
                <h2 className="h2 article-title">{t.portfolioTitle}</h2>
            </header>

            {/* ── Logo carousel ── */}
            <section className="pf-logo-section">
                <p className="pf-logo-label">{t.portfolioSubtitle}</p>
                <LogoCarousel columnCount={3} logos={LOGOS} />

                <button
                    className={`pf-expand-btn ${expanded ? "pf-expand-btn--open" : ""}`}
                    onClick={() => setExpanded((v) => !v)}
                    aria-label={expanded ? t.portfolioExpandClose : t.portfolioExpandOpen}
                >
                    <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        style={{ display: "flex" }}
                    >
                        <ChevronDown size={20} />
                    </motion.span>
                </button>
            </section>

            {/* ── Expanded project list ── */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        key="project-list"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                    >
                        <div className="pf-list-grid">
                            {PROJECTS.map((p, i) => (
                                <motion.a
                                    key={p.name}
                                    href={p.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pf-list-card"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.35 }}
                                >
                                    <img src={p.img} alt={p.name} className="pf-list-logo" loading="lazy" />
                                    <div className="pf-list-meta">
                                        <span className="pf-list-name">{p.name}</span>
                                        <span className="pf-list-tag">{p.tag}</span>
                                    </div>
                                    <ExternalLink size={14} className="pf-list-ext" />
                                </motion.a>
                            ))}

                            {/* 10th — liquid glass Soon */}
                            <motion.div
                                className="pf-soon-card"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.48, duration: 0.35 }}
                            >
                                <div className="pf-soon-glow" />
                                <div className="pf-soon-inner">
                                    <span className="pf-soon-dots"><span /><span /><span /></span>
                                    <span className="pf-soon-label">{t.portfolioSoon}</span>
                                    <span className="pf-soon-sub">{t.portfolioSoonSub}</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Screenshot cards ── */}
            <hr className="divider" />
            <section className="pf-cards-section">
                <div className="pf-cards-grid">
                    {CARD_TITLES.map((title, i) => (
                        <ProjectCard
                            key={title}
                            title={title}
                            imgSrc={CARD_IMGS[i]}
                            description={t.portfolioProjectDescs[i] ?? ""}
                            link={CARD_LINKS[i]}
                            linkText={t.portfolioViewBtn}
                        />
                    ))}
                </div>
            </section>
        </article>
    );
}
