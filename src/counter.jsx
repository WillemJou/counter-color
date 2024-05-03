import React from 'react'

export function Counter(props) {
  return (
    <>
      <div className='flex relative text-2xl space-x-3 w-60'>
        <span className='text-8xl'>{props.count}</span>
        <div className='flex whitespace-nowrap'>
          <span
            onClick={() => props.copy()}
            className={`${
              props.count !== 0
                ? ' after:whitespace-pre after:w-3 after:ml-2 after:inline-block after:content-[url("/src/pics/copy-solid.svg")] after:opacity-0 hover:after:opacity-100'
                : 'hover:after:content-[""]'
            } text-sm cursor-pointer h-8`}>
            {props.count !== 0 ? props.color : null}
          </span>
        </div>
      </div>

      <div className=' relative flex justify-center'>
        {props.showLimitPopup && props.colors.length > 3 && (
          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 border-b-2 border-red-500'>
            Sorry, you can only create a 3 colors palette
          </span>
        )}
      </div>
      <div className='flex space-x-4 text-5xl mt-9'>
        <button
          className='p-1 shadow-md transform duration-700 border border-transparent hover:border hover:border-neutral-300'
          onClick={() => {
            props.handleSubtractOne(), props.changeRandomColor()
          }}>
          -1
        </button>
        <button
          className='p-1 shadow-md transform duration-700 border border-transparent hover:border hover:border-neutral-300'
          onClick={() => {
            props.handleAddOne(), props.changeRandomColor()
          }}>
          +1
        </button>
      </div>
    </>
  )
}
