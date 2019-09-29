import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: { 
    MuiPaper: {
      root: {
        backgroundColor: '#fbfbfbf2',
      }
    },
    
  }
})

const useStyles = makeStyles(theme => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: '500',
    },
    formControl: {
      marginTop: theme.spacing(1),
      minWidth: 120,
    },
  }));

export default function FormDialog() {
  const classes = useStyles();
  const [maxWidth, setMaxWidth] = React.useState('false');
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleMaxWidthChange(event) {
    setMaxWidth(event.target.value);
  }

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Grid item xs>
              <Link href="#" variant="body2" onClick={handleClickOpen}>
                Olvidaste tu contraseña?
              </Link>
            </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={true}>
        <DialogTitle id="form-dialog-title">Recuperar Contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Complete todos los campos correctamente para recuperar su contraseña.
          </DialogContentText>
          <form className={classes.form} noValidate>
          <TextField
            margin="dense"
            label="Correo Electrónico"
            fullWidth
          />
          <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Pregunta Secreta</InputLabel>
               <Select 
                value={maxWidth}
                onChange={handleMaxWidthChange}
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}>
                  {console.log("valor: ", maxWidth)}
                <MenuItem value="mascota">¿Nombre de la primer mascota?</MenuItem>
                <MenuItem value="club">¿Club del que sos hincha?</MenuItem>
                <MenuItem value="amigo">¿Un amigo de la infancia?</MenuItem>
                <MenuItem value="profesor">¿Profesor de la escuela preferido?</MenuItem>
                <MenuItem value="deporte">¿Deporte favorito?</MenuItem>
              </Select>
            </FormControl>
            <TextField
            margin="dense"
            label="Respuesta Secreta"
            fullWidth
          />
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Restablecer
          </Button>
        </DialogActions>
      </Dialog>
      </MuiThemeProvider>
    </div>
  );
}
