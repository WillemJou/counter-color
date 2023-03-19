import React, { useState } from 'react'
import './counter.css'

export function Counter() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState('Counting to color')
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)

  const handleSubtractOne = () => {
    setCount(count - 1)
  }
  const handleAddOne = () => {
    setCount(count + 1)
  }
  const resetCounter = () => {
    setCount(0)
    setColor('Counting to color')
  }
  const changeColor = () => {
    setColor(randomColor)
  }
  return (
    <div className='main-container'>
      <div className='count-container'>
        <div
          className='count'
          style={count != 0 ? { color: color } : { color: null }}>
          {count}
        </div>
        <div className='color'>{count == 0 ? 'counting to color' : color}</div>
      </div>
      <div className='iteration-container'>
        <button
          className='btn'
          onClick={() => {
            handleSubtractOne()
            changeColor()
          }}>
          -1
        </button>
        <button
          className='btn'
          onClick={() => {
            handleAddOne()
            changeColor()
          }}>
          +1
        </button>
      </div>
      <button className='' onClick={resetCounter}>
        Reset counter
      </button>
    </div>
  )
}
