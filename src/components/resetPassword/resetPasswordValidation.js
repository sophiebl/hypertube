import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

const ResetPasswordValidation = ({ match }) => {
  const classes = useStyles();

  const token = match.params.token;
  axios
    .get(`/api/users/resetPasswordValidation/${token}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(({ data }) => {
      if (data.resetAccepted) {
        toast.success(data.message);
        setTimeout(() => (window.location = `/resetPassword/${token}`), 5000);
      } else {
        toast.error(data.message);
        setTimeout(() => (window.location = "/register"), 5000);
      }
    });
  return (
    <Container maxWidth="sm" className={classes.container}>
      <h1>You're about to change your password</h1>
      <h2>You will be redirected in a few seconds!</h2>
      <iframe
        title="gif_user_validation"
        src="https://giphy.com/embed/tXL4FHPSnVJ0A"
        width="480"
        height="317"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
      ></iframe>
    </Container>
  );
};

export default ResetPasswordValidation;
