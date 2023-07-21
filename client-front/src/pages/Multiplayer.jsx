import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Multiplayer = () => {
  // const naviget = useNavigate();
  return (
    <div>

    <NavLink to='/CreateGame'>
        <div>Create Game</div>
    </NavLink>
    <NavLink to='/JoinGame'>
        <button>Join Game</button>
    </NavLink>
    </div>
    
  )
}

export default Multiplayer