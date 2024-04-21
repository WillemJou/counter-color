import React, { useEffect, useState } from 'react'
import { Error } from './error'

export function Modal(props) {
  const [showError, setShowError] = useState(false)

  const yesEventBtn = () => {
    if (props.provisionalName.length === 0) {
      setShowError(true)
      return // Prevent further execution if there's an error
    } else {
      props.onClose(), props.handleAddPalette(), props.setProvisionalName('')
    }
  }

  const noEventBtn = () => {
    props.onClose()
    props.handleAddPalette()
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

  if (!props.isOpen) {
    return null
  }

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
            onChange={(e) => props.handleAddProvisionalName(e)}
            value={props.provisionalName}
            className='w-full'></input>
          {showError && (
            <Error errorName='You cannot click Yes without choosing a name ' />
          )}
        </div>
        <div className='flex justify-center gap-x-3.5 mb-1'>
          <button
            className='p-1 border border-slate-400'
            onClick={() => yesEventBtn()}>
            Yes
          </button>
          <button
            className='p-1 border border-slate-400'
            onClick={() => noEventBtn()}>
            No
          </button>
        </div>
      </section>
    </dialog>
  )
}
