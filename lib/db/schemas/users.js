const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : { type: String },
    lastName : { type: String },
    email : { type: String },
    createDate: { type: Date, default: new Date() },
    salt : { type : String },
    hashedPassword : { type : String },
    isActive : { type : Boolean, default : true },
    userRole : { type : String, default: 'user' }
});

module.exports = mongoose.model('user', userSchema);