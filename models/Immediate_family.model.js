const mongoose = require('mongoose');
const Spouse_Id = require('./Spouse.model')
const Membership_id = require('./Membership_Id.model')
const Land_Id = require('./Land.model')
const  User = require('./User.model')
const  Mother_Id = require('./Mother.model')

const Immediate_familySchema = mongoose.Schema({
  membership_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Membership_Id',
      },
  spouse: {
    type: mongoose.Types.ObjectId,
    ref: 'Spouse_Id',
  },
  land: {
    type: mongoose.Types.ObjectId,
    ref: 'Land_Id',
  },
  mother: {
    type: mongoose.Types.ObjectId,
    ref: 'Mother_Id',
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  name: { type: String,required: true },
  current_location: { type: String,required: true },
  
  age: { type: String, enum: ["30", "70",'45','75','80','55'], required: true },
  createdAt: Date,
  updatedAt: Date ,

});

Immediate_familySchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;
    next();
    });
    


module.exports = mongoose.model('Immediate_family',Immediate_familySchema);