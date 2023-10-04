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

  // Trouver une solution plus maintenable et dynamique !
  const copyColorText = (e) => {
    let id = e.target.id
    id === 'hexacolor-1'
      ? navigator.clipboard.writeText(JSON.stringify(colors[0]).slice(1, -1))
      : id === 'hexacolor-2'
      ? navigator.clipboard.writeText(JSON.stringify(colors[1]).slice(1, -1))
      : id === 'hexacolor-3'
      ? navigator.clipboard.writeText(JSON.stringify(colors[2]).slice(1, -1))
      : navigator.clipboard.writeText(JSON.stringify(color).slice(1, -1))
  }

  const handleCopy = (e) => {
    handleShowCopiedPopup()
    copyColorText(e)
  }
  const handleLimit = () => {
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
        <div className='space-y-6 h-2/4'>
          <h1 className=' max-w-fit text-2xl border-b-4 mt-9'>
            Choose your random color by counting and colorize the world 😁
          </h1>
          {palette.length ? (
            <Link className='' href='/pallets'>
              <span
                className='flex relative max-w-fit after:absolute after:top after:left hover:after:content-[""] 
                after:border-b after:border-transparent hover:after:translate-x-6 hover:after:-left-6 hover:after:duration-500 
                after:w-28 hover:after:h-6 hover:after:border-neutral-300'>
                See your pallets
              </span>
            </Link>
          ) : null}
          <div
            className={`${
              count >= 100
                ? 'flex-col space-y-7'
                : 'flex justify-between h-28 mt-7'
            }`}>
            <div className='flex relative text-2xl space-x-3 w-60'>
              <span className='text-8xl'>{count}</span>
              <span
                onClick={handleCopy}
                className={`${
                  count !== 0
                    ? 'hover:after:flex hover:after:content-[""] after:border-b after:border-transparent hover:after:translate-x-2 hover:after:duration-500 hover:after:border-neutral-300 after:w-20 before:w-4 before:inline-block before:content-[url("/src/pics/copy-solid.svg")] before:opacity-0 hover:before:opacity-100'
                    : 'hover:before:content-[""]'
                } text-lg cursor-pointer h-8`}>
                {count == 0 ? null : color}
              </span>
            </div>
            {count !== 0
              ? [
                  <div key={'key1'} className='flex w-3/4'>
                    <button
                      key={'key1'}
                      className='rounded-sm transform duration-700 border border-transparent hover:border hover:border-neutral-300 p-2'
                      onClick={() => {
                        handleAddColor(), handleLimit()
                      }}>
                      Choose this color
                    </button>
                    <div
                      key={'key2'}
                      className='w-full'
                      style={{ backgroundColor: color }}>
                      {' '}
                    </div>
                    {showCopiedPopup && (
                      <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        Copied 👍
                      </span>
                    )}
                  </div>,
                ]
              : null}
          </div>
          <div className=' relative flex justify-center'>
            {showLimitPopup && colors.length > 3 && (
              <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 border-b-2 border-red-500'>
                Sorry, you can only create a 3 colors palette
              </span>
            )}
          </div>
          <div className='flex space-x-4 text-5xl'>
            <button
              className='rounded-xl p-1 transform duration-700 border border-transparent hover:border hover:border-neutral-300'
              onClick={() => {
                handleSubtractOne()
                changeColor()
              }}>
              -1
            </button>
            <button
              className='rounded-xl p-1 transform duration-700 border border-transparent hover:border hover:border-neutral-300'
              onClick={() => {
                handleAddOne()
                changeColor()
              }}>
              +1
            </button>
          </div>
        </div>
        <div className='flex flex-col mb-8 h-32'>
          <div className='flex justify-between'>
            <div
              className={`${
                colors.length > 2 ? 'w-11/12' : 'w-full'
              } flex flex-col relative ease-out duration-500`}>
              {colors.length ? (
                <div
                  className='flex justify-between'
                  style={{ backgroundColor: colors[0] }}>
                  <span
                    className='p-2 cursor-pointer hover:after:ml-2 hover:after:content-[url("/src/pics/copy-solid.svg")]
                     hover:after:inline-block hover:after:w-3'
                    id='hexacolor-1'
                    onClick={handleCopy}>
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
                    className='p-2 cursor-pointer hover:after:ml-2 hover:after:content-[url("/src/pics/copy-solid.svg")]
                                 hover:after:inline-block hover:after:w-3'
                    onClick={handleCopy}>
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
                      className='p-2 cursor-pointer hover:after:ml-2 hover:after:content-[url("/src/pics/copy-solid.svg")]
                                 hover:after:inline-block hover:after:w-3'
                      id='hexacolor-3'
                      onClick={handleCopy}>
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
            <div
              className={`${
                colors.length > 2
                  ? 'w-44 rounded-sm opacity-100 duration-300 hover:border hover:duration-700'
                  : 'w-0 opacity-0'
              } flex items-center relative ease-out  `}>
              <button
                href='/pallets'
                className={`${
                  colors.length > 2
                    ? 'text-opacity-100 duration-0'
                    : 'text-transparent'
                } relative ease-out h-full p-2`}
                onClick={() => handleAddPalette()}>
                Would you save this palette ?
              </button>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            className='rounded-sm transform duration-700 border border-transparent hover:border hover:border-neutral-300 p-2'
            onClick={resetCounter}>
            Reset
          </button>
        </div>
      </div>
    </>
  )
}
