/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import OrderController from '../../../controllers/Order.js';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();  
  const [loaded,setLoaded] = React.useState(true);
  const [mountOrderCurrent,setMountOrderCurrent] = React.useState('Cargando...');
  const handleNewQuery = () =>{
    setLoaded(true);
  }
  const fechaActual = new Date();
  
  React.useEffect(()=>{
    if (loaded) {      
      let sum = 0;
      OrderController.allDeposits()
      .then(result=>{
        //Recorro y sumo todos los valores que devuelto
        for (let i = 0; i < result.length; i++) {
          sum += result[i];
        }
      console.log(sum);
      setMountOrderCurrent('$'+sum);
      });

      setLoaded(false);
    }
  });
  

  return (
    <React.Fragment>
    <Button variant="contained" onClick={handleNewQuery}>QUERY</Button>
      <Title>Ingreso Mensual</Title>
      <Typography component="p" variant="h4">
      {mountOrderCurrent}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
      {'Dato correspondiente al mes '}
        {fechaActual.getMonth()+1}
        {'/'}
        {fechaActual.getFullYear()}
      </Typography>
    </React.Fragment>
  );
}