import React from 'react';
import PropTypes from 'prop-types';

function Tile(props){
  let newClassName;
  if (props.tileObj.player === true) {
    newClassName = 'player';
  } else if (props.tileObj.spritePath === 'ground') {
    newClassName = 'ground';
  } else if (props.tileObj.spritePath === 'wall') {
    newClassName = 'wall';
  }
  return (
    <div className={newClassName}>
      <p>x:{props.tileObj.x} y:{props.tileObj.y}</p>
      <style jsx>{`
      div {
        width: 36px;
        height: 36px;
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
			`}</style>
    </div>
  );
}

Tile.propTypes = {
  tileObj: PropTypes.object.isRequired
};

export default Tile;
