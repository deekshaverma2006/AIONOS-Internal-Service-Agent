import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [request, setRequest] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [error, setError] = useState("");
  const [selectedRequest, setSelectedRequest] = useState("");

  // =========================================
  // ASSIGNMENT REQUESTS - REQ-01 TO REQ-15
  // =========================================
  const assignmentRequests = [
    {
      id: "REQ-01",
      employee: "Aditi Sharma",
      text: "My laptop won’t turn on at all, it’s completely dead, had it about 3.5 years now.",
    },
    {
      id: "REQ-02",
      employee: "Vikram Chawla",
      text: "Can I get Wi-Fi access for a guest visiting our office tomorrow?",
    },
    {
      id: "REQ-03",
      employee: "Karan Mehta",
      text: "I’m locked out of my account, tried my password 6 times.",
    },
    {
      id: "REQ-04",
      employee: "Ritu Bhatia",
      text: "Need approval to install a data-analysis tool that’s not in the software catalog.",
    },
    {
      id: "REQ-05",
      employee: "Sanjay Oberoi",
      text: "My VPN stopped working this morning, says credentials expired.",
    },
    {
      id: "REQ-06",
      employee: "Meera Iyer",
      text: "Printer on the 3rd floor keeps showing “paper jam” even though there’s no jam.",
    },
    {
      id: "REQ-07",
      employee: "Farhan Ali",
      text: "I’ve started working from home 4 days a week, how do I get a monitor?",
    },
    {
      id: "REQ-08",
      employee: "Ananya Reddy",
      text: "I think I got a phishing email asking for my login — forwarding it to a few teammates to check.",
    },
    {
      id: "REQ-09",
      employee: "Rohit Desai",
      text: "My mailbox is full and I can’t send emails.",
    },
    {
      id: "REQ-10",
      employee: "Kavya Pillai",
      text: "Can someone give me admin access to the finance reporting server? Need it urgently for month-end.",
    },
    {
      id: "REQ-11",
      employee: "Nikhil Bansal",
      text: "New contractor joining my team next week, they’ll need VPN access.",
    },
    {
      id: "REQ-12",
      employee: "Sneha Kulkarni",
      text: "I can’t log into the expense tool, keeps saying invalid credentials.",
    },
    {
      id: "REQ-13",
      employee: "Aman Gupta",
      text: "Laptop screen is flickering on and off, had it 2 years, might just need a fix not a replacement.",
    },
    {
      id: "REQ-14",
      employee: "Tanya Chopra",
      text: "Requesting approval to install a browser extension for productivity tracking.",
    },
    {
      id: "REQ-15",
      employee: "Rahul Menon",
      text: "hey can you help, its not working",
    },
  ];

  // First 4 are displayed as featured quick requests
  const featuredRequests = assignmentRequests.slice(0, 4);

  // =========================================
  // CHECK BACKEND CONNECTION
  // =========================================
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/agent/REQ-01"
        );

        setBackendConnected(response.ok);
      } catch (error) {
        setBackendConnected(false);
      }
    };

    checkBackend();

    const interval = setInterval(checkBackend, 10000);

    return () => clearInterval(interval);
  }, []);

  // =========================================
  // PROCESS REQUEST
  // =========================================
  const processRequest = async () => {
    if (!request.trim()) {
      setError("Please describe your IT support issue first.");
      return;
    }

    if (!backendConnected) {
      setError("Backend is currently offline. Please start the backend and try again.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request: request.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error("Processing error:", error);

      setError(
        "Unable to process the request. Please check that your backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // CLEAR
  // =========================================
  const clearRequest = () => {
    setRequest("");
    setResult(null);
    setError("");
    setSelectedRequest("");
  };

  // =========================================
  // SELECT ASSIGNMENT REQUEST
  // =========================================
  const selectAssignmentRequest = (id) => {
    const selected = assignmentRequests.find((item) => item.id === id);

    if (!selected) return;

    setSelectedRequest(id);
    setRequest(selected.text);
    setResult(null);
    setError("");
  };

  // =========================================
  // SELECT QUICK REQUEST
  // =========================================
  const selectQuickRequest = (item) => {
    setSelectedRequest(item.id);
    setRequest(item.text);
    setResult(null);
    setError("");
  };

  // =========================================
  // FORMAT ACTION
  // =========================================
  const formatAction = (action) => {
    if (!action) return "—";

    return action
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  // =========================================
  // FORMAT PRIORITY
  // =========================================
  const formatPriority = (priority) => {
    if (!priority) return "—";

    return (
      priority.charAt(0).toUpperCase() +
      priority.slice(1).toLowerCase()
    );
  };

  return (
    <div className="app">

      {/* =========================================
          HEADER
      ========================================= */}
      <header className="header">

        <div className="brand">

          <div className="logo">
            A
          </div>

          <div className="brand-text">

            <div className="brand-name">
              AIONOS
            </div>

            <h1>
              IT Service Agent
            </h1>

          </div>

        </div>

        {/* BACKEND STATUS */}
        <div
          className={`status ${
            backendConnected ? "connected" : "disconnected"
          }`}
        >
          <span className="status-dot"></span>

          {backendConnected
            ? "Backend connected"
            : "Backend offline"}
        </div>

      </header>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}
      <main className="container">

        {/* =========================================
            REQUEST + OVERVIEW
        ========================================= */}
        <div className="top-grid">

          {/* =========================================
              REQUEST CARD
          ========================================= */}
          <section className="request-card">

            <div className="eyebrow">
              EMPLOYEE REQUEST
            </div>

            <h2>
              Submit a support case
            </h2>

            <p className="description">
              Describe the issue and the agent will assess urgency,
              recommend an action, and surface the most relevant
              policy and prior case.
            </p>


            {/* =========================================
                ASSIGNMENT REQUEST SELECTOR
            ========================================= */}
            <div className="request-selector">

              <label>
                Assignment request
              </label>

              <select
                value={selectedRequest}
                onChange={(e) =>
                  selectAssignmentRequest(e.target.value)
                }
              >

                <option value="">
                  Choose a request from REQ-01 to REQ-15
                </option>

                {assignmentRequests.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.id} — {item.employee}
                  </option>
                ))}

              </select>

            </div>


            {/* =========================================
                FEATURED QUICK REQUESTS
            ========================================= */}
            <div className="quick-section">

              <div className="quick-label">
                Quick examples
              </div>

              <div className="quick-requests">

                {featuredRequests.map((item) => (
                  <button
                    key={item.id}
                    className={`quick-button ${
                      selectedRequest === item.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      selectQuickRequest(item)
                    }
                    type="button"
                  >
                    {item.id}
                    <span>·</span>
                    {item.employee}
                  </button>
                ))}

              </div>

            </div>


            {/* =========================================
                TEXTAREA
            ========================================= */}
            <div className="textarea-wrapper">

              <textarea
                value={request}
                onChange={(e) => {
                  setRequest(e.target.value);
                  setError("");
                  setSelectedRequest("");
                  setResult(null);
                }}
                placeholder="Describe your IT support issue..."
                rows="7"
              />

              <span className="character-count">
                {request.length} characters
              </span>

            </div>


            {/* =========================================
                ERROR
            ========================================= */}
            {error && (
              <div className="error-message">
                <span>!</span>
                {error}
              </div>
            )}


            {/* =========================================
                BUTTONS
            ========================================= */}
            <div className="button-row">

              <button
                className="process-button"
                onClick={processRequest}
                disabled={loading || !backendConnected}
                type="button"
              >

                {loading ? (
                  <span className="loading-content">

                    <span className="spinner"></span>

                    Analyzing request...

                  </span>
                ) : (
                  <>
                    <span>✦</span>
                    Process request
                  </>
                )}

              </button>


              <button
                className="clear-button"
                onClick={clearRequest}
                type="button"
              >
                Clear
              </button>

            </div>


            {/* =========================================
                HELPER TEXT
            ========================================= */}
            <div className="request-helper">
              <span>🔒</span>
              Your request is processed securely by the internal support agent.
            </div>

          </section>


          {/* =========================================
              OVERVIEW CARD
          ========================================= */}
          <section className="overview-card">

            <div className="eyebrow">
              OVERVIEW
            </div>

            <h2>
              What the agent handles
            </h2>


            <div className="features">

              <div className="feature">

                <span className="feature-icon">
                  ✓
                </span>

                <div>
                  <strong>
                    Request triage
                  </strong>

                  <p>
                    Assess urgency and classify employee requests.
                  </p>
                </div>

              </div>


              <div className="feature">

                <span className="feature-icon">
                  ✓
                </span>

                <div>
                  <strong>
                    Policy-based decisions
                  </strong>

                  <p>
                    Use relevant internal policies to guide actions.
                  </p>
                </div>

              </div>


              <div className="feature">

                <span className="feature-icon">
                  ✓
                </span>

                <div>
                  <strong>
                    Similar ticket lookup
                  </strong>

                  <p>
                    Surface previous cases for better prioritization.
                  </p>
                </div>

              </div>

            </div>


            {/* =========================================
                SYSTEM INFORMATION
            ========================================= */}
            <div className="stats">

              <div className="stat">

                <span>
                  Assignment cases
                </span>

                <strong>
                  15
                </strong>

              </div>


              <div className="stat">

                <span>
                  Request range
                </span>

                <strong>
                  REQ-01–15
                </strong>

              </div>

            </div>

          </section>

        </div>


        {/* =========================================
            PROCESSING CARD
        ========================================= */}
        {loading && (
          <div className="processing-card">

            <div className="ai-icon">
              ✦
            </div>

            <div className="processing-text">

              <strong>
                AI agent is analyzing your request
              </strong>

              <p>
                Checking policies, previous tickets, priority
                and recommended action...
              </p>

            </div>

            <div className="processing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>
        )}


        {/* =========================================
            RESULT
        ========================================= */}
        {result && !loading && (
          <section className="decision-card">

            {/* =========================================
                DECISION HEADER
            ========================================= */}
            <div className="decision-header">

              <div>

                <div className="eyebrow">
                  DECISION
                </div>

                <h2>
                  AI recommendation
                </h2>

              </div>

              <div className="decision-badge">
                <span>✦</span>
                AI analyzed
              </div>

            </div>


            {/* =========================================
                ACTION + PRIORITY
            ========================================= */}
            <div className="decision-grid">

              {/* ACTION */}
              <div className="decision-box action-box">

                <label>
                  ACTION
                </label>

                <div className="decision-value">

                  <span className="decision-icon action-icon">
                    ✓
                  </span>

                  <strong
                    className={`action-${result.decision?.action?.toLowerCase()}`}
                  >
                    {formatAction(result.decision?.action)}
                  </strong>

                </div>

              </div>


              {/* PRIORITY */}
              <div className="decision-box priority-box">

                <label>
                  PRIORITY
                </label>

                <div className="decision-value">

                  <span
                    className={`priority-dot priority-${result.decision?.priority?.toLowerCase()}`}
                  ></span>

                  <strong
                    className={`priority-${result.decision?.priority?.toLowerCase()}`}
                  >
                    {formatPriority(result.decision?.priority)}
                  </strong>

                </div>

              </div>

            </div>


            {/* =========================================
                REASON
            ========================================= */}
            <div className="reason-box">

              <div className="reason-header">

                <span className="reason-icon">
                  i
                </span>

                <label>
                  REASON
                </label>

              </div>

              <p>
                {result.decision?.reason ||
                  "No decision reason was returned."}
              </p>

            </div>


            {/* =========================================
                REQUEST DETAILS
            ========================================= */}
            <div className="section-title">

              <span className="section-icon">
                01
              </span>

              Request details

            </div>


            <div className="details-box">

              <div className="detail-label">
                REQUEST
              </div>

              <p>
                {result.request || request}
              </p>

            </div>


            {/* =========================================
                KNOWLEDGE SOURCES
            ========================================= */}
            <div className="section-title">

              <span className="section-icon">
                02
              </span>

              Knowledge sources

            </div>


            <div className="sources">

              {/* =========================================
                  POLICY
              ========================================= */}
              <div className="source-box">

                <div className="source-top">

                  <div className="source-type">

                    <span className="source-icon">
                      ◈
                    </span>

                    POLICY SOURCE

                  </div>

                  {result.source?.policy && (
                    <span className="source-status">
                      MATCHED
                    </span>
                  )}

                </div>


                {result.source?.policy ? (
                  <>
                    <h3>
                      {result.source.policy.title}
                    </h3>

                    <p>
                      {result.source.policy.policy}
                    </p>
                  </>
                ) : (
                  <p className="muted">
                    No matching policy found.
                  </p>
                )}

              </div>


              {/* =========================================
                  PREVIOUS TICKET
              ========================================= */}
              <div className="source-box">

                <div className="source-top">

                  <div className="source-type">

                    <span className="source-icon">
                      #
                    </span>

                    PREVIOUS TICKET

                  </div>

                  {result.source?.ticket && (
                    <span className="source-status">
                      MATCHED
                    </span>
                  )}

                </div>


                {result.source?.ticket ? (
                  <>
                    <h3>
                      {result.source.ticket.id}
                    </h3>

                    <p>
                      <b>Issue:</b>{" "}
                      {result.source.ticket.issue}
                    </p>

                    <p>
                      <b>Status:</b>{" "}
                      {result.source.ticket.status}
                    </p>
                  </>
                ) : (
                  <p className="muted">
                    No previous ticket found.
                  </p>
                )}

              </div>

            </div>


            {/* =========================================
                RESULT FOOTER
            ========================================= */}
            <div className="decision-footer">

              <span>
                ✦ Decision generated from available internal knowledge
              </span>

              <span>
                Veridian IT Support Agent
              </span>

            </div>

          </section>
        )}


        {/* =========================================
            FOOTER
        ========================================= */}
        <footer className="footer">

          <div className="footer-brand">

            <div className="footer-logo">
              A
            </div>

            <div>

              <strong>
                AIONOS IT Service Agent
              </strong>

              <span>
                Internal IT support automation
              </span>

            </div>

          </div>

          <p>
            AI-powered internal IT service assistant
          </p>

        </footer>

      </main>

    </div>
  );
}

export default App;