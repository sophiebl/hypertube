import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Fab, Grid, LinearProgress } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddIcon from "@material-ui/icons/Add";
import StarRateIcon from '@material-ui/icons/StarRate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';  
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    "@global": {
      body: {
        fontSize: '12px'
      //   backgroundColor: theme.palette.common.white,
      },
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 400,
      },
    },
    gridCard: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(1),
      // padding: '20px 10px'
    },
    img: {
      // backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing(1),
      position: "relative",
      backgroundImage: 'url(assets/taxiDriver.jpg)',
      backgroundSize: 'cover',
      height: "450px",
      },
    h1: {
      display: 'inline',
      fontSize: '2em',
      color: '#009688',
      marginRight: '10px'
    },
    link: {
      color: '#009688',
    },
    h2: {
      display: 'inline-block',
      margin: '20px 0',
      fontSize: '1.5em',
      borderBottom: '5px solid #F5C53D'
    },
    playIcon: {
      position: "absolute",
      color: '#F5C53D',
      top: "50%",
      left: "calc(50% - 55.99px/2)",
    },
    starRateIcon: {
      color: '#F5C53D',
    },
    addIcon: {
      backgroundColor: '##009688',
    },
    rowName: {
      color: '#009688',
    },
    messageInput: {
      flexDirection: 'row',
      bottom: '0',
      width: '100%',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    textField: {
      backgroundColor: '#ffffff',
    },
}));

function createData(name, content) {
  return { name, content };
}

const rows = [
  createData('Starring', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
  createData('Created by', 'Lorem ipsum dolor sit amet'),
];

const Movie = () => {
  const classes = useStyles();
    return (
        <>
            <Grid className={classes.gridContainer} container direction={'row'} spacing={24}>
                <Grid item xs={12} sm={3} md={3} lg={3} className={classes.gridCard}>
                  <Box className={classes.img}>
                    <PlayCircleFilledIcon className={classes.playIcon} style={{ fontSize: 65 }} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.gridCard}>
                  <Box>
                    <h1 className={classes.h1}>Taxi Driver</h1>
                    <span>8.0</span>
                    <StarRateIcon className={classes.starRateIcon}/>
                  </Box>
                    <span>2014 | 2h23min | Drama</span>
                    <br/>
                    <h2 className={classes.h2}>OVERVIEW</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dignissim purus. Aenean posuere sagittis lobortis. Praesent vel sollicitudin purus. Praesent blandit, mauris at bibendum molestie, nibh odio semper metus, nec porttitor nisl ipsum efficitur mi. Quisque varius non mauris et malesuada. Pellentesque varius bibendum pellentesque. Morbi consequat accumsan leo, a auctor leo luctus quis. </p>
                    <TableContainer >
                      <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell component="th" scope="row" className={classes.rowName}>
                                {row.name}
                              </TableCell>
                              <TableCell>{row.content}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <h2 className={classes.h2}>LEAVE A COMMENT</h2>
                    <Box className={classes.messageInput}>
                      <Grid container spacing={2}>
                        <Grid item sm={10} xs={12} md={10} lg={10}>
                          {/* <TextField required id="standard-required" label="Required" defaultValue="What did you think about this movie ?" /> */}
                          <TextField
                            id="standard-full-width"
                            style={{ margin: 8 }}
                            placeholder="What did you think about this movie ?" 
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          {/* <TextField
                            // onChange={handleMessage}
                            // value={message}
                            fullWidth
                            type="text"
                            name="message"
                            variant="outlined"
                            className={classes.textField}
                          /> */}
                        </Grid>
                        <Grid item sm={2} xs={12} md={2} lg={2} >
                          <Fab color="primary" aria-label="add" className={classes.fabAdd}>
                          {/* onClick={sendMessage}  */}
                            <AddIcon className={classes.addIcon}/>
                          </Fab>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className={classes.card}>
                      <strong>42 comments • </strong>
                      <Link className={classes.link} href="#">
                        <strong>Show all </strong>
                        <ArrowDropDownIcon/>
                      </Link>
                      {/* <h2 className={classes.h2}>RELATED MOVIE</h2> */}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3} className={classes.gridCard}>
                  <Box className={classes.card}>
                    <h2 className={classes.h2}>RELATED MOVIE</h2>
                  </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Movie;