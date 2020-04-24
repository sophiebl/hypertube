import _ from "lodash";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../App/AuthContext";

const HomeContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [trendingMovies, setTrendingMovies] = useState(null);
  const {
    authContext: { userData },
  } = useContext(AuthContext);

  useEffect(() => {
    fetchYTSApiTrending();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = () => {
    userData
      .then((response) => {
        setUserInfo(response);
        setLoaded(true);
      })
      .catch((error) => {
        if (process.env.REACT_APP_VERBOSE === "true") console.log(error);
      });
  };

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    window.location = "/?message=login_success";
  };

  const fetchTMDPApi = () => {
    axios
      .get(`/api/home/fetchTMDPApi`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2M1MGU5NmIzMjIzNDMzNDkwMmQ2YWExZGZjYjM5OSIsInN1YiI6IjVlOTliNGQ4ZmRmOGI3MDAxYWE0YTUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j1ctA9Te_3qxM9ezjwquO9lvVIhlcEcBb0Ft9GCR4ug",
        },
      })
      .then((data) => console.log(data));
  };

  const fetchYTSApiTrending = () => {
    axios
      .get(`https://yts.mx/api/v2/list_movies.json?sort_by=rating`)
      .then((result) => {
        if (result.data && result.data.status === "ok") {
          // console.log(result.data.data.movies);
          setTrendingMovies(result.data.data.movies);
          return result.data.data.movies;
        } else {
          console.log("nope");
          return false;
        }
      });
  };

  if (_.isEmpty(userInfo) && loaded === false) {
    fetchProfile();
  }

  return {
    userInfo,
    loaded,
    saveToken,
    fetchTMDPApi,
    fetchYTSApiTrending,
    trendingMovies,
  };
};

export default HomeContainer;
