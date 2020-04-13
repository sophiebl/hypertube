import React from 'react';
import PlayerContainer from './player-container'
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  videoPlayer: {
    maxWidth: "100vw"
  },
}));

const Player = ({ movieRequest }) => {
  const { subs, player } = PlayerContainer(movieRequest);
  const classes = useStyles();
    const { torrentUrl, provider, quality, imdbId } = movieRequest;

  return (
    <>
      <p>
        {imdbId} - {torrentUrl}- {provider}- {quality}
      </p>
      {torrentUrl && provider && quality && imdbId ? (
        <video controls>
          <source
            src={`http://localhost:8080/api/player/stream?provider=${provider}&id=${imdbId}&magnet=${torrentUrl}&quality=${quality}`}
            type="video/mp4"
          />
          {player && subs}
        </video>
      ) : null}
    </>
  );
};

export default Player;