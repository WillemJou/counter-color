import React, { useEffect, useState } from 'react'

import {
  hexToRgb,
  maximumLength,
  randomHexa,
  randomRgb,
  rgbToHex,
} from './utils'
import { LinkToPalletsPage } from './linkToPalletsPage'
import { Counter } from './counter'
import { Color } from './color'
import { Palette } from './paletteForMainPage'
import { SwitchColorCodeButton } from './switchColorCodeButton'
import { ResetButton } from './resetButton'

// Refacto le code en épurant la partie fonction et hooks du composant
// Atomiser Counter !

export function MainPage() {
  // use state HOOKS

  const [stop, setStop] = useState(false)
  const [count, setCount] = useState(0)

  let [color, setColor] = useState(
    JSON.parse(sessionStorage.getItem('color') || '[]')
  )
  let [colors, setColors] = useState(
    JSON.parse(sessionStorage.getItem('colors') || '[]')
  )

  let [toggleCodeColor, setToggleCodeColor] = useState(
    color.includes('#') ? false : true
  )
  const [palette, setPalette] = useState(
    JSON.parse(localStorage.getItem('palette') || '[]')
  )
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

  const removeColor = (index) => {
    const list = [...colors]
    list.splice(index, 1)
    setColors(list)
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
    sessionStorage.setItem('color', JSON.stringify(color))
  }, [handleAddOne, handleSubtractOne])

  useEffect(() => {
    sessionStorage.setItem('colors', JSON.stringify(colors))
  }, [handleAddColor])

  useEffect(() => {
    localStorage.setItem('palette', JSON.stringify(palette))
  }, [handleAddPalette])

  useEffect(() => {
    const hex = '#'
    const changeCodeColors = () => {
      toggleCodeColor
        ? setColor(hexToRgb(color.toString().replace(hex, '')))
        : setColor(rgbToHex(color))
      toggleCodeColor && colors.map((i) => i.includes(hex))
        ? setColors(colors.map((v) => hexToRgb(v.replace(hex, ''))))
        : setColors(colors.map((v) => rgbToHex(v)))
    }
    stop ? changeCodeColors() : null
  }, [toggleCodeColor])

  return (
    <>
      <div className='container space-y-9'>
        <div className='space-y-6 h-2/4'>
          <h1 className=' max-w-fit text-2xl border-b-4 mt-9'>
            Choose your random pallets by counting and colorize the world 😁
          </h1>
          {palette.length ? <LinkToPalletsPage /> : null}
          <div
            className={
              count >= 100 ? 'flex-col space-y-7' : 'flex content-baseline'
            }>
            <div
              className={
                count >= 100
                  ? 'flex space-x-9'
                  : 'flex flex-col justify-between'
              }>
              <Counter
                count={count}
                color={color}
                colors={colors}
                showLimitPopup={showLimitPopup}
                handleAddOne={handleAddOne}
                handleSubtractOne={handleSubtractOne}
                changeRandomColor={changeRandomColor}
                copy={handleCopy}
              />
            </div>
            {count !== 0 ? (
              <Color
                handleLimit={handleLimit}
                handleAddColor={handleAddColor}
                color={color}
              />
            ) : null}
          </div>
        </div>

        <Palette
          removeColor={removeColor}
          colors={colors}
          handleAddPalette={handleAddPalette}
          showCopiedPopup={showCopiedPopup}
        />
        {count !== 0 || colors.length > 0 ? (
          <SwitchColorCodeButton
            handleHexToRgb={handleHexToRgb}
            toggleCodeColor={toggleCodeColor}
          />
        ) : null}
        <div className='flex justify-center'>
          <ResetButton resetCounter={resetCounter} />
        </div>
      </div>
    </>
  )
}
