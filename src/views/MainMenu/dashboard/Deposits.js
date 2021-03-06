/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import OrderController from '../../../controllers/Order.js';
// import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
    marginTop:'50px',
  },
});

export default function Deposits() {
  const classes = useStyles();  
  const [loaded,setLoaded] = React.useState(true);
  const [mountOrderCurrent,setMountOrderCurrent] = React.useState('Calculando...');
  const fechaActual = new Date();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(()=>{
    if (loaded) {      
      let sum = 0;
      OrderController.allDepositsInActualMonth()
      .then(result=>{
        console.log(result);
        
        if (result || result === 0) { //Si result existe suma
          sum = result
        }else{ //En caso de que no exista mostrara error
          sum = 'ERROR';
        }
      setMountOrderCurrent('$'+sum);
      });

      setLoaded(false);
    }
  });
  

  return (
    <React.Fragment>
    {/* <Button variant="contained" onClick={handleNewQuery}>QUERY</Button> */}
      <Title>Ingreso del Mes</Title>
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