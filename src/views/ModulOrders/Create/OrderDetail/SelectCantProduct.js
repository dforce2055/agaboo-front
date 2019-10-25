import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

//AGREGADO
import InputBase from '@material-ui/core/InputBase';
import {AddCircleIcon} from '@material-ui/icons/AddCircle';
import { TextField } from '@material-ui/core';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 1px 1px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedSelects() {
  const classes = useStyles();

  const [state,setState] = React.useState(false);
  const [cant_prodt_select, setCant_prodt_select] = React.useState({
    producto:'',
    modelo:'',
    cantidad:''
  });

  React.useEffect(()=>{
    if (cant_prodt_select.producto === 'bañoQuimico') {
      console.log(cant_prodt_select.modelo);
        setState(true);
    }else if(cant_prodt_select.producto !== 'bañoQuimico'){
      setState(false);
    }
  });

  const handleChange2 = name => event => {    
    setCant_prodt_select({ ...cant_prodt_select, [name]: event.target.value });  
    console.log(event.target.value);
  };

  

  return (
    <form className={classes.root} autoComplete="off">
    
      <FormControl className={classes.margin}>
      <TextField 
      id="time" 
      type="number"
      placeholder="Cantidad" />
      </FormControl>

      <FormControl className={classes.margin}>        
        <Select
          value={cant_prodt_select.producto}
          onChange={handleChange2('producto')}
          input={  <TextField 
           type="text"/>}
        >
          <MenuItem value={'bañoQuimico'}>Baño Quimico</MenuItem>
          <MenuItem value={'oficina'}>Oficina de obra</MenuItem>
          <MenuItem value={'garita'}>Garita de seguridad</MenuItem>
          <MenuItem value={'boleteria'}>Boleteria</MenuItem>
        </Select>
      </FormControl>
      { state ?  <FormControl className={classes.margin}>
        <NativeSelect
          value={cant_prodt_select.modelo}
          onChange={handleChange2('modelo')}
        >
          <option value="" />
          <option value={'AG1'}>AG1</option>
          <option value={'AG2'}>AG2</option>
        </NativeSelect>
      </FormControl> : '' }
    </form>
  );
}
