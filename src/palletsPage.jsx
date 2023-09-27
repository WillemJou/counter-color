import React, { useState, useEffect } from 'react'
import Link from './link'

export const PalletsPage = () => {
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
  const [deletePallette, setDeletePallete] = useState(
    localStorage.length == 0
      ? []
      : group(JSON.parse(localStorage.getItem('palette')), 3)
  )
  // modifier le LS en ajoutant le nouveau group deleteItem au LS et en supprimant l'ancienne palette LS
  const removePalette = (e, children) => {
    let id = e.target.id
    id.includes(children)
      ? setDeletePallete(deletePallette.filter((el) => el !== children))
      : []
  }

  useEffect(() => {
    const flatGroupArr = deletePallette.flat()
    localStorage.setItem('updatePalette', JSON.stringify(flatGroupArr))
    const newPalette = JSON.parse(localStorage.getItem('updatePalette'))
    localStorage.removeItem('palette')
    localStorage.setItem('palette', JSON.stringify(newPalette))
    localStorage.removeItem('updatePalette')
    JSON.parse(localStorage.getItem('palette'))
  }, [removePalette])

  return (
    <>
      {localStorage.palette != '[]'
        ? deletePallette.map((children, index) => (
            <div className='container' key={index}>
              <div className='palette-title'>
                palette {index}
                <button
                  id={children}
                  onClick={(e) => removePalette(e, children)}
                  className='close-btn btn'>
                  x
                </button>
              </div>
              <div key={index} className='palette-card'>
                {children != []
                  ? children.map((x, i) => (
                      <div
                        key={i}
                        style={{ backgroundColor: x }}
                        className='color-palette-card'>
                        Hello World
                      </div>
                    ))
                  : null}
              </div>
            </div>
          ))
        : 'no pallets added'}
      <Link className='btn back-btn' href='/'>
        Back to counter
      </Link>
    </>
  )
}
