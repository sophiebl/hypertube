import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { AuthContext } from '../App/AuthContext';

const ProfileShowContainer = visitedUsername => {
  const [visitedProfile, setVisitedProfile] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authContext } = useContext(AuthContext);
  const { token } = authContext;

  const fetchVisitedProfile = () =>
    axios
      .get(`/api/users/profile/${visitedUsername}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "JWT " + token,
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (process.env.REACT_APP_VERBOSE === "true") console.log(error);
      });

  if (_.isEmpty(visitedProfile) && loading === false) {
    setLoading(true);
    fetchVisitedProfile().then(data => {
      if (data.founded === true) {
        setVisitedProfile(data);
        setLoaded(true);
        setLoading(false);
      } else {
        window.location = '/?message=user_not_found';
      }
    });
  }

  return { visitedProfile, loaded };
};

export default ProfileShowContainer;
