import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import ModalPlayer from "./ModalPlayer";
import _ from "lodash"

import MovieContainer from './movie-container'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
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
  } = MovieContainer(requestedMovie);
  const classes = useStyles();

  return (
    <>
      <p>play the movie {movieDetails.title}</p>
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
              onClick={() => openPlayer(torrent.url, "YTS", torrent.quality)}
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
    </>
  );
};

export default MovieDetails;