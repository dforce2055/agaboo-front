/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
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

  React.useEffect(()=>{
    if (loaded) {      
      let sum = 0;
      OrderController.allDeposits()
      .then(result=>{
        if (result) { //Si result existe suma
          sum = result
        }else{ //En caso de que no exista mostrara error
          sum = 'ERROR';
        }
      setMountOrderCurrent('$'+sum);
      });

      setLoaded(false);
    }
  });
  const [loaded,setLoaded] = React.useState(true);
  const [mountOrderCurrent,setMountOrderCurrent] = React.useState('Calculando...');
  const handleNewQuery = () =>{
    setLoaded(true);
  }
  return (
    <React.Fragment>
    <Button variant="contained" onClick={handleNewQuery}>QUERY</Button>
      <Title>Depositos Recientes</Title>
      <Typography component="p" variant="h4">
      {mountOrderCurrent}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      {/*<div>
        <Link color="primary" href="javascript:;">
          View balance
        </Link>
      </div>*/}
    </React.Fragment>
  );
}