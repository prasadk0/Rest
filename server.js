const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
app = express();
const mongoose = require('mongoose');
 const router = require('./routes/index');
 
mongoose.connect('mongodb://localhost/Users',()=>{
    console.log("connection Successful");
})



 app.use(express.json());
// express.json();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api',router);



app.use(errorHandler);
app.listen(5000,()=>{
    console.log("listening to the port");
})