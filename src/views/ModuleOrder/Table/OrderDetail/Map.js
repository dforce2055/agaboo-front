import React from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap
} from 'react-google-maps';

const ubicacion ={
  lat: -37.1167,
  lng: -56.8333
}

const Map = (props) =>{
  return(
    <GoogleMap 
    defaultZoom={10}
    defaultCenter={ubicacion}
    />
  );
}

export default withScriptjs(
  withGoogleMap(
    Map
  )
)