const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.post('/user/register',userController.register)
router.post('/user/login',userController.login)

router.get('/user/register',(req,res)=>{
    res.render('register')
})

router.get('/user/login',(req,res)=>{
    res.render('login')
})

router.get('/user/logout',userController.logout)


module.exports = router;