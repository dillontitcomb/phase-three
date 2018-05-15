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
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    let gameGrid;
    let tiles;
    let playerTile;
    const createGrid = (width, height) => {
      console.log("createGrid initiated")
      gameGrid = [];
      tiles = [];
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
          tiles.push(newTile);
        }
        gameGrid.push(gridRow);
      }
      tiles[7].spritePath = 'wall';
    }

    createGrid(d.gridWidth, d.gridHeight);
    this.setState({gameBoard: gameGrid, allTiles: tiles, playerTile: tiles[0]})
  }

  render(){
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
