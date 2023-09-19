import React, { useEffect, useState } from 'react'
import Link from './link'

export function Counter() {
  // use state HOOKS
  const [count, setCount] = useState(0)
  const [color, setColor] = useState([])
  const [colors, setColors] = useState(
    JSON.parse(sessionStorage.getItem('colors') || '[]')
  )
  const [palette, setPalette] = useState(
    JSON.parse(localStorage.getItem('palette') || '[]')
  )
  const [deleteColor, setDeleteColor] = useState(colors)
  const [showPopup, setShowPopup] = useState(false)

  const maximumLength = (item) => {
    item.splice(3, 1)
  }
  const handleAddColor = () => {
    setColors([...colors, color])
  }
  const handleAddPalette = () => {
    setPalette([...palette, ...colors])
    sessionStorage.clear()
    setColors([])
  }
  const handleShowPopup = () => {
    setShowPopup(true),
      setTimeout(() => {
        setShowPopup(false)
      }, 1000)
  }

  // Trouver une solution plus dynamique
  const copyColorText = (e) => {
    let id = e.target.id
    id === 'hexacolor-1'
      ? navigator.clipboard.writeText(JSON.stringify(colors[0]).slice(1, -1))
      : id === 'hexacolor-2'
      ? navigator.clipboard.writeText(JSON.stringify(colors[1]).slice(1, -1))
      : id === 'hexacolor-3'
      ? navigator.clipboard.writeText(JSON.stringify(colors[2]).slice(1, -1))
      : null
  }

  const clickHandler = (e) => {
    handleShowPopup()
    copyColorText(e)
  }

  // Trouver une solution plus dynamique
  const removeColor = (e) => {
    let id = e.target.id
    id === 'close-btn-1'
      ? setDeleteColor(colors.splice(0, 1), palette.splice(0, 1))
      : id === 'close-btn-2'
      ? setDeleteColor(colors.splice(1, 1), palette.splice(1, 1))
      : id === 'close-btn-3'
      ? setDeleteColor(colors.splice(2, 1), palette.splice(2, 1))
      : null
  }

  // use effect HOOKS
  useEffect(() => {
    maximumLength(colors)
    sessionStorage.setItem('colors', JSON.stringify(colors))
  }, [handleAddColor])

  useEffect(() => {
    localStorage.setItem('palette', JSON.stringify(palette))
  }, [handleAddPalette])

  useEffect(() => {
    deleteColor
  }, [removeColor])

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
    sessionStorage.clear()
  }
  const changeColor = () => {
    setColor(randomColor)
  }
  console.log(colors)
  console.log(palette)
  return (
    <>
      <div className='counter-container'>
        <div className='number-container'>
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
          <span>
            Choose your random color by counting and colorizing the world 😁
          </span>
        </div>
        <div className='choose-btn-container'>
          {count !== 0 ? (
            <button className='btn choose-btn' onClick={handleAddColor}>
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
        <button className='btn reset-btn' onClick={resetCounter}>
          Reset
        </button>
      </div>
      {localStorage.length >= 1 ? (
        <Link href='/pallets' className='see-palette-btn'>
          See your pallets
        </Link>
      ) : null}
      <div className='palette-container'>
        {colors.length ? (
          <div
            className='first-color-palette'
            style={{ backgroundColor: colors[0] }}>
            <button
              className='btn close-btn'
              id='close-btn-1'
              onClick={removeColor}>
              x
            </button>
            <div className='color-code-container'>
              <span
                id='hexacolor-1'
                className='color-code'
                onClick={clickHandler}>
                {colors[0]}
              </span>
            </div>
          </div>
        ) : null}
        {colors.length > 1 ? (
          <div
            className='second-color-palette'
            style={{ backgroundColor: colors[1] }}>
            <button
              className='btn close-btn'
              id='close-btn-2'
              onClick={removeColor}>
              x
            </button>
            <div className='color-code-container'>
              <span
                id='hexacolor-2'
                className='color-code'
                onClick={clickHandler}>
                {colors[1]}
              </span>
            </div>
          </div>
        ) : null}
        {colors.length > 2 ? (
          <>
            <button
              href='/pallets'
              onClick={() => handleAddPalette()}
              className='btn save-palette-btn'>
              Would you save this palette ?
            </button>
            <div
              className='third-color-palette'
              style={{ backgroundColor: colors[2] }}>
              <button
                className='btn close-btn'
                id='close-btn-3'
                onClick={removeColor}>
                x
              </button>
              <div className='color-code-container'>
                <span
                  id='hexacolor-3'
                  className='color-code'
                  onClick={clickHandler}>
                  {colors[2]}
                </span>
              </div>
            </div>
          </>
        ) : null}
        {showPopup && <span className='copy-popup'>Copied 👍</span>}
      </div>
    </>
  )
}
