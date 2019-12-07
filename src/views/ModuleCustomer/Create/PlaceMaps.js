import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { 
  TextField,
  Grid,
  Container,
  Typography,MenuItem } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

function List(suggestion,handleChange) {
  const stringPart = suggestion.description.split(",")
  console.log(stringPart);
  
  return(
    <MenuItem onClick={()=>handleChange(suggestion.description)}>
    <Grid container spacing={1}>
          <Grid item xs={12} sm container>
          <Grid item>
          <RoomIcon style={{color:"#3fb5a5"}}/>
        </Grid>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {stringPart[0]}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {stringPart.map(x =>{
                     if(stringPart[0] !== x){
                      return x+". "
                    }
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </MenuItem>
  );
}

export default function PlaceMaps() {
  const classes = useStyles();

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

  const handleChange = (e) =>{
    setAddress(e)
  }

  return (
    <div>
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
                  "#e0f2f1" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    <div type="button">
                    {List(suggestion,handleChange)}
                    </div>
                    </div>
                );
              })}
            </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}