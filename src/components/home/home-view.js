import React, { useEffect } from "react";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider } from "@material-ui/core";
import Toaster from "../toaster/index";
import HomeContainer from "./home-container";
import SearchBox from "./components/searchBox.js";
import MoviesList from "./components/moviesList.js";
import EmptyResult from "./components/emptyResult";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  filtersContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 10px",
    backgroundColor: "#f5f5f5",
  },
  whiteField: {
    backgroundColor: "white",
    borderRadius: "3px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  gridContainer: {
    marginTop: theme.spacing(2),
    width: "100vw",
  },
  card: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
    position: "relative",
    height: "300px",
    display: "flex",
    cursor: "pointer",
  },
  progressBar: {
    position: "absolute",
    bottom: "0px",
    width: "100%",
    height: "8px",
  },
  viewedIcon: {
    position: "absolute",
    top: "15px",
    right: "15px",
  },
  fabAdd: {
    position: "absolute",
    top: "30px",
    left: "calc(50% - 55.99px/2)",
  },
  cardInfo: {
    backgroundColor: theme.palette.secondary.main,
    position: "absolute",
    bottom: "0px",
    width: "100%",
    padding: theme.spacing(1),
  },
  cardInfoText: {
    color: "white",
  },
  movieName: {
    fontSize: "16px",
  },
  movieTypeYear: {
    fontSize: "14px",
  },
  ratingBoxDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  ratingBox: {
    backgroundColor: "white",
    width: "50px",
    height: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px",
  },
  ratingText: {
    fontSize: "14px",
  },
  img: {
    objectFit: "cover",
    height: "300px",
    width: "100%",
    "&:hover": {
      filter: "grayscale(80%)",
    },
  },
  noResultBox: {
    marginTop: theme.spacing(5),
    margin: "auto",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  noResultBoxImg: {
    width: "200px",
  },
  clearIcon: {
    marginTop: theme.spacing(3),
  },
  progress: {
    margin: "auto",
  },
}));

const Home = ({ location }) => {
  const classes = useStyles();
  const getParams = queryString.parse(location.search);
  const {
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
  } = HomeContainer();

  if (getParams.accessToken) {
    saveToken(getParams.accessToken);
  }

  const displayMoreMovies = () => {
    if (searchResult) fetchSearch(true);
  };

  useEffect(() => {
    if (page > 1 && moreMovies) {
      displayMoreMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (
      document.documentElement.scrollTop === 0 ||
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 10
    )
      return;
    setPage((page) => page + 1);
  };

  return (
    <>
      <SearchBox
        classes={classes}
        searchOptions={searchOptions}
        handleChangeInput={handleChangeInput}
        handleSort={handleSort}
        fetchSearch={fetchSearch}
      />
      <Divider light />
      {emptyResult ? (
        <EmptyResult classes={classes} clearFilters={clearFilters} />
      ) : (
        <Grid className={classes.gridContainer} container>
          <MoviesList classes={classes} list={searchResult} />
          {moreMovies ? (
            <CircularProgress />
          ) : (
            <h4>Yaaay, you've seen it all!</h4>
          )}
        </Grid>
      )}
      <Toaster getParams={getParams} />
    </>
  );
};

export default Home;
