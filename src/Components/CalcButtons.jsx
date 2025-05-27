import React from 'react'
import { useState } from 'react'
import Inputs from './Inputs'
const CalcButtons = () => {

    const [answer, setAnswer] = useState("")
    const [first, setFirst] = useState(10)
    const [second, setSecond] = useState(22)
  
    //Value = +-/X
    const Calculate = (value) =>{
      console.log(value)
  
   switch (value) {
      case "+":
        setAnswer(Number(first + second)) //Number is need to stop concatination
        break
      case "-":
        setAnswer(first - second)
        break
      case "X":
        setAnswer(first * second)
        break
      case "/":
        setAnswer(first / second)
        break
      default:
        setAnswer("Invalid operation")
    }
    }

  return (
    <div>
      <Inputs first={first} setFirst={setFirst} second={second} setSecond={setSecond} answer={answer}/>
    <div className='calc-box'>
     <p>{first} + {second} = {answer}</p>
     
      <div className='digits'>
        <button className="Singlebutton" onClick={() => Calculate("+")}>+</button>
        <button className="Singlebutton" onClick={() => Calculate("-")}>-</button>
        <button className="Singlebutton"  onClick={() => Calculate("X")}>X</button>
        <button className="Singlebutton"  onClick={() => Calculate("/")}>/</button>
      </div>
    </div>
  </div>
  )
}
export default CalcButtons