import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  SwipeableDrawer,
  Badge,
  Link,
} from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import { AuthContext } from '../App/AuthContext';
import { logout } from '../auth';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  matchaLogo: {
    flexGrow: 1,
  },
  navIcon: {
    color: 'white',
    '&:focus': {
      textDecoration: 'none',
    },
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
    },
    '&:visited': {
      textDecoration: 'none',
    },
    '&:link': {
      textDecoration: 'none',
    },
    '&:active': {
      textDecoration: 'none',
    },
  },
  notReadNotif: {
    backgroundColor: '#edf2fa',
  },
  noNotificationsDrawer: {
    margin: theme.spacing(1),
  },
}));

const Nav = () => {
  const classes = useStyles();
  const { authContext, socketContext } = useContext(AuthContext);
  const { token } = authContext;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  authContext.userData.then(data => {
    console.log({data});
    if (data) {
      setIsLoggedIn(data.success);
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.matchaLogo}>
          <Link
            href="/"
            style={{ textDecoration: 'none' }}
            className={classes.navIcon}
          >
            Matcha
          </Link>
        </Typography>
        {isLoggedIn ? (
          <>
           <IconButton color="inherit" href="profile">
              <AccountCircleIcon className={classes.navIcon} />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={e => {
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
            </Button>{' '}
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