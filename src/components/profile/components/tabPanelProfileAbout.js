import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

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

const TabPanelProfileAbout = ({
  value,
  index,
  classes,
  profile,
  isChecked,
  handleProfileChange,
  handleSubmitParameters,
  handleFileUpload,
  handleChangeProfileImage,
  handleDeleteImage,
}) => {
  return (
    <TabPanel value={value} index={index}>
      <Grid container>p
        <Grid item sm={4} className={classes.gridColumnProfile}>
          <Grid container>
            <Grid item xsm={12} className={classes.gridPicturesWrapper}>
              {profile.images && profile.images.length < 5 ? (
                <Box className={classes.modifyPictureButton}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    size="large"
                    startIcon={<AddAPhotoIcon />}
                  >
                    Upload a picture
                  </Button>
                  <input
                    label="upload file"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileUpload}
                    className={classes.uploadInput}
                  />
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default TabPanelProfileAbout;
