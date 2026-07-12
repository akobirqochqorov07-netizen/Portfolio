"use client";

import React, { useState } from "react";
import { LanguageProvider } from "@/contexts/language-context";
import Sidebar from "../components/sidebar";
import AboutTab from "../components/tabs/about";
import ResumeTab from "../components/tabs/resume";
import PortfolioTab from "../components/tabs/portfolio";
import LanguageSwitcher from "../components/ui/language-switcher";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"about" | "resume" | "portfolio">("about");

  return (
    <LanguageProvider>
      <main>
        {/* Global top-right screen language switcher */}
        <div className="global-top-lang-switcher">
          <LanguageSwitcher />
        </div>

        <Sidebar />
        <div className="main-content">
          <nav className="navbar">
            <ul className="navbar-list">
              <li className="navbar-item">
                <button
                  className={`navbar-link ${activeTab === "about" ? "active" : ""}`}
                  onClick={() => setActiveTab("about")}
                  data-nav-link
                >
                  About
                </button>
              </li>
              <li className="navbar-item">
                <button
                  className={`navbar-link ${activeTab === "resume" ? "active" : ""}`}
                  onClick={() => setActiveTab("resume")}
                  data-nav-link
                >
                  Resume
                </button>
              </li>
              <li className="navbar-item">
                <button
                  className={`navbar-link ${activeTab === "portfolio" ? "active" : ""}`}
                  onClick={() => setActiveTab("portfolio")}
                  data-nav-link
                >
                  Portfolio
                </button>
              </li>
            </ul>
          </nav>

          <AboutTab active={activeTab === "about"} />
          <ResumeTab active={activeTab === "resume"} />
          <PortfolioTab active={activeTab === "portfolio"} />
        </div>
      </main>
    </LanguageProvider>
  );
}
