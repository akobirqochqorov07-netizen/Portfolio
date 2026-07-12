"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Award, Zap, Code, ShieldCheck } from "lucide-react";

/* ── Animated counter for the percentage ── */
function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = Math.ceil(value / 40);
        const timer = setInterval(() => {
            start += step;
            if (start >= value) { setDisplay(value); clearInterval(timer); }
            else setDisplay(start);
        }, 18);
        return () => clearInterval(timer);
    }, [inView, value]);

    return <>{display}</>;
}

/* ── Skill hexagon card ── */
function SkillHex({
    skill, index, inView, selected, onToggle,
}: {
    skill: { label: string; percentage: number; color: string; icon: React.ElementType; desc: string };
    index: number; inView: boolean; selected: boolean; onToggle: () => void;
}) {
    const Icon = skill.icon;
    const r = 28; // radius
    const circ = 2 * Math.PI * r;
    const filled = (skill.percentage / 100) * circ;

    return (
        <button
            className={`shex-card ${selected ? "shex-card--open" : ""}`}
            style={{ "--shex-color": skill.color, "--shex-i": index } as React.CSSProperties}
            onClick={onToggle}
        >
            {/* ring svg */}
            <div className="shex-ring-wrap">
                <svg viewBox="0 0 72 72" className="shex-svg">
                    {/* bg track */}
                    <circle cx="36" cy="36" r={r} className="shex-bg-circle" />
                    {/* fill arc */}
                    <circle
                        cx="36" cy="36" r={r}
                        className="shex-fill-circle"
                        strokeDasharray={`${inView ? filled : 0} ${circ}`}
                        style={{ transition: `stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1) ${index * 0.07}s` }}
                    />
                </svg>
                <div className="shex-icon">
                    <Icon size={15} />
                </div>
            </div>
            {/* label */}
            <span className="shex-label">{skill.label}</span>
            <span className="shex-pct">
                <AnimatedNumber value={skill.percentage} inView={inView} />%
            </span>
            {/* expand */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        style={{ overflow: "hidden", width: "100%" }}
                    >
                        <p className="shex-desc">{skill.desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* hover border glow */}
            <div className="shex-border-glow" />
        </button>
    );
}

export default function ResumeTab({ active }: { active: boolean }) {
    const { t } = useLanguage();
    const [activeSection, setActiveSection] = useState<"all" | "work" | "edu">("all");
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = skillsRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setInView(true); },
            { threshold: 0.1 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const skills = [
        { label: "HTML & CSS",          percentage: 95, color: "#4facfe", icon: Code,        desc: "Semantic HTML5, advanced layouts, flex, grid, and hardware-accelerated CSS animations." },
        { label: "JS & TypeScript",     percentage: 90, color: "#f093fb", icon: Zap,         desc: "Asynchronous flows, type safety, closure mechanics, and functional coding patterns." },
        { label: "React & Next.js",     percentage: 90, color: "#43e97b", icon: Code,        desc: "Server Actions, route optimization, state structures, and optimized virtual DOM updates." },
        { label: "Tailwind CSS",        percentage: 95, color: "#00f2fe", icon: Zap,         desc: "Utility-first architectures, responsiveness parameters, and theme setups." },
        { label: "BPMN & UML",          percentage: 80, color: "#fa709a", icon: ShieldCheck, desc: "Designing complex business process flows, sequence charts, and logic models." },
        { label: "Data Analysis & SQL", percentage: 75, color: "#a18cd1", icon: Award,       desc: "Query design, relation mappings, information processing, and stats dashboards." },
        { label: "Agile & Scrum",       percentage: 85, color: "#fda085", icon: Briefcase,   desc: "Managing sprint backlogs, organizing ticket stories, and running daily standups." },
        { label: "PRD Design",          percentage: 80, color: "#f5576c", icon: ShieldCheck, desc: "Writing user stories, defining scope metrics, and specifying functional parameters." },
        { label: "Figma (UI/UX)",       percentage: 80, color: "#667eea", icon: GraduationCap, desc: "Wireframing interfaces, visual components, interaction mockups, and glassmorphism styling." },
    ];

    const timelineContainerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.12 } },
    };
    const timelineItemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
    };

    return (
        <article className={`resume ${active ? "active" : ""}`} data-page="resume">
            <header className="resume-header-flex">
                <h2 className="h2 article-title">{t.resumeTitle}</h2>
                <div className="resume-filter-controls">
                    {(["all", "work", "edu"] as const).map((s) => (
                        <button
                            key={s}
                            className={`res-filter-btn ${activeSection === s ? "active" : ""}`}
                            onClick={() => setActiveSection(s)}
                        >
                            {s === "work" && <Briefcase size={13} />}
                            {s === "edu"  && <GraduationCap size={13} />}
                            {s === "all" ? t.resumeFilterAll : s === "work" ? t.resumeFilterWork : t.resumeFilterEdu}
                        </button>
                    ))}
                </div>
            </header>

            {/* ── Timeline ── */}
            <div className="resume-timelines-layout">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        variants={timelineContainerVariants}
                        initial="hidden"
                        animate="show"
                        className="resume-flows-grid"
                    >
                        {(activeSection === "all" || activeSection === "work") && (
                            <motion.section variants={timelineItemVariants} className="timeline-v2">
                                <div className="title-wrapper">
                                    <div className="icon-box-v2"><Briefcase size={18} /></div>
                                    <h3 className="h3">{t.timelineWork}</h3>
                                </div>
                                <ol className="timeline-list-v2">
                                    {[
                                        { title: t.payfintechTitle, date: "2025 — Present", desc: t.payfintechDesc },
                                        { title: t.greenbytTitle,   date: "2023 — 2024",   desc: t.greenbytDesc },
                                        { title: t.humansTitle,     date: "2023",           desc: t.humansDesc },
                                        { title: t.comnetTitle,     date: "2022",           desc: t.comnetDesc },
                                    ].map((item) => (
                                        <li key={item.title} className="timeline-item-v2">
                                            <div className="timeline-dot" />
                                            <h4 className="h4 timeline-item-title">{item.title}</h4>
                                            <span className="timeline-date">{item.date}</span>
                                            <p className="timeline-text">{item.desc}</p>
                                        </li>
                                    ))}
                                </ol>
                            </motion.section>
                        )}

                        {(activeSection === "all" || activeSection === "edu") && (
                            <motion.section variants={timelineItemVariants} className="timeline-v2">
                                <div className="title-wrapper">
                                    <div className="icon-box-v2"><GraduationCap size={18} /></div>
                                    <h3 className="h3">{t.timelineEducation}</h3>
                                </div>
                                <ol className="timeline-list-v2">
                                    {[
                                        { title: t.pdpTitle,    date: "2023 — Present", desc: t.pdpDesc },
                                        { title: t.schoolTitle, date: "2012 — 2023",    desc: t.schoolDesc },
                                    ].map((item) => (
                                        <li key={item.title} className="timeline-item-v2">
                                            <div className="timeline-dot" />
                                            <h4 className="h4 timeline-item-title">{item.title}</h4>
                                            <span className="timeline-date">{item.date}</span>
                                            <p className="timeline-text">{item.desc}</p>
                                        </li>
                                    ))}
                                </ol>
                            </motion.section>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── Skills ── */}
            <section className="resume-skills-block" ref={skillsRef}>
                <h3 className="h3 skills-title">{t.skillsTitle}</h3>
                <div className="shex-grid">
                    {skills.map((skill, i) => (
                        <SkillHex
                            key={skill.label}
                            skill={skill}
                            index={i}
                            inView={inView}
                            selected={selectedSkill === skill.label}
                            onToggle={() => setSelectedSkill(selectedSkill === skill.label ? null : skill.label)}
                        />
                    ))}
                </div>
            </section>
        </article>
    );
}
