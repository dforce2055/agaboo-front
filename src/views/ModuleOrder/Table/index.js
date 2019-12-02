import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Divider
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TableOrders from './TableOrders.js';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: 'flex-end'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(12),
    right: theme.spacing(7),
    zIndex: 99,
    backgroundColor: '#3fb5a5',
    '&:hover': {
      backgroundColor: '#0ce8ca',
      "@media (hover: none)": {
        backgroundColor: "#0ce8ca"
      },
    },
  },
}));

const IndexTable = props => {
  const classes = useStyles();
  const {history} = props;
  const {
    loadData,
    orders,
    updateArray,
    } = props
  let userRole = checkRoleAdmin();

  // React.useEffect(()=>{
  //   if (loadData) {
  //     OrderController.getOrders()
  //       .then(result =>{
  //         setOrders(result);
  //         setLoadData(false);
  //       }); 
  //     setLoadData(false);
  //   }
  // });

  // const [loadData,setLoadData] = useState(true);
  // const [orders,setOrders] = useState([]);

  // const updateArray = () => {
  //   setLoadData(true);
  // }

  function checkRoleAdmin(){
    let role = localStorage.userRole; //me guardo el rol del usuario

    if(role==="ADMIN"){
      return true;
    }else if(role==="LOGISTICS"){
      return false;
    }
  }

  return (
    <React.Fragment>
      {userRole ? 
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/registrarPedido')} >
          <AddIcon />
        </Fab> : ""
      }
    
      <Card>
        <Divider/>
        <CardContent>
          <TableOrders
            orders={orders}
            updateArray={updateArray}
          />
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
          >
           Ver mas <ArrowRightIcon />
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

IndexTable.propTypes = {
  className: PropTypes.string
};

export default withRouter(IndexTable);