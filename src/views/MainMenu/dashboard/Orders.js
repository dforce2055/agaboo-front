import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import OrderController from './../../../controllers/Order';

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
  const [open, setOpen] = React.useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = React.useState();

  const handleClickOpen = pedido  => {
    setPedidoSeleccionado(pedido);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <TableCell>Nombre</TableCell>
            <TableCell>Localidad</TableCell>
            <TableCell>Dirección</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.map(pedido => (
            <TableRow key={pedido.id_pedido} onClick={() => handleClickOpen(pedido)}>
              <TableCell>{pedido.cliente.nombre +' ' +pedido.cliente.apellido}</TableCell>
              <TableCell>{pedido.ciudad}</TableCell>
              <TableCell>{pedido.direccion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={open}
        
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Detalle del Pedido"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Fecha de Entrega: {pedidoSeleccionado}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}