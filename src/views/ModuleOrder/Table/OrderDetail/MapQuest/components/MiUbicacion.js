import React from 'react';
import { Button } from '@material-ui/core';
import {
  MuiThemeProvider, 
  createMuiTheme} from '@material-ui/core/styles';


const themeMuiProvider = createMuiTheme({
  overrides: {
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
      containedSecondary: {
        backgroundColor: '#b53f3f',
        '&:hover': {
          backgroundColor: '#f30b0b',
          "@media (hover: none)": {
            backgroundColor: "#f30b0b"
          },
        },
      },
    }, 
  }
})

const MiUbicacion = ({ setCenter, setMarker }) =>{
  
  const findMe = () =>{
    if (!navigator.geolocation) {
      alert('El navegador no soporta geolocalizacion');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position)=>{
        const {latitude,longitude} = position.coords;
        if (setCenter) {
          setCenter(latitude,longitude);
        }
        if (setMarker) {
          setMarker(latitude,longitude,'Mi Ubicacion')
        }
      },
      (error)=>{
        alert('Error al obtener la ubicacion',error);
      }
    )
  };
  return(
    <MuiThemeProvider theme={themeMuiProvider}>
      <Button
        variant="contained"
        type="button"
        onClick={findMe}
        color="primary"
      >
       Mi ubicacion
      </Button>
    </MuiThemeProvider>
  );
}

export default MiUbicacion;