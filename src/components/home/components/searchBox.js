import React from "react";
import { Slider, Typography, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";

const SearchBox = ({
  classes,
  searchOptions,
  setSearchOptions,
  handleChangeInput,
  // currentUserProfile,
  handleSort,
  fetchSearch,
  debouncedCallback,
}) => {
  const genreOptions = [
    {
      value: "",
      label: "",
    },
    {
      value: "Action",
      label: "Action",
    },
    {
      value: "Adventure",
      label: "Adventure",
    },
    {
      value: "Animation",
      label: "Animation",
    },
    {
      value: "Biography",
      label: "Biography",
    },
    {
      value: "Comedy",
      label: "Comedy",
    },
    {
      value: "Crime",
      label: "Crime",
    },
    {
      value: "Documentary",
      label: "Documentary",
    },
    {
      value: "Drama",
      label: "Drama",
    },
    {
      value: "Family",
      label: "Family",
    },
    {
      value: "Fantasy",
      label: "Fantasy",
    },
    {
      value: "History",
      label: "History",
    },
    {
      value: "Horror",
      label: "Horror",
    },
    {
      value: "Musical",
      label: "Musical",
    },
    {
      value: "Mystery",
      label: "Mystery",
    },
    {
      value: "Romance",
      label: "Romance",
    },
    {
      value: "Sci-Fi",
      label: "Sci-Fi",
    },
    {
      value: "Thriller",
      label: "Thriller",
    },
    {
      value: "War",
      label: "War",
    },
    {
      value: "Western",
      label: "Western",
    },
  ];
  const sortOptions = [
    {
      value: "",
      label: "",
    },
    {
      value: "ratingAsc",
      label: "Rating: Low to high",
    },
    {
      value: "ratingDesc",
      label: "Rating: High to low",
    },
    {
      value: "yearAsc",
      label: "Year: Old to New",
    },
    {
      value: "yearDesc",
      label: "Year: New to Old",
    },
  ];
  return (
    <div className={classes.filtersContainer}>
      <Grid container spacing={5} direction="row" justify="center">
        <Grid item sm={2} xs={6}>
          <Grid
            container
            spacing={1}
            alignItems="flex-end"
            className={classes.whiteField}
          >
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="Movie name"
                value={searchOptions.name}
                onChange={(event) =>
                  handleChangeInput("name", event.target.value)
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={2} xs={6}>
          <Typography
            id="discrete-slider"
            className={classes.titleGutterbottom}
            align="center"
          >
            Rating
          </Typography>
          <Slider
            className={classes.slider}
            value={searchOptions.rating}
            onChange={(event, newValue) =>
              handleChangeInput("rating", newValue)
            }
            onChangeCommitted={() => fetchSearch()}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            // getAriaValueText={(value) => `${value} kms`}
            min={0}
            max={10}
          />
        </Grid>
        <Grid item sm={2} xs={6}>
          <Typography
            id="discrete-slider"
            className={classes.titleGutterbottom}
            align="center"
          >
            Year
          </Typography>
          <Slider
            className={classes.slider}
            value={searchOptions.year}
            onChange={(event, newValue) => handleChangeInput("year", newValue)}
            onChangeCommitted={() => fetchSearch()}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={(value) => `${value} kms`}
            min={1900}
            max={2020}
          />
        </Grid>
        <Grid item sm={2} xs={6}>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="outlined-select-currency-native"
              select
              // className={classes.textField}
              className={classes.whiteField}
              value={searchOptions.genre}
              label="Genre"
              onChange={(event) =>
                handleChangeInput("genre", event.target.value)
              }
              fullWidth
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              variant="outlined"
            >
              {genreOptions.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.label}
                </option>
              ))}
            </TextField>
          </form>
        </Grid>
        <Grid item sm={2} xs={6}>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="outlined-select-currency-native"
              select
              // className={classes.textField}
              className={classes.whiteField}
              value={searchOptions.sort}
              label="Sort by"
              onChange={(event) => handleSort(event)}
              fullWidth
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              variant="outlined"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchBox;
