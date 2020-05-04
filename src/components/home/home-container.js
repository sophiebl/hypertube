import _ from "lodash";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { AuthContext } from "../App/AuthContext";

const HomeContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [searchOptions, setSearchOptions] = useState({
    name: "",
    rating: [0, 10],
    year: [1900, 2020],
    genre: "",
    sort: "",
  });
  const [searchResult, setSearchResult] = useState(null);
  const [emptyResult, setEmptyResult] = useState(false);
  const {
    authContext: { userData },
  } = useContext(AuthContext);

  const [debouncedCallback] = useDebouncedCallback(() => {
    fetchSearch();
  });

  useEffect(() => {
    fetchYTSApiTrending();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearFilters = () => {
    setSearchOptions({
      name: "",
      rating: [0, 10],
      year: [1900, 2020],
      genre: "",
      sort: "",
    });
    setEmptyResult(false);
  };

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
          // console.log(trendingMovies);
          return result.data.data.movies;
        } else {
          console.log("nope");
          return false;
        }
      });
  };

  const handleSort = (event, profiles = searchResult) => {
    let sortChoice = "";
    if (event) {
      sortChoice = event.target.value;
    } else {
      sortChoice = searchOptions.sort;
    }
    let order = "";
    switch (sortChoice) {
      case "distance":
        order = "asc";
        break;
      case "ageAsc":
        order = "asc";
        break;
      case "ageDesc":
        order = "desc";
        break;
      case "popularity":
        order = "desc";
        break;
      case "interests":
        order = "asc";
        break;
      default:
    }
    const newSearchOptions = { ...searchOptions, sort: sortChoice };
    setSearchOptions(newSearchOptions);
    setSearchResult(
      _.orderBy(
        profiles,
        [
          (profile) => {
            switch (sortChoice) {
              case "distance":
                return profile.distance;
              case "ageAsc":
                return profile.age;
              case "ageDesc":
                return profile.age;
              case "popularity":
                return profile.popularityRate;
              case "interests":
                return profile.interests[0] ? profile.interests[0] : "ZZZZ";
              default:
            }
          },
        ],
        [order]
      )
    );
  };

  const handleChangeInput = (type, newValue) => {
    const newSearchOptions = { ...searchOptions, [type]: newValue };
    setSearchOptions(newSearchOptions);
    if (type === "name") {
      debouncedCallback();
    }
    if (type === "genre") debouncedCallback();
  };

  const filterSearch = (result) => {
    // console.log({ result });
    // console.log(searchOptions.genre);
    const filteredResult = _.filter(result, (movie) => {
      return (
        movie.genres.includes(searchOptions.genre) &&
        movie.year >= searchOptions.year[0] &&
        movie.year <= searchOptions.year[1]
      );
    });
    return filteredResult;
  };

  const fetchSearch = () => {
    const queryString = `minimum_rating=${searchOptions.rating[0]}&query_term=${searchOptions.name}&sort_by=title&order_by=asc`;
    console.log({ queryString });
    axios
      .get(`https://yts.mx/api/v2/list_movies.json?${queryString}`)
      .then((result) => {
        if (result.data && result.data.status === "ok") {
          if (result.data.data.movie_count === 0) {
            console.log("pas de film deso");
            setEmptyResult(true);
            return false;
          } else {
            setEmptyResult(false);
            // const filteredResult = filterSearch(result.data.data.movies);
            // console.log({ filteredResult });
            // setSearchResult(filteredResult);
            console.log(result.data.data.movies);
            setSearchResult(result.data.data.movies);
            // console.log({ searchResult });
            // console.log(result.data.data.movies);
            return result.data.data.movies;
          }
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
    saveToken,
    // fetchTMDPApi,
    trendingMovies,
    searchOptions,
    handleSort,
    handleChangeInput,
    fetchSearch,
    debouncedCallback,
    searchResult,
    emptyResult,
    setEmptyResult,
    clearFilters,
  };
};

export default HomeContainer;
