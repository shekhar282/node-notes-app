const mongoose = require('mongoose')

const dbURI = 'mongodb://localhost:27017/node-notes-app';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => console.log('mongoDB connected'))
    .catch((err) => console.log(err));