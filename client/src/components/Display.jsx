import React from 'react'

const Display = (props) => {
  let words = props.words;
  let player = props.player; 
  // Spliting the sentences into three parts
    // words we need to type
    // Active word
    // left word we need to type

    function getTypedHandler(){
      
    }
  return (
    <div>
      {getTypedHandler(words,player)}
    </div>
  )
}

export default Display