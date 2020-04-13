import React from 'react';
import PlayerContainer from './player-container'

const Player = ({ movieRequest }) => {
  const {} = PlayerContainer(movieRequest);
  return (
    <>
      <p>play the movie</p>
    </>
  );
};

export default Player;