import React from 'react';
import {Grid} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
const TableLeft = () =>{

  const [order,setOrder] = React.useState({});
  const [load,setLoad] = React.useState(true);

  React.useEffect(()=>{
    if (load) {  
        setOrder(JSON.parse(sessionStorage.getItem('order_complete')));
        setLoad(false);
    } 
  });
  console.log(order);
  
  return(
    <React.Fragment>
    <br/>
      <Divider />
      <h1>Detalle del pedido</h1>
      <Divider />
      <br/>
      <Grid container justify="space-between">
          Cliente:
        <Grid >
          {order.nombre}
        </Grid>
      </Grid>
      <br/>
      <Divider />

      <br/>
      <Grid container justify="space-between">
          Zona de entrega:
        <Grid >
          {order.ciudad+'/'+order.direccion}
        </Grid>
      </Grid>
    <br/>
      <Divider />

       <br/>
      <Grid container justify="space-between">
          Entrega-Finalizacion
        <Grid >
          {order.fecha_entrega+'/'+order.fecha_finalizacion}
        </Grid>
      </Grid>
      <br/>
      <Divider />

       <br/>
      <Grid container justify="space-between">
          Id pedido:
        <Grid >
          {order.id_pedido}
        </Grid>
      </Grid>
      
    <br/>
      <Divider />
    </React.Fragment>
  );
}

export default TableLeft;