const mongoose = require('mongoose');
const empSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required:true 
    },
    position: {
        type:String,
        default: "not stated"
    },
    salary: {
        type: Number,
        default: "not stated"
    },
    date_of_joining: {
        type: Date,
        default: "not stated"
    },
    department: {
        type:String,
        default: "not stated"
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Employee', empSchema);
