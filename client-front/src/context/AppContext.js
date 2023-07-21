import { createContext,useRef } from "react";
import { useEffect,useState } from "react";
import data from '../data.json';

export const AppContext = createContext();

function AppContextProvider({children}){
  
  // const API_URL = "https://api.quotable.io/random";
  const [loading,setLoading] = useState(false);
  const [text,setText] = useState([]);
  const [currentWordId,setCurrentWordId] = useState(0);
  const data2 = useRef(data);


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomSubset(response) {
    const length = getRandomInt(1, 50); 
    const shuffled = response.slice(); // Create a copy of the original array

  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, length); // Return the first 'length' elements as the random subset
}

 function fetchTextData(){
      let response = data2.current.easy;
      const randomSubset = getRandomSubset(response);
      setText(randomSubset);
  
  }

  useEffect(()=>{
    fetchTextData();
  },[]);
  
  const value = {
    loading,
    setLoading,
    text,
    setText,
    fetchTextData,
    setCurrentWordId,
    currentWordId   
  }

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
}

export default AppContextProvider;