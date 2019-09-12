import React, { Component } from 'react';
import NavBar from './AppBarAlt';
import MaterialTableDemo from './UsersTable';
import EnhancedTable from './UsersTable2';
import './BMUsers.css';

export default function BMUsers() {
    
    return (
        
        <div className="UsersScreen">
            <header><NavBar/></header>
            <h1> Modificación/Eliminación de Usuario</h1>
            <MaterialTableDemo/>  {/* Tabla buena pero a evaluar */}
            <EnhancedTable/>        {/* Tabla buena pero peor que la de arriba, mas customizable */}
        </div>
        
    )
}