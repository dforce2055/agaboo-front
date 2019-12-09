import React from 'react';
import {Grid} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';

const GridInfoCustomer = () =>{

  const [order,setOrder] = React.useState({});
  const [load,setLoad] = React.useState(true);
  
  React.useEffect(()=>{
    if (load) {  
        setOrder(JSON.parse(sessionStorage.getItem('order_complete')));
        sessionStorage.setItem('LatLng_order',JSON.stringify(order))
        setLoad(false);
    } 
  });
  
  return(
    <React.Fragment>
      <Divider/>
      <Typography 
        style={{background:'#318377'}}
        align='center'
        variant='h5'
      >
        <spam style={{color:'#fff'}}>Informacion</spam>
      </Typography>
      <Divider />
      <br/>
      <Grid container justify="space-between">
          <Typography variant="subtitle1">
            Cliente:
          </Typography>
        <Grid >
          <Typography variant="subtitle1">
          {order.nombre}
          </Typography>
        </Grid>
      </Grid>
      <br/>
      <Divider />

      <br/>
      <Grid container justify="space-between">
        <Typography variant="subtitle1">
          Zona de entrega:
        </Typography>
        <Grid >
        <Typography variant="subtitle1">
          {order.ubicacionDeEntrega}
        </Typography>
        </Grid>
      </Grid>
    <br/>
      <Divider />

       <br/>
      <Grid container justify="space-between">
        <Typography variant="subtitle1">
            Entrega-Finalizacion
        </Typography>
        <Grid >
          <Typography variant="subtitle1">
            {order.fecha_entrega+'/'+order.fecha_finalizacion}
          </Typography>
        </Grid>
      </Grid>
      <br/>
      <Divider />

       <br/>
      <Grid container justify="space-between">
        <Typography variant="subtitle1">
          Id pedido:
        </Typography>
        <Grid >
        <Typography variant="subtitle1">
          {order.id_pedido}
        </Typography>
        </Grid>
      </Grid>
      
    <br/>
      <Divider />
    </React.Fragment>
  );
}

export default GridInfoCustomer;