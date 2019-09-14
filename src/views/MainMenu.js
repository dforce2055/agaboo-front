import React, {Component} from 'react';
//import Navbar from './Navigation';
import ButtonClient from './ButtonClient';
import ButtonProduct from './ButtonProduct';
import ButtonStock from './ButtonStock';
import ButtonOrder from './ButtonOrder';
import Navbar from './BM-UsersScreen/AppBarAlt';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './MainMenu.css';
//import Navbar from './Navigation';
import ButtonSimple from './ButtonSimple';


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

class MainMenu extends Component
{
    render()
    {
        return(
            <div>
                <MuiThemeProvider theme={theme}>
                <Navbar/>
                
                <div  className = {"Button"}><ButtonClient/></div>
                <div  className = {"Button"}><ButtonProduct/></div>
                <div  className = {"Button"}><ButtonStock/></div>
                <div  className = {"Button"}><ButtonOrder/></div>
                <div  className = {"Button"}><ButtonSimple nombre = {'Estado de cuenta'/*Utilizo los props para reutilizar el boton simple*/}/></div>
                <div  className = {"Button"}><ButtonSimple nombre = {'Mantenimientos a realizar'}/></div>
                </MuiThemeProvider>
            </div>
           
            
            
            )
    }
}

export default MainMenu;