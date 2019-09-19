import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import GoogleLogin from 'react-google-login';
import LoginGoogle from './LoginGoogle';
import FormDialog from './DialogMissPass';
import argenbath from './logo-argenbath.png';
import './Login.css';
import { withRouter } from "react-router-dom";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © AGABOO '}
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

function SignIn(props) {
  const classes = useStyles();
  const {history} = props;

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
      {/* eslint-disable-next-line*/}
        <img src = {argenbath} className={"Logo"}/>           {/* logo solo para probar tamaños */}
        {/* <Typography component="h1" variant="h5" >
          Inicio de Sesión
        </Typography> */}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            /* autoFocus */
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid container>
            <FormDialog/>
          </Grid>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuérdame"
          /> */}
          {/* <Link to='/mainMenu'> */}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick ={ () => history.push('/mainMenu')}
            >
              Ingresar
            </Button>            
          {/* </Link> */}
        </form>
        {/* <GoogleLogin
            clientId="817185700205-tupiffo62ieibvp5hbv1d7hhn3h32gi2.apps.googleusercontent.com"
            buttonText="Ingresar con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        /> */}
        <LoginGoogle/> {/*Login que funciona seguro pero esteticamente feo */}
        
      </div>
      <Box mt={7}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default withRouter(SignIn);
