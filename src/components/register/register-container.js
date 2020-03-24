import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const useSignUpForm = callback => {
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const { firstname, lastname, username, email, password1 } = inputs;
  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      axios
        .post(
          `/api/users/register`,
          {
            first_name: firstname,
            username,
            last_name: lastname,
            email,
            password: password1,
          },
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          },
        )
        .then(({ data }) => {
          if (data.created === true) {
            callback(true);
          } else {
            toast.error(data.message);
          }
        });
    }
  };
  const handleInputChange = event => {
    event.persist();
    const newInput = {
      ...inputs,
      [event.target.name]: event.target.value,
    };
    setInputs(newInput);
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export default useSignUpForm;