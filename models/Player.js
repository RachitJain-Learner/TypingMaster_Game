const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    currentWordIndex:{
        type: Number,
        required:true,
        default : 0
    },
    socketID:{
        type:String,
        required:true,
    },
    isStartingPlayer : {
        type: Boolean,
        default: false
    },
    speed:{
        type: Number,
        default: -1,
    },
    name:{
        type: String,
        required: true,
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
    gamers : [PlayerSchema],    //players
    startTime : {type : Number}
}) ;

module.exports = mongoose.model("Player", PlayerSchema);
module.exports = mongoose.model("Game", GameSchema); 