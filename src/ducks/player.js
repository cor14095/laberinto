import React from 'react'
import { fromJS } from 'immutable'

//Actions
const SET_PLAYER = 'SET_PLAYER'
const MOVE_PLAYER = 'MOVE_PLAYER'
const SET_LABRYNTH = 'SET_LABRYNTH'

// labrynth
let grid = []

//Action Creator
export const setLabrynth = (labrynth) => {
  return {
    type: SET_LABRYNTH,
    labrynth
  }
}

export const setPlayer = (position) => {
  return {
    type: SET_PLAYER,
    position
  }
}

export const movePlayer = (direction) => {
  return {
    type: MOVE_PLAYER,
    direction
  }
}

const defaultState = fromJS({
  grid: grid,
  position: {
    x: 0,
    y: 0
  }
})

//Reducer
const reducer = (state=defaultState, action={}) => {
  switch(action.type){
    case SET_PLAYER:
      console.log(action);
      return state.set('position', fromJS(action.position))
    case MOVE_PLAYER:
      console.log(action);
      let x = Number(state.getIn(['position', 'x'])) + action.direction.x
      let y = Number(state.getIn(['position', 'y'])) + action.direction.y
      let position = state.getIn(['grid', x, y])
      if(position === ' '){
        const s1 = state.setIn(['grid', state.getIn(['position', 'x']), state.getIn(['position', 'y'])], ' ')
        const s2 = s1.setIn(['grid', x, y], 'p')
        return s2.set('position', fromJS({ x, y }))
      }else if(position === 'g'){
        alert('Has ganado!\nFelicidades!\n\nLa pagina se refrescara al precionar el boton y tendras otro desafio!')
        location.reload();
      }
      return state
    case SET_LABRYNTH:
      console.log(action);
      return state.set('grid', fromJS(action.labrynth))
    default:
      return state
  }
}

export default reducer
