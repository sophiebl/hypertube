import React, { useState, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  progress: {
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const LoggedRoute = ({ component: Component, ...rest }) => {
  const classes = useStyles();
  const { authContext } = useContext(AuthContext);
  const [secureAuth, setSecureAuth] = useState(false);

  authContext.userData.then(data => {
    if (data === null || !data.success) {
      window.location = "/login";
    }
    setSecureAuth(data.success);
  });

  if (!secureAuth) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (secureAuth) {
          return <Component {...props} {...rest} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default LoggedRoute;
