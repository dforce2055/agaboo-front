import React from 'react';
import Navbar from './Navigation';
import Checkout from './Checkout';
export default function CreateUserAdm() {
    return (        
        <div className="UsersScreen">
            <Navbar/>  
           <Checkout></Checkout>          
        </div>        
    )
}