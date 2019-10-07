//Dependencias
import React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';


//Componentes
import './MainMenu.css';
//import Dashboard from '../Dashboard/Dashboard'; //barra que no se usa
import Navbar from '../Header/Navigation'; //barra que hay que usar
import ButtonSimple from '../ButtonsMenu/ButtonSimple';
import ButtonClient from '../ButtonsMenu/ButtonClient';
import ButtonProduct from '../ButtonsMenu/ButtonProduct';
import ButtonStock from '../ButtonsMenu/ButtonStock';
import ButtonOrder from '../ButtonsMenu/ButtonOrder';
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';

const theme = createMuiTheme({ /* Plantilla de edicion */
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
  },
  }
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
            <div>
              <MuiThemeProvider theme={theme}>
                 <Navbar/>
                 {/* <div><Chart></Chart></div> */}
        
                <div  className = {"Button"}><ButtonClient fullWidth/></div>
                <div  className = {"Button"}><ButtonProduct fullWidth/></div>
                <div  className = {"Button"}><ButtonStock fullWidth/></div>
                <div  className = {"Button"}><ButtonOrder fullWidth/></div>
                <div  className = {"Button"}><ButtonSimple nombre = {'Estado de cuenta'/*Utilizo los props para reutilizar el boton simple*/} fullWidth/></div>
                <div  className = {"Button"}><ButtonSimple nombre = {'Mantenimientos a realizar'} fullWidth/></div>
              </MuiThemeProvider>
            </div>
          )
}

export default withRouter(MainMenu);