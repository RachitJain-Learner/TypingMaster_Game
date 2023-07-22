const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    currentWordIndex:{
        type: Number,
        default : 0
    },
    socketID:{
        type:String,
    },
    isStartingPlayer : {
        type: Boolean,
        default: false
    },
    speed:{
        type: Number,
        default: -1,
    },
    userName:{
        type: String,
    }
});

const GameSchema = new mongoose.Schema({
    words : [{type: String}],
    isStart : {
        type : Boolean,
        default : true 
    },
    isComplete : {
        type : Boolean,
        default : false
    }, 
    players : [PlayerSchema],    //players
    startTime : {type : Number}
}) ;

module.exports = mongoose.model('Game', GameSchema); 
