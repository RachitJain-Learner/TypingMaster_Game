import React, {useState, useEffect}  from 'react' ;
import socket from '../socket';

const CountdownTimer = (props) => {
    const [timer, setTimer] = useState({countDown: "", msg : ""}) ;
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
        <h1>{CountdownTimer}</h1>
        <h3>{message}</h3>
    </div>
  )
}

export default CountdownTimer ;