const axios = require('axios')

const fetchTMDB = (idIMDB) => axios
  .get(`https://api.themoviedb.org/3/find/${idIMDB}?api_key=${process.env.TMDB_KEY}&language=en-US&external_source=imdb_id`)
  .then((result) => {
    console.log(result.data)
    if (
      result.data &&
      result.data.movie_results.length >= 1
    ) {
      return result.data.movie_results[0];
    } else {
      return false;
    }
  });

const findSingleMovie = (req, res) => {
  const idIMDB = req.params.id;
  fetchTMDB(idIMDB).then(result => {
    res.send(result)
  })
}

module.exports = (app) => {
  app.get(
    "/find/:id",
    findSingleMovie
  );
};