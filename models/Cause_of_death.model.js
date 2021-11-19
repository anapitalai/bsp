const mongoose = require('mongoose');
const  User = require('./User.model')

const DeathCauseSchema = mongoose.Schema({
   death_type:{type:String,required:true},
   description:{type:String,required:true},

  
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
