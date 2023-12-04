const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    postBlocked: {
        type: Boolean,
        default: false
    },
    // commentsId: [{type: mongoose.Types.ObjectId, ref: 'comment'}] //array of commentIDs
}, {timestamps: true});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
//
//
//
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const CryptoJs = require('crypto-js');

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: [true, 'userName is required'], // error message that will be returned by the database
        min: [2, 'minimum length 2 char'],
        max: [20, 'minimum length 20 char'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email must be unique']
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin']
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    accountActive: {
        type: Boolean,
        default: true
    },
    accountBlocked: {
        type: Boolean,
        default: false
    },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'admin'
    // }
}, {timestamps: true});

// can be .pre('delete' || 'insertMany' || ...)
userSchema.pre('save', function(next) {
    // this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALT)); // bycrypt crashes on vercel
    this.phone = CryptoJs.AES.encrypt(this.phone, process.env.SECRET_KEY).toString();
    next();
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
