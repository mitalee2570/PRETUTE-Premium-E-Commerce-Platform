const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  pincode: { type: String, default: '' }
}, { _id: false });

const userSchema = new mongoose.Schema({
  customId: {
    type: String,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  address: {
    type: addressSchema,
    default: () => ({ street: '', city: '', state: '', pincode: '' })
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Virtual to expose standard id
userSchema.virtual('id').get(function () {
  return this.customId || this._id.toString();
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.customId || ret._id.toString();
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
