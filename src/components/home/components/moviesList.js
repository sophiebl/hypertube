import React, { useState } from "react";
import { Typography, Fab, Grid, LinearProgress } from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
import AddIcon from "@material-ui/icons/Add";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactImageFallback from "react-image-fallback";
import _ from "lodash";

const MoviesList = ({ classes, list }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {_.map(list, (movie, index) => (
        <Grid
          item
          xs={12}
          sm={4}
          md={2}
          lg={2}
          key={movie.imdb_code}
          onMouseEnter={() => setIsHovered(index)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={classes.card}
            onClick={() => {
              window.location = `/movie/${movie.imdb_code}`;
            }}
          >
            <ReactImageFallback
              src={movie.medium_cover_image}
              fallbackImage="https://media.giphy.com/media/26xBIygOcC3bAWg3S/giphy.gif"
              initialImage={
                <CircularProgress className={classes.progress} size={60} />
              }
              alt={movie.title}
              className={classes.img}
            />
            {movie.watched ? (
              <>
                <CheckCircleIcon
                  className={classes.viewedIcon}
                  color="primary"
                />
                <LinearProgress
                  variant="determinate"
                  value={100}
                  color="secondary"
                  className={classes.progressBar}
                />
              </>
            ) : null}
            {isHovered === index ? (
              <>
                <Fab
                  color="primary"
                  aria-label="add"
                  className={classes.fabAdd}
                >
                  <AddIcon />
                </Fab>
                <div className={classes.cardInfo}>
                  <Grid container>
                    <Grid item xs={8} sm={8} md={8} lg={8}>
                      <Typography
                        variant="h5"
                        component="h3"
                        className={[
                          classes.cardInfoText,
                          classes.movieName,
                        ].join(" ")}
                      >
                        {movie.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        className={[
                          classes.cardInfoText,
                          classes.movieTypeYear,
                        ].join(" ")}
                      >
                        {movie.genres[0]} | {movie.year}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sm={4}
                      md={4}
                      lg={4}
                      className={classes.ratingBoxDiv}
                    >
                      <div className={classes.ratingBox}>
                        <StarRateIcon />
                        <Typography className={classes.ratingText}>
                          {movie.rating}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </>
            ) : null}
          </div>
        </Grid>
      ))}
    </>
  );
};

export default MoviesList;
