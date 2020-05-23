import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ModalPlayer from "./ModalPlayer";
import _ from "lodash";
import { Box, Fab, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddIcon from "@material-ui/icons/Add";
import StarRateIcon from "@material-ui/icons/StarRate";
import Link from "@material-ui/core/Link";

import MovieContainer from "./movie-container";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      fontSize: "12px",
      //   backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 400,
    },
  },
  gridCard: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    // padding: '20px 10px'
  },
  img: {
    // backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
    position: "relative",
    backgroundSize: "cover",
    height: "450px",
  },
  poster: {
    objectFit: "cover",
    height: "400px",
  },
  h1: {
    display: "inline",
    fontSize: "2em",
    color: "#009688",
    marginRight: "10px",
  },
  link: {
    color: "#009688",
  },
  h2: {
    display: "inline-block",
    margin: "20px 0",
    fontSize: "1.5em",
    borderBottom: "5px solid #F5C53D",
  },
  playIcon: {
    position: "absolute",
    color: "#F5C53D",
    top: "50%",
    left: "calc(50% - 55.99px/2)",
  },
  starRateIcon: {
    color: "#F5C53D",
  },
  // fabAdd: {
  //   borderRadius: "10px"
  // },
  addIcon: {
    backgroundColor: "##009688",
  },
  rowName: {
    color: "#009688",
    fontSize: "1.2em",
  },
  genres: {
    margin: "0 5px",
  },
  messageInput: {
    flexDirection: "row",
    bottom: "0",
    width: "100%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  textField: {
    backgroundColor: "#ffffff",
  },
  modal: {
    width: "100%",
    maxWidth: "800px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

// function createData(name, content) {
//   return { name, content };
// }

// const comments = ["CE film est génial", "CE film est NUL", "CE film est TOP"];

const MovieDetails = ({ computedMatch }) => {
  const requestedMovie = computedMatch.params.movie;
  const {
    movieDetails,
    openPlayer,
    showModal,
    setShowModal,
    movieRequest,
    setMovieRequest,
    comment,
    handleComment,
    sendComment,
    commentsList,
  } = MovieContainer(requestedMovie);
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.gridContainer} container direction={"row"}>
        <Grid item xs={7} sm={4} md={3} lg={3} className={classes.gridCard}>
          <Box className={classes.img}>
            <img
              className={classes.poster}
              src={movieDetails.medium_cover_image}
              alt={movieDetails.title}
            />
            <PlayCircleFilledIcon
              className={classes.playIcon}
              style={{ fontSize: 65 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.gridCard}>
          <Box>
            <h1 className={classes.h1}>{movieDetails.title}</h1>
            <span>8.0</span>
            <StarRateIcon className={classes.starRateIcon} />
          </Box>
          <span>{movieDetails.release_date}</span>
          <br />
          <h2 className={classes.h2}>OVERVIEW</h2>
          <p>{movieDetails.overview}</p>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td className={classes.rowName}>Genres</td>
                {_.map(movieDetails.genres, (genre) => (
                  <td key={genre}>
                    <span className={classes.genres}>{genre}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <h2 className={classes.h2}>LEAVE A COMMENT</h2>
          <Box className={classes.messageInput}>
            <Grid container spacing={2}>
              <Grid item sm={10} xs={9} md={10} lg={10}>
                <TextField
                  onChange={handleComment}
                  value={comment}
                  id="standard-full-width"
                  style={{ margin: 8 }}
                  placeholder="What did you think about this movie ?"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item sm={2} xs={2} md={2} lg={2}>
                <Fab
                  type="submit"
                  color="primary"
                  aria-label="add"
                  onClick={sendComment}
                >
                  <AddIcon className={classes.addIcon} />
                </Fab>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.card}>
            <strong>{commentsList.length} comments • </strong>
            <Link className={classes.link} href="#">
              <strong>Show comments</strong>
              <ArrowDropDownIcon />
            </Link>
            <Box>
              <List>
                {commentsList.map((comment, index) => (
                  <ListItem key={index}>{comment.content}</ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} className={classes.gridCard}>
          <Box className={classes.card}>
            <h2 className={classes.h2}>play the movie {movieDetails.title}</h2>
            {movieDetails.YTSTorrents ? (
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    YTS Movies
                  </ListSubheader>
                }
                className={classes.root}
              >
                {movieDetails.YTSTorrents.map((torrent) => (
                  <ListItem
                    key={torrent.url}
                    button
                    onClick={() =>
                      openPlayer(torrent.url, "YTS", torrent.quality)
                    }
                  >
                    <ListItemText primary={torrent.quality} />
                  </ListItem>
                ))}
              </List>
            ) : null}
            {movieDetails.popCornTorrents ? (
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    PopCorn
                  </ListSubheader>
                }
                className={classes.root}
              >
                {_.map(movieDetails.popCornTorrents.en, (torrent, quality) => (
                  <ListItem
                    key={torrent.url}
                    button
                    onClick={() => openPlayer(torrent.url, "popcorn", quality)}
                  >
                    <ListItemText primary={quality} />
                  </ListItem>
                ))}
              </List>
            ) : null}
            <ModalPlayer
              showModal={showModal}
              setShowModal={setShowModal}
              movieRequest={movieRequest}
              setMovieRequest={setMovieRequest}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default MovieDetails;
