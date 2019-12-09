import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import firebase from '../../../config/firebase';
import { makeStyles,withStyles,MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const themeMuiProvider = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#3fb5a5',
        '&:hover': {
          backgroundColor: '#0ce8ca',
          "@media (hover: none)": {
            backgroundColor: "#0ce8ca"
          },
        },
      },
      containedSecondary: {
        backgroundColor: '#b53f3f',
        '&:hover': {
          backgroundColor: '#f30b0b',
          "@media (hover: none)": {
            backgroundColor: "#f30b0b"
          },
        },
      },
    }, 
  }
})

const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: 'flex-start'
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
    Pagination,
    } = props
  let userRole = checkRoleAdmin();

  async function checkRoleAdmin(){
    
    let role = await firebase.getCurrentUserRole();

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
          <MuiThemeProvider theme={themeMuiProvider}>
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={Pagination}
            >
            Ver mas <ArrowRightIcon />
            </Button>
          </MuiThemeProvider>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

IndexTable.propTypes = {
  className: PropTypes.string
};

export default withRouter(IndexTable);