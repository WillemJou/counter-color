import { useEffect, useState } from 'react'
const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    // define callback as separate function so it can be removed later with cleanup function
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', onLocationChange)

    // clean up event listener
    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
  }, [])
  return currentPath === path ? children : null
}

export default Route
