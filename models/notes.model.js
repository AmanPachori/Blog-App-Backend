const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title : {type:String},
    mainContent : {type:String},
    image: {type:String},
    userId : {type:String},
    username: {type:String},    
    likes :[{
        type:String,
    }],
    category  : [{
        type:String,
    }],
    createdOn : { type : Date , default: Date.now}
    
})

const notes  = mongoose.model('Notes', noteSchema);
module.exports = notes;
