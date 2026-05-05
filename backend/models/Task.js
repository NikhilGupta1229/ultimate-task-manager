const mongoose = require('mongoose');

module.exports = mongoose.model('Task', {
  title: String,
  status: { type: String, default: 'pending' }, // pending, done
  assignedTo: String,
  projectId: String,
  dueDate: Date
});
