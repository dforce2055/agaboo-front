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
import TableOrdersRespon from './TableOrdersRespon.js';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#318377',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const TableResponsive = (orders,updateArray) => {
  return(
    <React.Fragment>
      {orders.map((order,index)=>(
      <div>
        <br/>
          <Divider key={order.id} />
          <TableOrdersRespon  
            order={order} 
            i={index+1} 
            updateArray={updateArray}
          />
        <br/>
      </div>
    ))}
    </React.Fragment>
  );
}

const TableOrders = props =>{
  
  const {updateArray} = props;
  const {orders} = props;

  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana

  //Actualiza el ancho de la ventana
  React.useEffect(() => {
    const updateWidth = () => {
      const width = document.body.clientWidth;
      setWidthWindows(width);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
  }, []);

  return(
    <React.Fragment>
      {
        (widthWindow > 450) ? 
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
                {orders.map((order,index) => (
                  <TableRow
                    hover
                    key={index}
                  >
                    <TableCell>{order.id_pedido}</TableCell>
                    <TableCell>{order.nombre}</TableCell>
                    <TableCell>
                      {moment(order.fecha_entrega).format('DD/MM/YYYY')}
                    </TableCell>
                  <TableCell>
                    <div>
                      <ButtonColorStatus 
                      status ={order.estado} />
                    </div>
                  </TableCell>
                  <TableCell>
                      <ButtonOption 
                        updateArray={updateArray}
                        order={order}
                        estado = {order.estado}
                      />    
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        :
        TableResponsive(orders,updateArray)
      }
    </React.Fragment>
  );
}

export default TableOrders;