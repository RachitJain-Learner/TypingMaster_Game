import React,{ useRef,useEffect } from "react";


export default function Word({word,correct,active}) {

   if(correct === true){
    return <span className="correct">{word} </span>
   }
   if(correct === false){
    return <span className="incorrect">{word} </span>
   }
   if(active){
    return <span className="active">{word} </span>
   }  
   return <span>{word} </span>
}

Word = React.memo(Word);
