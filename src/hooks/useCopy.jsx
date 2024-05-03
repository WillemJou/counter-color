import { useState } from 'react'

export const useCopy = () => {
  const [showCopiedPopup, setShowCopiedPopup] = useState(false)
  const [showLimitPopup, setShowLimitPopup] = useState(false)

  const handleShowLimitPopup = () => {
    setShowLimitPopup(true)
    setTimeout(() => {
      setShowLimitPopup(false)
    }, 2500)
  }

  const handleShowCopiedPopup = () => {
    setShowCopiedPopup(true)
    setTimeout(() => {
      setShowCopiedPopup(false)
    }, 1000)
  }

  return {
    handleShowCopiedPopup,
    handleShowLimitPopup,
    showCopiedPopup,
    showLimitPopup,
  }
}
