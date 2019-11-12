import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();

  var cliente = JSON.parse(sessionStorage.getItem('info_cliente_pedido')); 
  
  var listado_producto= JSON.parse(sessionStorage.getItem('arreglo_productos')); 

  var detalle_pedido; 
  detalle_pedido=JSON.parse(sessionStorage.getItem('info_detalle_pedido'));

  const payments = [
    { name: 'Fecha de creacion: ', detail: detalle_pedido.fecha_entrega },
    { name: 'Fecha de entrega: ', detail: detalle_pedido.fecha_finalizacion },
    { name: 'Contacto en trabajo: ', detail: detalle_pedido.ContactoEnTrabajo},
    { name: 'Ubicacion de entrega: ', detail: detalle_pedido.ubicacionDeEntrega },
  ];

  const [valueTotal,setValueTotal] = React.useState();
  React.useEffect(()=>{
    if(cliente !== null){
      console.log("MUESTRO cliente: ",cliente);
      console.log("MUESTRO detalle_pedido: ",detalle_pedido);
      console.log("MUESTRO listado_producto: ",listado_producto);
      let cantidad = 0;
      let valor = 0;
      let total = 0;

      listado_producto.forEach(element => {
        cantidad = element.cantidad;
        valor = element.precio_X_unidad;
        total += (cantidad*valor);
      });
      setValueTotal(total)
      sessionStorage.setItem('monto_calculado',valueTotal) //Guardo el valor calculado, para poder guardarlo en el pedido.
    }
    /*if (cliente !== null || detalle_pedido == null || listado_producto === null) {
      payments = [
        { name: 'Card type', detail: 'Visa' },
        { name: 'Card holder', detail: 'Mr John Smith' },
        { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
        { name: 'Expiry date', detail: '04/2024' },
      ];
    }*/
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumen de pedido
      </Typography>
      <List disablePadding>
        {listado_producto.map(product => (
          <ListItem className={classes.listItem} key={product.id_producto}>
            <ListItemText primary={product.producto} secondary={product.modelo} />
            <Typography 
            variant="body2">
              {"Precio/u= $"+product.precio_X_unidad+".  "+"        Unidades="+product.cantidad}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
          ${valueTotal} {/*Muestro valor calculado*/} 
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Cliente
          </Typography>
          <Typography gutterBottom>{cliente.nombre+' '+cliente.apellido+'. Celular: '+cliente.celular}</Typography>
          <Typography gutterBottom>{'Responsable de pago: '+detalle_pedido.responsableDelPago}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Detalle de pedido
          </Typography>
          <Grid container>

          {/*<Typography gutterBottom>{'Creacion de pedido: '+detalle_pedido.dateOfDelivery}</Typography>
          <br></br>
          <Typography gutterBottom>{'Fecha de entrega: '+detalle_pedido.dateOfDeliveryFIN}</Typography>

          <Typography gutterBottom>{'Ubicacion de entrega: '+detalle_pedido.locationOfDelivery}</Typography>
          <Typography gutterBottom>{'Lugar de cobro: '+detalle_pedido.responsibleForPayment}</Typography>*/}

          {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}