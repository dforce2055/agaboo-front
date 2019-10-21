import React from 'react';
import Navbar from '../../Header/Navigation'
import Dashboard from './Table/Dashboard';
import SimpleBottomNavigation from '../../Footer/Footer';
import firebase from '../../../config/firebase';
import { withRouter } from 'react-router-dom';
function DeleteUpdateUserAdmin(props) {

    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
      }

    return (
        
        <div className="UsersScreen">
            <Navbar></Navbar>
            <Dashboard></Dashboard>
            <footer style={{marginTop:'5px'}}>
              <SimpleBottomNavigation/>
            </footer>
        </div>
        
    )
}

export default withRouter(DeleteUpdateUserAdmin);