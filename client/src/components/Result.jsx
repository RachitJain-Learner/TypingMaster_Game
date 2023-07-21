import React from 'react'

const Result = ({correctArray}) => {
  return (
    <div>
      <div>
        Result Hai jii ye to 
        correcWords : {correctArray.filter(Boolean).length};
      </div>
    </div>
  )
}

export default Result