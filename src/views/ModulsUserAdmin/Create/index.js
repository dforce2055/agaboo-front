import React from 'react';
import Navbar from '../../Header/Navigation';
import Checkout from './Checkout';
import firebase from '../../../config/firebase';
import { withRouter } from 'react-router-dom';

function CreateUserAdm(props) {

    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
      }
      
    return (        
        
        <div className="UsersScreen">
            <Navbar/>  
           <Checkout></Checkout>          
        </div>        
    )
}

export default withRouter(CreateUserAdm);