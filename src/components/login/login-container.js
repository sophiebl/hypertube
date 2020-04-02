import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useLoginForm = callback => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { username, password } = inputs;

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
      axios
        .get(
          `/api/users/login`,
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            params: {
                username,
                password,
            },
          },
        )
        .then(({ data }) => {
          if (data.auth === true) {
            localStorage.setItem('token', data.token);
            callback(true);
          } else {
            console.log(data);
            toast.error(data.err);
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

export default useLoginForm;