import { useState, useEffect } from 'react'

export const useName = () => {
  const [names, setNames] = useState(
    JSON.parse(localStorage.getItem('names') || '[]')
  )

  useEffect(() => {
    const renameEmptyString = names.map((element, index) => {
      if (element === '') {
        return `unamed palette ${index + 1}`
      } else {
        return element
      }
    })
    setNames(renameEmptyString) // Update state with renamed names only on effect
    const namesJSONString = JSON.stringify(renameEmptyString)
    localStorage.setItem('names', namesJSONString)
  }, [names.length])

  return { names, setNames }
}
