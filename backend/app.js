require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
var api = require('./routes/api');
const ToDo = require('./models/ToDo');

app.use(express.json()); 
app.use(express.urlencoded());
app.use(cors());
app.use('/api', api);


mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, function (err) {
    if (err) throw err;
    console.log('Connection to database successful');
});

const db = mongoose.connection; 


app.get('/', function (req, res) {
    ToDo.find({})
    .then(function(toDos) {
        res.send(JSON.stringify(toDos));
    })
});
  
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});