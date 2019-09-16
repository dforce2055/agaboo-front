//Dependencias
import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

//Componentes
import './MainMenu.css';
import Dashboard from './Dashboard';



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
<<<<<<< HEAD
                   
                
               <Dashboard></Dashboard>
=======
               
                  <Dashboard></Dashboard>
>>>>>>> 3d40f2c26715d30acc77dddb3cfc64f23174473c

                </MuiThemeProvider>

            </div>
           
            
            
            )
    }
}

export default MainMenu;