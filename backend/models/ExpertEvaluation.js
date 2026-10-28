const mongoose = require('mongoose');

const ExpertEvaluationSchema = new mongoose.Schema({
  proposalId: { type: String, required: true, default: "PRP-2026-9557" },
  scores: {
    tech: Number,
    feasibility: Number,
    cost: Number,
    team: Number,
    interop: Number
  },
  aggregateScore: Number,
  notes: Object,
  justification: String,
  decision: { type: String, enum: ['submit', 'approve', 'reject', 'flag', 'recommend'] },
  evaluatorToken: { type: String, default: "JURY-EVAL-IITD-04" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExpertEvaluation', ExpertEvaluationSchema);