const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema   = new Schema({
    username : {type:String},
    email : {type:String},  
    password : {type:String},
    address : {type:String},
    image : {type:String,
    default:"https://xsgames.co/randomusers/assets/images/favicon.png"},
    mobileNumber : {type:String},
    likes : [{ type : String}],
    notes : [{ type : String}]
})
const User = mongoose.model('User', userSchema);
module.exports = User;