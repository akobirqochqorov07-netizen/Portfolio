"use client";

import React, { useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/language-context";
import Sidebar from "../components/sidebar";
import AboutTab from "../components/tabs/about";
import ResumeTab from "../components/tabs/resume";
import PortfolioTab from "../components/tabs/portfolio";
import LanguageSwitcher from "../components/ui/language-switcher";

function NavBar({ activeTab, setActiveTab }: {
  activeTab: "about" | "resume" | "portfolio";
  setActiveTab: (t: "about" | "resume" | "portfolio") => void;
}) {
  const { t } = useLanguage();
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button
            className={`navbar-link ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            {t.navAbout}
          </button>
        </li>
        <li className="navbar-item">
          <button
            className={`navbar-link ${activeTab === "resume" ? "active" : ""}`}
            onClick={() => setActiveTab("resume")}
          >
            {t.navResume}
          </button>
        </li>
        <li className="navbar-item">
          <button
            className={`navbar-link ${activeTab === "portfolio" ? "active" : ""}`}
            onClick={() => setActiveTab("portfolio")}
          >
            {t.navPortfolio}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"about" | "resume" | "portfolio">("about");

  return (
    <LanguageProvider>
      <main>
        <div className="global-top-lang-switcher">
          <LanguageSwitcher />
        </div>

        <Sidebar />
        <div className="main-content">
          <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
          <AboutTab active={activeTab === "about"} />
          <ResumeTab active={activeTab === "resume"} />
          <PortfolioTab active={activeTab === "portfolio"} />
        </div>
      </main>
    </LanguageProvider>
  );
}
