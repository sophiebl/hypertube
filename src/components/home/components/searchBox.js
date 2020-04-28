import React from "react";
import { Slider, Typography, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";

const SearchBox = ({
  classes,
  searchOptions,
  setSearchOptions,
  handleChangeSlider,
  // currentUserProfile,
  // fetchSearch,
  handleSort,
}) => {
  const sortOptions = [
    {
      value: "",
      label: "",
    },
    {
      value: "distance",
      label: "Distance",
    },
    {
      value: "ageAsc",
      label: "Age: Low to high",
    },
    {
      value: "ageDesc",
      label: "Age: High to low",
    },
    {
      value: "popularity",
      label: "Popularity",
    },
    {
      value: "interests",
      label: "Interests",
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
                  handleChangeSlider("name", event.target.value)
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
              handleChangeSlider("rating", newValue)
            }
            // onChangeCommitted={() => fetchSearch()}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={(value) => `${value} kms`}
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
            onChange={(event, newValue) => handleChangeSlider("year", newValue)}
            // onChangeCommitted={() => fetchSearch()}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={(value) => `${value} kms`}
            min={1900}
            max={2020}
          />
        </Grid>
        <Grid item sm={2} xs={6}>
          <Typography
            id="discrete-slider"
            className={classes.titleGutterbottom}
            align="center"
          >
            Genre
          </Typography>
          <div className={classes.interestChips}>
            <div>
              {/* <Autocomplete
                className={classes.slider}
                multiple
                // options={currentUserProfile.interests.map((interest) => {
                //   return { name: interest };
                // })}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  handleChangeSlider("genre", value);
                }}
                name="interest"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Add interest"
                    fullWidth
                  />
                )}
              /> */}
            </div>
          </div>
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
