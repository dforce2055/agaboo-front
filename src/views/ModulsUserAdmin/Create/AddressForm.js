import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import CustomerController from '../../../controllers/Customer';
import DialogAcept from './dialogAcept';
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator'; //Validacion de campos
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttonCancel: {    
    background: 'linear-gradient(45deg, #f56f5b 3%, #ff2200 97%)',
    //background: 'linear-gradient( 45deg, #3fb5a5 30%, #05fcda 90%)', //PRUEBA DE COLOR DE BOTON DE CERRAR SESION
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginLeft: theme.spacing(13),
  },
  buttonAcept: {    
    background: 'linear-gradient(45deg, #3fb5a5 2%, #40f03a 98%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginLeft: theme.spacing(13),
  },
}));

 function AddressForm(props) {
  const classes = useStyles();
  React.useEffect(()=>{
    ValidatorForm.addValidationRule("isValidName", (string)=> /[a-zA-Z \u00E0-\u00FC]{1,20}/g.test(string))
  })

  const {history} = props;

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
    <ValidatorForm onSubmit={handleOnClick}> {/*Agregue*/}
    <DialogAcept
    mostrarDialog={mostrarDialog}
    handleCloseDialog={handleCloseDialog}
    />
      <Typography variant="h6" gutterBottom>
        Rellenar los campos para registrar cliente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField //Cambie de text field
            id="nombre"
            variant="outlined"            
            label="Nombre"  
            type="text"          
            onChange={handleChange('nombre')}
            //required            
            fullWidth
            validators = {["required","isValidName"]}
            errorMessages={["El campo es requerido","El formato es invalido."]}
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
    className={classes.buttonCancel}   
      variant="contained"
      color="secondary"    
      onClick ={ () => history.push('/mainMenu')}
      /*onClick={handleBack}*/
      >Cancelar</Button>

      <Button
      className={classes.buttonAcept}
      variant="contained"
      color="primary"
      type="submit"
      >Guardar</Button>

      </ValidatorForm>
    </React.Fragment>
  );
}

export default withRouter(AddressForm);
