//Dependencias
import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

//Componentes
import './MainMenu.css';
import Navbar from './Header/Navigation';
import SimpleBottomNavigation from './Footer/Footer';
import ButtonSimple from './ButtonSimple';
import ButtonClient from './ButtonClient';
import ButtonProduct from './ButtonProduct';
import ButtonStock from './ButtonStock';
import ButtonOrder from './ButtonOrder';
//import Chart from './Statistics/Chart.js';



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
                  {/* <div><Chart></Chart></div> */}
        
                  <div  className = {"Button"}><ButtonClient fullWidth/></div>
                  <div  className = {"Button"}><ButtonProduct fullWidth/></div>
                  <div  className = {"Button"}><ButtonStock fullWidth/></div>
                  <div  className = {"Button"}><ButtonOrder fullWidth/></div>
                  <div  className = {"Button"}><ButtonSimple nombre = {'Estado de cuenta'/*Utilizo los props para reutilizar el boton simple*/} fullWidth/></div>
                  <div  className = {"Button"}><ButtonSimple nombre = {'Mantenimientos a realizar'} fullWidth/></div>

                  <footer>
                    <SimpleBottomNavigation/>
                  </footer>
                  

                </MuiThemeProvider>

            </div>
           
            
            
            )
    }
}

export default MainMenu;