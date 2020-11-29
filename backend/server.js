//imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//see file: .env ; Imported as [npm install dotenv]
require('dotenv').config();

//epxress
const app = express();
const port = process.env.PORT || 5000;

//cors is an express thingy
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI; // from .env

mongoose.connect(uri, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;


//how do promises work?: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise 
connection.once('open', () =>{ // *once it has made the connection*
    console.log("MongoDB database connection established succesfully");
    console.log(connection.port + " : " + connection.name);
}).on('error', err =>{
    console.log("ERROR Failed Connection: " + err);
}).on('disconnected', err=> {
    console.log("Disconnected from DB: " + err);
}).on('reconnected', err => {
    console.log("Reconnected to DB: " + err);
})

//routes , controlling over models in /models
const threadRouter = require('./routes/thread');
const post_threadRouter = require('./routes/post_thread');
const worldRouter = require('./routes/world');

//when someone goes to /reply , it goes to everything in the replyRouter
app.use('/thread', threadRouter);
app.use('/post_thread', post_threadRouter)
app.use('/world', worldRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    console.log("Host:" + app.host);
});
