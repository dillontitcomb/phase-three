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
      currentGameBoard: [],
      currentAllTiles: [],
      lastActiveBoard: 'one',
      gameBoard: [],
      allTiles: [],
      layerTwoGrid: [],
      layerTwoTiles: [],
      layerThreeGrid: [],
      layerThreeTiles: [],
      playerTile: {}
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillMount() {
    let gameGrid;
    let tiles;
    let player;
    let layerTwoGrid;
    let layerTwoTiles;
    let layerThreeGrid;
    let layerThreeTiles;

    const createGrid = (width, height, levelBlueprint) => {
      gameGrid = [];
      tiles = [];
      layerTwoGrid = [];
      layerTwoTiles = [];
      layerThreeGrid = [];
      layerThreeTiles = [];
      for (let i=0; i<height; i++) {
        let gridRow = []
        let layerTwoGridRow = [];
        let layerThreeGridRow = [];
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
        let layerTwoTile = Object.assign({}, newTile);
        let layerThreeTile = Object.assign({}, newTile);
        switch(levelBlueprint[0][(i * width) + j]) {
          case 0: newTile.walkable = false
          break;
          case 1: newTile.spritePath = 'ground'
          break;
          case 2: newTile.spritePath = 'ground'
          break;
        }
        switch(levelBlueprint[1][(i * width) + j]) {
          case 0: layerTwoTile.walkable = false
          break;
          case 1: layerTwoTile.spritePath = 'ground'
          break;
          case 2: layerTwoTile.spritePath = 'ground'
          break;
        }
        switch(levelBlueprint[2][(i * width) + j]) {
          case 0: layerThreeTile.walkable = false
          break;
          case 1: layerThreeTile.spritePath = 'ground'
          break;
          case 2: layerThreeTile.spritePath = 'ground'
          break;
        }
        gridRow.push(newTile);
        tiles.push(newTile);
        layerTwoGridRow.push(layerTwoTile);
        layerTwoTiles.push(layerTwoTile);
        layerThreeGridRow.push(layerThreeTile);
        layerThreeTiles.push(layerThreeTile);
        }
        gameGrid.push(gridRow);
        layerTwoGrid.push(layerTwoGridRow);
        layerThreeGrid.push(layerThreeGridRow);
        gameGrid[0][0].player = true;
        player = gameGrid[0][0];
      }
    }
    createGrid(d.gridWidth, d.gridHeight, d.levelOne);
    this.setState({currentGameBoard: gameGrid, currentAllTiles: tiles, gameBoard: gameGrid, allTiles: tiles, playerTile: player, layerTwoGrid: layerTwoGrid, layerTwoTiles: layerTwoTiles, layerThreeGrid: layerThreeGrid, layerThreeTiles: layerThreeTiles});
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
          newTile = this.state.currentGameBoard[currentTile.y-1][currentTile.x];
          return newTile;
        case 'right':
          newTile = this.state.currentGameBoard[currentTile.y][currentTile.x+1];
          return newTile;
        case 'down':
          newTile = this.state.currentGameBoard[currentTile.y+1][currentTile.x];
          return newTile;
        case 'left':
          newTile = this.state.currentGameBoard[currentTile.y][currentTile.x-1];
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
        let new2dArray = Object.assign({}, this.state.currentGameBoard);
        let new1dArray = Object.assign({}, this.state.currentAllTiles);
        new2dArray[newTile.y][newTile.x] = newTile;
        new2dArray[adjacentTile.y][adjacentTile.x] = adjacentTile;
        new1dArray[getOneDimensionalArrayPosition(newTile, d.gridWidth)] = newTile;
        new1dArray[getOneDimensionalArrayPosition(adjacentTile, d.gridWidth)] = adjacentTile;
        this.setState({currentGameBoard: new2dArray, currentAllTiles: new1dArray, playerTile: adjacentTile})
      }
    }

// Switch to second grid view
    const changeGridLayers = (layer) => {
      switch(layer) {
        case 'one':
          if (this.state.lastActiveBoard === 'one') {
            //Do nothing
          } else if (this.state.lastActiveBoard === 'two'){
            //IF PREVIOUS BOARD WAS BOARD TWO, DO:
            //Create stand-in objects for currentBoard, currentTiles, newBoard, newTiles, currentPlayer
            let currentBoard = Object.assign({}, this.state.currentGameBoard);
            let currentTiles = Object.assign({}, this.state.currentAllTiles);
            let newBoard = Object.assign({}, this.state.gameBoard);
            let newTiles = Object.assign({}, this.state.allTiles);
            let currentPlayerTile = Object.assign({}, this.state.playerTile);
            //Import board data from new board, board one
            //& for tiles
            //Remove player tile data from previous board, board two
            currentBoard[currentPlayerTile.y][currentPlayerTile.x].player = false;
            //& for tiles
            currentTiles[getOneDimensionalArrayPosition(currentPlayerTile, d.gridWidth)].player = false;
            //Add player position to new board
            newBoard[currentPlayerTile.y][currentPlayerTile.x].player = true;
            //& for tiles
            newTiles[getOneDimensionalArrayPosition(currentPlayerTile, d.gridWidth)].player = true;
            //Create new playerTile with tile from current board
            let newCurrentPlayerTile = newBoard[currentPlayerTile.y][currentPlayerTile.x];
            //Save newBoard to currentGameBoard (+ tiles), currentPlayerTile to playerTile, currentBoard to layerTwoGrid (+ tiles)
            this.setState({currentGameBoard: newBoard, currentAllTiles: newTiles, layerTwoGrid: currentBoard, layerTwoTiles: currentTiles, lastActiveBoard: 'one', playerTile: newCurrentPlayerTile})
          } else if (this.state.lastActiveBoard === 'three') {
            //IF PREVIOUS BOARD WAS BOARD TWO, DO:
            //Create stand-in objects for currentBoard, currentTiles, newBoard, newTiles, currentPlayer
            let currentBoard = Object.assign({}, this.state.currentGameBoard);
            let currentTiles = Object.assign({}, this.state.currentAllTiles);
            let newBoard = Object.assign({}, this.state.gameBoard);
            let newTiles = Object.assign({}, this.state.allTiles);
            let currentPlayerTile = Object.assign({}, this.state.playerTile);
            //Import board data from new board, board one
            //& for tiles
            //Remove player tile data from previous board, board two
            currentBoard[currentPlayerTile.y][currentPlayerTile.x].player = false;
            //& for tiles
            currentTiles[getOneDimensionalArrayPosition(currentPlayerTile, d.gridWidth)].player = false;
            //Add player position to new board
            newBoard[currentPlayerTile.y][currentPlayerTile.x].player = true;
            //& for tiles
            newTiles[getOneDimensionalArrayPosition(currentPlayerTile, d.gridWidth)].player = true;
            //Create new playerTile with tile from current board
            let newCurrentPlayerTile = newBoard[currentPlayerTile.y][currentPlayerTile.x];
            //Save newBoard to currentGameBoard (+ tiles), currentPlayerTile to playerTile, currentBoard to layerTwoGrid (+ tiles)
            this.setState({currentGameBoard: newBoard, currentAllTiles: newTiles, layerThreeGrid: currentBoard, layerThreeTiles: currentTiles, lastActiveBoard: 'one', playerTile: newCurrentPlayerTile})
            //If previous board was layer one
          }
          break;
        case 'two':
          if (this.state.lastActiveBoard === 'two') {
            //Do nothing
          } else if (this.state.lastActiveBoard === 'one'){
            //IF PREVIOUS BOARD WAS BOARD TWO, DO:
            //Create stand-in objects for currentBoard, currentTiles, newBoard, newTiles, currentPlayer
            let currentBoard = Object.assign({}, this.state.currentGameBoard);
            let currentTiles = Object.assign({}, this.state.currentAllTiles);
            let newBoard = Object.assign({}, this.state.layerTwoGrid);
            let newTiles = Object.assign({}, this.state.layerTwoTiles);
            let currentPlayerTile = Object.assign({}, this.state.playerTile);
            //Import board data from new board, board one
            //& for tiles
            //Remove player tile data from previous board, board two
            currentBoard[currentPlayerTile.y][currentPlayerTile.x].player = false;
            //& for tiles
            currentTiles[getOneDimensionalArrayPosition(currentPlayerTile, d.gridWidth)].player = false;
            //Add player position to new board
            newBoard[currentPlayerTile.y][currentPlayerTile.x].player = true;
            //& for tiles
            newTiles[getOneDimensionalArrayPosition(currentPlayerTile, d.gridWidth)].player = true;
            //Create new playerTile with tile from current board
            let newCurrentPlayerTile = newBoard[currentPlayerTile.y][currentPlayerTile.x];
            //Save newBoard to currentGameBoard (+ tiles), currentPlayerTile to playerTile, currentBoard to layerTwoGrid (+ tiles)
            this.setState({currentGameBoard: newBoard, currentAllTiles: newTiles, gameBoard: currentBoard, allTiles: currentTiles, lastActiveBoard: 'two', playerTile: newCurrentPlayerTile})
          } else if (this.state.lastActiveBoard === 'three') {
            //IF PREVIOUS BOARD WAS BOARD TWO, DO:
            //Create stand-in objects for currentBoard, currentTiles, newBoard, newTiles, currentPlayer
            let currentBoard = Object.assign({}, this.state.currentGameBoard);
            let currentTiles = Object.assign({}, this.state.currentAllTiles);
            let newBoard = Object.assign({}, this.state.layerTwoGrid);
            let newTiles = Object.assign({}, this.state.layerTwoTiles);
            let currentPlayerTile = Object.assign({}, this.state.playerTile);
            //Import board data from new board, board one
            //& for tiles
            //Remove player tile data from previous board, board two
            currentBoard[currentPlayerTile.y][currentPlayerTile.x].player = false;
            //& for tiles
            currentTiles[getOneDimensionalArrayPosition(currentPlayerTile, d.gridWidth)].player = false;
            //Add player position to new board
            newBoard[currentPlayerTile.y][currentPlayerTile.x].player = true;
            //& for tiles
            newTiles[getOneDimensionalArrayPosition(currentPlayerTile, d.gridWidth)].player = true;
            //Create new playerTile with tile from current board
            let newCurrentPlayerTile = newBoard[currentPlayerTile.y][currentPlayerTile.x];
            //Save newBoard to currentGameBoard (+ tiles), currentPlayerTile to playerTile, currentBoard to layerTwoGrid (+ tiles)
            this.setState({currentGameBoard: newBoard, currentAllTiles: newTiles, layerThreeGrid: currentBoard, layerThreeTiles: currentTiles, lastActiveBoard: 'two', playerTile: newCurrentPlayerTile})
          }
          break;
        case 'three':
          if (this.state.lastActiveBoard === 'three') {
            //Do nothing
          } else if (this.state.lastActiveBoard === 'one'){
            //IF PREVIOUS BOARD WAS BOARD TWO, DO:
            //Create stand-in objects for currentBoard, currentTiles, newBoard, newTiles, currentPlayer
            let currentBoard = Object.assign({}, this.state.currentGameBoard);
            let currentTiles = Object.assign({}, this.state.currentAllTiles);
            let newBoard = Object.assign({}, this.state.layerThreeGrid);
            let newTiles = Object.assign({}, this.state.layerThreeTiles);
            let currentPlayerTile = Object.assign({}, this.state.playerTile);
            //Import board data from new board, board one
            //& for tiles
            //Remove player tile data from previous board, board two
            currentBoard[currentPlayerTile.y][currentPlayerTile.x].player = false;
            //& for tiles
            currentTiles[getOneDimensionalArrayPosition(currentPlayerTile, d.gridWidth)].player = false;
            //Add player position to new board
            newBoard[currentPlayerTile.y][currentPlayerTile.x].player = true;
            //& for tiles
            newTiles[getOneDimensionalArrayPosition(currentPlayerTile, d.gridWidth)].player = true;
            //Create new playerTile with tile from current board
            let newCurrentPlayerTile = newBoard[currentPlayerTile.y][currentPlayerTile.x];
            //Save newBoard to currentGameBoard (+ tiles), currentPlayerTile to playerTile, currentBoard to layerTwoGrid (+ tiles)
            this.setState({currentGameBoard: newBoard, currentAllTiles: newTiles, gameBoard: currentBoard, allTiles: currentTiles, lastActiveBoard: 'three', playerTile: newCurrentPlayerTile})
          } else if (this.state.lastActiveBoard === 'two') {
            //IF PREVIOUS BOARD WAS BOARD TWO, DO:
            //Create stand-in objects for currentBoard, currentTiles, newBoard, newTiles, currentPlayer
            let currentBoard = Object.assign({}, this.state.currentGameBoard);
            let currentTiles = Object.assign({}, this.state.currentAllTiles);
            let newBoard = Object.assign({}, this.state.layerThreeGrid);
            let newTiles = Object.assign({}, this.state.layerThreeTiles);
            let currentPlayerTile = Object.assign({}, this.state.playerTile);
            //Import board data from new board, board one
            //& for tiles
            //Remove player tile data from previous board, board two
            currentBoard[currentPlayerTile.y][currentPlayerTile.x].player = false;
            //& for tiles
            currentTiles[getOneDimensionalArrayPosition(currentPlayerTile, d.gridWidth)].player = false;
            //Add player position to new board
            newBoard[currentPlayerTile.y][currentPlayerTile.x].player = true;
            //& for tiles
            newTiles[getOneDimensionalArrayPosition(currentPlayerTile, d.gridWidth)].player = true;
            //Create new playerTile with tile from current board
            let newCurrentPlayerTile = newBoard[currentPlayerTile.y][currentPlayerTile.x];
            //Save newBoard to currentGameBoard (+ tiles), currentPlayerTile to playerTile, currentBoard to layerTwoGrid (+ tiles)
            this.setState({currentGameBoard: newBoard, currentAllTiles: newTiles, layerTwoGrid: currentBoard, layerTwoTiles: currentTiles, lastActiveBoard: 'three', playerTile: newCurrentPlayerTile})
          }
          break;
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
        case '1':
          changeGridLayers('one');
          break;
        case '2':
          changeGridLayers('two');
          break;
        case '3':
          changeGridLayers('three');
          break;
        default:
          //do nothing
      }
    }
  }


  render(){
      return(
        <div className="gameContainer">
          <div className="gridContainer">
          {Object.keys(this.state.currentAllTiles).map(tileKey => {
            let tile = this.state.currentAllTiles[tileKey];
            return <Tile tileObj={tile} key={tile.id} />;
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

export default connect()(Game);
