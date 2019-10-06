import React from 'react';
import './BMUsers.css';
<<<<<<< HEAD
import Navbar from '../../Header/Navigation'
import ButtonSearch from './buttonSearch'
import EnhancedTable from './UsersTable'

=======
import NavbarDeleteUpdate from './Navigation'
//import ButtonSearch from './buttonSearch';
//import EnhancedTable from './UsersTable';
>>>>>>> Clientes
export default function DeleteUpdateUserAdmin() {

    return (
        
        <div className="UsersScreen">
<<<<<<< HEAD
            <Navbar></Navbar>
            <ButtonSearch styles={{position:'rigth'}} /> {/*Importo el componente Boton de busqueda.*/}
            <EnhancedTable/> {/*Importo la tabla donde se encontraran la List*/}
=======
            <NavbarDeleteUpdate></NavbarDeleteUpdate>
           {/* <ButtonSearch styles={{position:'rigth'}} /> {/*Importo el componente Boton de busqueda.*/}
          {/*<EnhancedTable/> {/*Importo la tabla donde se encontraran la List*/}
>>>>>>> Clientes
        </div>
        
    )
}