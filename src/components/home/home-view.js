import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Fab,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatIcon from "@material-ui/icons/Chat";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import Toaster from "../toaster/index";
// import Background from '../../assets/images/home-bg-1.jpg';
import HomeContainer from "./home-container";

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
    // flexGrow: 1,
    // margin: theme.spacing(2),
  },
  card: {
    backgroundColor: theme.palette.secondary.main,
    height: "100px",
  },
}));

const Home = ({ location }) => {
  const classes = useStyles();
  const getParams = queryString.parse(location.search);
  const { saveToken } = HomeContainer();
  if (getParams.accessToken) {
    saveToken(getParams.accessToken);
  }
  return (
    <Box className={classes.gridContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Box className={classes.card}>
            <img src="" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Box className={classes.card}></Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Box className={classes.card}></Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Box className={classes.card}></Box>
        </Grid>
      </Grid>
      <Toaster getParams={getParams} />
    </Box>
  );
};

export default Home;
