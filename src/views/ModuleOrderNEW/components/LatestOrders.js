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
import mockData from './data';
import ButtonColorStatus from './ButtonColorStatus';
import OrderController from '../../../controllers/Order.js';
const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: 'flex-end'
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#318377',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const LatestOrders = props => {

  const classes = useStyles();

  React.useEffect(()=>{
    if (loadData) {
      OrderController.getOrders()
        .then(result =>{
          setOrders(result);
          setLoadData(false);
        }); 
      setLoadData(false);
    }
  });
  const [loadData,setLoadData] = useState(true);
  const [orders,setOrders] = useState([]);

  return (
      <Card
      >
        <Divider />
        <CardContent>
            <div>
              <Table className={classes.table}>
                <TableHead  >
                  <TableRow hover={true}>
                    <StyledTableCell>Nro. Pedido</StyledTableCell>
                    <StyledTableCell>Cliente</StyledTableCell>
                    <StyledTableCell>Fecha Entrega</StyledTableCell>
                    <StyledTableCell>Estado</StyledTableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="text"
          >
            View all <ArrowRightIcon />
          </Button>
        </CardActions>
      </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;