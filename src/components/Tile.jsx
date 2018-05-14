import React from 'react';
import PropTypes from 'prop-types';

function Tile(props){

  return (
    <div>
      <div className="tile">
      </div>
      <style jsx>{`
			.tile {
        background-color: red;
        width: 36px;
        height: 36px;
        margin: 0;
      }
			`}</style>
    </div>
  );
}

Tile.propTypes = {
  spritePath: PropTypes.string.isRequired
};

export default Tile;
