import React, { useEffect, useState } from 'react'
import './counter.css'

export function Counter() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState([])
  const [colors, setColors] = useState(
    JSON.parse(localStorage.getItem('colors') || '[]')
  )

  const handleAddColor = () => {
    setColors([...colors, color])
  }
  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(colors))
  }, [handleAddColor])

  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)

  const handleSubtractOne = () => {
    setCount(count - 1)
  }
  const handleAddOne = () => {
    setCount(count + 1)
  }
  const resetCounter = () => {
    setCount(0)
    setColors([])
    localStorage.clear()
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

        <div
          style={count != 0 ? { color: color } : { color: null }}
          className='color'>
          {count == 0 ? null : color}
        </div>
      </div>
      <div>
        <span>Choose wich color you wanna pick 😁</span>
      </div>
      <div className='choose-btn-container'>
        {count !== 0 ? (
          <button className='choose-btn' onClick={handleAddColor}>
            Choose color
          </button>
        ) : null}
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
        Reset
      </button>
    </div>
  )
}
