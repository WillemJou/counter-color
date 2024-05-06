import { useState } from 'react'

export const useCount = () => {
  const [count, setCount] = useState(0)
  const handleSubtractOne = () => {
    setCount(count - 1)
  }

  const handleAddOne = () => {
    setCount(count + 1)
  }
  return { count, setCount, handleAddOne, handleSubtractOne }
}
