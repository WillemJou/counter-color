import { useState } from 'react'

export const useColors = () => {
  let [color, setColor] = useState(
    JSON.parse(sessionStorage.getItem('color') || '[]')
  )
  let [colors, setColors] = useState(
    JSON.parse(sessionStorage.getItem('colors') || '[]')
  )

  return { color, colors, setColor, setColors }
}
