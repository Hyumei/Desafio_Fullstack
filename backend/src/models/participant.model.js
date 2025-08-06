const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required.']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.']
  },
  participation: {
    type: Number,
    required: [true, 'Participation value is required.'],
    min: [0, 'Participation cannot be negative.'],
  }
}, {
  timestamps: true
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;