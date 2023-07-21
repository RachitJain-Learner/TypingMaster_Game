import React from 'react' ;
import {Redirect} from 'react-router-dom' ;
import StartButton from './StartButton' ;
import Timer from './Timer' ; //CountDown
import socket from '../socket' ;

const findGamer = (gamers) => { 
    return gamers.find(gamer => (
        gamer.socketID === socket.id 
    ));
}

const TypeMaster = ({gameState}) => {
    const {_id, pl} = gameState ;
    const gamer = findGamer(gamers) ;
    if(_id === "")
        return <Redirect to="/" />
    return (
        <div className='text-center'>
            <Timer/>
            <StartButton gamer={gamer} gameId={_id}/>
        </div>
    )
}

export default TypeMaster ;
