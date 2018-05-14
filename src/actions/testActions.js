import constants from './../constants'
const { c } = constants

export const movePlayer = () => {
  return {
    type: c.MOVE_PLAYER,
  }
}

export const sayHi = () => {
  return {
    type: c.sayHi
  }
}
