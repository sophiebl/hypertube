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
    marginTop: theme.spacing(2),
    width: "100vw",
  },
  card: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
    position: "relative",
    // height: "300px",
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
  img: {
    objectFit: "cover",
    height: "300px",
    width: "100%",
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
    <>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Box className={classes.card}>
            <img className={classes.img} src="assets/titanic.jpeg" alt="" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Box className={classes.card}>
            <img className={classes.img} src="assets/joker.jpeg" alt="" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Box className={classes.card}>
            <img className={classes.img} src="assets/paradisio.jpeg" alt="" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Box className={classes.card}>
            <img className={classes.img} src="assets/hollywood.jpeg" alt="" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Box className={classes.card}>
            <img className={classes.img} src="assets/hollywood.jpeg" alt="" />
            <Fab color="primary" aria-label="add" className={classes.fabAdd}>
              <AddIcon />
            </Fab>
            <Box className={classes.cardInfo}>
              <Grid container>
                <Grid item xs={8} sm={8} md={8} lg={8}>
                  <Typography
                    variant="h5"
                    component="h3"
                    className={classes.cardInfoText}
                  >
                    Hollywood
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h4"
                    className={classes.cardInfoText}
                  >
                    Drama | 2014
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}></Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Box className={classes.card}>
            <img className={classes.img} src="assets/hollywood.jpeg" alt="" />
          </Box>
        </Grid>
      </Grid>
      <Toaster getParams={getParams} />
    </>
  );
};

export default Home;
