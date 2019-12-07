import React from 'react';
import Navbar from '../../Header/Navigation';
import Checkout from './Checkout';
import SimpleBottomNavigation from '../../Footer/Footer';
import firebase from '../../../config/firebase';
import { withRouter } from 'react-router-dom';
import PlaceMaps from './PlaceMaps';
import { GoogleComponent } from 'react-google-location' 
import credentials from '../../../config/credentials';

function CreateUserAdm(props) {
    let userRole = firebase.getCurrentUserRole();
    const [input,setInput] = React.useState(null);

    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
    }

    if (userRole==="LOGISTICS"){ //si tiene rol de usuario de logistica
        alert('No tenes permiso para acceder a esta ventana')
        props.history.goBack();
    }
    const handleChange = (e) => {
        setInput(e.target.value)
    }

    return (        
        
        <div className="UsersScreen">
            <Navbar/> <PlaceMaps style={{marginBottom:"515151px"}}></PlaceMaps>
            <Checkout></Checkout>
             
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
    )
}

export default withRouter(CreateUserAdm);