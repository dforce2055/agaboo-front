import React from 'react';
import { Button } from '@material-ui/core';

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
    <Button
    variant="contained"
    type="button"
    onClick={findMe}>
    Mi ubicacion
    </Button>
  );
}

export default MiUbicacion;