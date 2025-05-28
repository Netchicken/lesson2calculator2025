import React from "react";

const ButtonKeypad = ({ keyInput }) => {
  let inputButtons = []; //create an array of buttons
  for (let i = 0; i < 10; i++) {
    //add the counter 0,1,2,3,4 to the buttons array
    inputButtons.push(
      <button className="numberbutton" onClick={() => keyInput(i)} key={i}>
        {i}
      </button>
    );
  }
  return (
    <div>{inputButtons}</div> //return back the buttons array
  );
};
export default ButtonKeypad;

//
