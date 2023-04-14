import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import "../App.css";
import "../reset.css";
import IconClose from "./IconClose";
import IconOpen from "./IconOpen";

function App() {
  const [filter, setFilter] = useState("open");
  const {
    isLoading,
    isSuccess,
    data: issues,
  } = useQuery(["issues", filter], fetchIssues);

  function fetchIssues() {
    return fetch(
      `https://api.github.com/repos/facebook/create-react-app/issues?per_page=10&state=${filter}`
    ).then(response => response.json());
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}

      {isSuccess && (
        <div className="issues-container">
          <div className="issues-heading">
            <a href="#">facebook / create-react-app</a>
            <div className="open-closed-buttons">
              <button onClick={() => setFilter("open")}>
                <IconOpen />
                <span className={filter === "open" ? "font-bold" : ""}>
                  96 Open
                </span>
              </button>
              <button onClick={() => setFilter("closed")}>
                <IconClose />
                <span className={filter === "closed" ? "font-bold" : ""}>
                  {/* above line makes font bold when user is on it calling a css class  */}
                  254 Closed
                </span>
              </button>
            </div>
          </div>
          <div className="issues-table">
            {issues.map(issue => (
              <div key={issue.number} className="issues-entry">
                <div className="issues-entry-title-container">
                  {issue.state === "open" && <IconOpen />}
                  {issue.state === "closed" && <IconClose />}

                  <div className="issues-title">
                    <Link to={`/issues/1`}>{issue.title}</Link>
                    <div className="issues-title-details">
                      #{issue.number} opened 10 hours ago by {issue.user.login}
                    </div>
                  </div>
                </div>
                {issue.comments > 0 && (
                  <Link to={`issues/1`} className="comments-count-container">
                    <svg
                      className="octicon octicon-comment v-align-middle"
                      viewBox="0 0 16 16"
                      version="1.1"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"
                      ></path>
                    </svg>
                    <div class="comments-count">{issue.comments}</div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
