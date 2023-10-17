import React, { useEffect, useState } from 'react'
import Link from './link'
import {
  hexToRgb,
  maximumLength,
  randomHexa,
  randomRgb,
  rgbToHex,
} from './utils'

// Refacto le code en épurant la partie fonction et state du composant

export function Counter() {
  // use state HOOKS

  const [count, setCount] = useState(0)
  let [color, setColor] = useState(randomHexa)
  let [colors, setColors] = useState(
    JSON.parse(sessionStorage.getItem('colors') || '[]')
  )
  const [palette, setPalette] = useState(
    JSON.parse(localStorage.getItem('palette') || '[]')
  )
  const [toggleCodeColor, setToggleCodeColor] = useState(false)
  const [stop, setStop] = useState(false)
  const [showCopiedPopup, setShowCopiedPopup] = useState(false)
  const [showLimitPopup, setShowLimitPopup] = useState(false)

  const handleAddColor = () => {
    setColors([...colors, color])
  }
  const handleAddPalette = () => {
    setPalette([...palette, ...colors])
    setCount(0)
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
  // PK les fonctions fonctionnent seulement dans le scope globale ???
  maximumLength(colors)

  const handleLimit = () => {
    handleShowLimitPopup()
  }

  const handleCopy = (e, children) => {
    handleShowCopiedPopup()
    copyColorText(e, children, setColors(colors))
  }

  const handleSubtractOne = () => {
    setCount(count - 1)
  }

  const handleAddOne = () => {
    setCount(count + 1)
  }

  const handleHexToRgb = () => {
    setStop(true)
    setToggleCodeColor(!toggleCodeColor)
  }

  const copyColorText = (e, children) => {
    let id = e.target.id
    id === children
      ? navigator.clipboard.writeText(JSON.stringify(children))
      : navigator.clipboard.writeText(JSON.stringify(color))
  }

  const removeColor = (e, children) => {
    const id = e.target.id
    id.includes(children)
      ? setColors(colors.filter((el) => el !== children))
      : []
  }

  const changeRandomColor = () => {
    toggleCodeColor ? setColor(randomRgb()) : setColor(randomHexa())
  }

  const resetCounter = () => {
    setCount(0)
    setColors([])
    setToggleCodeColor(false)
    sessionStorage.clear()
  }

  // use effect HOOKS

  useEffect(() => {
    sessionStorage.setItem('colors', JSON.stringify(colors))
  }, [handleAddColor])

  useEffect(() => {
    localStorage.setItem('palette', JSON.stringify(palette))
  }, [handleAddPalette])

  useEffect(() => {
    const hex = '#'
    const rgb = 'rgb'

    const changeCodeColor = () => {
      toggleCodeColor && color.includes(hex)
        ? setColor(hexToRgb(color.replace(hex, '')))
        : toggleCodeColor && color.includes(rgb)
        ? setColor(rgbToHex(color))
        : !toggleCodeColor && color.includes(hex)
        ? setColor(hexToRgb(color.replace(hex, '')))
        : !toggleCodeColor && color.includes(rgb)
        ? setColor(rgbToHex(color))
        : null
    }

    const changeCodeColors = () => {
      toggleCodeColor && colors.includes(hex)
        ? setColors(colors.map((v) => hexToRgb(v.replace(hex, ''))))
        : toggleCodeColor && colors.includes(rgb)
        ? setColors(colors.map((v) => rgbToHex(v)))
        : !toggleCodeColor && colors.includes(hex)
        ? setColors(colors.map((v) => hexToRgb(v.replace(hex, ''))))
        : !toggleCodeColor && colors.includes(rgb)
        ? setColors(colors.map((v) => rgbToHex(v)))
        : null
    }

    stop ? (changeCodeColors(), changeCodeColor()) : null
  }, [toggleCodeColor])

  return (
    <>
      <div className='container space-y-9'>
        <div className='space-y-6 h-2/4'>
          <h1 className=' max-w-fit text-2xl border-b-4 mt-9'>
            Choose your random pallets by counting and colorize the world 😁
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
              <div className='flex whitespace-nowrap'>
                <span
                  onClick={(e) => handleCopy(e)}
                  className={`${
                    count !== 0
                      ? ' before:whitespace-pre before:w-4 before:inline-block before:content-[url("/src/pics/copy-solid.svg")] before:opacity-0 hover:before:opacity-100'
                      : 'hover:before:content-[""]'
                  } text-sm cursor-pointer h-8`}>
                  {count !== 0 ? color : null}
                </span>
              </div>
            </div>
            {count !== 0
              ? [
                  <div key={'key0'} className='flex w-full'>
                    <button
                      id={color}
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
            {colors.includes('color') && showLimitPopup && (
              <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 border-b-2 border-red-500'>
                Sorry, you can only choose different colors
              </span>
            )}
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
                handleSubtractOne(), changeRandomColor()
              }}>
              -1
            </button>
            <button
              className='rounded-xl p-1 transform duration-700 border border-transparent hover:border hover:border-neutral-300'
              onClick={() => {
                handleAddOne(), changeRandomColor()
              }}>
              +1
            </button>
          </div>
        </div>
        <div className='flex flex-col justify-center mb-8 h-36'>
          <div className='flex justify-between'>
            <div
              className={`${
                colors.length > 2 ? 'w-11/12' : 'w-full'
              } flex flex-col relative ease-out duration-500`}>
              {/* refacto code */}
              {colors.map((children, index) => (
                <div
                  id={children}
                  key={index + 'container' + children}
                  className='flex justify-between'
                  style={{ backgroundColor: children }}>
                  <span
                    key={index + 'copyIcon' + children}
                    id={children.key}
                    className='p-2 cursor-pointer hover:after:ml-2 hover:after:content-[url("/src/pics/copy-solid.svg")]
                     hover:after:inline-block hover:after:w-3'
                    onClick={(e) => handleCopy(e)}>
                    {children}
                  </span>
                  {showCopiedPopup && (
                    <span
                      key={index + 'CopiedPopup' + children}
                      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                      Copied 👍
                    </span>
                  )}
                  <button
                    key={index + 'closeBtn' + children}
                    id={children}
                    className='p-2'
                    onClick={(e) => removeColor(e, children)}>
                    x
                  </button>
                </div>
              ))}
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
          {count !== 0 || colors.length > 0 ? (
            <button
              onClick={() => {
                handleHexToRgb()
              }}
              className='flex relative max-w-fit text-sm after:absolute after:top after:left hover:after:content-[""] 
                after:border-b after:border-transparent hover:after:translate-x-6 hover:after:-left-6 hover:after:duration-500 
                after:w-60 hover:after:h-6 hover:after:border-neutral-300'>
              {toggleCodeColor
                ? 'Do you wanna switch to hexa code ?'
                : 'Do you wanna switch to rgb code ?'}
            </button>
          ) : null}
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
