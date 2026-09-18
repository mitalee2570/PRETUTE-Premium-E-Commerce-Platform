const mongoose = require('mongoose');

const userLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    index: true,
    default: null
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  action: {
    type: String,
    enum: ['LOGIN_SUCCESS', 'LOGIN_FAILED', 'REGISTER', 'PROFILE_UPDATE', 'LOGOUT'],
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILURE'],
    default: 'SUCCESS'
  },
  ip: {
    type: String,
    default: 'Unknown'
  },
  userAgent: {
    type: String,
    default: 'Unknown'
  },
  details: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

const UserLog = mongoose.models.UserLog || mongoose.model('UserLog', userLogSchema);

module.exports = UserLog;
