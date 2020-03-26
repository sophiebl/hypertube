import axios from 'axios';
import _ from 'lodash';
import { useState } from 'react';

const HomeContainer = (userData, token) => {
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const fetchProfile = () => {
    axios
      .get(`/api/users/profile`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(response => {
        setUserInfo(response.data);
        setLoaded(true);
        return response.data;
      })
      .catch(error => {
      if (process.env.REACT_APP_VERBOSE === 'true') console.log(error);
      });
  };

  const saveToken = (token) => {
    localStorage.setItem('token', token);
    window.location = '/?message=login_success';
  }

  if (_.isEmpty(userInfo) && loaded === false) {
    fetchProfile();
  }

  return { userInfo, loaded, saveToken };
};

export default HomeContainer;