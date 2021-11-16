const mongoose = require('mongoose');
const Payment = require('./Payment.model')
const Claimant = require('./Claimant.model')
const  User = require('./User.model')

const ClaimSchema = mongoose.Schema({
  full_name: { type: String, required: true, unique: true },
  systemId: { type: String, required: false, unique: false },
  
  CIF: { type: String, required: false, unique: false },
 date_of_loan: { type: Date, required: true, unique: true },
  loan_balance: { type: Number, required: false, unique: false },
  
  funeral_benefit: { type: Number, required: false, unique: false },
   total_claim: { type: String, required: true, unique: true },
  date_full_claim_req_received: { type: Date, required: false, unique: false },
  
  date_of_notification: { type: Date, required: false, unique: false },
   days_delay_notification: { type: Number, required: true, unique: true },
  date_paid_declined: { type: Date, required: false, unique: false },
  
  claim_turnaround: { type: String, required: false, unique: false },
   assement: { type: String, required: true, unique: true },
  comments: { type: String, required: false, unique: false },
  


  claimantId: {
    type: mongoose.Types.ObjectId,
    ref: 'Claimant',
      },
      paymentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Payment',
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
