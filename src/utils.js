// UTILS

const maximumLength = (item) => {
  item.splice(3, 1)
}

const randomHexa = () => '#' + Math.floor(Math.random() * 16777215).toString(16)

const hexToRgb = (hex) => {
  const transformedCode = hex.match(/.{1,2}/g).map((e) => parseInt(e, 16))
  const rgb = `rgb(${transformedCode.join(', ')})`
  return rgb
}

const randomRgb = () => {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)
  return `rgb(${red}, ${green}, ${blue})`
}

const rgbToHex = (rgb) => {
  const removeCarUsingRegex = rgb.replace(/[()rgb]/g, '')
  const rgbArr = removeCarUsingRegex.split(',').map(Number)
  let hexaCode = '#' + rgbArr.map((h) => h.toString(16).padStart(2, 0)).join('')
  return hexaCode
}

export { maximumLength, randomHexa, randomRgb, hexToRgb, rgbToHex }
