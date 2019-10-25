import React from 'react';
//import UserController from '../../../controllers/User';
import DialogAcept from './dialogAcept';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withRouter } from "react-router-dom";
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';
import { Grid, TextField, InputLabel, Select, MenuItem, Button, ButtonGroup, Typography, createMuiTheme } from '@material-ui/core/';


const theme = createMuiTheme({
  overrides: {
    MuiFormHelperText: {
      root:{
        color: blue,
      }
    },
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
  //& p
  'helper': {
    color: 'blue !important',
    fontStyle: 'italic',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  
}));

const documentos = [
  {
    value: 'DNI',
    label: 'DNI',
  },
  {
    value: 'Pasaporte',
    label: 'Pasaporte',
  },
  {
    value: 'L.E.',
    label: 'Libreta de Enrolamiento',
  },
  {
    value: 'L.C.',
    label: 'Libreta Cívica',
  },
  {
    value: 'CUIT',
    label: 'CUIT',
  },
  {
    value: 'CUIL',
    label: 'CUIL',
  },
];

const roles = [
  {
    value: 'ADMIN',
    label: 'Administrador',
  },
  {
    value: 'USER',
    label: 'Administrativo',
  },
  {
    value: 'LOGISTICS',
    label: 'Logistica y Mantenimiento',
  },
];


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
    setCuitOrCuil();
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
    //CustomerController.addCustomer(data);
    //UserController.addUser();
    console.log("Toma, voy a mandar esta data => ");
    console.log(data);
    
  }

  function setCuitOrCuil() {
    if ( values.tipoDocumento === 'CUIT' ) {
      values.cuit = values.numeroDocumento;
    }
    if (values.tipoDocumento === 'CUIL') {
      values.cuil = values.numeroDocumento;
    }
  }

  console.log(values);

  return (
    <MuiThemeProvider theme={theme}>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Por favor complete los siguientes campos para registrar un usuario
        </Typography>

        <ValidatorForm onSubmit={handleOnClick} onError={errors => console.log(errors)} className={classes.formUsers}>     
          <Grid container spacing={3} justify={"center"}>
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
              <TextField
                id="outlined-select-roles"
                select
                fullWidth
                label="Tipo de Usuario"
                className={classes.textField}
                value={values.role}
                onChange={handleChange("role")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                variant="outlined"
              >
                {roles.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-select-tipoDocumento"
                select
                fullWidth
                label="Tipo de Documento"
                className={classes.textField}
                value={values.tipoDocumento}
                onChange={handleChange("tipoDocumento")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                //helperText="Por favor seleccione un tipo de documento"
                variant="outlined"
              >
                {documentos.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> 
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                label={"Número de " +values.tipoDocumento} 
                id="numeroDocumento"
                fullWidth
                required
                onChange={handleChange('numeroDocumento')}
                className={classes.helper}  helperText ="¡Introducir solo números!"
                name="numeroDocumento"
                value={values.numeroDocumento}
                validators={['required', 'matchRegexp:(\D)?[0-9]{7}']} //digitos del 0 al 9, minimo 7 números en el orden del millon
                errorMessages={['Campo requerido', '¡¡¡Número de documento invalido!!!']}
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
            <Grid item xs={12} sm={6} container justify="center" spacing={2}>
              <ButtonGroup
                variant="text"
                size="large"
                aria-label="large contained  button group"
              >
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick ={ () => history.goBack()}
                  >
                    Cancelar
                  </Button>
                  <DialogAcept/>
              </ButtonGroup>
            </Grid>      
          </Grid>
        </ValidatorForm>
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default withRouter(AddressForm);