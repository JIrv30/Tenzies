import { useState, useEffect} from 'react'
import React from 'react'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollNumber, setRollNumber] = useState(0)
  

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld === true)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
      localStorage.getItem('bestNumber')>rollNumber ?
      localStorage.setItem('bestNumber',rollNumber) : localStorage.setItem('bestNumber', localStorage.getItem('bestNumber'))
      
    }
  }, [dice])

  function generateNewDie () {
    return {
      value: Math.floor(Math.random()*6)+1,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice () {
    let dice = [];
      for (let i=0; i<10; i++){
        dice.push(generateNewDie())
      }
    return dice;
  }

  

  function reRoll () {
    if(!tenzies) {
      setDice(prevDice =>prevDice.map(die => {
      return die.isHeld ? 
      die : 
      generateNewDie()
      }))
      setRollNumber(prevRollNumber => prevRollNumber+1)
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setRollNumber(0)
    }     
  }

  function holdDice (id) {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id===id ? {...die, isHeld: !die.isHeld} : die
      })
    })

  }

  const diceElements = dice.map(item=> (
  <Die 
  key={item.id} 
  value={item.value}
  held={item.isHeld}
  holdDice={()=>holdDice(item.id)} 
  />))

  return (
    <>
      <div className='main'>
        {tenzies && <Confetti />}
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
        <div className='dice-container'>
        {diceElements}
        </div>
        <button 
        className='roll-dice'
        onClick={reRoll}> {tenzies ? 'New Game' : 'Roll'} </button>
        <div className='roll-number'>
          <div className='thing'>Roll number: {rollNumber} </div>
          <div className='thing'>Best: {localStorage.getItem('bestNumber')} </div>
        </div>
      </div>
    </>
  )
}

export default App
