import { useEffect, useState } from "react";
import translations from "../utils/lang";
import IssueMap from "../components/IssueMap";
import API from "../utils/auth";

const Browse = () => {
  // 🌐 Language
  const lang = localStorage.getItem("lang") || "en";
  const t = translations[lang];

  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // ✅ LOAD ISSUES FROM BACKEND (MongoDB)
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await API.get("/issues");
        setIssues(res.data);
      } catch (err) {
        console.error("Failed to fetch issues", err);
      }
    };

    fetchIssues();
  }, []);

  // Modal handlers
  const openModal = (issue) => {
    setSelectedIssue(issue);
  };

  const closeModal = () => {
    setSelectedIssue(null);
  };

  return (
    <main>

     
      {/* ================= ISSUES GRID ================= */}
      <section className="container">
        <div className="center">
          <h1>
            {lang === "en"
             ? "Browse Reported Issues"
              : "रिपोर्ट की गई समस्याएँ देखें"}
          </h1>
          <p className="muted">
            {lang === "en"
              ? "Issues reported by citizens."
              : "नागरिकों द्वारा रिपोर्ट की गई समस्याएँ।"}
          </p>
        </div>

        <div className="issues-grid">
          {issues.length === 0 && (
            <p className="muted">
              {lang === "en"
                ? "No issues reported yet."
                : "अभी तक कोई समस्या रिपोर्ट नहीं की गई है।"}
            </p>
          )}

          {issues.map((issue) => (
            <article
              key={issue._id}
              className="issue-card"
              onClick={() => openModal(issue)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-media">
                <img
                  src={
                    issue.image
                      ? `http://localhost:5000${issue.image}`
                      : "https://via.placeholder.com/600x400?text=No+Image"
                  }
                  alt="Issue"
                />
                <span className={`badge ${issue.status}`}>
                  {issue.status}
                </span>
              </div>

              <div className="card-body">
                <h3>{issue.title || "Civic Issue"}</h3>

                <p className="muted small">
                  <strong>{lang === "en" ? "Location:" : "स्थान:"}</strong>{" "}
                  {issue.location || "N/A"}
                </p>

                <p className="muted small">
                  <strong>{lang === "en" ? "Reported by:" : "रिपोर्ट किया गया:"}</strong>{" "}
                  {issue.reportedBy?.name || "Citizen"}
                </p>

                <p className="muted small">
                  <strong>{lang === "en" ? "Date:" : "तारीख:"}</strong>{" "}
                  {new Date(issue.createdAt).toLocaleString()}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>




       {/* ================= MAP DASHBOARD ================= */}
      <section className="container">
        <div className="center">
          <h1>
            {lang === "en"
              ? "📍 Issue Map Dashboard"
              : "📍 समस्या मानचित्र डैशबोर्ड"}
          </h1>
          <p className="muted">
            {lang === "en"
              ? "View all reported issues plotted on the map."
              : "मानचित्र पर सभी रिपोर्ट की गई समस्याएँ देखें।"}
          </p>
        </div>

        <IssueMap issues={issues} />
      </section>


      {/* ================= MODAL ================= */}
      {selectedIssue && (
        <div className="modal show" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>

            <h2>{selectedIssue.title}</h2>

            {selectedIssue.image && (
              <img
                src={`http://localhost:5000${selectedIssue.image}`}
                alt="Issue"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}

            <p>
              <strong>{lang === "en" ? "Location:" : "स्थान:"}</strong>{" "}
              {selectedIssue.location}
            </p>

            <p>
              <strong>{lang === "en" ? "Reported by:" : "रिपोर्ट किया गया:"}</strong>{" "}
              {selectedIssue.reportedBy?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedIssue.reportedBy?.email || "N/A"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedIssue.status}
            </p>
          </div>
        </div>
      )}
    </main>
  );
};



export default Browse;
