const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const noteRouter = require('./routes/noteRouter');
const db = require('./models/db')
const morgan = require('morgan')
app.use(morgan('tiny'));
const cookieParser = require('cookie-parser');
const ngrok = require('ngrok');

// controllers
const userController = require('./controller/userController');

// app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');


app.use(userRouter);
app.use(noteRouter);

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('*', (req, res) => {
    res.redirect('/')
});
let url = process.env.PORT || 3100;

app.listen(url, () => {
    console.log('App Running');
});

