const mongoose = require('mongoose');
const User = require('./User.model')
const Claimant=require('./Claimant.model')
const DeathCause=require('./Cause_of_death.model')
const Branch = require('./Branch.model')

const DeceasedSchema = mongoose.Schema({
  name: { type: String, required: true},
  sex: { type: String, required: false,enum:['M','F'], unique: false },
  date_of_birth: { type: Date, required: false, unique: false },
  

  age_at_death: { type: Number, required: false, unique: false },
 
  death_cause: {
    type: mongoose.Types.ObjectId,
    ref: 'DeathCause',
    required:true,
      },
      branch: {
        type: mongoose.Types.ObjectId,
        required:true,
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
