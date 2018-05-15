import React from 'react';
import PropTypes from 'prop-types';

function Tile(props){

  return (
    <div className={props.spritePath}>
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
        background-color: black;
      }
			`}</style>
    </div>
  );
}

Tile.propTypes = {
  spritePath: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    spritePath: state.user['email'],
    currentUserName: state.user['name']
  }
}

export default Tile;
