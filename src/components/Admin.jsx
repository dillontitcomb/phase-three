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
    this.setLevelArray = this.setLevelArray.bind(this);
  }

  handleTileClick(tile) {
    let newTile = Object.assign({}, tile);
    if (newTile.player === true) {
      newTile.walkable= false;
      newTile.player = false;
    } else if (newTile.walkable === false) {
      newTile.enemy = true;
      newTile.walkable = true;
    } else if (newTile.enemy === true) {
      newTile.enemy = false;
      newTile.spritePath = 'wall';
    } else if (newTile.spritePath === 'wall') {
      newTile.spritePath = 'ground';
    } else if (newTile.spritePath === 'ground'){
      newTile.spritePath = '';
      newTile.player = true;
    }
    let currentBoard = Object.assign({}, this.state.gameBoard);
    let currentAllTiles = Object.assign({}, this.state.allTiles);
    currentBoard[newTile.y][newTile.x] = newTile;
    currentAllTiles[(newTile.y * d.gridWidth) + newTile.x] = newTile;
    this.setState({gameBoard: currentBoard, allTiles: currentAllTiles});
  }

  setLevelArray() {
    let outputArray = [];
    let currentArray = Object.assign([], this.state.allTiles);
    for (let i=0; i<currentArray.length; i++) {
      if (currentArray[i].player === true) {
        outputArray.push(0);
      } else if (currentArray[i].enemy === true){
        outputArray.push(1);
      } else if (currentArray[i].walkable === false) {
        outputArray.push(2);
      } else if (currentArray[i].spritePath === 'ground') {
        outputArray.push(3);
      } else if (currentArray[i].spritePath === 'wall') {
        outputArray.push(4);
      } else {
        outputArray.push(-1);
      }
    }
    this.setState({createdLevelArray: outputArray});
  }

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
        <h4 id="colors"><span id="white">White:</span> player, <span id="red">Red:</span> ground, <span id="blue">Blue:</span> wall, <span id="purple">Purple:</span> enemy, <span id="black">Black:</span> obstacle</h4>
        <button onClick={this.setLevelArray} type="button">Create Level Array</button>
        {(this.state.createdLevelArray.length > 0) ? <div className="level-array-container"><h4>Level Array</h4><h5>{this.state.createdLevelArray.join(", ")}</h5></div> : <span></span>}
          <div className="gridContainer">
          {Object.keys(this.state.allTiles).map(tileKey => {
            let tile = this.state.allTiles[tileKey];
            return <Tile clickTile={this.handleTileClick} tileObj={tile} key={tile.id} />;
          })}
          </div>
          <style jsx>{`
          .gameContainer {
            width: 1300px;
            height: 900px;
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

          .level-array-container {
            margin-top: 5px;
            margin-bottom: 5px;
            border: 2px solid black;
            padding: 5px;
          }
          h5 {
            width: 1280px;
            padding: 0px;
            margin: 0px;
          }
          h4 {
            margin: 0px;
            padding: 0px;
          }
          #colors {
            display: inline;
            text-align: center;
            max-width: 490px;
            background-color: lightgray;
            padding: 5px;
            margin: 0px;
          }
          #white {
            color: white;
          }
          #red {
            color: red;
          }
          #blue {
            color: blue;
          }
          #purple {
            color: purple;
          }
          #black {
            color: black;
          }
          button {
            width: 120px;
            height: 40px;
            background-color: red;
            color: white;
            display: inline;
            margin-bottom: 10px;
            margin-left: 10px;
          }
          `}
          </style>
        </div>
    )
  }
}

export default connect()(Admin);
