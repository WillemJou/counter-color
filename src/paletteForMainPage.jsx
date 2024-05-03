import React from 'react'
import { Copy } from './copy'

export function Palette(props) {
  return (
    <div
      className={`${
        props.colors.length ? 'shadow-md' : ''
      } flex flex-col justify-center mb-8`}>
      <div className='flex justify-between'>
        <div
          className={`${
            props.colors.length > 2 ? 'w-11/12' : 'w-full'
          } flex flex-col ease-out duration-500`}>
          {props.colors.map((children, index) => (
            <div
              id={index + children}
              key={index + 'container' + children}
              className='flex justify-between h-12'
              style={{ backgroundColor: children }}>
              <span
                key={index + 'copyIcon' + children}
                id={index}
                className='text-sm p-2 cursor-pointer hover:after:ml-2 hover:after:content-[url("/src/pics/copy-solid.svg")]
                  hover:after:inline-block hover:after:w-3'
                onClick={() => props.copy(children)}>
                {children}
              </span>
              <div>{props.showCopiedPopup ? <Copy /> : null}</div>
              <button
                key={index + 'closeBtn' + children}
                id={index + children}
                className='p-2'
                onClick={() => props.removeColor(index)}>
                x
              </button>
            </div>
          ))}
        </div>

        <div
          className={`${
            props.colors.length > 2
              ? 'w-44 opacity-100 duration-300 hover:border hover:duration-700'
              : 'w-0 opacity-0'
          } flex items-center relative ease-out  `}>
          <button
            href='/pallets'
            className={`${
              props.colors.length > 2
                ? 'text-opacity-100 duration-0'
                : 'text-transparent'
            } shadow-md relative ease-out h-full p-2`}
            onClick={() => {
              props.handleOpenModal()
            }}>
            Would you save this palette ?
          </button>
        </div>
      </div>
    </div>
  )
}
