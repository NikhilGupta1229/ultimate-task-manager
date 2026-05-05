const mongoose = require('mongoose');

module.exports = mongoose.model('Project', {
  name: String,
  description: String,
  assignedTo: [String], // Array of userIds
  dueDate: Date,
  status: { type: String, default: 'todo' } // todo, in progress, completed
});
