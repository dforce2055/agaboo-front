//Dependencias
import React, { useContext } from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';


//Componentes
import './MainMenu.css';
//import Dashboard from '../Dashboard/Dashboard'; //barra que no se usa
import Navbar from '../Header/Navigation'; //barra que hay que usar
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import SimpleBottomNavigation from '../Footer/Footer';
import AuthContext from './../contexts/AuthContext';
import Facebook from '../ButtonShare';

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
  //const { usuarioValidado } = useContext(AuthContext);
  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert('Por favor inicie sesión para acceder')
    props.history.replace('/login')
    return null
  }

  /*if (!usuarioValidado) {
    // not logged in
    alert('Por favor inicie sesión para acceder')
    props.history.replace('/login')
    return null
  }*/

  const shareUrl = String(window.location.href);
  const title = "https://agaboodforce.web.app/";
  
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Navbar />
        <Dashboard></Dashboard>

        {/* Botones de compartir en redes sociales */}
        {/* <div>
        <Facebook/>
        </div> */}


        <footer>
          <SimpleBottomNavigation url = { shareUrl }/>
        </footer>

      </MuiThemeProvider>
    </div>
  )
}

export default withRouter(MainMenu);