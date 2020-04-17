import _ from "lodash";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../App/AuthContext";

const HomeContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const {
    authContext: { userData },
  } = useContext(AuthContext);

  const fetchProfile = () => {
    userData
      .then((response) => {
        setUserInfo(response);
        setLoaded(true);
      })
      .catch((error) => {
        if (process.env.REACT_APP_VERBOSE === "true") console.log(error);
      });
  };

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    window.location = "/?message=login_success";
  };

  const fetchTMDPApi = () => {
    axios
      .get(`/api/home/fetchTMDPApi`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2M1MGU5NmIzMjIzNDMzNDkwMmQ2YWExZGZjYjM5OSIsInN1YiI6IjVlOTliNGQ4ZmRmOGI3MDAxYWE0YTUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j1ctA9Te_3qxM9ezjwquO9lvVIhlcEcBb0Ft9GCR4ug",
        },
      })
      .then((data) => console.log(data));
  };

  if (_.isEmpty(userInfo) && loaded === false) {
    fetchProfile();
  }

  return { userInfo, loaded, saveToken, fetchTMDPApi };
};

export default HomeContainer;
