import React from 'react';
import PropTypes from 'prop-types';

function Tile(props){
  const renderTile =
    <div className="tile">
      <p>{props.spritePath}</p>
    </div>;

  return (
    <div>
      {renderTile}
      <style jsx>{`
			.tile {
        background-color: "red";
        min-width: 50px;
        min-height: 50px;
      }
			`}</style>
    </div>
  );
}

Tile.propTypes = {
  spritePath: PropTypes.string.isRequired
};

export default Tile;
