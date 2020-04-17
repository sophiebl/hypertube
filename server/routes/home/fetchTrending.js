const request = require("request");

module.exports = (app) => {
  app.get("/fetchTrending", (req, res, next) => {
    request({
      uri: "https://api.themoviedb.org/3/trending/movie/week",
      headers: {
        Authorization: "Bearer " + process.env.TMDB_ACCESS_TOKEN,
      },
    }).pipe(res);
  });
};
