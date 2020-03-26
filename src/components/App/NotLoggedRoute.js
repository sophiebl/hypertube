import React, { useState, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const NotLoggedRoute = ({ component: Component, ...rest }) => {
  const { authContext } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  authContext.userData.then(data => {
    if (data && data.success) {
      setIsLoggedIn(data.success);
    }
  });

  return (
    <Route
      {...rest}
      render={props => {
        if (!isLoggedIn) {
          return <Component {...props} {...rest} />;
        }
        return <Redirect to="/home" />;
      }}
    />
  );
};

export default NotLoggedRoute;
