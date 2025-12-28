import { useEffect, useState } from "react";
import API from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user") || "null");

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [issues, setIssues] = useState([]);

  // 🔹 Load stats
  const loadStats = async () => {
    const res = await API.get("/issues/my-stats");
    setStats(res.data);
  };

  // 🔹 Load issues
  const loadIssues = async () => {
    const res = await API.get("/issues/my");
    setIssues(res.data);
  };

  useEffect(() => {
    loadStats();
    loadIssues();
  }, []);

  // 🔴 Delete report
  const deleteReport = async (id) => {
    if (!window.confirm("Delete this report?")) return;

    await API.delete(`/issues/${id}`);
    loadStats();
    loadIssues();
  };

  // 🔴 Delete account
  const deleteAccount = async () => {
    if (!window.confirm("⚠️ This will delete your account permanently")) return;

    await API.delete("/auth/delete");
    localStorage.clear();
    window.dispatchEvent(new Event("auth-change"));
    navigate("/signup");
  };

  if (!user) return <h2>Please login first</h2>;

  return (
    <main className="container">
      <h2>My Profile</h2>

      {/* USER INFO */}
      <div className="card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* STATS */}
      <h3 style={{ marginTop: 20 }}>My Reports</h3>
      <div className="grid-4cards">
        <div className="card stat-card"><h4>Total</h4><div>{stats.total}</div></div>
        <div className="card stat-card"><h4>Pending</h4><div>{stats.pending}</div></div>
        <div className="card stat-card"><h4>In Progress</h4><div>{stats.inProgress}</div></div>
        <div className="card stat-card"><h4>Resolved</h4><div>{stats.resolved}</div></div>
      </div>

      {/* REPORT LIST */}
      <h3 style={{ marginTop: 30 }}>Submitted Reports</h3>

      {issues.length === 0 && <p>No reports yet</p>}

      {issues.map((issue) => (
        <div key={issue._id} className="card" style={{ marginBottom: 20 }}>
          <h4>{issue.location}</h4>
          <p>{issue.description}</p>

          <p><strong>Status:</strong> {issue.status}</p>

          {issue.image && (
            <img
              src={`https://civicx-host.onrender.com${issue.image}`}
              alt="issue"
              style={{ width: 220, marginTop: 10, borderRadius: 8 }}
            />
          )}

          {/* COMMENTS */}
          {issue.comments?.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <strong>Authority Comments:</strong>
              {issue.comments.map((c, i) => (
                <p key={i}>🗨 {c.text}</p>
              ))}
            </div>
          )}

          <button
            className="btn btn-outline"
            style={{ marginTop: 10 }}
            onClick={() => deleteReport(issue._id)}
          >
            Delete Report
          </button>
        </div>
      ))}

      {/* ACCOUNT DELETE */}
      <button
        onClick={deleteAccount}
        className="btn btn-danger"
        style={{ marginTop: 30 }}
      >
        Delete My Account
      </button>
    </main>
  );
};

export default Profile;
































