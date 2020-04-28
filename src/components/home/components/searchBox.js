import React from "react";
import { Slider, Typography, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SearchBox = ({
  classes,
  searchOptions,
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
          <Typography
            id="discrete-slider"
            className={classes.titleGutterbottom}
            align="center"
          >
            Distance
          </Typography>
          <Slider
            defaultValue={100}
            getAriaValueText={(value) => `${value} kms`}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={(event, newValue) =>
              handleChangeSlider("distanceMax", newValue)
            }
            // onChangeCommitted={() => fetchSearch()}
            step={10}
            marks
            min={0}
            max={500}
            className={classes.titleGutterbottom + " " + classes.slider}
          />
        </Grid>
        <Grid item sm={2} xs={6}>
          <Typography
            id="discrete-slider"
            className={classes.titleGutterbottom}
            align="center"
          >
            Age
          </Typography>
          <Slider
            className={classes.slider}
            value={searchOptions.ageRange}
            onChange={(event, newValue) =>
              handleChangeSlider("ageRange", newValue)
            }
            // onChangeCommitted={() => fetchSearch()}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={(value) => `${value} kms`}
            min={18}
            max={100}
          />
        </Grid>
        <Grid item sm={2} xs={6}>
          <Typography
            id="discrete-slider"
            className={classes.titleGutterbottom}
            align="center"
          >
            Popularity
          </Typography>
          <Slider
            className={classes.slider}
            value={searchOptions.popularityRange}
            onChange={(event, newValue) =>
              handleChangeSlider("popularityRange", newValue)
            }
            // onChangeCommitted={() => fetchSearch()}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={(value) => `${value} kms`}
            min={0}
            max={100}
          />
        </Grid>
        <Grid item sm={2} xs={6}>
          <Typography
            id="discrete-slider"
            className={classes.titleGutterbottom}
            align="center"
          >
            Interests
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
                  handleChangeSlider("interests", value);
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
            <Typography
              id="discrete-slider"
              className={classes.titleGutterbottom}
              align="center"
            >
              Sort by
            </Typography>
            <TextField
              id="outlined-select-currency-native"
              select
              className={classes.textField}
              value={searchOptions.sort}
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
