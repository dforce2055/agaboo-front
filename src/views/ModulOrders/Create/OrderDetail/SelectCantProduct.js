import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

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
    padding: '10px 26px 10px 12px',
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

const option = (e,handleChange) => {
  //const classes = useStyles();
  
  return(
    <div>
       <FormControl /*className={classes.margin}*/>
        {/*<InputLabel htmlFor="age-customized-native-simple">Age</InputLabel>*/}
        <NativeSelect
          value={e.modelo}
          onChange={handleChange('modelo')}
          input={<BootstrapInput name="age" id="age-customized-native-simple" />}
        >
          <option value="" />
          <option value={'AG1'}>Ten</option>
          <option value={'AG2'}>Twenty</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}

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
    }
  });

  const handleChange2 = name => event => {    
    setCant_prodt_select({ ...cant_prodt_select, [name]: event.target.value });  
    console.log(event.target.value);
  };

  

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="age-customized-input">Age</InputLabel>
        <BootstrapInput id="age-customized-input" />
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="age-customized-select">Age</InputLabel>
        
        <Select
          value={cant_prodt_select.producto}
          onChange={handleChange2('producto')}
          input={<BootstrapInput name="age" id="age-customized-select" />}
        >
          <MenuItem value={'bañoQuimico'}>Baño Quimico</MenuItem>
          <MenuItem value={'oficina'}>Oficina de obra</MenuItem>
          <MenuItem value={'garita'}>Garita de seguridad</MenuItem>
          <MenuItem value={'boleteria'}>Boleteria</MenuItem>
        </Select>
      </FormControl>

      { state ?  <FormControl /*className={classes.margin}*/>
        {/*<InputLabel htmlFor="age-customized-native-simple">Age</InputLabel>*/}
        <NativeSelect
          value={cant_prodt_select.modelo}
          onChange={handleChange2('modelo')}
          input={<BootstrapInput name="age" id="age-customized-native-simple" />}
        >
          <option value="" />
          <option value={'AG1'}>Ten</option>
          <option value={'AG2'}>Twenty</option>
        </NativeSelect>
      </FormControl> : '' }
      
    </form>
  );
}
