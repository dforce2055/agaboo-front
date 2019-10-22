import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button,ButtonGroup,Typography, createMuiTheme} from '@material-ui/core';
import CustomerController from '../../../controllers/Customer';
import DialogAcept from './dialogAcept';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withRouter } from "react-router-dom";
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  overrides: {
    MuiFormHelperText: {
      root:{
        color: blue,
      }
    } 
  }
})

const useStyles = makeStyles(theme => ({
  //& p
  'helper': {
    color: 'blue !important',
    fontStyle: 'italic',
  },

}));

function AddressForm(props) {
  const classes = useStyles();

  const {history} = props;
  const [values, setValues] = React.useState({
    /*nombre:'',
    apellido: '',
    celular: '',
    empleo:'',
    cuit:'',    
    email:'',
    localidad:'',
    calle:'',
    altura:'',
    role: '',
    eliminado:false,
    mostrarDialog:false,*/


    nombre: '',
    apellido: '',
    cuit: '',
    cuil: '',
    tipoDocumento: '',
    numeroDocumento: '',
    fechNac: '',
    direccion: '',
    calle: '',
    altura: '',
    localidad: '',
    celular: '',
    telefono: '',
    email: '',
    estado: '',
    role: '',
    password: '',
    eliminado:false,
    mostrarDialog:false,
  });  

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });  
  };

  const handleOnClick = () => {
    console.log('Guardando...')
    let data = {
      nombre: values.nombre,
      apellido: values.apellido,
      //id: values.cuit,
      //empleo: values.empleo,
      cuit: values.cuit,
      cuil: values.cuil,
      tipoDocumento: values.tipoDocumento,
      numeroDocumento: values.numeroDocumento,
      fechNac: values.fechNac,
      //direccion: values.direccion,
      calle:values.calle,
      altura: values.altura,
      localidad:values.localidad,
      celular:values.celular,
      telefono:values.telefono,
      email:values.email,
      estado:values.estado,
      role:values.role,
      //eliminado:false,
    }
    CustomerController.addCustomer(data)    
    handleCloseDialog();
  }

  const [mostrarDialog, setMostrarDialog] = React.useState(false);  
  const handleCloseDialog = () =>{
    setMostrarDialog(mostrarDialog===false);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <React.Fragment>

      <DialogAcept
      mostrarDialog={mostrarDialog}
      handleCloseDialog={handleCloseDialog}
      />
        <Typography variant="h6" gutterBottom>
          Por favor complete los siguientes campos para registrar un usuario
        </Typography>

        <ValidatorForm onSubmit={handleOnClick} onError={errors =>  console.log(errors)}>    

          <Grid container spacing={3}  justify = { "center" }>
            <Grid item xs={12} sm={6}>
                <TextValidator //TextValidator obligatorio
                  variant="outlined"
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  onChange={handleChange('nombre')}
                  name="name"
                  required
                  //Validacion necesaria
                  value={values.nombre}
                  validators={['required','matchRegexp:^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$']}
                  errorMessages={['Campo requerido', 'Nombre no valido']}
                />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                id="apellido"
                label="Apellido"
                onChange={handleChange('apellido')}
                name="apellido"
                required
                value={values.apellido}
                validators={['required','matchRegexp:^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$']}
                errorMessages={['Campo requerido', 'Apellido no valido']}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                label="Cuit/Cuil"
                id="cuil"
                fullWidth
                required
                onChange={handleChange('cuil')}
                className={classes.helper}  helperText ="¡Introducir solo números!"
                name="cuil"
                value={values.cuil}
                validators={['required', 'matchRegexp:(20|23|24|27|30|33|34)(\D)?[0-9]{8}(\D)?[0-9]']}
                errorMessages={['Campo requerido', '¡¡¡CUIL invalido!!!']}
              />
            </Grid>
            {/*
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                label="Empleo"
                fullWidth
                required
                onChange={handleChange('empleo')}
                helperText="Introducir solo numeros!"
                name="empleo"
                value={values.empleo}
                validators={['required', 'matchRegexp:^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$']}
                errorMessages={['Campo requerido', 'Campo invalido']}
              />
            </Grid>
            */}
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                label="Tipo de Documento"
                onChange={handleChange('Tipo de Documento')}
                name="tipoDocumento"
                value={values.tipoDocumento}
                fullWidth
                validators={['matchRegexp:^[a-zA-Z0-9.!#$%&*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$']}
                errorMessages={['Tipo de Documento no valido']}
              />
            </Grid> 
            <Grid item xs={12}>
              <TextValidator       
                variant="outlined"
                label="Email"
                onChange={handleChange('email')}
                name="email"
                value={values.email}
                fullWidth
                validators={['matchRegexp:^[a-zA-Z0-9.!#$%&*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$']}
                errorMessages={[ 'Email no valido']}
              />
            </Grid>      
            <Grid item xs={12} sm={6}>
              <TextValidator
                onChange={handleChange('localidad')}
                value={values.localidad}                   
                required
                label="Localidad"
                fullWidth
                variant="outlined"     
                value={values.localidad}
                validators={['required','matchRegexp:^[a-zA-Z ]*$']}
                errorMessages={['Campo requerido', 'Localidad no valida']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator      
                onChange={handleChange('calle')}
                label="Calle"
                variant="outlined"
                fullWidth 
                required
                value={values.calle}
                validators={['required','matchRegexp:^[a-zA-Z ]*$']}
                errorMessages={['Campo requerido', 'Calle no valida']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator   
                onChange={handleChange('altura')}
                variant="outlined"
                label="Altura"
                fullWidth
                required
                value={values.altura}
                type='number'
                validators={['required']}
                errorMessages={['Campo requerido']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator            
                variant="outlined"
                label="Celular"
                onChange={handleChange('celular')}
                name="Celular"
                fullWidth
                required
                value={values.celular}
                type='number'
                validators={['required', 'matchRegexp:^(\D)?[0-9]']}
                errorMessages={['Campo requerido', 'Celular es invalido']}
              />
            </Grid> 
            <Grid item xs={12} sm={6}>
              <ButtonGroup 
                variant="text"
                size="large"
                aria-label="large contained secondary button group"
              >
                  <Button 
                  style={{background: 'linear-gradient(45deg, #f56f5b 10%, #ff2200 97%)'}}
                  variant="contained"
                  onClick ={ () => history.goBack()}
                  >
                    Cancelar
                  </Button>
                  <Button 
                  style={{background: 'linear-gradient(45deg, #3fb5a5 2%, #40f03a 98%)'}}
                  variant="contained"
                  type = " submit "
                  >
                    Guardar
                  </Button>
                </ButtonGroup>
            </Grid>      
          </Grid>

        </ValidatorForm>
        
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default withRouter(AddressForm);