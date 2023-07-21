import React, { useState,useEffect } from 'react'

const Timer = ({startCount,setStartCount,correcWords}) => {

  const [timePassed,setTimePassed] = useState(0);

  useEffect(()=>{
    let time;
    if(startCount){
          // timer has to re render every second 
     time = setInterval(()=>{
        setTimePassed(prevTime => prevTime+1);
      },1000)
    }

    return () => {
      clearInterval(time)
    }
  },[startCount])

  const minutes = timePassed/60;
  return (
    <div>
    <div>Time: {timePassed}</div>
    <div>Speed : {((correcWords/minutes) || 0).toFixed(2)} WPM </div>
    </div>
  )
}

export default Timer