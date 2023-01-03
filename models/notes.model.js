const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');
const date = moment.tz(Date.now(), "Asia/Kolkata").format('DD-MM-YYYY HH:mm')

const noteSchema = new Schema({
    title : {type:String},
    mainContent : {type:String},
    image: {type:String},
    userId : {type:String},
    likes :[{
        type:String,
    }],
    category  : [{
        type:String,
    }],
    createdOn : { type : String , default: date}
    
})

const notes  = mongoose.model('Notes', noteSchema);
module.exports = notes;
