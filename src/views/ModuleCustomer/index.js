import React,{useState,useEffect } from 'react';
import Navbar from '../Header/Navigation'
import Dashboard from './Delete-Update-List/Table/Dashboard';
import SimpleBottomNavigation from '../Footer/Footer';
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import { Container,Grid,Paper,CardHeader } from '@material-ui/core';
import {MuiThemeProvider, createMuiTheme,makeStyles} from '@material-ui/core/styles';
import InputSearch from './Delete-Update-List/Search/index.js';
import CSS from './CSS';

const useStyles = makeStyles(theme => ({
    espacio:{
      marginTop: theme.spacing(3),
      boxShadow: CSS.borderShadow
    }
  }));

function DeleteUpdateUserAdmin(props) {
    const classes = useStyles();

    let userRole = firebase.getCurrentUserRole();
    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
    }

    if (userRole==="LOGISTICS"){ //si tiene rol de usuario de logistica
      alert('No tenes permiso para acceder a esta ventana')
      props.history.goBack();
  }
  

    return (
        
        <div className="UsersScreen">
            <Navbar></Navbar>
<Container maxWidth='xl'>
            <Paper className={classes.espacio}>
                <h1>
                    <CardHeader titleTypographyProps = {'titulo'} title="Clientes" />
                </h1>
            </Paper>

            
            <Grid 
                container
                direction="row" 
                justify="flex-end"
                alignItems="baseline"
            >
                <InputSearch/>
            </Grid>

            </Container>

            <Dashboard></Dashboard>
            <footer style={{marginTop:'5px'}}>
              <SimpleBottomNavigation/>
            </footer>
        </div>
        
    )
}

export default withRouter(DeleteUpdateUserAdmin);