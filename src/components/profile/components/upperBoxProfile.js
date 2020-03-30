import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import BlockIcon from '@material-ui/icons/Block';
import LoggedDot from '../../profileshow/components/loggedDot';

const useStyles = makeStyles(theme => ({
  fabUpBox: {
    margin: '0px 5px',
  },
  profileImg: {
    position: 'relative',
  },
  blockedIcon: {
    position: 'absolute',
  },
}));

const UpperBoxProfile = ({
  classes,
  profile,
  getAge,
  handleBlock,
  handleReport,
  handleChangeCity,
  handleLike,
  type,
}) => {
  const upBoxClasses = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      className={classes.boxUpProfile}
    >
      <Grid container className={classes.containerUpProfile} direction="row">
        <Grid item xs={12} sm={6} className={classes.containerUpProfileLeft}>
          <Grid item xs={6} sm={5}>
            <img
              className={upBoxClasses.profileImg}
              src={
                profile.picture ||
                'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
              }
              alt="My profile"
              width="90%"
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={7}
            className={classes.containerUpProfileLeftInfo}
          >
            <div>
              <span>{profile.firstname}</span>
            </div>
            <div>
              {type === 'public' ? (
                <LoggedDot
                  loggedState={profile.connected}
                  lastConnection={profile.lastConnection}
                  displayLast
                />
              ) : null}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpperBoxProfile;
