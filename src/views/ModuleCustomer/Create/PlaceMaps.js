/* eslint-disable no-use-before-define */
import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { 
  TextField,
  Grid,
  Container,
  Button,
  Typography } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const List = (suggestion,hanldeChange) => {
  // var string = suggestion.description;
  // var stringPart = string.split(",");
  // console.log(stringPart);
  
  // // \d{1,2}[\,\.]{1}\d{1,2}
  return(
    <div>
    {/* {suggestion.description} */}
    
    </div>
  );
}

export default function PlaceMaps() {

  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log("LATITUD Y LONGITUD DE DATOS SELECCIONADO",latLng);
    
    setAddress(value);
    setCoordinates(latLng);
  };

  const hanldeChange = (e) =>{
    setAddress(e)
  }
  const view = () =>{
    console.log(address);
    
  }
  return (
    <div>
    <Button onClick={view}>VER</Button>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p> */}

            <TextField fullWidth variant="outlined" {...getInputProps({ placeholder: "Type address" })}/>

              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? 
                  "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {/* {List(suggestion,hanldeChange)} */}
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}