import React from 'react'

export function Color(props) {
  return (
    <div className='flex w-full h-28'>
      <button
        className='rounded-sm transform duration-700 border border-transparent hover:border hover:border-neutral-300 p-2'
        onClick={() => {
          props.handleAddColor(), props.handleLimit()
        }}>
        Choose this color
      </button>
      <div className='w-full' style={{ backgroundColor: props.color }}>
        {' '}
      </div>
    </div>
  )
}
