import React from 'react';
import PropTypes from 'prop-types';

function Tile(props){

  return (
    <div className={props.spritePath}>
      <style jsx>{`
			.ground {
        width: 36px;
        height: 36px;
        background-color: red;
      }
			`}</style>
    </div>
  );
}

Tile.propTypes = {
  spritePath: PropTypes.string.isRequired
};

export default Tile;
