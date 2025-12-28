import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import translations from "../utils/lang";

const Navbar = () => {
  const navigate = useNavigate();

  /* ===============================
     LANGUAGE STATE
  =============================== */
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLang(savedLang);
    } else {
      localStorage.setItem("lang", "en");
      setLang("en");
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "hi" : "en";
    localStorage.setItem("lang", newLang);
    setLang(newLang);
    window.location.reload();
  };

  const t = translations[lang];

  /* ===============================
     AUTH (SINGLE SOURCE)
  =============================== */
  
const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-inner container">
        {/* LOGO */}
        <div className="logo">
          <div className="logo-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.686 2 6 6 6 10.5S8.686 19 12 20c3.314-1 6-5 6-9.5S15.314 2 12 2z"
                fill="white"
              />
            </svg>
          </div>
          <span className="logo-text">
            <span className="dark-green">Civic</span>
            <span className="light-green">X</span>
          </span>
        </div>

        {/* NAV LINKS */}
        <nav className="main-nav">
          <ul className="nav-links">
            <li><NavLink to="/" end>{t.home}</NavLink></li>
            <li><NavLink to="/report">{t.reportIssues}</NavLink></li>
            <li><NavLink to="/browse">{t.browseIssues}</NavLink></li>
            <li><NavLink to="/about">{t.about}</NavLink></li>
            <li><NavLink to="/contact">{t.contact}</NavLink></li>

            {user?.role === "authority" && (
              <li>
                <NavLink to="/authority">Authority Panel</NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="nav-actions">
          <Link className="btn btn-outline" to="/report">
            {t.reportBtn}
          </Link>

          {!user ? (
            <>
              <Link className="btn btn-primary" to="/login">
                {t.signin || "Sign in"}
              </Link>
              <Link className="btn btn-outline" to="/signup">
                {t.signup}
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-primary" to="/profile">
                👤 {user.name}
              </Link>
              <button
                className="btn btn-outline"
                onClick={handleLogout}
                style={{ marginLeft: "8px" }}
              >
                Logout
              </button>
            </>
          )}

          {/* LANGUAGE */}
          <button
            onClick={toggleLanguage}
            className="btn btn-outline"
            style={{ marginLeft: "10px" }}
          >
            {t.toggle}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;






































































