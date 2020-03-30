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
  CircularProgress
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatIcon from "@material-ui/icons/Chat";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import Toaster from '../toaster/index';
// import Background from '../../assets/images/home-bg-1.jpg';
// import { AuthContext } from '../app/AuthContext';
import HomeContainer from "./home-container";

const Home = ({ location }) => {
  const getParams = queryString.parse(location.search);
  const { saveToken } = HomeContainer(null, null);
  if (getParams.accessToken) {saveToken(getParams.accessToken)};
  return (
    <>
      <h1>HOME</h1>
      <Toaster getParams={getParams} />
    </>
  );
};

export default Home;
