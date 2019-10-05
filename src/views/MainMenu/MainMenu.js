//Dependencias
import React from 'react';


//Componentes
import './MainMenu.css';
import Dashboard from '../Dashboard/Dashboard';
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

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

function MainMenu(props){
  
    
      if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
      }

        return(
            <div>
                  <Dashboard />
            </div>
          )
}

export default withRouter(withStyles(styles)(MainMenu))