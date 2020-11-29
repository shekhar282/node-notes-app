const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    email: {
        type: String,
        unique: [true, 'Email already registered'],
        required: [true, 'Email required'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password required']
    }
})


userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8);
    next();
});


userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;