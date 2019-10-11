import React from 'react';
import Navbar from '../../Header/Navigation'
import ButtonSearch from './buttonSearch';
import EnhancedTable from './UsersTable';
import Dashboard from './Table/Dashboard';

export default function DeleteUpdateUserAdmin() {

    return (
        
        <div className="UsersScreen">
            <Navbar></Navbar>
            {/*<ButtonSearch  /> Importo el componente Boton de busqueda.*/}
          <Dashboard></Dashboard>
        </div>
        
    )
}