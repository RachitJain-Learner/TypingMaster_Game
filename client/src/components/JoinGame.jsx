import React from 'react'
import socket from '../socket'
import {useState} from 'react'

const JoinGame = (props) => {
  const [userInput,setUserInput] = useState({gameID:"", userName:""});

  function changeHandler(event){
    setUserInput({
      ...userInput,[event.target.name]: event.target.value 
    });
  }

function submitHandler(event){
  event.preventDefault();
  console.log(userInput);
  socket.emit('join-game',userInput);
  //now we need to go back to the server side to listen this event
}
  return (
    <div className='container'>
      <div className='grid grid-cols-3'>
        <div className=''></div>
        <div className=' w-2/3'>
          <h1>Join Game</h1>
          <form onSubmit={submitHandler}>
            <div className='group-data'>
              <label htmlFor='gameID'>Enter Game ID</label>
              <input type='text' name="gameID"
                value={userInput.gameID}
                onChange={changeHandler}
                placeholder='Enter GameID'
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />

<label htmlFor='userName'>Enter User Name</label>
              <input type='text' name="userName"
                value={userInput.userName}
                onChange={changeHandler}
                placeholder='Enter UserName'
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>
            <button type="submit" className=''>Submit</button>
          </form>
        </div>
        <div className=''></div>
      </div>
    </div>
  )
}

export default JoinGame