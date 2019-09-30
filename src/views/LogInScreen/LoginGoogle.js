import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import Button from '@material-ui/core/Button';
import { firebaseApp } from '../../config/firebase' 
import userController from '../../controllers/User';

class LoginGoogle extends React.Component{
    render() {
        const {user, signOut, signInWithGoogle} = this.props;
        
        function veriricarInicioSesion(user) {
            const result = userController.getUserStatus(user.email)
                .then((userStatus) => {
                    console.log(`Estado y Rol del usuario:`);
                    console.log(userStatus);
                    
                    return true;
                })
                .catch((error) => {
                    console.error("Error: ", error);
                    return false;
                });
            
            //user.displayName
            //user.emailVerified
            //user.email
            //user.uid
            if ( result ) {
                return (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Ingresar a la Aplicación
                    </Button>  
                )
            }
        }

        return(
            <div>
                {
                    user ?
                        
                        <div> 
                            <p>Hola, {user.displayName}</p>
                            {veriricarInicioSesion(user)}     
                            <br />
                            <Button
                                onClick={signOut}
                                fullWidth
                                variant="contained"
                                color="secondary"
                            >
                                Cerrar sesión
                            </Button>   
                            
                        </div>
                    
                    : 
                     <Button 
                        onClick={signInWithGoogle}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Iniciar Sesión con Google
                    </Button>
                    
                }
            </div>
        )
    }
}
const firebaseAppAuth = firebaseApp.auth();
const providers = {
    googleProvider : new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(LoginGoogle);