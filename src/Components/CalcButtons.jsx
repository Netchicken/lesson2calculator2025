import React from "react";
import { useState } from "react";
import Inputs from "./Inputs";
import SingleButton from "./SingleButton";
import ButtonKeypad from "./ButtonKeypad";
import { evaluate } from "mathjs";

const CalcButtons = () => {
  const [answer, setAnswer] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  //create a trigger function to move from first to second number
  const [trigger, setTrigger] = useState(false);
  //what operation are we using?  +-/*
  const [symbolUsed, setSymbolUsed] = useState("");
  //save the operation we use to calculate
  let symbols = ["+", "-", "/", "*"];

  //we are passing in the value of the button pressed
  const keyInput = (value) => {
    console.log(value + " " + trigger);

    if (trigger === false) {
      setFirst(Number(first + String(value))); //concatenate the numbers then save as number
      console.log("first value", value);
    }

    if (trigger === true) {
      setSecond(Number(second + String(value))); //concatenate the numbers then save as number
    }
  };

  //Value = +-/X
  //runs every time you hit the symbol button
  const Calculate = (value) => {
    console.log(value);

    if (symbols.includes(value)) {
      //yay its  a symbol
      setSymbolUsed(value); //save it to use below
    }

    if (value === "DEL") {
      //delete the last digit
      if (trigger === false) {
        const newFirstValue = String(first).slice(0, -1);
        console.log("del first value", Number(newFirstValue));
        setFirst(Number(newFirstValue)); // convert to number or empty string
      } else {
        const newSecondValue = String(second).slice(0, -1);
        console.log("del first value", Number(newSecondValue));
        setSecond(newSecondValue === "" ? "" : Number(newSecondValue)); // convert to number or empty string
      }
    }
    setTrigger(true);
    // console.log("trigger run", value + " " + trigger);

    if (value === "=") {
      console.log("Calculation   ", first + " " + symbolUsed + " " + second);
      setAnswer(evaluate(`${first} ${symbolUsed} ${second}`));
    }
    if (value === "C") {
      //clear everything
      setFirst("");
      setSecond("");
      setAnswer("");
      setSymbolUsed("");
      setTrigger(false);
    }
  };

  return (
    <div>
      <Inputs
        first={first}
        setFirst={setFirst}
        second={second}
        setSecond={setSecond}
        answer={answer}
      />
      <div className="calc-box">
        <p>
          {first} {symbolUsed} {second} = {answer}
        </p>

        <div className="digits">
          <SingleButton symbol="+" Calculate={Calculate}></SingleButton>
          <SingleButton symbol="-" Calculate={Calculate}></SingleButton>
          <SingleButton symbol="/" Calculate={Calculate}></SingleButton>
          <SingleButton symbol="X" Calculate={Calculate}></SingleButton>
          <SingleButton symbol="=" Calculate={Calculate}></SingleButton>
          <SingleButton symbol="C" Calculate={Calculate}></SingleButton>
          <SingleButton symbol="DEL" Calculate={Calculate}></SingleButton>
        </div>
        <ButtonKeypad keyInput={keyInput} />
      </div>
    </div>
  );
};
export default CalcButtons;
