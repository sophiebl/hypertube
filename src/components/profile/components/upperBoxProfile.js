import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CloudUpload from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  fabUpBox: {
    margin: "0px 5px",
  },
  container: {
    position: "relative",
    "&:hover": {
      "& $profileImg": {
        opacity: "0.3",
      },
      "& $middle": {
        opacity: "1",
      },
    },
  },
  middle: {
    transition: ".5s ease",
    opacity: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    msTransform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  profileImg: {
    opacity: "1",
    display: "block",
    width: "100%",
    height: "auto",
    transition: ".5s ease",
    backfaceVisibility: "hidden",
  },
  textImage: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontSize: "16px",
    padding: "16px 32px",
  },
  names: {
    marginLeft: "1em",
  },
  blockedIcon: {
    position: "absolute",
  },
}));

const UpperBoxProfile = ({ classes, profile, handleFileUpload, type }) => {
  const upBoxClasses = useStyles();

  return (
    <Box className={classes.boxUpProfile}>
      <Grid container className={classes.containerUpProfile} direction="row">
        <Grid item xs={12} sm={6} className={classes.containerUpProfileLeft}>
          <Grid item xs={6} sm={5}>
            <div className={upBoxClasses.container}>
              <img
                className={upBoxClasses.profileImg}
                src={
                  profile.picture ||
                  "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                }
                alt="My profile"
                width="100%"
              />
              {type !== "public" ? (
                <div className={upBoxClasses.middle}>
                  <div className={upBoxClasses.textImage}>
                    <CloudUpload />
                    <br />
                    Upload Picture
                  </div>
                  <input
                    label="upload file"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileUpload}
                    className={classes.uploadInput}
                  />
                </div>
              ) : null}
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            sm={7}
            className={classes.containerUpProfileLeftInfo}
          >
            <div className={upBoxClasses.names}>
              <span>
                {profile.firstName} {profile.lastName}
              </span>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpperBoxProfile;
