const axios = require("axios");
const request = require("request");

module.exports = (app) => {
  app.get("/fetchTMDBApi", (req, res, next) => {
    request({
      uri: "https://api.themoviedb.org/3/movie/76341",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2M1MGU5NmIzMjIzNDMzNDkwMmQ2YWExZGZjYjM5OSIsInN1YiI6IjVlOTliNGQ4ZmRmOGI3MDAxYWE0YTUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j1ctA9Te_3qxM9ezjwquO9lvVIhlcEcBb0Ft9GCR4ug",
      },
    }).pipe(res);
  });
};
