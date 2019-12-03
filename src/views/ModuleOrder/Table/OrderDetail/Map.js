import React from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from 'react-google-maps';

const deposito ={
  lat: -37.126907,
  lng: -56.914029
}

const Map = (props) =>{
  return(
    <GoogleMap 
    defaultZoom={14}
    defaultCenter={deposito}
    >
      <Marker position={deposito} text="Depósito ARGENBATH"/>
    </GoogleMap>
  );
}

export default withScriptjs(
  withGoogleMap(
    Map
  )
)