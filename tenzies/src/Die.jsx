import React from 'react'


function Die (props) {
  const styles ={
    backgroundColor: props.held ? '#59E391' : 'white'
  }
  
  return (
    <div 
    className='die-container'
    style={styles}
    onClick={props.holdDice}
    >{props.value}
    </div>
    
  )
}

export default Die