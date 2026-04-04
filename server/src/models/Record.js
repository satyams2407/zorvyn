const mongoose = require('mongoose');

const Record = new mongoose.Schema({
    amount : {
        type : Number,
        required : true,
        min : 0,
    },
    type : {
        type : String,
        required : true,
        enum : ['income', 'expense'],
    },
    category : {
        type : String,
        required : true,
        trim: true,
    }, 
    date : {
        type : Date,
        required : true,
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    }
},
{timestamps : true});

module.exports = mongoose.model('Record', Record);