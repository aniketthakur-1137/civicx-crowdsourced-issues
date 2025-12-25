import { useEffect, useState } from "react";
import API from "../utils/auth";

const AuthorityDashboard = () => {
  const [issues, setIssues] = useState([]);

  const fetchIssues = async () => {
    const res = await API.get("/issues");
    setIssues(res.data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/issues/${id}/status`, { status });
      fetchIssues();
    } catch {
      alert("Update failed");
    }
  };

  const addComment = async (id, text) => {
    if (!text) return;
    try {
      await API.post(`/issues/${id}/comment`, { text });
      fetchIssues();
    } catch {
      alert("Comment failed");
    }
  };

  return (
    <div className="container">
      <h2>Authority Dashboard</h2>

      {issues.map((issue) => (
        <div key={issue._id} className="card">
          <h4>{issue.location}</h4>
          <p>{issue.description}</p>
          <p>
            <strong>Reported By:</strong> {issue.reportedBy?.name}
          </p>

          {issue.image && (
            <img
              src={`http://localhost:5000${issue.image}`}
              width="250"
              alt="issue"
            />
          )}

          <div>
            <label>Status:</label>
            <select
              value={issue.status}
              onChange={(e) =>
                updateStatus(issue._id, e.target.value)
              }
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder="Add comment"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addComment(issue._id, e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>

          {/* SHOW COMMENTS */}
          {issue.comments?.map((c, i) => (
            <p key={i} style={{ fontSize: "14px", marginTop: "5px" }}>
              📝 {c.text}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AuthorityDashboard;
