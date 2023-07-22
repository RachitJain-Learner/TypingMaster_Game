import React from 'react' ;
import {useNavigate} from 'react-router-dom' ;
import StartButton from './StartButton' ;
import CountdownTimer from './CountdownTimer' ; //CountDown
import socket from '../socket' ;

const findGamer = players => { 
    return players.find(player => 
        player.socketID === socket.id 
    );
}

const TypeMaster = ({gameState}) => {
    const navigate = useNavigate();
      
    const {_id, players} = gameState ;
    const player = findGamer(players) ;
    if(_id === "")
        navigate('/')  ; //
    return (
        <div className='text-center'>
            <CountdownTimer/>
            <StartButton player={player} gameId={_id}/>
        </div>
    )
}

export default TypeMaster ;
