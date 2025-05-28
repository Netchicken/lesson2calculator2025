import React, { useState } from "react";
import Inputs from "./Inputs";
import SingleButton from "./SingleButton";
import ButtonKeypad from "./ButtonKeypad";
import { evaluate } from "mathjs";

//USE CTRL F2 TO SELECT MULTIPLE INSTANCES
const CalcButtonsNew = () => {
  // Use a single state object for all calculator values
  const [calc, setCalc] = useState({
    first: "",
    second: "",
    operator: "",
    answer: "",
    trigger: false, // tracks if we're entering the second number
  });

  // List of valid operators
  const symbols = ["+", "-", "/", "*", "X"];

  //prev keeps the previous state, allowing us to update only the necessary fields
  //here we input the entire prev state and only change the fields we need to update

  // Handle number button presses
  const keyInput = (value) => {
    setCalc((prev) => {
      if (!prev.trigger) {
        // Append digit to first number
        return { ...prev, first: prev.first + value };
      } else {
        // Append digit to second number
        return { ...prev, second: prev.second + value };
      }
    });
  };

  // Handle operator and special button presses
  const Calculate = (value) => {
    // If an operator is pressed, set the operator and switch to second number
    if (symbols.includes(value)) {
      setCalc((prev) => ({
        ...prev,
        operator: value === "X" ? "*" : value, // Use * for multiplication
        trigger: true,
      }));
      return;
    }

    // Delete last digit from the current number
    if (value === "DEL") {
      setCalc((prev) => {
        if (!prev.trigger) {
          return { ...prev, first: prev.first.slice(0, -1) };
        } else {
          return { ...prev, second: prev.second.slice(0, -1) };
        }
      });
      return;
    }

    // Evaluate the expression when "=" is pressed
    if (value === "=") {
      setCalc((prev) => {
        if (prev.first && prev.operator && prev.second) {
          try {
            const result = evaluate(
              `${prev.first} ${prev.operator} ${prev.second}`
            );
            return { ...prev, answer: result };
          } catch {
            return { ...prev, answer: "Error" };
          }
        }
        return prev;
      });
      return;
    }

    // Clear all values when "C" is pressed
    if (value === "C") {
      setCalc({
        first: "",
        second: "",
        operator: "",
        answer: "",
        trigger: false,
      });
      return;
    }
  };

  return (
    <div>
      {/* Display input and answer */}
      <Inputs
        first={calc.first}
        setFirst={(val) => setCalc((prev) => ({ ...prev, first: val }))}
        second={calc.second}
        setSecond={(val) => setCalc((prev) => ({ ...prev, second: val }))}
        answer={calc.answer}
      />
      <div className="calc-box">
        <p>
          {calc.first} {calc.operator === "*" ? "X" : calc.operator}{" "}
          {calc.second} = {calc.answer}
        </p>
        {/* Operator and special buttons */}
        <div className="digits">
          <SingleButton symbol="+" Calculate={Calculate} />
          <SingleButton symbol="-" Calculate={Calculate} />
          <SingleButton symbol="/" Calculate={Calculate} />
          <SingleButton symbol="X" Calculate={Calculate} />
          <SingleButton symbol="=" Calculate={Calculate} />
          <SingleButton symbol="C" Calculate={Calculate} />
          <SingleButton symbol="DEL" Calculate={Calculate} />
        </div>
        {/* Number keypad */}
        <ButtonKeypad keyInput={keyInput} />
      </div>
    </div>
  );
};

export default CalcButtonsNew;
