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
// const { default: CountdownTimer } = require('./client/src/components/CountdownTimer');

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
    socket.on('create-game', async(name)=>{
        try{
            const fetchData = await textAPI();
            let game = new Game();
            game.words = fetchData ;
            let player = {
                socketID : socket.id,
                isStartingPlayer : true,
                name
            }
            game.players.push(player) ;
            game = await game.save();

            const gameID = game._id.toString();
            socket.join(gameID);
            io.to(gameID).emit('updateGame', game);

        }   
        catch(err){
            console.log(err);
        }

    });

    socket.on('timer', async({gameID, playerID})=>{
        let countDown = 5 ;
        let game = await Game.findById(gameID);
        let player = game.gamers.id(playerID) ;
        if(player.isStartingPlayer){
            let timerID = setInterval(async() =>{
                if(countDown >= 0){
                    io.to(gameID).emit('timer', {countDown, message: "Starting Game"});
                    countDown--;
                }
                else{
                    game.isStart = false ;
                    game = await game.save();
                    io.to(gameID).emit('updateGame', game);
                    startGameClock(gameID);
                    clearInterval(timerID);
                }
            }, 1000);
        }
    });

    console.log('User connected');
    socket.emit('test', 'Server with socket connection started');
    socket.on('disconnect', () => {
        console.log('User disconnected');
      });
});


const startGameClock = async(gameID) => {
    let game = await Game.findById(gameID);
    game.startTime = new Date().getTime() ;
    game = await game.save();
    let time = 120 ;
    
    let timerID = setInterval(function gameIntervalFunc(){
        const formatTime = calculateTime(time);
        if(time >= 0){
            io.to(gameID).emit('timer', {
                countDown : formatTime,
                message : "Time Remaining"
            });
            time-- ;
        }
        else{
            (async () => {
                let endTime = new Date().getTime() ;
                let game = await Game.findById(gameID);
                let {startTime} = game ;
                game.isComplete = true ;
                game.gamers.forEach((gamer, index) => {
                    if(gamer.speed === -1){
                        game.players[index].speed = calculateWPM(endTime, startTime, player);
                    }
                });
                game = await game.save() ;
                io.to(gameID).emit('updateGame', game);
                clearInterval(timerID) ;
            })()
        }
        return gameIntervalFunc ;
    }(), 1000);
}

const calculateTime = (time) => {
    let minutes = Math.floor(time / 60) ;
    let seconds = time % 60 ;
    return `${minutes}: ${seconds < 10 ? "0" + seconds : seconds }`;
} 

const calculateWPM = (endTime, startTime, player) => {
    let numOfWords = player.currentWordIndex ;
    const timeInSeconds = (endTime - startTime) / 1000 ;
    const timeInMinutes = timeInSeconds / 60 ;
    const WPM = Math.floor(numOfWords / timeInMinutes) ;
    return WPM ;
}