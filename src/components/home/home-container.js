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
    rating: 0,
    year: [1930, 2020],
    genre: "",
    sort: "",
  });
  const [searchResult, setSearchResult] = useState(null);
  const [emptyResult, setEmptyResult] = useState(false);
  const {
    authContext: { userData },
  } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [debouncedCallback] = useDebouncedCallback(() => {
    fetchSearch();
  });

  useEffect(() => {
    // fetchYTSApiTrending();
    fetchSearch();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearFilters = () => {
    setSearchOptions({
      name: "",
      rating: 0,
      year: [1930, 2020],
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

  const handleSort = (event, filteredResult) => {
    let sortChoice = "";
    if (event) {
      sortChoice = event.target.value;
    } else {
      sortChoice = searchOptions.sort;
    }
    let order = "";
    switch (sortChoice) {
      case "ratingAsc":
        order = "asc";
        break;
      case "ratingDesc":
        order = "desc";
        break;
      case "yearAsc":
        order = "asc";
        break;
      case "yearDesc":
        order = "desc";
        break;
      default:
    }
    const newSearchOptions = { ...searchOptions, sort: sortChoice };
    setSearchOptions(newSearchOptions);
    setSearchResult(
      _.orderBy(
        filteredResult ? filteredResult : searchResult,
        [
          (result) => {
            switch (sortChoice) {
              case "ratingAsc":
                return result.rating;
              case "ratingDesc":
                return result.rating;
              case "yearAsc":
                return result.year;
              case "yearDesc":
                return result.year;
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
    if (type === "name" || type === "genre") {
      debouncedCallback();
    }
  };

  const filterSearch = (result) => {
    const filteredResult = _.filter(result, (movie) => {
      return (
        (searchOptions.genre === "" ||
          movie.genres.includes(searchOptions.genre)) &&
        movie.year >= searchOptions.year[0] &&
        movie.year <= searchOptions.year[1]
      );
    });
    return filteredResult;
  };

  const fetchSearch = (page) => {
    console.log({ page });
    const queryString = `limit=50&page=${page}&minimum_rating=${searchOptions.rating}&query_term=${searchOptions.name}&sort_by=title&order_by=asc`;
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
            const filteredResult = filterSearch(result.data.data.movies);
            setSearchResult(filteredResult);

            if (searchOptions.sort) handleSort(null, filteredResult);
            return searchResult;
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
    page,
    setPage,
  };
};

export default HomeContainer;
