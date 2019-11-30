import React from 'react';
import {Grid, Paper,ButtonGroup,Divider,Typography,makeStyles} from '@material-ui/core';
import GridRight from './GridRight';
import GridLeft from './GridLeft';

const useStyles = makeStyles(theme => ({
  root:{
    flexGrow: 1,
  },
  paperLast: {
    padding:10,
    marginTop:10,
    marginBottom:55
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    margin:theme.spacing(1), //HACE MOVER LA PANTALLA<======
  },
}));

export default function GridFather() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     <Grid container justify='center'>
        <Grid item sm={4}>
          <Paper className={classes.paper}>
             <GridLeft/>
          </Paper>
        </Grid>

        <Grid item sm={8}>
          <Paper className={classes.paper}>
            <GridRight/>
          </Paper>
        </Grid>

        <Grid item sm = {12}>
          <Paper className={classes.paperLast}>
            <h1>Info de abajo</h1>
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
}
