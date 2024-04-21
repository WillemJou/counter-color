import React from 'react'

export function Error({ errorName }) {
  return (
    <>
      <div>
        <span className='text-red-400'>{errorName}</span>
      </div>
    </>
  )
}
