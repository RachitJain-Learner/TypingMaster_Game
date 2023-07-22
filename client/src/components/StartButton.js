import React, {useState} from 'react';
import socket from '../socket';

const StartButton = ({player, gameID}) => {
    const [displayBtn, setDisplayBtn] = useState(true) ;
    const {isStartingPlayer} = player ;

    const onClickHandler = (event) =>{
        socket.emit('timer', {playerID : player._id, gameID});
        setDisplayBtn(false);
    }

    return(
        isStartingPlayer && displayBtn ? <button type="button"
                                                    onClick={onClickHandler}
                                                    className=''> Start Game </button>
                                                    : null
    )                           
}

export default StartButton ;