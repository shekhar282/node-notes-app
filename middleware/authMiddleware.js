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


module.exports = { requireAuth};