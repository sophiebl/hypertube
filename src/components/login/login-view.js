import React from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import useLoginForm from "./login-container";

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
  submitFB: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#039be5",
  },
}));

const Login = () => {
  const login = (success) => {
    if (success) {
      window.location = "/?message=login_success";
    }
  };
  const { inputs, handleInputChange, handleSubmit } = useLoginForm(login);
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            htmlFor="username"
            type="text"
            name="username"
            onChange={handleInputChange}
            value={inputs.username}
            id="username"
            variant="outlined"
            required
            autoFocus
            label="Username"
            autoComplete="on"
          />

          <TextField
            fullWidth
            margin="normal"
            htmlFor="password"
            type="password"
            name="password"
            onChange={handleInputChange}
            value={inputs.password}
            variant="outlined"
            id="password"
            required
            label="Password"
            autoComplete="on"
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
          <Grid container>
            <Grid item xs>
              <Link href="/resetPasswordEmail" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
        <p>or login with your social media account</p>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              href="http://localhost:8080/api/users/auth/facebook"
              fullWidth
              className={classes.submitFB}
            >
              <img
                width="30px"
                alt='42 "G" Logo'
                src="https://res.cloudinary.com/dtfunbpou/image/upload/v1585581406/icons8-facebook_vlisgc.svg"
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              href="http://localhost:8080/api/users/auth/fortytwo"
              fullWidth
              className={classes.submit}
            >
              <img
                width="30px"
                alt='42 "G" Logo'
                src="https://res.cloudinary.com/dtfunbpou/image/upload/v1585580741/42_logo_black_kdm4iy.svg"
              />
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
