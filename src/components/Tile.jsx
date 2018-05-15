import React from 'react';
import PropTypes from 'prop-types';

function Tile(props){

  return (
    <div className={props.spritePath}>
      <p>x:{props.x} y:{props.y}</p>
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
			`}</style>
    </div>
  );
}

Tile.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  spritePath: PropTypes.string.isRequired
};

export default Tile;
