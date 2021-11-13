const mongoose = require('mongoose');
const User = require('./User.model')
const Claimant=require('./Claimant.model')
const DeathCause=require('./Cause_of_death.model')
const Branch = require('./Branch.model')

const DeceasedSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sex: { type: String, required: true, unique: true },
  dob: { type: Date, required: true, unique: false },
  dod: { type: Date, required: true, unique: false },
  cod: { type: String, required: true, unique: false },
  DeathCauseId: {
    type: mongoose.Types.ObjectId,
    ref: 'DeathCause',
      },
      BranchId: {
        type: mongoose.Types.ObjectId,
        ref: 'Branch',
          },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
  updatedAt: Date
});

DeceasedSchema.pre('save', function (next) {
  // get the current date
  var currentDate = new Date();
  // change the updated_at field to current date
  this.createdAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.updatedAt)
    this.updatedAt = currentDate;
  next();
});



module.exports = mongoose.model('Deceased', DeceasedSchema);
