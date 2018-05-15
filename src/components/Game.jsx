import React from 'react'
import { connect } from 'react-redux'
import Tile from './Tile'
import constants from './../constants'
const { c } = constants;
const { d } = constants;

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gameBoard: [],
      allTiles: [],
      playerTile: {}
    }

    this.createGrid = this.createGrid.bind(this);
  }

  createGrid(width, height){
    const gameGrid = [];
    for (let i=0; i<height; i++) {
      let gridRow = []
      for (let j=0; j<width; j++) {
        let newTile = {
          id: i*20+j,
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
        this.state.allTiles.push(newTile);
      }
      gameGrid.push(gridRow);
    }
    this.state.allTiles[0].player = true;
    return gameGrid;
  }
  
  render(){
    this.state.gameBoard = this.createGrid(d.gridWidth, d.gridHeight);
    console.log(this.state.allTiles[0]);
    this.state.allTiles[0].spritePath = 'wall';
      return(
        <div className="gameContainer">
          <div className="gridContainer">
          {Object.keys(this.state.allTiles).map(tileKey => {
            let tile = this.state.allTiles[tileKey];
            return <Tile spritePath={tile.spritePath} key={tile.id} />;
          })}

          </div>
          <style jsx>{`
          .gameContainer {
            margin: 0 auto;
          }

          .gridContainer {
            margin: 0 auto;
            border: 5px solid black;
            width: 720px;
            height: 720px;
            display: grid;
            grid-template-columns: repeat(20, 1fr);
            grid-template-rows: repeat(20, 1fr);
          }
          `}
          </style>
        </div>
    )
  }
}

export default connect()(Game);
