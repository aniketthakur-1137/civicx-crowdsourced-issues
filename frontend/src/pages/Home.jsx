import { useEffect, useState } from "react";
import { getIssueStats } from "../utils/auth";
import { getPublicStats } from "../utils/auth";


import { Link } from "react-router-dom";
import translations from "../utils/lang";


const Home = () => {
  
  // 🌐 Get selected language
  const lang = localStorage.getItem("lang") || "en";
  const t = translations[lang];


  const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  inProgress: 0,
  resolved: 0,
});

const [heroStats, setHeroStats] = useState({
  reported: 0,
  resolved: 0,
  satisfaction: 0,
});


useEffect(() => {
  getPublicStats().then((data) => {
    setHeroStats({
      reported: data.total,
      resolved: data.resolved,
      satisfaction: Math.round(
        (data.resolved / Math.max(data.total, 1)) * 100
      ),
    });
  });
}, []);


  // === Counter animation (UNCHANGED) ===
  useEffect(() => {
  getIssueStats()
    .then((res) => {
      setStats(res.data);
    })
    .catch((err) => {
      console.error("Failed to load stats", err);
    });
}, []);

  return (
    <main>
      {/* ================= HERO SECTION ================= */}
      <section className="hero container">
        <div className="hero-left">
          <span className="section-label">
            {lang === "en" ? "Real Impact" : "वास्तविक प्रभाव"}
          </span>

          <h1>
            {lang === "en"
              ? "Empowering citizens to report and resolve civic issues."
              : "नागरिकों को नागरिक समस्याओं की रिपोर्ट और समाधान के लिए सशक्त बनाना।"}
          </h1>

          <p className="lead">
            {lang === "en"
              ? "CivicX is a crowdsourced platform that lets people report problems like potholes, broken streetlights, and garbage — track progress and help your community improve with transparency and accountability."
              : "CivicX एक क्राउडसोर्स प्लेटफॉर्म है जो लोगों को गड्ढों, खराब स्ट्रीटलाइट और कचरे जैसी समस्याओं की रिपोर्ट करने, प्रगति को ट्रैक करने और पारदर्शिता व जवाबदेही के साथ अपने समुदाय को बेहतर बनाने में मदद करता है।"}
          </p>

          <div className="hero-ctas">
            <Link className="btn btn-primary" to="/report">
              {t.reportBtn}
            </Link>
            <Link className="btn btn-outline" to="/about">
              {lang === "en" ? "Learn More" : "और जानें"}
            </Link>
          </div>





          <ul className="hero-stats">
            <li>
              <strong>{heroStats.reported}</strong>
              <span>
                {lang === "en" ? "Issues Reported" : "रिपोर्ट की गई समस्याएँ"}
              </span>
            </li>
            <li>
              <strong>{heroStats.resolved}</strong>
              <span>{lang === "en" ? "Resolved" : "समाधान किया गया"}</span>
            </li>
            <li>
              <strong>{heroStats.satisfaction}%</strong>
              <span>
                {lang === "en"
                  ? "Community Satisfaction"
                  : "सामुदायिक संतुष्टि"}
              </span>
            </li>
          </ul>
        </div>

        <div className="hero-right">
          {/* Image unchanged */}
          <img
            src="/images/image5.png"
            alt="Community reporting illustration"
            className="hero-image"
          />
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="impact container">
        <div className="section-label">
          {lang === "en" ? "Real Impact" : "वास्तविक प्रभाव"}
        </div>

        <h2>
          {lang === "en"
            ? "Community Impact Dashboard"
            : "समुदाय प्रभाव डैशबोर्ड"}
        </h2>

        <p className="muted">
          {lang === "en"
            ? "See how CivicX is helping communities report, track and resolve issues."
            : "देखें कि CivicX समुदायों को समस्याओं की रिपोर्ट, ट्रैक और समाधान करने में कैसे मदद कर रहा है।"}
        </p>

        <div className="grid-4cards">
          <div className="card stat-card">
            <div className="card-icon">📊</div>
            <h3>{lang === "en" ? "Total Issues" : "कुल समस्याएँ"}</h3>
            <div className="big-num">{stats.total}</div>

            <p className="muted small">
              {lang === "en"
                ? "total issues reported"
                : "कुल रिपोर्ट की गई समस्याएँ"}
            </p>
          </div>

          <div className="card stat-card">
            <div className="card-icon">⏳</div>
            <h3>{lang === "en" ? "Open Issues" : "खुली समस्याएँ"}</h3>
           <div className="big-num">{stats.pending}</div>
            <p className="muted small">
              {lang === "en" ? "open issues reported" : "खुली समस्याएँ"}
            </p>
          </div>

          <div className="card stat-card">
            <div className="card-icon">🔧</div>
            <h3>{lang === "en" ? "In Progress" : "प्रगति में"}</h3>
           <div className="big-num">{stats.inProgress}</div>
            <p className="muted small">
              {lang === "en" ? "in progress" : "प्रगति में"}
            </p>
          </div>

          <div className="card stat-card">
            <div className="card-icon">✅</div>
            <h3>{lang === "en" ? "Resolved" : "समाधान किया गया"}</h3>
           <div className="big-num">{stats.resolved}</div>
            <p className="muted small">
              {lang === "en" ? "resolved reported" : "समाधान की गई समस्याएँ"}
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features container">
        <h2>{lang === "en" ? "Why CivicX" : "CivicX क्यों"}</h2>
        <p className="muted">
          {lang === "en"
            ? "Built with community and transparency in mind."
            : "समुदाय और पारदर्शिता को ध्यान में रखकर बनाया गया।"}
        </p>

        <ul className="feature-list">
          <li>
            <strong>{lang === "en" ? "Transparency" : "पारदर्शिता"}</strong> —
            {lang === "en"
              ? " Track every issue from report to resolution."
              : " रिपोर्ट से समाधान तक हर समस्या को ट्रैक करें।"}
          </li>
          <li>
            <strong>AI Prioritization</strong> —
            {lang === "en"
              ? " Automated prioritization of urgent issues."
              : " तत्काल समस्याओं की स्वचालित प्राथमिकता।"}
          </li>
          <li>
            <strong>{lang === "en" ? "Rewards" : "पुरस्कार"}</strong> —
            {lang === "en"
              ? " Recognition & incentives for active citizens."
              : " सक्रिय नागरिकों के लिए पहचान और प्रोत्साहन।"}
          </li>
          <li>
            <strong>{lang === "en" ? "Social Sharing" : "सामाजिक साझाकरण"}</strong>
            —
            {lang === "en"
              ? " Raise awareness by sharing reports."
              : " रिपोर्ट साझा करके जागरूकता बढ़ाएँ।"}
          </li>
          <li>
            <strong>{lang === "en" ? "Analytics" : "विश्लेषण"}</strong> —
            {lang === "en"
              ? " Dashboard for community and authorities."
              : " समुदाय और अधिकारियों के लिए डैशबोर्ड।"}
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Home;
