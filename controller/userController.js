const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'secret', {
        expiresIn: maxAge
    });
};

const register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (error) {
        res.status(401).json({ error})
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (error) {
        res.status(401).json({ error});
    }

}

const logout = (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}


module.exports = {
    register,
    login,
    logout,
}