import React,{useState} from 'react';
import {Button,TextField,makeStyle} from '@material-ui/core';
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
      <MuiThemeProvider theme={themeMuiProvider}>
      <Button 
        type="submit" 
        disabled={!query.length}
        color="primary"
        variant="contained"
      >
        Buscar
      </Button>
      </MuiThemeProvider>
    </form>
  );
}

export default Busqueda;