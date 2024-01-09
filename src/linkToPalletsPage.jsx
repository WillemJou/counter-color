import React from 'react'
import Link from './link'

export function LinkToPalletsPage() {
  return (
    <Link className='' href='/pallets'>
      <span
        className='flex relative max-w-fit after:absolute after:top after:left hover:after:content-[""] 
      after:border-b after:border-transparent hover:after:translate-x-6 hover:after:-left-6 hover:after:duration-500 
      after:w-28 hover:after:h-6 hover:after:border-neutral-300'>
        See your pallets
      </span>
    </Link>
  )
}
