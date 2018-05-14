import constants from './../constants/index.js'

export default (state = {}, action) => {
  const { c } = constants
  switch (action.type) {
  case c.MOVE_PLAYER:
    // console.log("MOVE PLAYER");
    // currentTile = {x:2, y:2};
    return state
  case c.SAY_HI:
    // console.log("HIII");
    // state = {x:1, y:1};
    return state
  default:
    return state
  }
}
