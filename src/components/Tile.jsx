import React from 'react';
import PropTypes from 'prop-types';

function Tile(props){

  return (
    <div className={props.spritePath} id={props.id}>
      <div></div>
      <style jsx>{`
			.ground {
        width: 20px;
        height: 20px;
        background-color: red;
      }
			`}</style>
    </div>
  );
}

Tile.propTypes = {
  spritePath: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default Tile;
