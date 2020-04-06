import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserValidation = ({ match }) => {
  const token = match.params.token;
  axios
    .get(`/api/users/validate/${token}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(({ data }) => {
      if (data.validated) {
        toast.success(data.message);
        setTimeout(() => (window.location = "/login"), 3000);
      } else {
        toast.error(data.message);
        setTimeout(() => (window.location = "/register"), 3000);
      }
    });
  return <h1>UserValidation</h1>;
};

export default UserValidation;
