const express = require('express');
const mongoose= require('mongoose');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: false }));
const userRoutes = require('./routes/route');

app.use(cors());
app.use(userRoutes);


mongoose
.connect(process.env.DB_CONN)
.then(result=>{
    console.log("connected");
    app.listen(4000);
    
}).catch(err=>{
    console.log(err);
})