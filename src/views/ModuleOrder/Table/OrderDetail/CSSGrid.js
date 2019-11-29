import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {Grid, Paper} from '@material-ui/core';
import CustomizedTables from './TableRight.js';
import TableLeft from './TableLeft';
const useStyles = makeStyles(theme => ({
  paper: {
    padding:10,
    marginTop:10,
    marginBottom:10
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default function CSSGrid() {
  const classes = useStyles();

  return (
    <div>
    <Grid>
     <Grid container justify='center' spacing={5}>
        <Grid item sm>
          <Paper className={classes.paper}>
            <TableLeft/>
          </Paper>
        </Grid>

        <Grid item sm>
          <Paper className={classes.paper}>
            <CustomizedTables/>
          </Paper>
        </Grid>

      </Grid>
    </Grid>
    </div>
  );
}
