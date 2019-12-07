import React,{useEffect} from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from 'react-google-maps';


let deposito ={
  lat: -37.126907,
  lng: -56.914029
}

const Map = (props) =>{

  var info = JSON.parse(sessionStorage.getItem('order_complete')) //Obtengo la informacion del pedido  seleccionado. Ubicada en GridInfoCustomer.js
  
  deposito.lat = parseFloat(info.coordinates_ubicacionDeEntrega.lat); //Selecciono la latitud 
  deposito.lng = parseFloat(info.coordinates_ubicacionDeEntrega.lng); //Selecciono la longitud

  return(
    <div>
    <GoogleMap 
    defaultZoom={14}
    defaultCenter={deposito}
    >
      <Marker position={deposito} text="Depósito ARGENBATH"/>
    </GoogleMap>
    </div>
  );
}

export default withScriptjs(
  withGoogleMap(
    Map
  )
)