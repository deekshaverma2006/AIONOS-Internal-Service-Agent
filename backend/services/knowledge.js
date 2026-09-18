const policies = require("../data/policies.json");
const tickets = require("../data/tickets.json");

function calculateScore(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  let score = 0;

  // Exact phrase match
  if (t.includes(q)) {
    score += 100;
  }

  // Important keywords
  const keywords = q
    .replace(/[^\w\s-]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2);

  keywords.forEach(word => {
    if (t.includes(word)) {
      score += 10;
    }
  });

  return score;
}

function searchKnowledgeBase(query) {
  const policyResults = policies
    .map(policy => ({
      item: policy,
      score: calculateScore(
        query,
        `${policy.title} ${policy.policy}`
      )
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);

  const ticketResults = tickets
    .map(ticket => ({
      item: ticket,
      score: calculateScore(
        query,
        `${ticket.issue} ${ticket.employee} ${ticket.status}`
      )
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);

  return {
    policies: policyResults,
    tickets: ticketResults
  };
}

module.exports = {
  searchKnowledgeBase
};