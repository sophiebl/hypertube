import _ from 'lodash';
import { useState, useContext } from "react";
import { AuthContext } from "../App/AuthContext";

const HomeContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { authContext:{userData} } = useContext(AuthContext);

  const fetchProfile = () => {
    userData.then(response => {
        setUserInfo(response);
        setLoaded(true);
      })
      .catch(error => {
        if (process.env.REACT_APP_VERBOSE === "true") console.log(error);
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