import React from 'react'

export function ResetButton(props) {
  return (
    <button
      className='shadow-md transform duration-700 border border-transparent hover:border hover:border-neutral-300 p-2'
      onClick={props.resetCounter}>
      Reset
    </button>
  )
}
