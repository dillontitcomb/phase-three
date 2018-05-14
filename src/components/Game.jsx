import React from 'react'
import { connect } from 'react-redux'
import Tile from './Tile'
import constants from './../constants'

const { c } = constants;
const { d } = constants;

// const createGrid = () => {
//   let gameGrid = [];
//   for (let i=0; i<gameData.gridWidth; i++)
// }


class Game extends React.Component {
  constructor(props){
    super(props)
  this.state = {
  }
  }

  render(){
    console.log("HI!");
    console.log(c.MOVE_PLAYER);
    console.log(d.gridWidth);
      return(
        <div className="gameContainer">
          <h1>THIS IS THE GAME COMPONENT</h1>
          <h3>This is game width and height: {d.gridWidth}</h3>



          <style jsx>{`

          `}
          </style>
        </div>
    )
  }
}

export default connect()(Game);
