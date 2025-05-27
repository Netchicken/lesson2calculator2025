import React from 'react'

const SingleButton = ({symbol, Calculate}) => {
  return (
    <span>
         <button className="Singlebutton" onClick={() => Calculate(symbol)}>{symbol}</button>
    </span>
  )
}
export default SingleButton