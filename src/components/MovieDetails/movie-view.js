import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ModalPlayer from "./ModalPlayer";
import _ from "lodash";
import { Box, Fab, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import StarRateIcon from "@material-ui/icons/StarRate";
import MovieContainer from "./movie-container";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      fontSize: "12px",
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
  },
  img: {
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
    color: theme.palette.primary.main,
    marginRight: "10px",
  },
  link: {
    color: theme.palette.primary.main,
  },
  h2: {
    display: "inline-block",
    margin: "20px 0",
    fontSize: "1.5em",
    borderBottom: "5px solid #F5C53D",
  },
  starRateIcon: {
    color: theme.palette.secondary.main,
  },
  rowName: {
    color: theme.palette.primary.main,
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
  author: {
    marginRight: '5px',
    color: theme.palette.primary.main,
    cursor: 'pointer'
  }
}));

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
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.gridCard}>
          <Box>
            <h1 className={classes.h1}>{movieDetails.title}</h1>
            <span>{movieDetails.rating}</span>
            <StarRateIcon className={classes.starRateIcon} />
          </Box>
          <span>
            {movieDetails.release_date} | {movieDetails.runtime} min{" "}
          </span>
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
                  color="secondary"
                  aria-label="add"
                  onClick={sendComment}
                  disabled={comment?.length === 0}
                >
                  <AddIcon />
                </Fab>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.card}>
            <strong>{commentsList.length} comments</strong>
            <Box>
              <List>
                {commentsList.map((comment, index) => (
                  <ListItem key={index}>
                  <span className={classes.author}
                    onClick={() => {
                      window.location = `/profile/${comment.author}`;
                    }}
                  >{comment.author}</span>
                  {comment.content}</ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} className={classes.gridCard}>
          <Box className={classes.card}>
            <h2 className={classes.h2}>Play the movie {movieDetails.title}</h2>
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
