import _ from "lodash";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { AuthContext } from "../App/AuthContext";

const HomeContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [searchOptions, setSearchOptions] = useState({
    name: "",
    rating: 0,
    year: [1930, 2020],
    genre: "",
    sort: "",
  });
  const [searchResult, setSearchResult] = useState([]);
  const [emptyResult, setEmptyResult] = useState(false);
  const {
    authContext: { userData, token },
  } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [moreMovies, setMoreMovies] = useState(true);
  const [debouncedCallback] = useDebouncedCallback(() => {
    fetchSearch(false);
  });

  useEffect(() => {
    fetchSearch(false, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setPage(1);
      debouncedCallback();
    }
  };

  const filterSearch = (result) => {
    const filteredResult = _.filter(result, (movie) => {
      return (
        (searchOptions.genre === "" ||
          movie.genres.includes(searchOptions.genre)) &&
        movie.year >= searchOptions.year[0] &&
        movie.year <= searchOptions.year[1] &&
        movie.rating >= searchOptions.rating
      );
    });
    return filteredResult;
  };

  const fetchSearch = (scroll = false, trending = false) => {
    const fetchPopCorn = axios
      .get(
        "https://cors-anywhere.herokuapp.com/movies-v2.api-fetch.sh/movies/" +
          `${page}?keywords=${searchOptions.name}&sort=${
            trending ? "rating" : "name"
          }&order=${trending ? "-1" : "1"}`
      )
      .then((result) => {
        if (result.data) {
          return result.data.map((movie) => {
            return {
              imdb_code: movie.imdb_id,
              medium_cover_image: movie.images.poster,
              rating: movie.rating.percentage / 10,
              title: movie.title,
              genres: movie.genres.map(
                (genre) => genre.charAt(0).toUpperCase() + genre.slice(1)
              ),
              year: movie.year,
            };
          });
        } else {
          return false;
        }
      });

    const fetchYTS = axios
      .get(
        `https://yts.mx/api/v2/list_movies.json?` +
          `limit=50&page=${page}&minimum_rating=${
            searchOptions.rating
          }&query_term=${searchOptions.name}&sort_by=${
            trending ? "rating" : "title"
          }&order_by=${trending ? "des" : "asc"}`
      )
      .then((result) => {
        if (result.data) {
          return result.data;
        } else {
          return false;
        }
      });

    const fetchWatchedMovies = axios
      .get(`/api/movies/findwatched`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "JWT " + token,
        },
      })
      .then((result) => {
        if (result.data) {
          return result.data;
        } else {
          return false;
        }
      });
    Promise.all([fetchYTS, fetchPopCorn, fetchWatchedMovies]).then((values) => {
      const result = values[0];
      const YTSMovies = values[0].data.movies;
      const popCornMovies = values[1];
      const watchedMovies = values[2];
      const mergedResult = _.uniqBy(
        _.concat(scroll ? searchResult : [], YTSMovies, popCornMovies),
        "imdb_code"
      ).map((movie) => {
        return { ...movie, watched: watchedMovies.includes(movie?.imdb_code) };
      });
      if (result?.status === "ok") {
        if (result?.data.movie_count === 0) {
          setEmptyResult(true);
          return;
        }
        if (!result.data.movies) {
          setMoreMovies(false);
        } else {
          setEmptyResult(false);
          result.data.movie_count <= 50
            ? setMoreMovies(false)
            : setMoreMovies(true);
          const filteredResult = filterSearch(mergedResult);
          setSearchResult(filteredResult);
          if (searchOptions.sort) handleSort(null, filteredResult);
        }
      } 
    });
  };

  if (_.isEmpty(userInfo) && loaded === false) {
    fetchProfile();
  }

  return {
    saveToken,
    searchOptions,
    handleSort,
    handleChangeInput,
    fetchSearch,
    searchResult,
    emptyResult,
    clearFilters,
    page,
    setPage,
    moreMovies,
  };
};

export default HomeContainer;
