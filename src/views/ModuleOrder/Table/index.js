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
import TableOrders from './TableOrders.js';

const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: 'flex-end'
  },
}));

const IndexTable = props => {

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

  const updateArray = () => {
    setLoadData(true);
  }

  return (
      <Card>
        <Divider />
        <CardContent>
          {TableOrders(orders,updateArray)}
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

IndexTable.propTypes = {
  className: PropTypes.string
};

export default IndexTable;