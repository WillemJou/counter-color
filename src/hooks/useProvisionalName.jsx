import { useState, useEffect } from 'react'

export const useProvisionalName = () => {
  const [provisionalName, setProvisionalName] = useState(
    JSON.parse(sessionStorage.getItem('provisionalName') || '[]')
  )

  const handleAddProvisionalName = (event) => {
    setProvisionalName(provisionalName)
    setProvisionalName(event.target.value)
  }

  useEffect(() => {
    sessionStorage.setItem('provisionalName', JSON.stringify(provisionalName))
  }, [handleAddProvisionalName])

  return { provisionalName, setProvisionalName, handleAddProvisionalName }
}
