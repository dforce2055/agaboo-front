import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button,ButtonGroup,Typography} from '@material-ui/core';
import CustomerController from '../../../controllers/Customer';
import DialogAcept from './dialogAcept';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withRouter } from "react-router-dom";
import {MuiThemeProvider, createMuiTheme, makeStyles} from '@material-ui/core/styles';


const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#3fb5a5',
        '&:hover': {
          backgroundColor: '#0ce8ca',
          "@media (hover: none)": {
            backgroundColor: "#0ce8ca"
          },
        },
      },
      containedSecondary: {
        backgroundColor: '#b53f3f',
        '&:hover': {
          backgroundColor: '#f30b0b',
          "@media (hover: none)": {
            backgroundColor: "#f30b0b"
          },
        },
      },
    }, 
  }
})

const useStyles = makeStyles(theme => ({
  buttonLeft: {
    marginRight:'2px',
    marginLeft:'13px',
    marginTop: theme.spacing(3),
  },
  buttonRight: {
    marginLeft:'20px',
    marginTop: theme.spacing(3),
  },
  
}));

function AddressForm(props) {
  const classes = useStyles();
  const {history} = props;
  const [values, setValues] = React.useState({
    nombre:'',
    apellido: '',
    celular: '',
    rubro:'',
    id:'',    
    email:'',
    localidad:'',
    calle:'',
    altura:'',
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
      id: values.id,
      rubro: values.rubro,
      calle:values.calle,
      altura: values.altura,
      localidad:values.localidad,
      celular:values.celular,
      email:values.email,
      label:values.nombre+' '+values.apellido+' ('+values.id+') ',
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
    <MuiThemeProvider theme={theme}>
    <React.Fragment>
    <DialogAcept
    mostrarDialog={mostrarDialog}
    handleCloseDialog={handleCloseDialog}
    />
      <Typography variant="h6" gutterBottom>
        Rellenar los campos para registrar cliente
      </Typography>

      <ValidatorForm onSubmit={handleOnClick} onError={errors =>  console.log(errors)}>    

        <Grid container spacing={3}  justify = { "center" }>
          <Grid item xs={12} sm={6}>
              <TextValidator //TextValidator obligatorio
                variant="outlined"
                fullWidth
                id="nombre"
                label="Name"
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
              id="nombre"
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
              fullWidth
              required
              onChange={handleChange('id')}
              helperText="Introducir solo numeros!"
              name="id"
              value={values.id}
              validators={['required', 'matchRegexp:(20|23|24|27|30|33|34)(\D)?[0-9]{8}(\D)?[0-9]']}
              errorMessages={['Campo requerido', 'CUIT no valido']}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator
              variant="outlined"
              label="Rubro"
              fullWidth
              required
              onChange={handleChange('rubro')}
              name="rubro"
              value={values.rubro}
              validators={['required', 'matchRegexp:^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$']}
              errorMessages={['Campo requerido', 'Campo invalido']}
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
            <ButtonGroup 
              variant="text"
              size="large"
              aria-label="large contained secondary button group"
            >
                <Button 
                style={{background: 'linear-gradient(45deg, #f56f5b 10%, #f30b0b 97%)'}}
                variant="contained"
                onClick ={ () => history.goBack()}
                >
                  Cancelar
                </Button>

                <Button 
                style={{background: 'linear-gradient(45deg, #3fb5a5 2%, #3fb5a5 98%)'}}
                variant="contained"
                type = " submit "
                >
                  Guardar
                </Button>
              </ButtonGroup>
        </Grid>

      </ValidatorForm>
      
    </React.Fragment>
    </MuiThemeProvider>
  );
}

export default withRouter(AddressForm);
