const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/user/login');
            } else {
                // console.log(decodedToken);
                req.user=decodedToken.id;
                next();
            }
        });
    } else {
        res.redirect('/user/login');
    }
};



// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};


module.exports = { requireAuth, checkUser};