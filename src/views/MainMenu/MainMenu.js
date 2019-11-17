//Dependencias
import React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';


//Componentes
import './MainMenu.css';
//import Dashboard from '../Dashboard/Dashboard'; //barra que no se usa
import Navbar from '../Header/Navigation'; //barra que hay que usar
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import SimpleBottomNavigation from '../Footer/Footer';

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
                 <Dashboard></Dashboard>
                <footer>
                  <SimpleBottomNavigation/>
                </footer>

              </MuiThemeProvider>
            </div>
          )
}

export default withRouter(MainMenu);