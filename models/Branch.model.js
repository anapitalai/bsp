const mongoose = require('mongoose');

const  User = require('./User.model')


const BranchSchema = mongoose.Schema({
  branch_name: { type: String,required:true},

  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },

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
