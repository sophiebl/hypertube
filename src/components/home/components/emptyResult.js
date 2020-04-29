import React from "react";
import { Box, Typography, Fab } from "@material-ui/core";
import AutorenewIcon from "@material-ui/icons/Autorenew";
// import setEmptyResult from "../home-container";

const EmptyResult = ({ classes, clearFilters }) => {
  return (
    <Box className={classes.noResultBox}>
      <img
        src="assets/empty-folder.svg"
        alt=""
        className={classes.noResultBoxImg}
      />
      <Typography
        variant="h4"
        component="h3"
        //   className={}
      >
        No matching search results
      </Typography>
      <Typography
        variant="h5"
        component="h4"
        //   className={}
      >
        Try again with another title. Sure you spelled it right?
      </Typography>
      <Fab
        variant="extended"
        color="secondary"
        className={classes.clearIcon}
        onClick={() => clearFilters()}
      >
        <AutorenewIcon />
        Clear filters
      </Fab>
    </Box>
  );
};

export default EmptyResult;
