import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebase';
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';


const firebaseApp = firebase.initializeApp(firebaseConfig);

const responseGoogle = (response) => {
    console.log(response);
}



class LoginGoogle extends React.Component{
    render() {
        const {user, signOut, signInWithGoogle} = this.props;
        return(
            <div>
                {
                    user 
                    ? <Button onClick={signOut}>Cerrar Sesión</Button>
                    : /*<GoogleLogin
                        onClick={signInWithGoogle}
                        clientId="817185700205-tupiffo62ieibvp5hbv1d7hhn3h32gi2.apps.googleusercontent.com"
                        buttonText="Ingresar con Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        />*/
                     <Button onClick={signInWithGoogle}>Iniciar Sesión con Google</Button>
                    
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