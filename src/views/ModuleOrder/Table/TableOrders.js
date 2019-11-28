import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles,withStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ButtonColorStatus from './ButtonColorStatus';
import OrderController from '../../../controllers/Order.js';
import ButtonOption from './ButtonOption.js';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#318377',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const TableOrders = (orders,updateArray) =>{

  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana

  React.useEffect(() => {
    console.log("useEfo9pfect");
    // creamos una función para actualizar el estado con el clientWidth
    const updateWidth = () => {
      const width = document.body.clientWidth;
      console.log(`updateWidth con ${width}`);
      setWidthWindows(width);
    };

    // actualizaremos el width al montar el componente
    updateWidth();

    // nos suscribimos al evento resize de window
    window.addEventListener("resize", updateWidth);
  }, []);

  return(
    <Table>
      <TableHead  >
        <TableRow hover={true}>
            <StyledTableCell>Nro. Pedido</StyledTableCell>
            <StyledTableCell>Cliente</StyledTableCell>
            <StyledTableCell>Fecha Entrega</StyledTableCell>
            <StyledTableCell>Estado</StyledTableCell>
            <StyledTableCell>Opciones</StyledTableCell>
        </TableRow>
          </TableHead>
            <TableBody>
              {orders.map(order => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>{order.id_pedido}</TableCell>
                  <TableCell>{order.nombre}</TableCell>
                  <TableCell>
                    {moment(order.fecha_entrega).format('DD/MM/YYYY')}
                  </TableCell>
                <TableCell>
                  <div>
                    <ButtonColorStatus status ={order.estado} />
                  </div>
                </TableCell>
                <TableCell>
                    <ButtonOption 
                      updateArray={updateArray}
                      listado_producto = {order.listado_producto} //Listado producto entero
                      id_pedido={order.id_pedido} //Id del pedido seleccionado
                      estado={order.estado}
                    />    
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
  );
}

export default TableOrders;