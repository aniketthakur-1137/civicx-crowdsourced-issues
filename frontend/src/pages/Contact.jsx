import { useState } from "react";

const Contact = () => {
  // 🌐 Language
  const lang = localStorage.getItem("lang") || "en";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert(
        lang === "en"
          ? "⚠️ Please fill all required fields before sending."
          : "⚠️ कृपया भेजने से पहले सभी आवश्यक फ़ील्ड भरें।"
      );
      return;
    }

    alert(
      lang === "en"
        ? "📨 Message sent successfully!"
        : "📨 संदेश सफलतापूर्वक भेजा गया!"
    );

    // Reset form (same behavior)
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <main>
      <section className="container form-section">
        <div className="form-card small">
          <h2>
            {lang === "en" ? "Contact Us" : "संपर्क करें"}
          </h2>

          <p className="muted">
            {lang === "en"
              ? "Questions, partnership requests, or help — write to us."
              : "प्रश्न, साझेदारी अनुरोध या सहायता के लिए हमें लिखें।"}
          </p>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="cname">
                {lang === "en" ? "Name" : "नाम"}
              </label>
              <input
                id="cname"
                type="text"
                placeholder={lang === "en" ? "Your name" : "आपका नाम"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="cemail">
                {lang === "en" ? "Email" : "ईमेल"}
              </label>
              <input
                id="cemail"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="cmessage">
                {lang === "en" ? "Message" : "संदेश"}
              </label>
              <textarea
                id="cmessage"
                rows="5"
                placeholder={
                  lang === "en"
                    ? "How can we help?"
                    : "हम आपकी कैसे सहायता कर सकते हैं?"
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {lang === "en" ? "Send Message" : "संदेश भेजें"}
              </button>
            </div>
          </form>

          <div className="contact-details">
            <h4>
              {lang === "en" ? "Office" : "कार्यालय"}
            </h4>
            <p className="muted small">
              {lang === "en"
                ? "123 Civic Avenue, City Name, Country"
                : "123 सिविक एवेन्यू, शहर का नाम, देश"}
            </p>
            <p className="muted small">
              {lang === "en"
                ? "Phone: +91 98765 43210"
                : "फ़ोन: +91 98765 43210"}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
