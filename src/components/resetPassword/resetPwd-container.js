import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useResetForm = (token) => {
  const [inputs, setInputs] = useState({
    email: "",
    password1: "",
    password2: "",
  });
  const { password1, password2 } = inputs;

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
      if (password1 !== password2) {
        toast.error("The passwords don't match");
        return;
      }
      axios
        .post(
          `/api/users/resetPassword`,
          {
            password1,
            token,
          },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
        .then(({ data }) => {
          if (data.resetDone === true) {
            window.location = "/?message=password_reset";
          } else {
            toast.error(data.message);
          }
        });
    }
  };

  const handleInputChange = (event) => {
    event.persist();
    const newInput = {
      ...inputs,
      [event.target.name]: event.target.value,
    };
    setInputs(newInput);
  };

  const sendResetEmail = (email) => {
    axios
      .post(
        `/api/users/sendResetEmail`,
        {
          email,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then(({ data }) => {
        if (data.validEmail === true) {
          toast.success(data.message);
          setTimeout(() => (window.location = "/"), 5000);
        } else {
          toast.error(data.message);
        }
      });
  };

  return {
    handleSubmit,
    handleInputChange,
    sendResetEmail,
    inputs,
    setInputs,
  };
};

export default useResetForm;
