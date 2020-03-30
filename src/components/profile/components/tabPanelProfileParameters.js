import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { toast } from "react-toastify";
import InputTextShort from "./inputTextShort";
// import useForgotPasswordForm from '../../forgotpassword/forgotpassword-container';

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const TabPanelProfileParameters = ({
  value,
  index,
  classes,
  profile,
  handleProfileChange,
  handleSubmitParameters,
  notificationMail,
  notificationPush,
  deleteUser
}) => {
  // const { sendForgotPassword } = useForgotPasswordForm(() =>
  //   toast.success('You received a reset password link by Email'),
  // );

  return (
    <TabPanel value={value} index={index}>
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
              name="first_name"
              value={profile.first_name}
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
              name="last_name"
              value={profile.last_name}
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
              name="username"
              value={profile.username}
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
            <InputTextShort
              classes={classes}
              Typography={Typography}
              Box={Box}
              TextField={TextField}
              profile={profile}
              handleProfileChange={handleProfileChange}
              name="language"
              value={profile.language}
              title="Language"
              type="text"
            />
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
                    // onClick={() => sendForgotPassword(profile.email)}
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
    </TabPanel>
  );
};

export default TabPanelProfileParameters;
