import React, {useState, useEffect}  from 'react' ;
import socket from '../socket';

const CountdownTimer = (props) => {
    const [timer, setTimer] = useState({countDown: "", message : ""}) ;
    useEffect(() =>{
        socket.on('timer', (data)=>{
            setTimer(data) ;
        });
        socket.on('done', () =>{
            socket.removeListener('timer');
        })
    }, []);

    const {countDown, message} = timer ;
  return (
    <div>
        <h1>{countDown}</h1>
        <h3>{message}</h3>
    </div>
  )
}

export default CountdownTimer ;