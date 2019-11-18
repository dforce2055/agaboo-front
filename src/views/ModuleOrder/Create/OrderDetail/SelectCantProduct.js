import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputAdornment from '@material-ui/core/InputAdornment';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

//AGREGADO
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { TextField, Input } from '@material-ui/core';


const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: {
      MuiFab:{
        primary:{
          backgroundColor:'#20b79b',
          '&:hover': {
            backgroundColor: '#18d2af',
          },
          margin:'auto',
        },
      },

}});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function SelectCantProduct(props) {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(()=>{
    if (cant_prodt_select.producto === 'Baño Químico') {
      setModeloBaño(true);
    }else if(cant_prodt_select.producto !== 'Baño Químico'){
      setModeloBaño(false);
    }
  });

  const classes = useStyles();

  const {handleChange} = props;
  const {cant_prodt_select} = props;
  const {addArrayProduct} = props;

  //Si fue seleccionado el baño publico, se pondra verdadero y mostrara los demas modelos
  const [modeloBaño,setModeloBaño] = React.useState(false);

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
      <FormControl className={classes.margin}>    
        <Select
          value={cant_prodt_select.producto} //Muestra el valor en los select
          onChange={handleChange('producto')}
          input={<Input 
           type="text"/>}
        >
          <MenuItem value={'Baño Químico'}>Baño Químico</MenuItem>
          <MenuItem value={'Oficina'}>Oficina de obra</MenuItem>
          <MenuItem value={'Garita'}>Garita de seguridad</MenuItem>
          <MenuItem value={'Boleteria'}>Boleteria</MenuItem>
        </Select>
      </FormControl>
      
      
      { modeloBaño ?  <FormControl className={classes.margin}>
        <NativeSelect
          onChange={handleChange('modelo')}
        ><option value="--" />
          <option value={'AG1'}>AG1</option>
          <option value={'AG2'}>AG2</option>
        </NativeSelect>
      </FormControl> : '' }

      <FormControl className={classes.margin}>
      <TextField 
      style={{width:'100px'}}
      type="number"
      value={cant_prodt_select.cantidad}
      placeholder="Cant."
      onChange={handleChange('cantidad')}
      />
      </FormControl>

      <FormControl className={classes.margin}>
      <TextField 
      style={{width:'100px'}}
      type="number"
      value={cant_prodt_select.precio_X_unidad}
      placeholder="Valor/u"
      onChange={handleChange('precio_X_unidad')}
      InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
      />
      </FormControl>
      <Fab 
      size="small" 
      aria-label="add" 
      color="primary"
      onClick={addArrayProduct}
    >
      <AddIcon />
    </Fab>
      </MuiThemeProvider>
    </div>
  );
}