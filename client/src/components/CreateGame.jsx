import React from 'react'
import socket from '../socket'
import {useState} from 'react'

const CreateGame = () => {
  const [userName,setUserName] = useState("");


  function changeHandler(event){
    setUserName(event.target.value);
  }

function submitHandler(event){
  event.preventDefault();
  socket.emit('create-game',userName);
  //now we need to go back to the server side to listen this event
}
  return (
    <div className='container'>
      <div className='grid grid-cols-3'>
        <div className=''></div>
        <div className=' w-2/3'>
          <h1>Create Game</h1>
          <form onSubmit={submitHandler}>
            <div className='group-data'>
              <label htmlFor='userName'>Enter UserName</label>
              <input type='text' name="userName"
                value={userName}
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

export default CreateGame