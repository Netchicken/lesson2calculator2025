import { useState } from 'react'
import './App.css'

function App() {
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
    <>
      <div>
      
      </div>
      
    </>
  )
}
export default App
