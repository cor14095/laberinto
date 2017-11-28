import React from 'react'

const blockStyleColor = (color, border) => ({
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    backgroundColor: color,
    width: '2vw',
    height: '3vh',
    display: 'inline-block',
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    border: border,
})

const blockStyle = (text) => {
  switch(text){
    case '+':
      return blockStyleColor('gray', '1px dotted brown')
    case ' ':
      return blockStyleColor('green', 'none')
    case 'g':
      return blockStyleColor('red', '1px solid yellow')
    case 'p':
      return blockStyleColor('blue', '1px solid yellow')
    default:
      return blockStyleColor('gray', '1px dotted brown')
  }
}

const Block = ({ text }) => (
  <div style={blockStyle(text)} >
  </div>
)

export default Block
