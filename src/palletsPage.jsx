import React from 'react'
import Link from './link'
import './counter.css'

export const PalletsPage = () => {
  //const noPalletsError = getLSPalettes === null ? 'no pametts added' : null
  const getLSPalettes = JSON.parse(localStorage.getItem('palette'))
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

  return (
    <div>
      {getLSPalettes != null
        ? group(getLSPalettes, 3).map((children, index) => (
            <div key={index}>
              palette {index}
              <div key={index} className='palette-card'>
                {children.map((x, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: x }}
                    className='color-palette-card'>
                    Hello World
                  </div>
                ))}
              </div>
            </div>
          ))
        : 'no pallets added'}
      <Link className='btn back-btn' href='/'>
        Back to counter
      </Link>
    </div>
  )
}
