import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import HttpsTwoToneIcon from '@material-ui/icons/HttpsTwoTone';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import firebase from '../../config/firebase';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #2c7369 20%, #3fb5a5 90%)',
    bottom:'0',
    left:'0',
    right:'0',
    position:'fixed',
  },
});

const theme = createMuiTheme({ /* Plantilla de edicion */
    overrides: {
        MuiBottomNavigationAction:{
            root:{
                color: 'rgb(255, 255, 255)',
                maxWidth: '1000px',
                '&$selected':{
                color: '#ffffff',
                }
            },
            label:{
              fontSize: '0.875rem',
            },
        },

  }});

function SimpleBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {history} = props;

  async function logOut(){
    try {
        await firebase.logout();
        props.history.replace('/');
    } catch (error) {
        alert(error.message)
    }
}

  return (
    <div className="footer">
        <MuiThemeProvider theme={theme}>
              <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                  setValue(newValue);
              }}
              showLabels
              className={classes.root}
              >
              <BottomNavigationAction label="Volver" icon={<ArrowBackIosTwoToneIcon />} onClick ={ () => history.goBack()}/>
              <BottomNavigationAction label="Menu Principal" icon={<HomeTwoToneIcon />} onClick ={ () => history.push('/mainMenu')}/>
              <BottomNavigationAction label="Cerrar Sesión" icon={<HttpsTwoToneIcon />} onClick ={logOut}/>
              </BottomNavigation>
        </MuiThemeProvider>
    </div>
  );
}

export default withRouter(SimpleBottomNavigation);
