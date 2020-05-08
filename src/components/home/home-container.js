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
  const [searchResult, setSearchResult] = useState([]);
  const [emptyResult, setEmptyResult] = useState(false);
  const {
    authContext: { userData },
  } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [moreMovies, setMoreMovies] = useState(true);
  const [debouncedCallback] = useDebouncedCallback(() => {
    fetchSearch(false, "debounced");
  });

  useEffect(() => {
    // fetchYTSApiTrending();
    fetchSearch(false, "use effect");
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
        movie.year <= searchOptions.year[1]
      );
    });
    return filteredResult;
  };

  const fetchSearch = (scroll = false, who) => {
    console.log({ who });
    const popCornQueryString = `${page}?keywords=${searchOptions.name}&sort=name&order=1`;

    const fetchPopCorn = axios
      .get(
        "https://cors-anywhere.herokuapp.com/movies-v2.api-fetch.sh/movies/" +
          popCornQueryString
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

    const YTSQueryString = `limit=50&page=${page}&minimum_rating=${searchOptions.rating}&query_term=${searchOptions.name}&sort_by=title&order_by=asc`;

    const fetchYTS = axios
      .get(`https://yts.mx/api/v2/list_movies.json?${YTSQueryString}`)
      .then((result) => {
        if (result.data) {
          return result.data;
        } else {
          return false;
        }
      });
    Promise.all([fetchYTS, fetchPopCorn]).then((values) => {
      const result = values[0];
      const YTSMovies = values[0].data.movies;
      const popCornMovies = values[1];
      const mergedResult = _.uniqBy(
        _.concat(YTSMovies, popCornMovies, scroll ? searchResult : []),
        "imdb_code"
      );
      console.log({ mergedResult });
      if (result?.status === "ok") {
        if (result?.data.movie_count === 0) {
          console.log("pas de film deso");
          setEmptyResult(true);
          return;
        }
        if (!result.data.movies) {
          console.log("plus de film a display");
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
      } else {
        console.log("nope");
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
    moreMovies,
  };
};

export default HomeContainer;
