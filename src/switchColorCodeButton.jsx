import React from 'react'

export function SwitchColorCodeButton(props) {
  return (
    <button
      onClick={() => {
        props.handleHexToRgb()
      }}
      className='flex relative max-w-fit text-sm after:absolute after:top after:left hover:after:content-[""] 
            after:border-b after:border-transparent hover:after:translate-x-6 hover:after:-left-6 hover:after:duration-500 
            after:w-60 hover:after:h-6 hover:after:border-neutral-300'>
      {props.toggleCodeColor ? 'hexa code ?' : 'rgb code ?'}
    </button>
  )
}
