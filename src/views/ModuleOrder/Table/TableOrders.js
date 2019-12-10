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
  TableSortLabel,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ButtonColorStatus from './ButtonColorStatus';
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
    <Grid
      style={{backgroundColor:'#318377'}}
      container 
      direction="row" 
      justify="space-around" 
      alignItems="center"
      spacing={2}
      >
        <Grid item>
       <Typography 
        style={{background:'#318377'}}
        align='center'
        variant='h6'>
        <spam style={{color:'#fff'}}>Informacion</spam>
      </Typography>
      </Grid>
      </Grid>
      {orders.map((order,index)=>(
      <div>
        <br/>
          <Divider key={index} />
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
        (widthWindow > 681) ? 
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
                    <TableCell>
                      <Typography gutterBottom variant="subtitle1">
                        {order.id_pedido}
                      </Typography>
                    </TableCell>
                    <TableCell>
                    <Typography gutterBottom variant="subtitle1">
                    {order.nombre}
                    </Typography>
                    </TableCell>
                    <TableCell>
                    <Typography gutterBottom variant="subtitle1">
                      {moment(order.fecha_entrega).format('DD/MM/YYYY')}
                    </Typography>
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