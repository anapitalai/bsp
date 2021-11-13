const mongoose = require('mongoose');

const Membership_id = require('./Claimant.model')
const  User = require('./User.model')


const BranchSchema = mongoose.Schema({
  branch_name: { type: String, required: true, unique: true },

  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  // membership_id: {
  //   type: mongoose.Types.ObjectId,
  //   ref: 'Membership_Id',
  //     },
  createdAt: Date,
  updatedAt: Date ,
  

});

BranchSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;
    next();
    });
    


module.exports = mongoose.model('Branch',BranchSchema);
