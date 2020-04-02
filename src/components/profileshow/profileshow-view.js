import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ProfileShowContainer from './profileshow-container';
import UpperBoxProfile from '../profile/components/upperBoxProfile';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  progress: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperProfile: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1500px',
  },
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  // },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    fontSize: '1em',
    padding: theme.spacing(1),
  },
  boxUpProfile: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  boxUpProfileMatch: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundImage: `url("https://media.giphy.com/media/26ufcYAkp8e66vanu/giphy.gif")`,
  },
  containerUpProfile: {
    maxWidth: '1500px',
  },
  containerUpProfileLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  containerUpProfileLeftInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  containerUpProfileRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  containerUpProfileRightFabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  columnPublicProfile: {
    padding: theme.spacing(0, 2),
  },
  pictureContainer: {
    padding: theme.spacing(1),
    position: 'relative',
    width: '100%',
    height: 'fit-content',
  },
  picture: {
    objectFit: 'cover',
  },
  tabs: {
    margin: theme.spacing(1),
  },
  item: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
  summary: {
    padding: theme.spacing(3),
  },
  genderChips: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  carousel: {
    width: '100%',
    maxWidth: '450px',
  },
  slide: {
    width: '100%',
    maxWidth: '450px',
    objectFit: 'contain',
  },
  imageSlider: {
    width: '100%',
  },
  loggedDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#64dd17',
  },
  notLoggedDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#b0bec5',
  },
}));

const ProfileShow = ({ computedMatch }) => {
  const classes = useStyles();
  const visitedUsername = computedMatch.params.username;
  const {
    visitedProfile,
    loaded,
  } = ProfileShowContainer(visitedUsername);

  if (loaded === false) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      <UpperBoxProfile
        classes={classes}
        profile={visitedProfile}
        type="public"
      />
      <Divider className={classes.divider} />
      <div className={classes.wrapperProfile}>
        <Grid container>
          <Grid item sm={6} className={classes.columnPublicProfile}>
            <Typography variant="subtitle1" className={classes.item}>
              <Box fontWeight="fontWeightBold">
                {visitedProfile.firstName} watched this movies recently
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProfileShow;
