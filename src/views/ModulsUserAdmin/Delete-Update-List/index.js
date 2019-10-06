import React from 'react';
import './BMUsers.css';
import Navbar from '../../Header/Navigation'
import ButtonSearch from './buttonSearch'
import EnhancedTable from './UsersTable'

export default function DeleteUpdateUserAdmin() {

    return (
        
        <div className="UsersScreen">
            <Navbar></Navbar>
            <ButtonSearch styles={{position:'rigth'}} /> {/*Importo el componente Boton de busqueda.*/}
            <EnhancedTable/> {/*Importo la tabla donde se encontraran la List*/}
        </div>
        
    )
}