const { searchKnowledgeBase } = require("../services/knowledge");
const { decideAction } = require("./decisionEngine");

function processRequest(request) {
  // Step 1: Search the knowledge base
  const knowledge = searchKnowledgeBase(request);

  // Step 2: Make a decision
  const decision = decideAction(request, knowledge);

  // Step 3: Select the most relevant policy
  const sourcePolicy = knowledge.policies.length > 0
    ? knowledge.policies[0]
    : null;

  // Step 4: Select relevant ticket history
  const sourceTicket = knowledge.tickets.length > 0
    ? knowledge.tickets[0]
    : null;

  // Step 5: Build the agent response
  return {
    request,
    decision,
    source: {
      policy: sourcePolicy,
      ticket: sourceTicket
    }
  };
}

module.exports = {
  processRequest
};