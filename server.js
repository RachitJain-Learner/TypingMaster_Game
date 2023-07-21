const express = require('express');
const app = express() ;
const mongoose = require('mongoose');
const socketio = require('socket.io') ;

// const cors = require('cors');

// app.use(cors()) ;

const port = 4000 ;
//server activated on port 4000 
const server = app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});

const io = socketio(server, {
    cors:{
        origin:'http://localhost:3000'
    }
}) ;

const Game = require('./models/Player');
const textAPI = require('./utility/api');

//adding middleware
app.use(express.json());
/*
//Route
// creating route through get request
app.get('/', (req, res)=>{
    res.send("My FIRST Server Started !!");
});

// POST request => required body parser
app.post('/api/cars', (request, response)=>{
    const {name, brand} = request.body ; //destructuring
    console.log(`${name} : ${brand}`);
    // console.log(brand);
    response.send("Car data submitted Successfully.")
});

*/
// mongoose.connect('mongodb://127.0.0.1:27017/mydatabase' , {
mongoose.connect('mongodb://127.0.0.1:27017/userDatabase' , { //imp
    useNewUrlParser:true,       //configurations required
    useUnifiedTopology:true
})      //this is a promise => resolve & reject
.then(() => {console.log("Connection Successfull")})
.catch((error) => {console.log("Received an error")});

io.on('connect', (socket)=>{
    console.log('User connected');
    socket.emit('test', 'Server with socket connection started');
    socket.on('disconnect', () => {
        console.log('User disconnected');
      });
});

