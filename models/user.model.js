const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema   = new Schema({
    username : {type:String},
    email : {type:String},  
    password : {type:String},
    address : {type:String},
    mobileNumber : {type:String},
    likes : [{ type : String}],
    notes : [{ type : String}]
})
const User = mongoose.model('User', userSchema);
module.exports = User;