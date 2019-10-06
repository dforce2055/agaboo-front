import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import CustomerController from '../../../controllers/Customer';
import DialogAcept from './dialogAcept';

/*
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);*/

export default function AddressForm() {
  const [values, setValues] = React.useState({
    nombre:'',
    apellido: '',
    fechNac:'',
    dni:'',
    celular: '',
    telefono: '',
    cuit:'',    
    email:'',
    localidad:'',
    calle:'',
    altura:'',
    eliminado:false,
    mostrarDialog:false,
  });  

  const auth = () =>{
    if(values.nombre.length > 3){
      return false
    }else{
      return true
    }
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });  
  };

  const handleOnClick = () => {
    console.log('Guardando...')
    let data = {
      nombre: values.nombre,
      apellido: values.apellido,
      fechNac: values.fechNac,
      dni: values.dni,
      cuit: values.cuit,
      calle:values.calle,
      altura: values.altura,
      localidad:values.localidad,
      celular:values.celular,
      email:values.email,
      eliminado:false,
    }
    CustomerController.addCustomer(data)    
    handleCloseDialog();
  }

  const [mostrarDialog, setMostrarDialog] = React.useState(false);  
  const handleCloseDialog = () =>{
    setMostrarDialog(mostrarDialog===false);
  };

  return (
    <React.Fragment>

    <DialogAcept
    mostrarDialog={mostrarDialog}
    handleCloseDialog={handleCloseDialog}
    />
      <Typography variant="h6" gutterBottom>
        Rellenar los campos para registrar cliente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="nombre"
            variant="outlined"            
            label="Nombre"            
            onChange={handleChange('nombre')}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange('apellido')}  
            variant="outlined"
            id="apellido"           
            label="Apellido"
            fullWidth
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            id="nombre"
            variant="outlined"            
            label="DNI"         
            onChange={handleChange('dni')}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange('cuit')}
            variant="outlined"        
            label="CUIT"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField       
            onChange={handleChange('email')}
            variant="outlined"
            label="E-mail"
            fullWidth
            required
          />
        </Grid>              
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange('localidad')}
            value={values.localidad}                   
            required
            label="Localidad"
            fullWidth
            variant="outlined"     
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField      
            onChange={handleChange('calle')}
          label="Calle"
          variant="outlined"
          fullWidth 
          required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField   
            onChange={handleChange('altura')}
            variant="outlined"
            label="Altura"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange('fechNac')}
            type="date"
            variant="outlined"            
            helperText="Fecha De Nacimiento"
            required
            fullWidth            
          />
        </Grid>  
        <Grid item xs={12} sm={6}>
          <TextField            
            onChange={handleChange('celular')}
            label="Celular"
            fullWidth
            variant="outlined"  
            required   
          />
        </Grid>      
        <Grid item xs={12}>          
        </Grid>          
      </Grid>

      <Button
      variant="contained"
      color="secondary"      
      /*onClick={handleBack}*/
      >Cancelar</Button>
      
      <Button
      variant="contained"
      color="primary"
      onClick={handleOnClick}
      disabled={auth()}
      >Guardar</Button>
      
    </React.Fragment>
  );
}