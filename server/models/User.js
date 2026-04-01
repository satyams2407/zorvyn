const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ROLES, STATUS } = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim: true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim: true,
    }, 
    password : {
        type : String,
        required : true,
        minlength : 6,
        select : false,
    }, 
    role : {
        type : String,
        enume : Object.values(ROLES),
        default : ROLES.USER,
    }, 
    status : {
        type : String,
        enum : Object.values(STATUS),
        default : STATUS.ACTIVE,
    },
}, {timestamps : true});

module.exports = mongoose.model('User', userSchema);