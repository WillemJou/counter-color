import React, { useEffect, useState } from 'react'

import { maximumLength, copyColorText } from './utils'
import { LinkToPalletsPage } from './linkToPalletsPage'
import { Counter } from './counter'
import { Color } from './color'
import { Palette } from './paletteForMainPage'
import { SwitchColorCodeButton } from './switchColorCodeButton'
import { ResetButton } from './resetButton'
import { Modal } from './modal'
import { useCopy } from './hooks/useCopy'
import { useCodeColor } from './hooks/useCodeColor'
import { Copy } from './copy'

// Atomiser Counter !

export function MainPage() {
  const [count, setCount] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const {
    showCopiedPopup,
    showLimitPopup,
    handleShowCopiedPopup,
    handleShowLimitPopup,
  } = useCopy()
  const [provisionalName, setProvisionalName] = useState(
    JSON.parse(sessionStorage.getItem('provisionalName') || '[]')
  )
  const [names, setNames] = useState(
    JSON.parse(localStorage.getItem('names') || '[]')
  )
  let [color, setColor] = useState(
    JSON.parse(sessionStorage.getItem('color') || '[]')
  )
  let [colors, setColors] = useState(
    JSON.parse(sessionStorage.getItem('colors') || '[]')
  )

  const {
    changeRandomColor,
    setcodeColor,
    setToggleCodeColor,
    toggleCodeColor,
  } = useCodeColor(color, setColor, colors, setColors)

  const [palette, setPalette] = useState(
    JSON.parse(localStorage.getItem('palette') || '[]')
  )

  const handleAddColor = () => {
    setColors([...colors, color])
  }

  const handleAddPalette = () => {
    const spreadColor = [...palette, ...colors]
    setPalette(spreadColor)
    setNames([...names, provisionalName])
    setCount(0)
    setColors([])
  }

  const handleAddProvisionalName = (event) => {
    setProvisionalName(provisionalName)
    setProvisionalName(event.target.value)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  maximumLength(colors)

  const handleSubtractOne = () => {
    setCount(count - 1)
  }

  const handleAddOne = () => {
    setCount(count + 1)
  }

  // Change code color handler

  const handleHexToRgb = () => {
    setcodeColor(true)
    setToggleCodeColor(!toggleCodeColor)
  }

  const removeColor = (index) => {
    const list = [...colors]
    list.splice(index, 1)
    setColors(list)
  }

  const resetCounter = () => {
    setCount(0)
    setColors([])
    setToggleCodeColor(false)
    sessionStorage.clear()
  }

  // Copy code color handler

  const handleCopy = (children) => {
    handleShowCopiedPopup()
    copyColorText(children, setColors(colors))
  }

  const handleLimit = () => {
    handleShowLimitPopup()
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
    sessionStorage.setItem('provisionalName', JSON.stringify(provisionalName))
  }, [handleAddProvisionalName])

  useEffect(() => {
    localStorage.setItem('names', JSON.stringify(names))
  }, [handleAddPalette])

  useEffect(() => {
    const renameEmptyString = names.map((element, index) => {
      if (element === '') {
        return `unamed palette ${index + 1}`
      } else {
        return element
      }
    })
    setNames(renameEmptyString) // Update state with renamed names only on effect
    const namesJSONString = JSON.stringify(renameEmptyString)
    localStorage.setItem('names', namesJSONString)
  }, [names.length])

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
          handleOpenModal={handleOpenModal}
          copy={handleCopy}
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
      <div>{showCopiedPopup ? <Copy /> : null}</div>
      <Modal
        isOpen={openModal}
        handleAddPalette={handleAddPalette}
        names={names}
        provisionalName={provisionalName}
        setProvisionalName={setProvisionalName}
        handleAddProvisionalName={handleAddProvisionalName}
        onClose={() => {
          setOpenModal(false)
          return true
        }}
      />
    </>
  )
}
