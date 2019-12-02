import React from 'react';
import NavBar from '../../Header/Navigation';
import ProductForm from './RegisterProduct';
import SimpleBottomNavigation from '../../Footer/Footer';
import firebase from '../../../config/firebase';
import { withRouter } from 'react-router-dom';

function indexCreateProduct(props) {
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
        <div>
            <NavBar/>
            <ProductForm/>
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
    )
}

export default withRouter(indexCreateProduct);