import React, { useState } from "react";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Fab, Grid, LinearProgress } from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
import AddIcon from "@material-ui/icons/Add";
import _ from "lodash";
import Toaster from "../toaster/index";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import Background from '../../assets/images/home-bg-1.jpg';
import HomeContainer from "./home-container";
import SearchBox from "./components/searchBox.js";

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
}));

const Home = ({ location }) => {
  const classes = useStyles();
  const getParams = queryString.parse(location.search);
  const { saveToken, trendingMovies } = HomeContainer();
  const [isHovered, setIsHovered] = useState(false);

  if (getParams.accessToken) {
    saveToken(getParams.accessToken);
  }

  if (trendingMovies) {
    return (
      <>
        <SearchBox />
        <Grid className={classes.gridContainer} container>
          {_.map(trendingMovies, (trendingMovie, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              lg={2}
              key={trendingMovie.id}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Box className={classes.card}>
                <img
                  className={classes.img}
                  src={trendingMovie.medium_cover_image}
                  alt={trendingMovie.title}
                />
                <CheckCircleIcon
                  className={classes.viewedIcon}
                  color="primary"
                />
                <LinearProgress
                  variant="determinate"
                  value={100}
                  color="secondary"
                  className={classes.progressBar}
                />
                {isHovered === index ? (
                  <>
                    <Fab
                      color="primary"
                      aria-label="add"
                      className={classes.fabAdd}
                    >
                      <AddIcon />
                    </Fab>
                    <Box className={classes.cardInfo}>
                      <Grid container>
                        <Grid item xs={8} sm={8} md={8} lg={8}>
                          <Typography
                            variant="h5"
                            component="h3"
                            className={[
                              classes.cardInfoText,
                              classes.movieName,
                            ].join(" ")}
                          >
                            {trendingMovie.title}
                          </Typography>
                          <Typography
                            variant="h6"
                            component="h4"
                            className={[
                              classes.cardInfoText,
                              classes.movieTypeYear,
                            ].join(" ")}
                          >
                            Drama | {trendingMovie.year}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          md={4}
                          lg={4}
                          className={classes.ratingBoxDiv}
                        >
                          <Box className={classes.ratingBox}>
                            <StarRateIcon />
                            <Typography className={classes.ratingText}>
                              {trendingMovie.rating}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                ) : null}
              </Box>
            </Grid>
          ))}
        </Grid>
        <Toaster getParams={getParams} />
      </>
    );
  } else {
    return null;
  }
};

export default Home;
