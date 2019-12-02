import React from 'react';
import {Grid, Paper,ButtonGroup,Divider,Typography,makeStyles} from '@material-ui/core';
import GridRight from './GridRight';
import GridLeft from './GridLeft';
import credentials from '../../../../config/credentials';
import Map from './Map.js';

const useStyles = makeStyles(theme => ({
  root:{
    flexGrow: 1,
  },
  paperLast: {
    padding:10,
    marginTop:10,
    marginBottom:55,
    width:'100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    margin:theme.spacing(1), //HACE MOVER LA PANTALLA<======
  },
  paperMap:{
    marginBottom:55,
    margin:theme.spacing(1)
  }
}));
//'https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}'

const mapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik'

export default function GridFather() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Grid container direction="row" justify="space-evenly" alignItems="center">
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

    </Grid>
         <Paper className={classes.paperMap}>
            <h1>Ubicacion de entrega</h1>
            <Map
              googleMapURL={mapURL}
              containerElement={<div style={{height:'400px'}} />}
              mapElement={<div style={{height:'90%'}}/>}
              loadingElement={<p>Cargando</p>}
            />
          </Paper>
    </div>
  );
}
