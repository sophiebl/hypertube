import React from 'react';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import useSignUpForm from './register-container';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  submitFB: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#039be5'
  },
}));

const Register = () => {
  const signup = success => {
    if (success) {
      window.location = '/?message=signup_success';
    }
  };
  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(signup);
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                htmlFor="firstname"
                type="text"
                name="firstname"
                onChange={handleInputChange}
                value={inputs.firstname}
                id="firstname"
                variant="outlined"
                label="First Name"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                htmlFor="lastname"
                type="text"
                name="lastname"
                onChange={handleInputChange}
                value={inputs.surname}
                id="lastname"
                label="Last Name"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
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
                label="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                htmlFor="email"
                type="email"
                name="email"
                onChange={handleInputChange}
                value={inputs.email}
                id="email"
                variant="outlined"
                label="Email Address"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                htmlFor="password1"
                type="password"
                name="password1"
                label="Password"
                onChange={handleInputChange}
                value={inputs.password1}
                id="password1"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                htmlFor="password2"
                type="password"
                name="password2"
                onChange={handleInputChange}
                value={inputs.password2}
                id="password2"
                variant="outlined"
                label="Re-enter password"
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </div>
        <p>or sign up with your social media account</p>
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
              <img width="30px" alt="42 &quot;G&quot; Logo" src="https://res.cloudinary.com/dtfunbpou/image/upload/v1585581406/icons8-facebook_vlisgc.svg"/>
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
                <img width="30px" alt="42 &quot;G&quot; Logo" src="https://res.cloudinary.com/dtfunbpou/image/upload/v1585580741/42_logo_black_kdm4iy.svg"/>
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Register;