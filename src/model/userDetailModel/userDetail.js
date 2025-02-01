let mongoose = require('mongoose')

let userDetail = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    type: {
        type: String, 
        enum: ['Owner', 'Business'], 
        required: true
    },    
    country:{
        type: String,
        require: true,
        trim: true
    },
    state:{
        type: String,
        require: true,
        trim: true
    },
    city: {
        type: String,
        require: true,
        trim: true
    },
    address:{
        type: String,
        require: true,
        trim: true
    },
    openingTime: {
        type: String,
        require: true,
    },
    closingTime:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        trim: true,
    },
    mobileNumber:{
        type: Number,
        require: true,
        trim: true
    },
    emailOtp: {
        type: Number,
        trim: true
    },
    mobileOtp: {
        type: Number,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

module.exports = mongoose.model('users', userDetail)