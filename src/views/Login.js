import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import GoogleLogin from 'react-google-login';
import LoginGoogle from './LoginGoogle';
import argenbath from './logo-argenbath.png';
import './Login.css';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Agaboo '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(5, 0, 3),
  },
}));

const responseGoogle = (response) => {
    console.log(response);
}


export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <img src = {argenbath} className={"Logo"}/> {/* solo para probar tamaños */}
        {/* <Typography component="h1" variant="h5" >
          Inicio de Sesión
        </Typography> */}
        <form className={classes.form} noValidate>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            /* autoFocus */
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Grid>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuérdame"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
        </form>
        {/* <GoogleLogin
            clientId="817185700205-tupiffo62ieibvp5hbv1d7hhn3h32gi2.apps.googleusercontent.com"
            buttonText="Ingresar con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        /> */}
        <LoginGoogle/>
        
      </div>
      <Box mt={7}>
        <Copyright />
      </Box>
    </Container>
  );
}