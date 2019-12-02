import React from 'react';
import {
  Grid, 
  Paper,
  ButtonGroup,
  Divider,
  Typography,
  makeStyles,
  Container,
  CssBaseline} from '@material-ui/core';
import GridRight from './GridRight';
import GridLeft from './GridLeft';
import credentials from '../../../../config/credentials';
import Map from './Map.js';
import clsx from 'clsx';


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
  },
  paperMap:{
    marginBottom:55,
    margin:theme.spacing(1)
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginBottom: theme.spacing(7),
  },
}));
//'https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}'

const mapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik'

export default function GridFather() {
  const classes = useStyles();
const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper);
  return (
    <div className={classes.root}>
    {/* <Grid container direction="row" justify="space-evenly" alignItems="center">
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
          </Paper> */}

          <CssBaseline />
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <GridRight
                />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper2}>
                <GridLeft  />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h1>Ubicacion de entrega</h1>
            <Map
              googleMapURL={mapURL}
              containerElement={<div style={{height:'400px'}} />}
              mapElement={<div style={{height:'90%'}}/>}
              loadingElement={<p>Cargando</p>}
            />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
