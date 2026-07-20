"use client";

import React, { useState, useRef, useCallback } from "react";
import IonIcon from "@/components/ui/ion-icon";
import { useLanguage } from "@/contexts/language-context";
import { asset } from "@/lib/base-path";

const PHOTOS = [
    asset("/assets/images/picture1.jpg"),
    asset("/assets/images/picture2.webp"),
];

/* ─── Interactive Location Map Card ─── */
function LocationMapCard() {
    const { t } = useLanguage();
    const [expanded, setExpanded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `rotateX(${-(y / r.height) * 12}deg) rotateY(${(x / r.width) * 12}deg)`;
    }, []);

    const onMouseLeave = useCallback(() => {
        if (cardRef.current) cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }, []);

    return (
        <div className="lmc-wrap" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
            <div
                ref={cardRef}
                className={`lmc-card ${expanded ? "lmc-card--exp" : ""}`}
                onClick={() => setExpanded((prev) => !prev)}
            >
                {/* sheen */}
                <div className="lmc-sheen" />
                {/* collapsed grid texture */}
                <div className="lmc-grid" />

                {/* ── expanded map ── */}
                <div className="lmc-map-layer">
                    <div className="lmc-map-bg" />
                    <svg className="lmc-roads-svg" preserveAspectRatio="none">
                        <line x1="0%" y1="36%" x2="100%" y2="36%" className="lmc-road lmc-r1" strokeWidth="3.5" />
                        <line x1="0%" y1="64%" x2="100%" y2="64%" className="lmc-road lmc-r2" strokeWidth="3.5" />
                        <line x1="33%" y1="0%" x2="33%" y2="100%" className="lmc-road lmc-r3" strokeWidth="2.5" />
                        <line x1="67%" y1="0%" x2="67%" y2="100%" className="lmc-road lmc-r4" strokeWidth="2.5" />
                        <line x1="0%" y1="20%" x2="100%" y2="20%" className="lmc-road lmc-r5" strokeWidth="1.2" />
                        <line x1="0%" y1="50%" x2="100%" y2="50%" className="lmc-road lmc-r6" strokeWidth="1.2" />
                        <line x1="0%" y1="80%" x2="100%" y2="80%" className="lmc-road lmc-r7" strokeWidth="1.2" />
                        <line x1="15%" y1="0%" x2="15%" y2="100%" className="lmc-road lmc-r8" strokeWidth="1.2" />
                        <line x1="50%" y1="0%" x2="50%" y2="100%" className="lmc-road lmc-r9" strokeWidth="1.2" />
                        <line x1="85%" y1="0%" x2="85%" y2="100%" className="lmc-road lmc-r10" strokeWidth="1.2" />
                    </svg>
                    <div className="lmc-b lmc-b1" />
                    <div className="lmc-b lmc-b2" />
                    <div className="lmc-b lmc-b3" />
                    <div className="lmc-b lmc-b4" />
                    <div className="lmc-b lmc-b5" />
                    <div className="lmc-b lmc-b6" />
                    {/* pin */}
                    <div className="lmc-pin">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="lmc-pin-svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#34d399" />
                            <circle cx="12" cy="9" r="2.5" fill="#0a0a0a" />
                        </svg>
                        <div className="lmc-pin-pulse" />
                    </div>
                    <div className="lmc-fade-bottom" />
                    {/* info overlay */}
                    <div className="lmc-info-overlay">
                        <p className="lmc-info-title">Trilliant Business Centre</p>
                        <p className="lmc-info-addr">Intercontinental yonida · Toshkent</p>
                        <a
                            href="https://maps.google.com/?q=Trilliant+Business+Center+Tashkent"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lmc-maps-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            Google Maps
                        </a>
                    </div>
                </div>

                {/* ── collapsed foreground ── */}
                <div className="lmc-content">
                    <div className="lmc-top">
                        <div className="lmc-icon-wrap">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lmc-map-icon">
                                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                                <line x1="9" x2="9" y1="3" y2="18"/>
                                <line x1="15" x2="15" y1="6" y2="21"/>
                            </svg>
                        </div>
                        <div className="lmc-badge">
                            <span className="lmc-dot" />
                            <span className="lmc-badge-text">Active</span>
                        </div>
                    </div>
                    <div className="lmc-bottom">
                        <p className="lmc-city">Toshkent, O&apos;zbekiston</p>
                        <p className="lmc-coords">41.2995° N, 69.2401° E</p>
                    </div>
                </div>
            </div>
            <p className="lmc-hint">{expanded ? t.sidebarMapCollapse : t.sidebarMapExpand}</p>
        </div>
    );
}

export default function Sidebar() {
    const { t } = useLanguage();
    const [photoIndex, setPhotoIndex] = useState(0);

    const togglePhoto = () => setPhotoIndex((prev) => (prev + 1) % PHOTOS.length);

    return (
        <aside className="sidebar sidebar--always-open" data-sidebar>
            <div className="sidebar-info">
                <figure className="avatar-box" onClick={togglePhoto} title="Click to change photo">
                    <img
                        key={photoIndex}
                        src={PHOTOS[photoIndex]}
                        alt="Akobir Qo'chqorov"
                        className="avatar-img avatar-flip"
                    />
                    <div className="avatar-click-hint"><span>📷</span></div>
                </figure>

                <div className="info-content">
                    <h1 className="name" title="Akobir Qo'chqorov">Akobir Qo&apos;chqorov</h1>
                    <p className="title">{t.sidebarJobTitle}</p>
                </div>
            </div>

            <div className="sidebar-info_more sidebar-info_more--visible">
                <div className="separator" />

                <ul className="contacts-list">
                    <li className="contact-item">
                        <div className="icon-box"><IonIcon name="mail-outline" /></div>
                        <div className="contact-info">
                            <p className="contact-title">{t.sidebarEmail}</p>
                            <a href="mailto:akobirqochqorov@gmail.com" className="contact-link">
                                akobirqochqorov@gmail.com
                            </a>
                        </div>
                    </li>

                    <li className="contact-item">
                        <div className="icon-box"><IonIcon name="paper-plane-outline" /></div>
                        <div className="contact-info">
                            <p className="contact-title">{t.sidebarTelegram}</p>
                            <a href="https://t.me/akoow_007" className="contact-link" target="_blank" rel="noopener noreferrer">
                                @akoow_007
                            </a>
                        </div>
                    </li>

                    {/* Interactive map location */}
                    <li className="contact-item contact-item--map">
                        <div className="contact-info contact-info--full">
                            <p className="contact-title">{t.sidebarLocation}</p>
                            <LocationMapCard />
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
