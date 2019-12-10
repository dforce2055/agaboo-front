import React from 'react';
import { fade,makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {FormControl,Paper,TextField,InputBase,Grid } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import SearchIcon from '@material-ui/icons/Search';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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

export default function Filters({search,handleChangeFilter,Typeahead}) {
  const classes = useStyles();

   const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange2 = event => {
    setAge(event.target.value);
  };

  const handleClose2 = () => {
    setOpen(false);
  };

  const handleOpen2 = () => {
    setOpen(true);
  };

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  
  return (
    <Paper style={{backgroundColor:'#fff',padding:10,marginTop:10}}>
    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>

<div>
      <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose2}
            onOpen={handleOpen2}
            value={age}
            onChange={handleChange2}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
</div>



    {/*Input*/}
    <Grid item>
      <div className={classes.search} style={{backgroundColor:'#E0E0E0'}}>
        <div className={classes.searchIcon}>
          <SearchIcon style={{color:'#949494'}}/>
        </div>
        <InputBase
          placeholder="Buscar..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          // onChange={handleChangeFilter('input')}
          onKeyUp = {
            event => {
                Typeahead(event.target.value);
            }
          }
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
          onChange={handleChangeFilter('select')}
          labelWidth={labelWidth}
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option value=""></option>
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
