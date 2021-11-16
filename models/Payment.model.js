const mongoose = require('mongoose');
const User = require('./User.model')
const Claimant=require('./Claimant.model')

const PaymentSchema = mongoose.Schema({
  first_name: { type: String, required: true, unique: true },
  middle_name: { type: String, required: false, unique: false },
  last_name: { type: String, required: false, unique: false },
  origin: { type: String, required: false, unique: false },

  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
  updatedAt: Date
});

PaymentSchema.pre('save', function (next) {
  // get the current date
  var currentDate = new Date();
  // change the updated_at field to current date
  this.createdAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.updatedAt)
    this.updatedAt = currentDate;
  next();
});



module.exports = mongoose.model('Payment', PaymentSchema);
