import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, IconButton, Button } from '@material-ui/core';
import {Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import CustomerController from '../../../controllers/Customer';

import FullScreenDialog from './Update/UpdateUser';
import AlertDialog from './Delete/DialogDelete';

export default function Orders(props) {
  const [clientes, setClientes] = React.useState([]);
  
  useEffect(()=>{
    if (clientes.length == 0) {
      console.log("Guardo el valor de clientes de db")
      CustomerController.getCustomers()
      .then(value=> {
      setClientes(value);      
    })
    }
  });

  //Funciones de Editar usuario.
  const [botonEditar,setBotonEditar] = React.useState(false);

  function handleClickDebotonEditarOpen(){ 
    setBotonEditar(true);
  }
  function handleClickDebotonEditarCerrar(){ 
    setBotonEditar(false);
  }

  //Funcion de dialog eliminar usuario
  const [botonEliminar,setBotonEliminar] = React.useState(false);
  
//Funciones para pasar a dialog y poder utilizarlas al apretar el bnoton aceptar
  
  function handleClickDeleteOpen(){ 
    setBotonEliminar(true);
  }  
  function handleClickDeleteClose(){ 
    setBotonEliminar(false);
  } 

  return (    
    <React.Fragment>   
    <Paper>    
    <Typography variant="h4">Clientes</Typography>
      <Table size="small">      
        <TableHead>
          <TableRow>
            <TableCell>Delete</TableCell>
            <TableCell>Modificar</TableCell>
            <TableCell>Ver</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Celular</TableCell>
            <TableCell align="right">Localidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map(row => (
            <TableRow key={row.dni}>
            
              <TableCell>    
              {/*Dialog de eliminar cliente*/}
                <AlertDialog
                  botonEliminar={botonEliminar}
                  handleClickDeleteClose={handleClickDeleteClose}
                />
                <IconButton onClick={handleClickDeleteOpen}>      
                  <DeleteIcon />
                </IconButton>
              </TableCell>

              <TableCell>
              {/*Dialog de modificar cliente*/}
                <FullScreenDialog 
                  botonEditar={botonEditar} 
                  handleClickDebotonEditarCerrar={handleClickDebotonEditarCerrar} 
                  cliente={row}    
                />
              <IconButton onClick={handleClickDebotonEditarOpen}>  
              <EditIcon /> 
            </IconButton>
              </TableCell>

              <TableCell>
              <IconButton>      
              <Visibility/>              
            </IconButton>
              </TableCell>

              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.apellido}</TableCell>
              <TableCell>{row.celular}</TableCell>
              <TableCell align="right">{row.localidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
    </React.Fragment>
  );
}