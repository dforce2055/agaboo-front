import React from 'react'
import { Typography, Paper, Avatar, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import argenbath from '../img/logo-argenbath.png';
import firebase from '../../config/firebase';


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
        backgroundColor: theme.palette.primary.main,
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    logo: {
        marginTop: theme.spacing(3),
    },
    photo: {
        backgroundSize: 'cover',
        backgroundColor: '#ddd',
        height: '7rem',
        width: '7rem',
        border: '7px solid #eee',
        borderRadius: '100%',
        margin: '1rem'
    },
})

function HomePage(props) {
    const { classes } = props;
    const userValidation = firebase.getCurrentUsername();
    
    
    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © AGABOO '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    async function logout() {
        try {
            await firebase.logout();
            props.history.replace('/');
        } catch (error) {
            alert(error.message)
        }
    }

    return  (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <img src={argenbath} className={classes.logo} alt="Logo"/>
                {/* Si ya esta validado muestro la foto del usuario */}
                { userValidation 
                    ? <img src={firebase.getCurrentUserPhoto()} className={classes.photo} alt="Foto"/>
                    : <div></div>
                }
                <Avatar className={classes.avatar}>
                    <VerifiedUserOutlined />
                </Avatar>

                <Typography component="h2" variant="h5">
                    Bienvenido <br/> 
                    {firebase.getCurrentUsername()}
				</Typography>
                {/* Si ya esta validado le permito ingresar al mainMenu y/o cerrar sesión */}
                {userValidation
                    ? 
                        <div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/mainMenu"
                                className={classes.submit}>
                                Ingresar
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                component={Link}
                                onClick={logout}
                                className={classes.submit}>
                                Cerrar Sesión
                            </Button>
                        </div>
                    :
                    <div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/register"
                            className={classes.submit}>
                            Registrarse
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/login"
                            className={classes.submit}>
                            Iniciar sesión
                        </Button>
                    </div>
                }
                
            </Paper>
            <Copyright />
        </main>
    )
}

export default withStyles(styles)(HomePage)