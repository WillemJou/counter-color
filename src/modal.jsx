import React, { useEffect } from 'react'

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
    props.setProvisionalName('')
  }

  useEffect(() => {
    const keyListener = (e) => {
      if (e.key === 'Escape') {
        props.onClose()
      }
    }
    window.addEventListener('keydown', keyListener)
    return () => window.removeEventListener('keydown', keyListener)
  }, [])

  return (
    <dialog
      open
      aria-modal='true'
      onClick={props.onClose}
      className='fixed h-full w-full flex items-center justify-center bg-neutral-400/75 bottom-0'>
      <section
        className='w-2/3 bg-zinc-100'
        onClick={(e) => e.stopPropagation()}>
        <header className='relative flex items-end p-2.5 truncat'>
          <h1 className='title'>Name your palette ?</h1>
          <button
            className='border-none cursor-pointer w-[20px] h-auto absolute top-[2px] right-[2px] bg-[rgba(203,_167,_167,_0.902)]'
            onClick={props.onClose}>
            x
          </button>
        </header>
        <div className='m-2.5 border-t-2'>
          <input
            type='text'
            onChange={(e) => props.handleAddPaletteName(e)}
            value={props.provisionalName}
            className='w-full'></input>
        </div>
        <div className='flex justify-center gap-x-3.5 mb-1'>
          <button
            className='p-1 border border-slate-400'
            onClick={() => EventBtn()}>
            Yes
          </button>
          <button
            className='p-1 border border-slate-400'
            onClick={() => EventBtn()}>
            No
          </button>
        </div>
      </section>
    </dialog>
  )
}
