import React from 'react';
import PropTypes from 'prop-types';

function Tile(props){
  let newClassName;
  if (props.tileObj.player === true) {
    newClassName = 'player';
  } else if (props.tileObj.enemy === true){
    newClassName = 'enemy';
  } else if (props.tileObj.walkable === false){
    newClassName = 'obstacle';
  } else if (props.tileObj.spritePath === 'ground') {
    newClassName = 'ground';
  } else if (props.tileObj.spritePath === 'wall') {
    newClassName = 'wall';
  }
  return (
    <div className={newClassName}>
      <style jsx>{`
      div {
        width: 40px;
        height: 40px;
        margin: 0px;
        padding: 0px;
      }
      .ground {
        background-color: red;
      }
      .wall {
        background-color: blue;
      }
      .player {
        background-color: white;
      }
      .obstacle {
        background-color: black;
      }
      .enemy {
        background-color: cornflowerblue;
      }
			`}</style>
    </div>
  );
}

Tile.propTypes = {
  tileObj: PropTypes.object.isRequired
};

export default Tile;
