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
      <div className='container mt-9'>
        <Link className='flex justify-end mb-8' href='/'>
          <span
            className='flex relative max-w-fit after:absolute after:top after:left hover:after:content-[""] 
                after:border-b after:border-transparent hover:after:translate-x-6 hover:after:-left-6 hover:after:duration-500 
                after:w-28 hover:after:h-6 hover:after:border-neutral-300'>
            Back to counter
          </span>
        </Link>
        {localStorage.palette != '[]'
          ? deletePallette.map((children, index) => (
              <div className='my-5 border rounded-sm' key={index}>
                <div className='flex px-2 justify-between text-lg'>
                  palette {index + 1}
                  <button
                    id={children}
                    onClick={(e) => removePalette(e, children)}>
                    x
                  </button>
                </div>
                <div key={index}>
                  {children != []
                    ? children.map((x, i) => (
                        <div
                          key={i}
                          style={{ backgroundColor: x }}
                          className='py-2 px-2'>
                          <span>{x}</span>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            ))
          : 'no pallets added'}
      </div>
    </>
  )
}
