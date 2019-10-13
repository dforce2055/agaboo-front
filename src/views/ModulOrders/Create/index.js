import React from 'react';
import Navbar from '../../Header/Navigation';
import Checkout from './createOrderFinal';
import firebase from '../../../config/firebase';
import SimpleBottomNavigation from '../../Footer/Footer';
import { withRouter } from 'react-router-dom';

function CreateOrder(props) {

    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
      }

    return (
        
        <div className="UsersScreen">
            <Navbar/>
            <Checkout/>
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
        
    )
}

export default withRouter(CreateOrder);