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
import GridInfoCustomer from './GridInfoCustomer';
import GridTableProduct from './GridTableProduct';
import credentials from '../../../../config/credentials';
import Map from './Map.js';
import IndexMapquest from './MapQuest/index';
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
    padding:10,
    marginTop:10,
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

// const mapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik'
const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`;

export default function GridFather() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper);
  return (
    <div className={classes.root}>
          <CssBaseline />
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={3}>
            {/* Tabla de productos para introducir id */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <GridTableProduct/>
              </Paper>
            </Grid>
            {/* Informacion del pedido */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper2}>
                <GridInfoCustomer  />
              </Paper>
            </Grid>
            {/* Mapa */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h1>Ubicacion de entrega</h1>
            <Map
              googleMapURL={mapURL}
              containerElement={<div style={{height:'400px'}} />}
              mapElement={<div style={{height:'100%'}}/>}
              loadingElement={<p>Cargando</p>}
            />
              </Paper>
            </Grid>

            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h1>Ubicacion de entrega</h1>
                {/* Si lo quieren eliminar, tienen que eliminar tambien los script que estan en public/index.html. Hay dos script de mapquest
                <IndexMapquest/> 
              </Paper>
            </Grid> */}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
