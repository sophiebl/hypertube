import React from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useResetForm from "./resetPwd-container";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPassword = ({ match }) => {
  const { email } = match.params;
  const classes = useStyles();
  const { inputs, handleSubmit, handleInputChange } = useResetForm(email);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change your password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            htmlFor="password1"
            type="password"
            name="password1"
            onChange={handleInputChange}
            value={inputs.password1}
            id="password1"
            variant="outlined"
            required
            autoFocus
            label="New password"
          />

          <TextField
            fullWidth
            margin="normal"
            htmlFor="password2"
            type="password"
            name="password2"
            onChange={handleInputChange}
            value={inputs.password2}
            variant="outlined"
            id="password2"
            required
            label="New password again"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Log In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
