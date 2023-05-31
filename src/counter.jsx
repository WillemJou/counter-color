import React, { useState } from 'react'
import './counter.css'

export function Counter() {
  const [count, setCount] = useState(0)
  const [colors, setColor] = useState('Counting to color')
  // const [palette, setPalette] = useState([
  //   { nom: color },
  //   { nom: color },
  //   { nom: color },
  // ])
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)

  const saveColors = () => {
    localStorage.setItem('colors', JSON.stringify(colors))
  }
  const getColors = () => {
    const color = localStorage.getItem('colors')
    color == null ? [] : JSON.parse(color)
  }

  const addColor = () => {
    const color = getColors()
    color.push(colors)
    saveColors(color)
  }
  const handleSubtractOne = () => {
    setCount(count - 1)
  }
  const handleAddOne = () => {
    setCount(count + 1)
  }
  const resetCounter = () => {
    setCount(0)
    setColor('Counting to color')
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
          style={count != 0 ? { color: colors } : { color: null }}>
          {count}
        </div>

        <div
          style={count != 0 ? { color: colors } : { color: null }}
          className='color'>
          {count == 0 ? null : colors}
        </div>
      </div>
      <div>
        <span>Choose wich color you wanna pick 😁</span>
      </div>
      <div className='choose-btn-container'>
        {count !== 0 ? (
          <button className='choose-btn' onClick={addColor}>
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
