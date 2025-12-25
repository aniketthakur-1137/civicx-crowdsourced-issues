import translations from "../utils/lang";

const About = () => {
  // 🌐 Language
  const lang = localStorage.getItem("lang") || "en";

  return (
    <main>
      <section className="container about-section">
        <h1>
          {lang === "en" ? "About CivicX" : "CivicX के बारे में"}
        </h1>

        <p className="lead">
          {lang === "en"
            ? "A civic platform enabling citizens to report, track, and resolve issues with transparency."
            : "एक नागरिक मंच जो नागरिकों को पारदर्शिता के साथ समस्याओं की रिपोर्ट, ट्रैक और समाधान करने में सक्षम बनाता है।"}
        </p>

        <div className="about-grid">
          <div className="card">
            <h3>{lang === "en" ? "Our Vision" : "हमारा दृष्टिकोण"}</h3>
            <p>
              {lang === "en"
                ? "CivicX aims to empower communities to take action, share responsibility and work hand-in-hand with local authorities to improve public services."
                : "CivicX का उद्देश्य समुदायों को कार्रवाई के लिए सशक्त बनाना, जिम्मेदारी साझा करना और सार्वजनिक सेवाओं को बेहतर बनाने के लिए स्थानीय अधिकारियों के साथ मिलकर काम करना है।"}
            </p>
          </div>

          <div className="card">
            <h3>{lang === "en" ? "Key Features" : "मुख्य विशेषताएँ"}</h3>
            <ul className="feature-list simple">
              <li>
                <strong>
                  {lang === "en" ? "Transparency" : "पारदर्शिता"}
                </strong>{" "}
                —{" "}
                {lang === "en"
                  ? "Audit trail for every report."
                  : "हर रिपोर्ट के लिए ऑडिट ट्रेल।"}
              </li>
              <li>
                <strong>AI Prioritization</strong> —{" "}
                {lang === "en"
                  ? "Detect urgent issues automatically."
                  : "तत्काल समस्याओं की स्वचालित पहचान।"}
              </li>
              <li>
                <strong>
                  {lang === "en" ? "Rewards" : "पुरस्कार"}
                </strong>{" "}
                —{" "}
                {lang === "en"
                  ? "Incentives for citizen engagement."
                  : "नागरिक भागीदारी के लिए प्रोत्साहन।"}
              </li>
              <li>
                <strong>
                  {lang === "en" ? "Social Sharing" : "सामाजिक साझाकरण"}
                </strong>{" "}
                —{" "}
                {lang === "en"
                  ? "Raise awareness quickly."
                  : "तेजी से जागरूकता बढ़ाएँ।"}
              </li>
              <li>
                <strong>
                  {lang === "en" ? "Analytics" : "विश्लेषण"}
                </strong>{" "}
                —{" "}
                {lang === "en"
                  ? "Actionable dashboards for administrators."
                  : "प्रशासकों के लिए उपयोगी डैशबोर्ड।"}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
