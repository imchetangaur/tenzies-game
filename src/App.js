import React from 'react';
import './App.css';
import Die from './Die';
import {nanoid} from "nanoid"

export default function App() {
  const [ dice, setDice ] = React.useState(AllNewDie())
  const [ tenzies, setTenzies ] = React.useState(false)

  React.useEffect(()=>{

    const allHeld = dice.every(die => die.isHeld)

    const firstValue = dice[0].value

    const allValueEqual = dice.every(die => die.value === firstValue)
    
    if(allHeld && allValueEqual){
      setTenzies(true)
      console.log("Yeah You Won :)")
    }
  }, [dice])

  function generateNewDie(){
    return { 
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function AllNewDie() {
    const newDie = []
    for(let i =0 ; i < 10 ; i++){
      newDie.push(generateNewDie())
    }
    return newDie;
  }

  function rollDice() {
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
          die:
          generateNewDie()
      }))
    }
    else {
      setTenzies(false)
      setDice(AllNewDie())
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }
  
  const diceElement = dice.map(die => 
    <Die 
      key={die.id} 
      value= { die.value } 
      isHeld= {die.isHeld}
      holdDice = {()=> holdDice(die.id)}
    /> )

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElement}
      </div>
      <button 
        className="roll-dice" 
        onClick={rollDice} 
      >
        {tenzies ? "NEW GAME" : "ROLL"}
      </button>
    </main>
  );
}
