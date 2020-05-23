import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Link,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AuthContext } from "../App/AuthContext";
import { logout } from "../auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#000",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hypertubeLogo: {
    fontFamily: "Monoton, cursive",
    fontSize: "2rem",
    color: "#f44336",
    textAlign: "left",
    flexGrow: 1,
  },
  navIcon: {
    "&:focus": {
      textDecoration: "none",
    },
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.secondary.main,
    },
    "&:visited": {
      textDecoration: "none",
    },
    "&:link": {
      textDecoration: "none",
    },
    "&:active": {
      textDecoration: "none",
    },
  },
  notReadNotif: {
    backgroundColor: "#edf2fa",
  },
  noNotificationsDrawer: {
    margin: theme.spacing(1),
  },
}));

const Nav = () => {
  const classes = useStyles();
  const { authContext } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  authContext.userData.then((data) => {
    if (data) {
      setIsLoggedIn(data.success);
    }
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.hypertubeLogo}>
          <Link
            href="/"
            style={{ textDecoration: "none" }}
            className={classes.hypertubeLogo}
          >
            Hypertube
          </Link>
        </Typography>
        {isLoggedIn ? (
          <>
            <IconButton color="inherit" href="/profile">
              <AccountCircleIcon className={classes.navIcon} />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={(e) => {
                logout(e, setIsLoggedIn);
              }}
            >
              <ExitToAppIcon className={classes.navIcon} />
            </IconButton>
          </>
        ) : (
          <>
            <Button color="inherit" href="/register">
              Signup
            </Button>{" "}
            <Button color="inherit" href="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
