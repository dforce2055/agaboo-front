import React from 'react';
import UserController from '../../../controllers/User';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withRouter } from "react-router-dom";
import { makeStyles, MuiThemeProvider, createStyles } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';
import {
  Grid, TextField, InputLabel, Select, MenuItem, Button, ButtonGroup,
  Typography, createMuiTheme, FormGroup, FormControlLabel,
  Switch, withStyles
} from '@material-ui/core/';

import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

import {
  Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle
} from '@material-ui/core/';

import { hideFooter } from './../../Footer/HideFooter';


const theme = createMuiTheme({
  overrides: {
    MuiFormHelperText: {
      root: {
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
  estado: {

    marginLeft: '2vw',
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: '23px',
    fontWeight: 100,
    

  },
  buttonLeft: {
    marginRight:'2px',
    // marginLeft:'13px',
    marginTop: theme.spacing(3),
  },
  buttonRight: {
    marginLeft:'20px',
    marginTop: theme.spacing(3),
  },

}));

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 48,
      height: 33,
      padding: 0,
      margin: theme.spacing(1),
      marginLeft: theme.spacing(4),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#0ce8ca',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#0ce8ca',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 30,
      height: 30,
    },
    track: {
      borderRadius: 32 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

//fetch
const documentos = [
  {
    value: 'DNI',
    label: 'DNI',
  },
  {
    value: 'Pasaporte',
    label: 'Pasaporte',
  },
  /*{
    value: 'L.E.',
    label: 'Libreta de Enrolamiento',
  },
  {
    value: 'L.C.',
    label: 'Libreta Cívica',
  },*/
  {
    value: 'CUIT',
    label: 'CUIT',
  },
  {
    value: 'CUIL',
    label: 'CUIL',
  },
];

//fetch
const roles = [
  {
    value: 'ADMIN',
    label: 'Administrador',
  },
  {
    value: 'LOGISTICS',
    label: 'Logistica y Mantenimiento',
  },
];




function AddressForm(props) {
  const classes = useStyles();
  const { handleClose } = props;
  const { usuario } = props; //Si esta prop llega, es porque etstoy editando un usuario
  const { history } = props;
  const [values, setValues] = React.useState({
    nombre: '',
    apellido: '',
    cuit: '',
    cuil: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    fechNac: new Date('1980-01-01'),
    direccion: '',
    calle: '',
    altura: '',
    localidad: '',
    celular: '',
    telefono: '',
    email: '',
    estado: true,
    role: '',
    eliminado: false,
    mostrarDialog: false,
  });

  React.useEffect(() => {
    if (usuario) { //Seteo los campos con los datos del usuario
      setValues(usuario);
    }

    hideFooter();
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  //Seteando estado del nuevo usuario
  const [estado, setEstado] = React.useState(false);
  const cambiarEstado = () => {
    setEstado(prev => !prev);
    setValues({ ...values, estado: estado });
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
    setValues({ ...values, fechNac: date });
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpenDialog = (value) => {
    setOpen(true);
  };

  const handleCloseDialog = (e) => {
    setOpen(false);
    //handleCloseDialog();
    history.push('/usuarios');
  };

  const handleBtnClose = () => {
    if (handleClose) handleClose();
    else history.push('/usuarios');
  }

  function setCuitOrCuil() {
    if (values.tipoDocumento === 'CUIT') {
      setValues({ ...values, tipoDocumento: 'CUIT' });
      setValues({ ...values, cuit: values.numeroDocumento });
    }
    if (values.tipoDocumento === 'CUIL') {
      setValues({ ...values, tipoDocumento: 'CUIL' });
      setValues({ ...values, cuil: values.numeroDocumento });
    }
  }


  const handleOnClick = (e) => {
    console.log('Guardando...')

    setCuitOrCuil();

    let data = {
      nombre: (values.nombre) ? values.nombre : '',
      apellido: (values.apellido) ? values.apellido : '',
      cuit: (values.cuit) ? values.cuit : '',
      cuil: (values.cuil) ? values.cuil : '',
      tipoDocumento: (values.tipoDocumento) ? values.tipoDocumento : '',
      numeroDocumento: (values.numeroDocumento) ? values.numeroDocumento : '',
      fechNac: (values.fechNac) ? values.fechNac : '',
      //direccion: values.direccion,
      calle: (values.calle) ? values.calle : '',
      altura: (values.altura) ? values.altura : '',
      localidad: (values.localidad) ? values.localidad : '',
      celular: (values.celular) ? values.celular : '',
      telefono: (values.telefono) ? values.telefono : '',
      email: (values.email) ? values.email : '',
      estado: (values.estado) ? values.estado : '',
      role: (values.role) ? values.role : '',
      eliminado: false,
    }

    //Si estoy editando un usuario llamo al método editar
    if (usuario) {
      //UserController.editUser(data);
      UserController.editUser(data);
      console.log("Lo estoy editando");
    } else { //sino, llamo al método agregar
      UserController.addUser(data);
      handleClickOpenDialog();
    }

  }



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
                validators={['required', 'matchRegexp:^([A-Za-zÁÉÍÓÚñáéíóúÑ_ ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ_ \'])+([A-Za-zÁÉÍÓÚñáéíóúÑ_ ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ_ \'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ_ ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ_ \'])?$']}
                errorMessages={['Campo requerido', '¡¡¡Nombre invalido!!!']}
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
                validators={['required', 'matchRegexp:^([A-Za-zÁÉÍÓÚñáéíóúÑ_ ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ_ \'])+([A-Za-zÁÉÍÓÚñáéíóúÑ_ ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ_ \'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ_ ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ_ \'])?$']}
                errorMessages={['Campo requerido', '¡¡¡Apellido invalido!!!']}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-select-tipoDocumento"
                select
                fullWidth
                label="Tipo de Documento"
                validators={['required']}
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
                label={"Número de " + values.tipoDocumento}
                id="numeroDocumento"
                fullWidth
                required
                onChange={handleChange('numeroDocumento')}
                className={classes.helper} helperText="¡Introducir solo números!"
                name="numeroDocumento"
                value={values.numeroDocumento}
                validators={['required', 'matchRegexp:(\D)?[0-9]{7}']} //digitos del 0 al 9, minimo 7 números en el orden del millon
                errorMessages={['Campo requerido', '¡¡¡Número de documento invalido!!!']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-select-roles"
                select
                fullWidth
                label="Tipo de Usuario"
                validators={['required']}
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
            <Grid item xs={9} sm={6}>
              <span className={classes.estado}>Estado  </span>
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={values.estado}
                    onChange={cambiarEstado}
                    value="estado"
                  />
                }
                label="Activo"
                labelPlacement="end"
              />
            </Grid>
            {/*
            <Grid item xs={6} sm={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Cumpleaños"
                  value={values.fechNac}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'Fecha de Cumpleaños',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
             */}
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                label="Email"
                onChange={handleChange('email')}
                name="email"
                value={values.email}
                fullWidth
                validators={['required', 'matchRegexp:^[a-zA-Z0-9.!#$%&*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$']}
                errorMessages={['Email no valido']}
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
                validators={['matchRegexp:^[a-zA-Z ]*$']}
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
                validators={['matchRegexp:^[a-zA-Z ]*$']}
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
                validators={[]}
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
                validators={['matchRegexp:^(\D)?[0-9]']}
                errorMessages={['Campo requerido', 'Teléfono celular invalido']}
              />
            </Grid>
            <Grid item xs={12} sm={6} container justify="center" spacing={2}>
              <ButtonGroup
                variant="text"
                size="large"
                aria-label="large contained  button group"
              >
                <Button
                  className={classes.buttonLeft}
                  color="secondary"
                  variant="contained"
                  onClick={handleBtnClose}
                >
                  Cancelar
                  </Button>
                <Button
                  className={classes.buttonRight}
                  label={"Registrar Usuario"}
                  color="primary"
                  variant="contained"
                  type=" submit "
                >
                  Guardar
                  </Button>
                <Dialog
                  open={open}
                  onClose={handleCloseDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Usuario guardado"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Se agregó un usuario a la base de datos.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                      ACEPTAR
                    </Button>
                  </DialogActions>
                </Dialog>
              </ButtonGroup>
            </Grid>
          </Grid>
        </ValidatorForm>
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default withRouter(AddressForm);