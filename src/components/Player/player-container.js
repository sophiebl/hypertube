import axios from 'axios'
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App/AuthContext";

const PlayerContainer = (movieRequest) => {
  const { authContext } = useContext(AuthContext);
  const { token } = authContext;
  const [subs, setSubs] = useState([]);
  const [player, setPlayer] = useState(false);
  const {
    torrentUrl,
    provider,
    quality,
    imdbId,
  } = movieRequest;
  useEffect(() => {
    if (token) {
      axios
        .get(`/api/player/subtitles/${imdbId}`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: "JWT " + token,
          },
        })
        .then((res) => {
          console.log(res)
          setSubs(
            res.data.map((e, index) => (
              <track
                key={index}
                kind="subtitles"
                srcLang={e.lang}
                src={e.path}
              />
            ))
          );
          if (res.status === 200) setPlayer(true);
        })
        .catch((err) => console.log(err));
    }
  }, [token, imdbId]);
  return { subs, player, token };
}

export default PlayerContainer