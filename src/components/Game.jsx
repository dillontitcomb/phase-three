import React from 'react'
import { connect } from 'react-redux'
import Tile from './Tile'
import constants from './../constants'

const { c } = constants;
const { d } = constants;

const createGrid = (width, height, tileArray) => {
  let gameGrid = [];
  for (let i=0; i<height; i++) {
    let gridRow = []
    for (let j=0; j<width; j++) {
      let newTile = {
        x: j,
        y: i,
        player: false,
        enemy: false,
        walkable: true,
        spritePath: 'ground',
        playerDirection: 'down',
        enemyDirection: 'down'
      }
      gridRow.push(newTile);
      tileArray.push(newTile);
    }
    gameGrid.push(gridRow);
  }
  return gameGrid;
}

class Game extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    gameBoard: [],
    tileArray: []
    }
  }

  render(){
    let allTiles = [];
    this.state.gameBoard = createGrid(d.gridWidth, d.gridHeight, allTiles);
    this.state.tileArray = allTiles;
    console.log(this.state.gameBoard);
    console.log(this.state.tileArray);
      return(
        <div className="gameContainer">
          <h1>THIS IS THE GAME COMPONENT</h1>
          <div>

          </div>
          <style jsx>{`

          `}
          </style>
        </div>
    )
  }
}

export default connect()(Game);
