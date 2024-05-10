import React, { useState, useEffect, useRef } from 'react'
import { copyColorText } from './utils'
import { useCopy } from './hooks/useCopy'
import { useName } from './hooks/useName'
import { useProvisionalName } from './hooks/useProvisionalName'
import { Copy } from './copy'
import Link from './link'
import { Error } from './error'

export const PalletsPage = () => {
  // CUSTOM HOOKS
  const { handleShowCopiedPopup, handleShowLimitPopup, showCopiedPopup } =
    useCopy()
  const { names, setNames } = useName()
  const { provisionalName, setProvisionalName, handleAddProvisionalName } =
    useProvisionalName()

  const [selectedName, setSelectedName] = useState(null) // Track currently selected palette name
  const [isError, setIsError] = useState(false)
  const ref = useRef(null)

  /**
   * The `group` function takes an array of items and a number `n`, and returns a new array where the
   * items are grouped into subarrays of size `n`.
   */
  const group = (items, n) =>
    items.reduce((acc, x, i) => {
      const idx = Math.floor(i / n)
      acc[idx] = [...(acc[idx] || []), x]
      return acc
    }, [])

  // Now we set the palette State based on LS and pack in
  const [palette, setPalette] = useState(
    localStorage.length == 0
      ? []
      : group(JSON.parse(localStorage.getItem('palette')), 3)
  )

  // Merge both arrays (names ---> keys, palette ---> values)
  const paletteWithNames = names.reduce((acc, currentValue, index) => {
    acc[currentValue] = palette[index]
    return acc
  }, {})

  const selectName = (name) => {
    setSelectedName(name)
  }

  const handleNewName = (name) => {
    const nameIndex = names.indexOf(selectedName) // Find the index of the selected name
    if (!names.includes(provisionalName) && nameIndex > -1) {
      setNames([
        ...names.slice(0, nameIndex), // Copy elements before the selected name
        provisionalName, // Update with the new name
        ...names.slice(nameIndex + 1), // Copy elements after the selected name
      ])
    }
    if (names.includes(provisionalName) && name === selectedName) {
      setIsError(true)
      ref.current.value = ''
      setTimeout(() => {
        setIsError(false)
      }, 5000)
    }
    setProvisionalName('')
  }

  const removePalette = (e, children, name) => {
    let id = e.target.id
    id.includes(children)
      ? (setPalette(
          Object.values(paletteWithNames).filter((el) => el !== children)
        ),
        setNames(Object.keys(paletteWithNames).filter((el) => el !== name)))
      : []
  }

  const handleCopy = (children) => {
    handleShowCopiedPopup()
    copyColorText(children)
  }

  const handleLimit = () => {
    handleShowLimitPopup()
  }

  useEffect(() => {
    const flatGroupArr = palette.flat()

    localStorage.setItem('updatePalette', JSON.stringify(flatGroupArr))
    localStorage.setItem('updateNames', JSON.stringify(names))

    const newPalette = JSON.parse(localStorage.getItem('updatePalette'))
    const newNames = JSON.parse(localStorage.getItem('updateNames'))

    localStorage.removeItem('palette')
    localStorage.removeItem('names')

    localStorage.setItem('palette', JSON.stringify(newPalette))
    localStorage.setItem('names', JSON.stringify(newNames))

    localStorage.removeItem('updatePalette')
    localStorage.removeItem('updateNames')

    JSON.parse(localStorage.getItem('palette'))
    JSON.parse(localStorage.getItem('names'))
  }, [removePalette, palette])

  return (
    <>
      <div className='container mt-9'>
        <Link className='flex justify-end mb-8' href='/'>
          <span
            className='flex relative max-w-fit after:absolute after:top after:left hover:after:content-[""] 
                after:border-b after:border-transparent hover:after:translate-x-6 hover:after:-left-6 hover:after:duration-500 
                after:w-28 hover:after:h-6 hover:after:border-neutral-300'>
            Back to counter
          </span>
        </Link>
        {localStorage.palette !== '[]'
          ? Object.entries(paletteWithNames).map(([name, children], index) => (
              <div className='shadow-2xl my-5 border rounded-sm' key={index}>
                {isError && (
                  <Error errorName='You cannot use the same name than another palette' />
                )}
                <div className='flex px-2 justify-between text-lg'>
                  <button onClick={() => selectName(name)}>
                    {name ? name : `unamed palette ${index + 1}`}
                  </button>
                  {selectedName === name && ( // Only display input when the name matches
                    <>
                      <input
                        type='text'
                        ref={ref}
                        id={name}
                        placeholder={name}
                        className='absolute'
                        onChange={(e) => handleAddProvisionalName(e)}
                      />
                      <button onClick={() => handleNewName(name)}>
                        Valid New Name
                      </button>
                    </>
                  )}
                  <button
                    id={children}
                    onClick={(e) => removePalette(e, children, name)}>
                    x
                  </button>
                </div>
                <div key={index}>
                  {children !== undefined
                    ? children.map((codeColor, i) => (
                        <div
                          key={i}
                          style={{ backgroundColor: codeColor }}
                          className='py-2 px-2'>
                          <span
                            onClick={() => {
                              handleCopy(codeColor), handleLimit()
                            }}
                            className='text-sm cursor-pointer after:whitespace-pre after:w-3 after:ml-2 after:inline-block after:content-[url("/src/pics/copy-solid.svg")] after:opacity-0 hover:after:opacity-100'>
                            {codeColor}
                          </span>
                        </div>
                      ))
                    : null}
                  <div>{showCopiedPopup ? <Copy /> : null}</div>
                </div>
              </div>
            ))
          : 'no pallets added'}
      </div>
    </>
  )
}
