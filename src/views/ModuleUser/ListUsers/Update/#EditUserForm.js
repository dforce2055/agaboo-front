import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button,Typography,ButtonGroup } from '@material-ui/core';
import DialogAcept from './dialogAcept';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withRouter } from "react-router-dom";

function AddressForm(props) {
  const {history} = props;
  
  const [values, setValues] = React.useState(props.usuario); 

  const {handleClose} = props;
  const {updateStateArray} = props;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });  
  };

  const handleOnClick = () => {
    console.log('Guardando...')
    /*let data = {
      nombre: values.nombre,
      apellido: values.apellido,
      cuit: values.cuit,
      cuil: values.cuil,
      tipoDocumento: values.tipoDocumento,
      numeroDocumento: values.numeroDocumento,
      fechNac: values.fechNac,
      //direccion: values.direccion,
      calle: values.calle,
      altura: values.altura,
      localidad: values.localidad,
      celular: values.celular,
      telefono: values.telefono,
      email: values.email,
      estado: values.estado,
      role: values.role,
      //eliminado:false,
    }*/
    //CustomerController.setCustomer(data)    //BORRA LOS CAMPOS QUE NO ESTEN EN EL DATA
    //UserController.editCustomer(data);
    updateStateArray();
    handleCloseDialog();
  }

  const [mostrarDialog, setMostrarDialog] = React.useState(false); 

  const handleCloseDialog = () =>{
    setMostrarDialog(mostrarDialog===false);
  };

  //Seteando estado del nuevo usuario
  const [estado, setEstado] = React.useState(false);
  const cambiarEstado = () => {
    setEstado(prev => !prev);
    setValues({ ...values, estado: estado });
  };

  const handleDateChange = date => {
    setValues({ ...values, fechNac: date });
  };
  return (
    <MuiThemeProvider theme={theme}>
      <React.Fragment>
        <DialogAcept
        mostrarDialog={mostrarDialog}
        handleCloseDialog={handleCloseDialog}
        handleClose={handleClose}
        />
        <Typography variant="h6" gutterBottom>
          Edición de Usuario
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
                validators={['required', 'matchRegexp:^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$']}
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
                validators={['required', 'matchRegexp:^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$']}
                errorMessages={['Campo requerido', 'Apellido no valido']}
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
            <Grid item xs={6} sm={6}>
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
                  color="secondary"
                  variant="contained"
                  onClick={() => history.goBack()}
                >
                  Cancelar
                    </Button>
                <Button
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