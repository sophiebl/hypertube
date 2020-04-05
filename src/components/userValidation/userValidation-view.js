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
      console.log("DATA ///// ", data);
      /// afficher messages apres redirection login
      if (data.validated) {
        toast.success(data.message);
        window.location = "/login";
      } else {
        window.location = "/login";
        toast.error(data.message);
      }
    });
  return <h1>UserValidation</h1>;
};

export default UserValidation;
