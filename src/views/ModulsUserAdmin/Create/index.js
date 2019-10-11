import React from 'react';
import Navbar from '../../Header/Navigation';
import Checkout from './Checkout';
import firebase from '../../../config/firebase';
export default function CreateUserAdm(props) {
    //import firebase from '../../../config/firebase';
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