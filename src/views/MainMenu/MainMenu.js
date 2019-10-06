//Dependencias
import React from 'react';


//Componentes
import './MainMenu.css';
import Dashboard from '../Dashboard/Dashboard';
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import NavBar from '../Navigation';
import ButtonSimple from '../ButtonsMenu/ButtonSimple';
import ButtonClient from '../ButtonsMenu/ButtonClient'
import ButtonProduct from '../ButtonsMenu/ButtonProduct';
import ButtonStock from '../ButtonsMenu/ButtonStock';
import ButtonOrder from '../ButtonsMenu/ButtonOrder';
import Chart from '../Statistics/Chart';  
import '../MainMenu/MainMenu.js';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';


const styles = theme => ({
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: '#3fb5a5',
        }
      },
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
    },
  });

  const theme2 = createMuiTheme({ /* Plantilla de edicion */
    overrides: { 
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: '#3fb5a5',
        }
      },
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
        fullWidth: {
            width: '200%'
        },
    },

  }});

function MainMenu(props){
  
    
      if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
      }

        return(
              <React.Fragment>
                <NavBar/>
                <Chart></Chart>
                <MuiThemeProvider theme={theme2}>
                  <div  className = {"Button"}><ButtonClient fullWidth/></div>
                  <div  className = {"Button"}><ButtonProduct fullWidth/></div>
                  <div  className = {"Button"}><ButtonStock fullWidth/></div>
                  <div  className = {"Button"}><ButtonOrder fullWidth/></div>
                  <div  className = {"Button"}><ButtonSimple nombre = {'Estado de cuenta'/*Utilizo los props para reutilizar el boton simple*/} fullWidth/></div>
                  <div  className = {"Button"}><ButtonSimple nombre = {'Mantenimientos a realizar'} fullWidth/></div>
                </MuiThemeProvider>





              </React.Fragment>
                        )
}

export default withRouter(withStyles(styles)(MainMenu))