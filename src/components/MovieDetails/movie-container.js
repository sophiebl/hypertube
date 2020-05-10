import axios from 'axios'
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App/AuthContext";
import { toast } from 'react-toastify';

const MovieContainer = (imdbId) => {
  const { authContext } = useContext(AuthContext);
    console.log('|||||||||authContext|||||||||');
    console.log(authContext);
  const { token } = authContext;
  const [movieDetails, setMovieDetails] = useState({})
  const [showModal, setShowModal] = useState(false);
  const [movieRequest, setMovieRequest] = useState({torrentUrl: null, provider: null, quality: null, imdbId: null})
  const [comment, setComment] = useState('');
  // const [handleComment, setHandleComment] = useState('');
  // const [sendComment, setSendComment] = useState('');
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
      "/api/movies/find/" +
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
      console.log('||||||||values|||||||||')
      console.log(values)
      const YTSTorrents = values[0].torrents
      console.log('YTSTorrents')
      console.log(YTSTorrents)
      const popCornTorrents = values[1].torrents
      setMovieDetails({
        ...values[2],
        ...values[0],
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

  const handleComment = event => {
    console.log('handle comment')
    setComment(event.target.value);
  };

  const sendComment = event => {
    console.log('send Comment')
        if (event) {
          event.preventDefault();
          axios
            .post(
              `/api/movies/${imdbId}/comments`,
              {
                comment: comment,
              },
              {
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                  Authorization: "JWT " + token,
                },
              },
            )
            .then(({ data }) => {
              if (data.created === true) {
                toast.success(data.message);
                setComment('');
              } else {
                toast.error(data.message);
              }
            });
        }
  };

  // const sendComment = () => {
  //   if (comment !== '') {
  //     setComment('');
  //   }
  // };

  return {
    movieDetails,
    openPlayer,
    showModal,
    setShowModal,
    movieRequest,
    setMovieRequest,
    imdbId,
    comment,
    handleComment,
    sendComment
  };
}

export default MovieContainer