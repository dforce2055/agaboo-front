import React from 'react';
import { fade,makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {FormControl,Paper,TextField,InputBase,Grid, IconButton } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 175,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default function Filters({handleChangeInput,handleClickOpen,optionAutocomplete,search,handleChangeFilter,Typeahead}) {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
 
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChangeCopy = (event) =>{
    console.log("event",event);
  }
  return (
    <Paper style={{backgroundColor:'#fff',padding:10,marginTop:10}}>
    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>

    {/*Input*/}
    <Grid item>
      <div className={classes.search} style={{backgroundColor:'#E0E0E0'}}>
      <Autocomplete
        options={optionAutocomplete} //Arreglo con datos
        getOptionLabel={option => option.code} //Map de arreglo
        style={{ width: 300 }}
        onChange={(event,value) => {
          handleChangeInput(value) //Guardo el valor en el estado search de index
        }}
        renderInput={params => (
          <TextField 
            {...params} 
            placeholder="Buscar..."
            variant="outlined" 
            InputProps={{
              startAdornment: <InputAdornment position="start" style={{backgroundColor:"#f20"}}>
                <IconButton onClick={handleClickOpen}> {/*Abro dialog con la informacion del objeto seleccionado*/}
                  <SearchIcon style={{color:'#949494'}}/>
                </IconButton>
              </InputAdornment>
            }}
            fullWidth
            onKeyUp = {
              event => {
                  Typeahead(event.target.value); //Busco cada vez que introduzca una letra si existe en la db.
              }
            }
        /> 
      )}
    />
      </div>
    </Grid>

    {/*Select by state*/}
    <Grid item>      
      <FormControl 
      variant="outlined" 
      className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
          Filtrado por estado
        </InputLabel>
        <Select
          native
          value={search.select}
          onChange={handleChangeFilter('select')} /*Guardo en el estado search de index el estado que haya seleccionado para su filtrado.*/
          labelWidth={labelWidth}
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option value=""></option>{/*Pongo un valor vacio asi no se superpone con el placeholder*/}
          <option value={'DISPONIBLE'}>Disponibles</option>
          <option value={'ALQUILADO'}>Alquilados</option>
          <option value={'EN MANTENIMIENTO'}>En Mantenimiento</option>
          <option value={'EN TRANSITO'}>En transito</option>
        </Select>
      </FormControl>
      </Grid>
    </Grid>
    </Paper>
  );
}
