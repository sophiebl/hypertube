import React from 'react';
import PlayerContainer from './player-container'
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  videoPlayer: {
    maxWidth: "100vw"
  },
}));

const Player = ({ movieRequest }) => {
  const { subs, player, token } = PlayerContainer(movieRequest);
  const classes = useStyles();
    const { torrentUrl, provider, quality, imdbId } = movieRequest;

  return (
    <>
      {torrentUrl && provider && quality && imdbId && token && player ? (
        <video controls className="width100">
          <source
            src={`http://localhost:8080/api/player/stream?token=${token}&provider=${provider}&id=${imdbId}&magnet=${torrentUrl}&quality=${quality}`}
            type="video/mp4"
          />
          {player && subs}
        </video>
      ) : null}
    </>
  );
};

export default Player;