import React, { useState } from 'react'
import './ProgressBar.css'


function ProgressBar({
    wordsLeft,
    jpcore
}) {

    const progress = jpcore.length - wordsLeft.length
    // const [progress, setProgress] = useState();

    const style = {
        width: `${progress}%`,
        height: "10px",
        backgroundColor: "rgb(100, 250, 120)",
        borderRadius: "5px",
        padding: "0",
    }
    

  return (
    <div 
        className='progress-bar'
    >
        <div className='actual-progress' style={style}></div>
    </div>
  )
}

export default ProgressBar