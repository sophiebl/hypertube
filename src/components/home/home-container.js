import _ from "lodash";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../App/AuthContext";

const HomeContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    ageRange: [18, 85],
    popularityRange: [0, 100],
    interests: [],
    distanceMax: 100,
    sort: "",
  });
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

  const handleChangeSlider = (type, newValue) => {
    if (type === "interests") {
      newValue = newValue.map((interest) => {
        return interest.name;
      });
      const newSearchOptions = { ...searchOptions, [type]: newValue };
      setSearchOptions(newSearchOptions);
      // fetchSearch(newSearchOptions);
      return;
    }
    const newSearchOptions = { ...searchOptions, [type]: newValue };
    setSearchOptions(newSearchOptions);
  };

  // const fetchSearch = (searchQuery = searchOptions) => {
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_PUBLIC_API_URL}/users/search`,
  //       searchQuery,
  //       {
  //         headers: {
  //           "Content-type": "application/json; charset=UTF-8",
  //           "x-access-token": token,
  //         },
  //       }
  //     )
  //     .then((result) => {
  //       if (result.data.authorized === false) {
  //         window.location = "/profile?message=profile_not_completed";
  //         return;
  //       }
  //       handleSort(null, result.data);
  //     });
  // };

  if (_.isEmpty(userInfo) && loaded === false) {
    fetchProfile();
  }

  return {
    userInfo,
    loaded,
    saveToken,
    // fetchTMDPApi,
    // fetchYTSApiTrending,
    trendingMovies,
    searchOptions,
    handleSort,
    handleChangeSlider,
    // fetchSearch,
  };
};

export default HomeContainer;
