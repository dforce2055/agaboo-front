import React from 'react';
import Navbar from '../../Header/Navigation';
import firebase from '../../../config/firebase';
import SimpleBottomNavigation from '../../Footer/Footer';
import { withRouter } from 'react-router-dom';
import CreateOrderFinal from './CreateOrderFinal.js';

function CreateOrder(props) {
    let userRole = firebase.getCurrentUserRole();
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

    return (
        <div className="UsersScreen">
            <Navbar/>
            <CreateOrderFinal/>
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
        
    )
}

export default withRouter(CreateOrder);