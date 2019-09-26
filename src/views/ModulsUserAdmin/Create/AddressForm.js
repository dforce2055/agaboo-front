import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import CustomerController from '../../../controllers/Customer';

export default function AddressForm() {
  const [values, setValues] = React.useState({
    nombre:'',
    apellido: '',
    fechaNac:'',
    dni:'',
    celular: '',
    telefono: '',
    cuit:'',    
    email:'',
    localidad:'',
    calle:'',
    altura:'',
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
      fechaNac: values.fechaNac,
      dni: values.dni,
      cuit: values.cuit,
      calle:values.calle,
      altura: values.altura,
      localidad:values.localidad,
      celular:values.celular,
      email:values.email,
    }
    CustomerController.addCustomer(data)
  }

  /*const handleAuth = () => {
    if(values.nombre.length >3 && values.apellido.length >3 && values.dni.length >8){
      return true;
    }else{
      return false
    }
  }*/

  return (
    <React.Fragment>
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
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            id="nombre"
            variant="outlined"            
            label="DNI"         
            onChange={handleChange('dni')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange('cuit')}
            variant="outlined"        
            label="CUIT"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField       
            onChange={handleChange('email')}
            variant="outlined"
            label="E-mail"
            fullWidth
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
          fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField   
            onChange={handleChange('altura')}
            variant="outlined"
            label="Altura"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange('fechaNac')}
            type="date"
            variant="outlined"            
            helperText="Fecha De Nacimiento"
            
            fullWidth            
          />
        </Grid>  
        <Grid item xs={12} sm={6}>
          <TextField            
            onChange={handleChange('celular')}
            label="Celular"
            fullWidth
            variant="outlined"     
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

      {auth() === true ? 
      <Button
      variant="contained"
      color="inherit">Guardar</Button>
      :
      <Button
      variant="contained"
      color="primary"
      onClick={handleOnClick}
      >Guardar</Button>
      }
    </React.Fragment>
  );
}