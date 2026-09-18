
const express = require("express");
const cors = require("cors");
const { searchKnowledgeBase } = require("./services/knowledge");
const { processRequest } = require("./agent/agentService");
const employeeRequests = require("./data/employeeRequests.json");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Veridian IT Support Agent API is running",
  });
});
app.get("/api/search", (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      error: "Please provide a search query using ?q="
    });
  }

  const results = searchKnowledgeBase(query);

  res.json({
    query,
    results
  });
});
//Agent endpoint
app.post("/api/agent", (req, res) => {
  const { request } = req.body;

  if (!request) {
    return res.status(400).json({
      error: "Please provide an employee request."
    });
  }

  const result = processRequest(request);

  res.json(result);
});
// Process employee request by ID
app.get("/api/agent/:id", (req, res) => {
  const requestId = req.params.id;

  const employeeRequest = employeeRequests.find(
    (item) => item.id === requestId
  );

  if (!employeeRequest) {
    return res.status(404).json({
      error: `Employee request ${requestId} not found.`
    });
  }

  const result = processRequest(employeeRequest.request);

  res.json({
    requestId: employeeRequest.id,
    employee: employeeRequest.employee,
    email: employeeRequest.email,
    dateOpened: employeeRequest.dateOpened,
    request: employeeRequest.request,
    initialAction: employeeRequest.initialAction,
    agentResult: result
  });
});
// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});