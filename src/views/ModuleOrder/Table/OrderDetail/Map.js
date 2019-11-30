import React from 'react';
import {
  GoogleMap,
  withScriptJs,
  withGoogleMap
} from 'react-google-maps';

const ubicacion ={
  lat: -34.397,
  lng: 150.644
}

const Map = (props) =>{
  return(
    <GoogleMap 
    defaultZoom={10}
    defaultCenter={ubicacion}
    />
  );
}

export default withScriptJs(
  withGoogleMap(
    Map
  )
)