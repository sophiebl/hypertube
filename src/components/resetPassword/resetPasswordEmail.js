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

const ResetPasswordEmailForm = () => {
  const classes = useStyles();
  const { sendResetEmail, inputs, handleInputChange } = useResetForm();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Want to change your password?
        </Typography>
        <div className={classes.form}>
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
            required
            autoFocus
            label="Your email"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            onClick={() => sendResetEmail(inputs.email)}
          >
            Send email
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ResetPasswordEmailForm;
