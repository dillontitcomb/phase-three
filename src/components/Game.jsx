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
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillMount() {
    let gameGrid;
    let tiles;
    let playerTile;
    const createGrid = (width, height) => {
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

  componentDidMount() {
//Get 1d array position from tile
    const getOneDimensionalArrayPosition = (currentTile, gridWidth) => {
      let output = ((currentTile.y * gridWidth) + currentTile.x);
      return output;
    }
//Get tile adjacent to current tile by direction
    const findTileFromCurrentTile = (direction, currentTile) => {
      switch(direction) {
        case 'up':
          console.log("up!");
          return this.state.gameBoard[currentTile.y+1][currentTile.x]
        case 'right':
          return this.state.gameBoard[currentTile.y][currentTile.x+1]
        case 'down':
          return this.state.gameBoard[currentTile.y-1][currentTile.x]
        case 'left':
          return this.state.gameBoard[currentTile.y][currentTile.x-1]
      }
    }
//Move player on keypress
    window.onkeydown = (event) => {
      if (event.key === "ArrowRight") {
        let newTile = Object.assign({}, this.state.playerTile);
        newTile.player = false;
        console.log("does newTile player = true?");
        console.log(newTile.player);
        let tileToRight = findTileFromCurrentTile('right', newTile);
        tileToRight.player = true;
        // console.log("Current tile and tile to right:");
        // console.log(newTile);
        // console.log(tileToRight);
        let new2dArray = Object.assign({}, this.state.gameBoard);
        let new1dArray = Object.assign({}, this.state.allTiles);
        new2dArray[newTile.y][newTile.x] = newTile;
        new2dArray[tileToRight.y][tileToRight.x] = tileToRight;
        console.log(newTile.id);
        console.log(tileToRight.id);
        console.log("old 1d tile positions: 0 and 1")
        console.log("new 1d tile positions")
        console.log(getOneDimensionalArrayPosition(newTile, d.gridWidth))
        console.log(getOneDimensionalArrayPosition(tileToRight, d.gridWidth))
        new1dArray[getOneDimensionalArrayPosition(newTile, d.gridWidth)] = newTile;
        new1dArray[getOneDimensionalArrayPosition(tileToRight, d.gridWidth)] = tileToRight;
        // console.log("New current tile and new player tile to right:");
        // console.log(new2dArray[newTile.y][newTile.x])
        // console.log(new2dArray[tileToRight.y][tileToRight.x]);
        this.setState({gameBoard: new2dArray, allTiles: new1dArray, playerTile: tileToRight})
        console.log(this.state);
      }
    }
  }


  render(){
      return(
        <div className="gameContainer">
          <div className="gridContainer">
          {Object.keys(this.state.allTiles).map(tileKey => {
            let tile = this.state.allTiles[tileKey];
            return <Tile tileObj={tile} key={tile.id} />;
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
