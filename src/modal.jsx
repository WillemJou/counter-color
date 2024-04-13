import React from 'react'

export function Modal(props) {
  if (!props.isOpen) {
    return null
  }
  /**
   * The `noEventBtn` packing functions that closes modal, adds new palette and re-init name state.
   */
  const EventBtn = () => {
    props.onClose()
    props.handleAddPalette()
    props.setName('')
  }

  return (
    <dialog
      open
      aria-modal='true'
      onClick={props.onClose}
      className='fixed h-full w-full flex items-center justify-center bg-neutral-400/75 bottom-0'>
      <section className='w-2/3 bg-white' onClick={(e) => e.stopPropagation()}>
        <header className='relative flex items-end p-2.5 truncat'>
          <h1 className='title'>Would you name your new palette ?</h1>
          <button
            className='border-none cursor-pointer w-[20px] h-auto absolute top-[2px] right-[2px] bg-[rgba(203,_167,_167,_0.902)]'
            onClick={props.onClose}>
            x
          </button>
        </header>
        <div className='p-2.5 border-y-2'>
          <input
            type='text'
            onChange={(e) => props.handleAddPaletteName(e)}
            value={props.name}
            className='w-full'></input>
        </div>
        <button onClick={() => EventBtn()}>No</button>
        <button onClick={() => EventBtn()}>Yes</button>
      </section>
    </dialog>
  )
}