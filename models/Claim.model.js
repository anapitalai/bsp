const mongoose = require('mongoose');
const CIF = require('./CIF.model')
const Claimant = require('./Claimant.model')
const  User = require('./User.model')
const Deceased = require('./Deceased.model.js')
const SystemID=require("./SystemID.model")
const ClaimID=require("./ClaimID.model")
const ClaimSchema = mongoose.Schema({
  claimant: {
    type: mongoose.Types.ObjectId,
    required:false,
    ref: 'Claimant',
      },
      claimID: {
        type: mongoose.Types.ObjectId,
        required:true,
        ref: 'ClaimID',
          },
          SystemID: {
            type: mongoose.Types.ObjectId,
            required:true,
            ref: SystemID,
              },  
          CIF: {
                type: mongoose.Types.ObjectId,
                required:false,
                ref: 'CIF',
                  },
 
 date_of_loan: { type: Date, required: false, unique: true },
 date_of_death: { type: Date, required: false, unique: false },
  loan_balance: { type: Number, required: false, unique: false },
  
  funeral_benefit: { type: Number, required: false, unique: false },
   total_claim: { type: Number, required: false, unique: false },
  date_full_claim_request_received: { type: Date, required: false, unique: false },
  
  date_of_notification: { type: Date, required: false, unique: false },
   days_delay_notification: { type: Number, required: false, unique: false },
  date_paid_declined: { type: Date, required: false, unique: false },
  
  claim_turnaround: { type: String, required: false, unique: false },
  assessment: { type: String, required: false, unique: false },
  comments: { type: String, required: false, unique: false },
  date_of_claim_payment: { type:Date, required: false, unique: false },
  total: { type:Number, required: false, unique: false },
  
  
  deceased: {
    type: mongoose.Types.ObjectId,
    ref: 'Deceased',
      },


   CIF: {
     type: mongoose.Types.ObjectId,
     ref: 'CIF',
      },

  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },


  createdAt: Date,
  updatedAt: Date ,

});

ClaimSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;
    next();
    });
  

module.exports = mongoose.model('Claim',ClaimSchema);
