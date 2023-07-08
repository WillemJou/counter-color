import React from 'react'
import Link from './link'
import './counter.css'

export const PalletsPage = () => {
  const getLSPalettes = JSON.parse(localStorage.getItem('palette'))
  return (
    <div className='palette-card-container'>
      {getLSPalettes.map((getLSPalette) => (
        <div
          key={getLSPalette}
          style={{ backgroundColor: getLSPalette }}
          className='color-palette-card'>
          Hello World
        </div>
      ))}
      <Link href='/'>Back to counter</Link>
    </div>
  )
}
