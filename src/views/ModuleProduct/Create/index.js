import React from 'react';
import NavBar from '../../Header/Navigation';
import ProductForm from './RegisterProduct';
import SimpleBottomNavigation from '../../Footer/Footer';
import firebase from '../../../config/firebase';
import { withRouter } from 'react-router-dom';

function indexCreateProduct(props) {

    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
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