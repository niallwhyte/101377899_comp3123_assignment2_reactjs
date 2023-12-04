const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        maxlength: [50, 'Username must be less than 50 characters'],
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        maxlength:[50, 'Password excceds 50 characters'],
    }
});

UserSchema.pre('save', async function(next){
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }

    next();
});
const User = mongoose.model("User", UserSchema)
module.exports = User;