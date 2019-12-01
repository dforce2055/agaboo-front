import React,{useState} from 'react';
import {Grid, Paper,Button,TextField } from '@material-ui/core';
//import components
import Mapquest from './components/Map';
import MiUbicacion from './components/MiUbicacion';
import Busqueda from './components/Busqueda';

const IndexMapquest = () =>{

  const [lat,setLat] = useState('-37.1167');
  const [lng,setLng] = useState('-56.8333');
  const [markers,setMarkers] = useState([]);

  //Fijo el centro del mapa a la ubicacion
  const setCenter = (lat,lng) =>{
    setLat(lat);
    setLng(lng);

    window.L.mapquest.Map.getMap('map').setView(new window.L.LatLng(lat,lng),12);
  }

  const addMarker = (lat,lng,title,subtitle) =>{
    const marker = window.L.mapquest.textMarker(
      new window.L.LatLng(lat,lng),
      {
        text:title ||'',
        subtext:subtitle || '',
        position:'right',
        type:'marker',
        icon:{
          primaryColor: '#22407F',
          secondaryColor: '#3B5998',
          shadow: true,
          size: 'md',
        }
      }
    ).addTo( window.L.mapquest.Map.getMap('map') );
    const copyMarkers = markers.slice(0);

    copyMarkers.splice(0,0,marker);
    setMarkers(copyMarkers);
  };

  const clearMarkers = () => {
    markers.forEach(marker => {
      window.L.mapquest.Map.getMap('map').removeLayer(marker)
    });
    //limpiar state
    setMarkers([])
  };

  return(
    <div stlye={{width:'350px'}}>
      <Grid 
        container 
        direction="row" 
        justify="space-between" 
        alignItems="center"
        spacing={3}
        style={{marginBottom:'10px'}}>
        <Grid item style={{marginLeft:'10px'}}>
          <Busqueda
            setCenter={setCenter}
            addMarker={addMarker}
            clearMarkers={clearMarkers}
          />
        </Grid>

        <Grid item style={{marginRight:'10px'}}>
          <Paper>
            <MiUbicacion 
              setCenter={setCenter}
              setMarker={addMarker}
            />
          </Paper>
        </Grid>
      </Grid>
      
      <Mapquest 
        height="80vh"
        width="100%"
        center={[lat,lng]}
        tileLayer = {'map'} //map, dark
        zoom = {13}
        apiKey = {'meqlHLEccqt4SDpiqvD4NA53M1WIhQOg'}
      />
    </div>
  );
}

export default IndexMapquest;

