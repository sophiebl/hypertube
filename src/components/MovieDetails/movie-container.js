import axios from 'axios'
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App/AuthContext";

const MovieContainer = (imdbId) => {
  const { authContext } = useContext(AuthContext);
  const { token } = authContext;
  const [movieDetails, setMovieDetails] = useState({})
  const [showModal, setShowModal] = useState(false);
  const [movieRequest, setMovieRequest] = useState({torrentUrl: null, provider: null, quality: null, imdbId: null})
  const fetchYTS = axios
    .get("https://yts.mx/api/v2/list_movies.json?query_term=" + imdbId)
    .then((result) => {
      if (
        result.data &&
        result.data.status === "ok" &&
        result.data.data.movie_count >= 1
      ) {
        return result.data.data.movies[0];
      } else {
        return false;
      }
    });

  const fetchPopCorn = axios
    .get(
      "https://cors-anywhere.herokuapp.com/movies-v2.api-fetch.sh/movie/" +
        imdbId
    )
    .then((result) => {
      if (result.data) {
        return result.data;
      } else {
        return false;
      }
    });

  const fetchTMDB = axios
    .get(
      "/api/movies/find/tt0371746" +
      imdbId
    )
    .then((result) => {
      if (result.data) {
        return result.data;
      } else {
        return false;
      }
    });

  useEffect(() => {
    Promise.all([fetchYTS, fetchPopCorn, fetchTMDB]).then(values => {
      console.log(values)
      const {
        title,
        overview: synopsis,
        poster_path
      } = values[0]
      const YTSTorrents = values[0].torrents
      const popCornTorrents = values[1].torrents
      setMovieDetails({
        title,
        synopsis,
        poster_path,
        popCornTorrents,
        YTSTorrents,
      });
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openPlayer = (torrentUrl, provider, quality) => {
    setMovieRequest({
      torrentUrl,
      provider,
      quality,
      imdbId,
    });
    setShowModal(true)
  }

  return {
    movieDetails,
    openPlayer,
    showModal,
    setShowModal,
    movieRequest,
    setMovieRequest,
  };
}

export default MovieContainer