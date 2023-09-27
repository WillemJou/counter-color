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
  const [showCopiedPopup, setShowCopiedPopup] = useState(false)
  const [showLimitPopup, setShowLimitPopup] = useState(false)

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
  const handleShowCopiedPopup = () => {
    setShowCopiedPopup(true)
    setTimeout(() => {
      setShowCopiedPopup(false)
    }, 1000)
  }
  const handleShowLimitPopup = () => {
    setShowLimitPopup(true)
    setTimeout(() => {
      setShowLimitPopup(false)
    }, 2500)
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

  const clickHandleCopy = (e) => {
    handleShowCopiedPopup()
    copyColorText(e)
  }
  const clickHandleLimit = () => {
    handleShowLimitPopup()
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
  return (
    <>
      <div className='container space-y-9'>
        <div className='space-y-6'>
          <h1 className='text-2xl border-b-4 mt-9'>
            Choose your random color by counting and colorizing the world 😁
          </h1>
          {palette.length > 2 ? (
            <Link href='/pallets'>See your pallets</Link>
          ) : null}
          <div className='flex space-x-14'>
            <div className=' flex text-2xl space-x-3'>
              <span className='text-6xl'>{count}</span>
              <div className='text-lg'>{count == 0 ? null : color}</div>
            </div>
            {count !== 0
              ? [
                  <button
                    key={'key1'}
                    onClick={() => {
                      handleAddColor(), clickHandleLimit()
                    }}>
                    Choose this color
                  </button>,
                  <div
                    key={'key2'}
                    className='w-full'
                    style={{ backgroundColor: color }}></div>,
                ]
              : null}
          </div>
          {showLimitPopup && colors.length > 3 && (
            <div className='flex justify-center'>
              <span className=' text-red-400 border-b-2 border-red-500'>
                Sorry, you can only create a 3 colors palette
              </span>
            </div>
          )}
          <div className='flex space-x-4 text-xl'>
            <button
              onClick={() => {
                handleSubtractOne()
                changeColor()
              }}>
              -1
            </button>
            <button
              onClick={() => {
                handleAddOne()
                changeColor()
              }}>
              +1
            </button>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex justify-between space-x-2'>
            <div className='flex flex-col grow relative'>
              {colors.length ? (
                <div
                  className='flex justify-between'
                  style={{ backgroundColor: colors[0] }}>
                  <span
                    className='p-2 cursor-pointer'
                    id='hexacolor-1'
                    onClick={clickHandleCopy}>
                    {colors[0]}
                  </span>
                  {showCopiedPopup && (
                    <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                      Copied 👍
                    </span>
                  )}
                  <button
                    className='p-2'
                    id='close-btn-1'
                    onClick={removeColor}>
                    x
                  </button>
                </div>
              ) : null}
              {colors.length > 1 ? (
                <div
                  className='flex justify-between'
                  style={{ backgroundColor: colors[1] }}>
                  <span
                    id='hexacolor-2'
                    className='p-2 cursor-pointer'
                    onClick={clickHandleCopy}>
                    {colors[1]}
                  </span>

                  <button
                    className='p-2'
                    id='close-btn-2'
                    onClick={removeColor}>
                    x
                  </button>
                </div>
              ) : null}
              {colors.length > 2 ? (
                <>
                  <div
                    className='flex justify-between'
                    style={{ backgroundColor: colors[2] }}>
                    <span
                      className='p-2 cursor-pointer'
                      id='hexacolor-3'
                      onClick={clickHandleCopy}>
                      {colors[2]}
                    </span>
                    <button
                      className='p-2'
                      id='close-btn-3'
                      onClick={removeColor}>
                      x
                    </button>
                  </div>
                </>
              ) : null}
            </div>
            {colors.length > 2 ? (
              <button href='/pallets' onClick={() => handleAddPalette()}>
                Would you save this palette ?
              </button>
            ) : null}
          </div>
        </div>
        <div className='flex justify-center'>
          <button onClick={resetCounter}>Reset</button>
        </div>
      </div>
    </>
  )
}
