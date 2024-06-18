const mongoose = require('mongoose');

const upcomingGroupSchema = new mongoose.Schema({
  image: {
    type: String, 
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startsOn: {
    type: Date,
    required: true
  },
  sessions: {
    type: Number, 
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  }
}, {
  timestamps: true 
});

const UpcomingGroup = mongoose.model('UpcomingGroup', upcomingGroupSchema);

module.exports = UpcomingGroup;