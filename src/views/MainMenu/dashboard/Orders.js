import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import OrderController from './../../../controllers/Order';

import AlertDialog from './DialogSelectOrder.js';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}
const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {
  const classes = useStyles();
  const [pedidos, setPedidos] = React.useState([]);
  const [cargarPedidos, setCargarPedidos] = React.useState(true);

    React.useEffect(() => {
      if (cargarPedidos) {
        OrderController.getOrdersNow()
          .then(pedidos => {
            console.log(pedidos);
            console.log(cargarPedidos);
            setPedidos(pedidos);
            setCargarPedidos(false);
          })
          .catch(error => {
            console.log("Error al traer los Pedidos del día => ", error);
          })
      }
    });

  return (
    <React.Fragment>                
      <Title>Pedidos para Hoy</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Opciones</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Localidad</TableCell>
            <TableCell>Dirección</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.map(pedido => (
            <TableRow key={pedido.id_pedido}>
              
              <TableCell>
                <AlertDialog/>
              </TableCell>
              <TableCell>{pedido.cliente.nombre +' ' +pedido.cliente.apellido}</TableCell>
              <TableCell>{pedido.ciudad}</TableCell>
              <TableCell>{pedido.direccion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}