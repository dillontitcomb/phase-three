import React from 'react'
import { connect } from 'react-redux'
import Tile from './Tile'
import constants from './../constants'
const { c } = constants;
const { d } = constants;

class Admin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentGameBoard: [],
      currentAllTiles: [],
      gameBoard: [],
      allTiles: [],
      playerTile: {},
      createdLevelArray: []
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    // this.setLevelArray = this.setLevelArray.bind(this);
  }

  handleTileClick(tile) {
    let newTile = Object.assign({}, tile);
    if (newTile.player === true) {
      newTile.player = false;
      newTile.enemy = true;
    } else if (newTile.enemy === true) {
      newTile.enemy = false;
      newTile.walkable = false;
    } else if (newTile.walkable === false) {
      newTile.walkable = true;
      newTile.spritePath = 'ground';
    } else if (newTile.spritePath === 'ground') {
      newTile.spritePath = 'wall';
    } else {
      newTile.player = true
    }
    let currentBoard = Object.assign({}, this.state.gameBoard);
    let currentAllTiles = Object.assign({}, this.state.allTiles);
    currentBoard[newTile.y][newTile.x] = newTile;
    currentAllTiles[(newTile.y * d.gridWidth) + newTile.x] = newTile;
    this.setState({gameBoard: currentBoard, allTiles: currentAllTiles});
  }

  // setLevelArray() {
  //   // let outputArray = [];
  //   // for(let i=0; i<this.state.allTiles.length; i++) {
  //   //   if ()
  //   // }
  // }

  componentWillMount() {
    let gameGrid;
    let tiles;
    let player;
    const createGrid = (width, height, levelBlueprint) => {
      gameGrid = [];
      tiles = [];
      for (let i=0; i<height; i++) {
        let gridRow = []
        for (let j=0; j<width; j++) {
          let newTile = {
            id: i*width+j,
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
        gameGrid[0][0].player = true;
        player = gameGrid[0][0];
      }
    }
    createGrid(d.gridWidth, d.gridHeight, d.levelOne);
    this.setState({gameBoard: gameGrid, allTiles: tiles, playerTile: player});
  }

  componentDidMount() {
    console.log(this.state);

//Get 1d array position from tile
    const getOneDimensionalArrayPosition = function(currentTile, gridWidth){
      let output = ((currentTile.y * gridWidth) + currentTile.x);
      return output;
    }
//Get tile adjacent to current tile by direction
    const findTileFromCurrentTile = (direction, currentTile) => {
      let newTile;
      switch(direction) {
        case 'up':
          newTile = this.state.gameBoard[currentTile.y-1][currentTile.x];
          return newTile;
        case 'right':
          newTile = this.state.gameBoard[currentTile.y][currentTile.x+1];
          return newTile;
        case 'down':
          newTile = this.state.gameBoard[currentTile.y+1][currentTile.x];
          return newTile;
        case 'left':
          newTile = this.state.gameBoard[currentTile.y][currentTile.x-1];
          return newTile;
        default:
          //Do nothing
      }
    }
//Move player to adjacent tile
    const movePlayerOneTile = (direction) => {
      let newTile = Object.assign({}, this.state.playerTile);
      let adjacentTile = Object.assign({}, findTileFromCurrentTile(direction, newTile));
      if (adjacentTile.walkable) {
        newTile.player = false;
        adjacentTile.player = true;
        let new2dArray = Object.assign({}, this.state.gameBoard);
        let new1dArray = Object.assign({}, this.state.allTiles);
        new2dArray[newTile.y][newTile.x] = newTile;
        new2dArray[adjacentTile.y][adjacentTile.x] = adjacentTile;
        new1dArray[getOneDimensionalArrayPosition(newTile, d.gridWidth)] = newTile;
        new1dArray[getOneDimensionalArrayPosition(adjacentTile, d.gridWidth)] = adjacentTile;
        this.setState({gameBoard: new2dArray, allTiles: new1dArray, playerTile: adjacentTile})
      }
    }

//Move player on keypress
    window.onkeydown = function(event){
      event.preventDefault();
      switch(event.key) {
        case 'ArrowUp':
          movePlayerOneTile('up');
          break;
        case 'ArrowRight':
          movePlayerOneTile('right');
          break;
        case 'ArrowDown':
          movePlayerOneTile('down');
          break;
        case 'ArrowLeft':
          movePlayerOneTile('left');
          break;
        default:
          //do nothing
      }
    }
  }

  render(){
      return(
        <div className="gameContainer">
        <h3>White: player, Red: ground, Blue: wall, Purple: enemy, Obstacle: black</h3>
          <div className="gridContainer">
          {Object.keys(this.state.allTiles).map(tileKey => {
            let tile = this.state.allTiles[tileKey];
            return <Tile clickTile={this.handleTileClick} tileObj={tile} key={tile.id} />;
          })}
          </div>
          <style jsx>{`
          .gameContainer {
            width: 1300px;
            height: 740px;
            margin: 0 auto;
          }

          .gridContainer {
            margin: 0 auto;
            border: 0px solid black;
            width: 1280px;
            height: 720px;
            display: grid;
            grid-template-columns: repeat(32, 1fr);
            grid-template-rows: repeat(18, 1fr);
          }
          `}
          </style>
        </div>
    )
  }
}

export default connect()(Admin);
