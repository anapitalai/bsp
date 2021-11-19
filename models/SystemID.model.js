const mongoose = require('mongoose');
const User = require('./User.model')
const Claimant=require('./Claimant.model')

const SystemIDSchema = mongoose.Schema({
  system_id: { type: Number, required: true, unique: true },



  createdAt: Date,
  updatedAt: Date
});

SystemIDSchema.pre('save', function (next) {
  // get the current date
  var currentDate = new Date();
  // change the updated_at field to current date
  this.createdAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.updatedAt)
    this.updatedAt = currentDate;
  next();
});



module.exports = mongoose.model('SystemID', SystemIDSchema);
