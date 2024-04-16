const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String},
    phone: { type: String},
    city: {type:String},
    otp:{type:Number},
    standard:{type:String}
  },{ timestamps: true });

  const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String,required: true},
    phone: { type: String,required: true},
    dob: {type:Date},
  },{ timestamps: true });

  module.exports = {
    User: mongoose.model('User', userSchema),
    Admin: mongoose.model('Admin', adminSchema)
};