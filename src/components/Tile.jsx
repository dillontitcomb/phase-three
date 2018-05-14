import React from 'react';
import PropTypes from 'prop-types';

function Tile(props){
  const renderTile =
    <div className="tile">
    </div>;

  return (
    <div>
      {renderTile}
      <style jsx>{`
			.tile {
         min-width: 50px;
         min-height: 50px;
      }
			`}</style>
    </div>
  );
}

Tile.propTypes = {

};

export default Tile;
