import React, { useState } from 'react';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import firebase from '../../config/firebase';
import userController from '../../controllers/User';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(6))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing,
    },
    submit: {
        marginTop: theme.spacing(7),
    },
});

function SignIn(props) {
    const { classes } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar sesión
       			</Typography>
                <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                    {/*
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Contraseña</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
                    </FormControl>
                    */}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={googleLogin}
                        className={classes.submit}>
                        Iniciar sesión con Google
                    </Button>  
                    {/*
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={login}
                        className={classes.submit}>
                        Iniciar Sesión
          			</Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="default"
                        component={Link}
                        to="/register"
                        className={classes.submit}>
                        Registrarse
          			</Button>
                      */}
                </form>
            </Paper>
            
        </main>
    )

    async function login() {
        try {
            let result = await firebase.login(email, password);
            if ( result ) {
                props.history.replace('/mainMenu');
            } else {
                alert("Su usario no esta habilitado, comuniquese con el administrador");
                await firebase.logout();
                props.history.replace('/');
            }
            
        } catch (error) {
            alert(error.message)
        }
    }
    async function googleLogin() {
        try {
            let userGoogleEmail = await firebase.signInWithGoogle();

            // verifico que el usuario exista en la bbdd y este habilitado
            userController.getUserStatusAndRole(userGoogleEmail)
                .then(async (userStatus)  => {
                    console.log(`Estado y Rol del usuario:`);
                    console.log(userStatus);

                    if ( userStatus.estado ) {
                        props.history.replace('/mainMenu');
                    } else {
                        alert("Su usario no esta habilitado, comuniquese con el administrador");
                        await firebase.logout();
                        props.history.replace('/');
                    }
                    
                })
                .catch((error) => {
                    console.error("Error: ", error);
                    return false;
                });
           
            
        } catch (error) {
            alert(error.message)
        }
    }
}
export default withRouter(withStyles(styles)(SignIn))