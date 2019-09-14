import React from 'react';
import NavBar from '../Navigation';
import MaterialTableDemo from './UsersTable';
import './BMUsers.css';

export default function BMUsers() {

    const state = {
        data: []
      };

    return (
        
        <div className="UsersScreen">
            <header><NavBar/></header>
{/* Tabla buena pero a evaluar <MaterialTableDemo/>*/}
            {/* Tabla buena pero peor que la de arriba, mas customizable <EnhancedTable/>*/}
            
            
        </div>
        
    )
}