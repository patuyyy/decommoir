import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";

export default function HomeNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      const sections = ["home", "features", "benefits", "faq"];
      let current = "";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop - 120;
          if (window.scrollY >= top) current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeClass =
    "text-blue-custom bg-blue-100 px-4 py-2 rounded-md transition-all duration-200";
  const defaultClass =
    "hover:text-blue-custom hover:bg-blue-100 px-4 py-2 rounded-md transition-all duration-200";

  return (
    <nav
      className={`w-full flex items-center justify-between py-4 px-8 bg-white sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? "shadow-sm" : ""
        }`}
    >
      <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <span className="font-semibold text-lg">DECOMMOIR</span>
      </Link>

      {location.pathname === "/" && (
        <div className="hidden md:flex gap-6 text-sm font-semibold">
          <a href="#home" onClick={(e) => handleNavClick(e, "home")} className={activeSection === "home" ? activeClass : defaultClass}>
            Home
          </a>
          <a href="#features" onClick={(e) => handleNavClick(e, "features")} className={activeSection === "features" ? activeClass : defaultClass}>
            Features
          </a>
          <a href="#benefits" onClick={(e) => handleNavClick(e, "benefits")} className={activeSection === "benefits" ? activeClass : defaultClass}>
            Benefits
          </a>
          <a href="#faq" onClick={(e) => handleNavClick(e, "faq")} className={activeSection === "faq" ? activeClass : defaultClass}>
            FAQ
          </a>
        </div>
      )}

      <div className="flex gap-3">
        <Link to="/login" className="px-4 py-1 rounded-md bg-gray-200 hover:bg-gray-300 hover:scale-110 transition-all duration-200">
          Masuk
        </Link>
        <Link to="/signup" className="px-4 py-1 rounded-md bg-blue-custom text-white hover:bg-blue-600 hover:scale-110 transition-all duration-200">
          Daftar
        </Link>
      </div>
    </nav>
  );
}
