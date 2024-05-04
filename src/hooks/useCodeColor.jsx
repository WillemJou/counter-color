import { useState, useEffect } from 'react'
import { hexToRgb, rgbToHex, randomHexa, randomRgb } from '../utils'

export const useCodeColor = (color, setColor, colors, setColors) => {
  const [codeColor, setcodeColor] = useState(false)
  let [toggleCodeColor, setToggleCodeColor] = useState(
    color.includes('#') ? false : true
  )

  const changeRandomColor = () => {
    toggleCodeColor ? setColor(randomRgb()) : setColor(randomHexa())
  }
  useEffect(() => {
    const hex = '#'
    const changeCodeColors = () => {
      toggleCodeColor
        ? setColor(hexToRgb(color.toString().replace(hex, '')))
        : setColor(rgbToHex(color))
      toggleCodeColor && colors.map((i) => i.includes(hex))
        ? setColors(colors.map((v) => hexToRgb(v.replace(hex, ''))))
        : setColors(colors.map((v) => rgbToHex(v)))
    }
    codeColor ? changeCodeColors() : null
  }, [toggleCodeColor])

  return {
    toggleCodeColor,
    setcodeColor,
    setToggleCodeColor,
    changeRandomColor,
  }
}
