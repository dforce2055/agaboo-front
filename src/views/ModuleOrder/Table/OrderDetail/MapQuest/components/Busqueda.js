import React,{useState} from 'react';
import {Button,TextField } from '@material-ui/core';

const Busqueda = ({setCenter,addMarker,clearMarkers}) => {
  const [query,setQuery] = useState('');
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    findLocation();
  }

  const findLocation = () => {
    if (!query.length) return;

    if (clearMarkers) clearMarkers();
    window.L.mapquest.geocoding().geocode(query,
    (error,response)=>{

      response.results.forEach((result,res_index) => {
        //procesar ubicaciones de cada resultado
        result.locations.forEach(location =>{

          const { street,adminArea5,adminArea3,latLng } = location;
          if (res_index === 0) {
            setCenter(latLng.lat,latLng.lng); //Centro el mapa
          }
          addMarker(
            latLng.lat,
            latLng.lng,
            street,
            adminArea3,
            adminArea5,
          );

        });
      });
    })
  };

  return (
    <form onSubmit = {handleSubmit}>
      <div>
        <TextField
          style={{width:'150px'}}  
          label='Mi ubicacion'
          color="primary" 
          id="query"
          variant="outlined" 
          onChange={handleChange}
          />
      </div>
      <Button 
        type="submit" 
        disabled={!query.length}
        color="secondary"
        variant="contained"
      >
        Buscar
      </Button>
    </form>
  );
}

export default Busqueda;