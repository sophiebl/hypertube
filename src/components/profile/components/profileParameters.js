import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputTextShort from "./inputTextShort";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import useResetForm from "../../resetPassword/resetPwd-container";
import { toast } from "react-toastify";
import { logout } from "../../auth";

const ProfileParameters = ({
  value,
  index,
  classes,
  profile,
  handleProfileChange,
  handleSubmitParameters,
  notificationMail,
  notificationPush,
  deleteUser,
}) => {
  const { sendResetEmail } = useResetForm(() =>
    toast.success("You received a reset password link by Email")
  );
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <Box noValidate autoComplete="off">
      <Grid container>
        <Grid item sm={6} className={classes.gridColumnProfile}>
          <InputTextShort
            classes={classes}
            Typography={Typography}
            Box={Box}
            TextField={TextField}
            profile={profile}
            handleProfileChange={handleProfileChange}
            name="firstName"
            value={profile.firstName}
            title="Firstname"
            type="text"
          />
          <InputTextShort
            classes={classes}
            Typography={Typography}
            Box={Box}
            TextField={TextField}
            profile={profile}
            handleProfileChange={handleProfileChange}
            name="lastName"
            value={profile.lastName}
            title="Lastname"
            type="text"
          />
          <InputTextShort
            classes={classes}
            Typography={Typography}
            Box={Box}
            TextField={TextField}
            profile={profile}
            handleProfileChange={handleProfileChange}
            name="userName"
            value={profile.userName}
            title="Username"
            type="text"
          />
          {profile.email ? (
            <InputTextShort
              classes={classes}
              Typography={Typography}
              Box={Box}
              TextField={TextField}
              profile={profile}
              handleProfileChange={handleProfileChange}
              name="email"
              value={profile.email}
              title="Email"
              type="email"
            />
          ) : null}
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">
              Language
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={profile.language}
              onChange={handleProfileChange}
              name="language"
            >
              <MenuItem value="FR">French</MenuItem>
              <MenuItem value="EN">English</MenuItem>
            </Select>
          </FormControl>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={handleSubmitParameters}
            >
              Save changes
            </Button>
          </Box>
        </Grid>
        <Grid item sm={6} className={classes.gridColumnProfile}>
          <Paper className={classes.paperAccount}>
            <Typography variant="h5" component="h5">
              <Box fontWeight="fontWeightBold">Account security</Box>
            </Typography>
            <div>
              <Box className={classes.divAccount}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonAccount}
                  size="large"
                  onClick={async (e) => {
                    await sendResetEmail(profile.email);
                    logout(e, setIsLoggedIn);
                  }}
                >
                  Change password (need to reactivate)
                </Button>
              </Box>
              <Box className={classes.divAccount}>
                <Button
                  className={classes.buttonAccount}
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={() => deleteUser()}
                >
                  Delete my account
                </Button>
              </Box>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileParameters;
