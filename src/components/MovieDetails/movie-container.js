import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App/AuthContext";
import { toast } from "react-toastify";

const MovieContainer = (imdbId) => {
  const { authContext } = useContext(AuthContext);
  const { token } = authContext;
  const [movieDetails, setMovieDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [movieRequest, setMovieRequest] = useState({
    torrentUrl: null,
    provider: null,
    quality: null,
    imdbId: null,
  });
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

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

  const fetchTMDB = axios.get("/api/movies/find/" + imdbId).then((result) => {
    if (result.data) {
      return result.data;
    } else {
      return false;
    }
  });

  const fetchComments = axios
    .get(`/api/movies/${imdbId}/comments`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "JWT " + token,
      },
    })
    .then((result) => {
      if (result.data) {
        console.log("result.data ::::::::::::::::::::::::::::::::::::");
        console.log(result.data);
        return result.data;
      } else {
        return false;
      }
    });

  useEffect(() => {
    Promise.all([fetchYTS, fetchPopCorn, fetchTMDB, fetchComments]).then(
      (values) => {
        const YTSTorrents = values[0].torrents;
        const popCornTorrents = values[1].torrents;
        setCommentsList(values[3]);
        setMovieDetails({
          ...values[2],
          ...values[0],
          popCornTorrents,
          YTSTorrents,
        });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPlayer = (torrentUrl, provider, quality) => {
    setMovieRequest({
      torrentUrl,
      provider,
      quality,
      imdbId,
    });
    setShowModal(true);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const sendComment = (event) => {
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
              "Content-type": "application/json; charset=UTF-8",
              Authorization: "JWT " + token,
            },
          }
        )
        .then(({ data }) => {
          if (data.created === true) {
            setCommentsList([...commentsList, { content: comment }]);
            toast.success(data.message);
            setComment("");
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
    sendComment,
    commentsList,
  };
};

export default MovieContainer;
