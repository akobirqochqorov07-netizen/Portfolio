"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage, Lang } from "@/contexts/language-context";

const LANGS: { code: Lang; label: string; native: string; emoji: string }[] = [
    { code: "uz", label: "UZ", native: "O'zbek",  emoji: "🇺🇿" },
    { code: "en", label: "EN", native: "English", emoji: "🇬🇧" },
    { code: "ru", label: "RU", native: "Русский", emoji: "🇷🇺" },
];

export default function LanguageSwitcher() {
    const { lang, setLang } = useLanguage();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const current = LANGS.find((l) => l.code === lang)!;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="lang-switcher" ref={ref}>
            {/* ── Trigger ── */}
            <button
                className={`lang-trigger ${open ? "lang-trigger--open" : ""}`}
                onClick={() => setOpen((v) => !v)}
                aria-label="Switch language"
            >
                <span className="lang-flag-emoji">{current.emoji}</span>
                <span className="lang-globe">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                        <circle cx="12" cy="12" r="10" />
                        <ellipse cx="12" cy="12" rx="4" ry="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                    </svg>
                </span>
                <span className="lang-current">{current.label}</span>
                <span className={`lang-arrow ${open ? "lang-arrow--up" : ""}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="10" height="10">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </button>

            {/* ── Dropdown panel ── */}
            <div className={`lang-options ${open ? "lang-options--open" : ""}`}>
                {LANGS.filter((l) => l.code !== lang).map((l, i) => (
                    <button
                        key={l.code}
                        className="lang-option-btn"
                        style={{ "--opt-i": i } as React.CSSProperties}
                        onClick={() => { setLang(l.code); setOpen(false); }}
                    >
                        <span className="lang-opt-emoji">{l.emoji}</span>
                        <span className="lang-opt-info">
                            <span className="lang-flag">{l.label}</span>
                            <span className="lang-label">{l.native}</span>
                        </span>
                        <span className="lang-opt-check">→</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
