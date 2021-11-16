const mongoose = require('mongoose');
const  User = require('./User.model')

const DeathCauseSchema = mongoose.Schema({
   death_type:{type:String,required:true,unique:true},
   description:{type:String,required:false,unique:true},

  owner_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
      },
    createdAt:Date,
    updatedAt:Date
});

DeathCauseSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;
    next();
    });
    


module.exports = mongoose.model('DeathCause',DeathCauseSchema);
