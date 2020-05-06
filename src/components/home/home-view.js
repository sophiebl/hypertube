import React from "react";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider } from "@material-ui/core";
import Toaster from "../toaster/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import HomeContainer from "./home-container";
import SearchBox from "./components/searchBox.js";
import MoviesList from "./components/moviesList.js";
import EmptyResult from "./components/emptyResult";
import InfiniteScroll from "react-infinite-scroll-component";

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
    // height: "300px",
  },
  progressBar: {
    position: "absolute",
    bottom: "0px",
    width: "100%",
    height: "8px",
    display: "none",
  },
  viewedIcon: {
    position: "absolute",
    top: "15px",
    right: "15px",
    display: "none",
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
    // color: "white",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Home = ({ location }) => {
  const classes = useStyles();
  const getParams = queryString.parse(location.search);
  const {
    saveToken,
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
  } = HomeContainer();
  if (getParams.accessToken) {
    saveToken(getParams.accessToken);
  }

  const displayMoreMovies = () => {
    setPage(page + 1);
    if (searchResult) fetchSearch(true, page + 1);
  };

  return (
    <>
      <SearchBox
        classes={classes}
        searchOptions={searchOptions}
        handleChangeInput={handleChangeInput}
        // currentUserProfile={currentUserProfile}
        handleSort={handleSort}
        fetchSearch={fetchSearch}
        debouncedCallback={debouncedCallback}
      />
      <Divider light />
      {emptyResult ? (
        <EmptyResult classes={classes} clearFilters={clearFilters} />
      ) : (
        <InfiniteScroll
          dataLength={searchResult ? searchResult.length : null}
          next={() => displayMoreMovies()}
          hasMore={moreMovies}
          loader={
            <div className={classes.progress}>
              <CircularProgress color="secondary" />
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Grid className={classes.gridContainer} container>
            <MoviesList
              classes={classes}
              list={searchResult ? searchResult : trendingMovies}
              setEmptyResult={setEmptyResult}
            />
          </Grid>
        </InfiniteScroll>
      )}
      <Toaster getParams={getParams} />
    </>
  );
};

export default Home;
