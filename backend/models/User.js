const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, required: true, enum: ['startup', 'government'] },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // Startup Specific Fields
  startupName: { type: String },
  diiptNumber: { type: String },
  yearFounded: { type: String },
  sector: { type: String },

  // Government Specific Fields
  ministryName: { type: String },
  departmentType: { type: String },
  officialEmail: { type: String },
  nodalDesignation: { type: String },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);