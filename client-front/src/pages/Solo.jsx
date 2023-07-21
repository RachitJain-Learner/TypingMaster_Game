import React, { useEffect } from "react";
import { useContext, useState,useRef } from "react";
import {useNavigate} from 'react-router-dom'
import { AppContext } from "../context/AppContext";
import '../index.css';
import Word from '../components/Word'
import Timer from '../components/Timer'
import Result from '../components/Result'

const Solo = () => {
  const { loading, text, fetchTextData, currentWordId, setCurrentWordId } =
    useContext(AppContext);
  const [userInput, setUserInput] = useState("");
  const [correctArray,setCorrectArray] = useState([]);
  const [startCount,setStartCount] = useState(false);
  const data = useRef(text);
  const navigate = useNavigate();

  function checkHandler(value) {
    if(currentWordId === data.current.length){
      return (
        <div>
          <Result/>
        </div>
      );
    }
    if(!startCount){
      setStartCount(true); 
    }
    if (value.endsWith(' ')) {
      // the user has finished this word
      if(currentWordId === data.current.length-1){
        setStartCount(false);
        setUserInput('Finished');
      }else{
        setUserInput(' ');
      }

      setCurrentWordId(ind => ind + 1);
      setCorrectArray(prev=>{
        const word = value.trim()
        let dummy = [...prev] 
        dummy[currentWordId] = word === data.current[currentWordId]
        return dummy;
      })
   
    } else {
      setUserInput(value);
    }
  }
  function clickHandler() {
    fetchTextData();
  }
  return (
    <div>
      <h1>Start Practicing</h1>
      <Timer startCount={startCount} 
        correcWords={correctArray.filter(Boolean).length}
      />
      <div>
        {text?.map((word, ind) => {
          return<Word 
           word={word}
          active = {ind === currentWordId} 
          correct = {correctArray[ind]}
           />
        })}
      </div>
      <input
        type="text"
        className="border-2 border-gray-700"
        value={userInput}
        onChange={(event) => checkHandler(event.target.value)}
      />
      <br />
      <button onClick={clickHandler}>Start</button>
    </div>
  );
};

export default Solo;
