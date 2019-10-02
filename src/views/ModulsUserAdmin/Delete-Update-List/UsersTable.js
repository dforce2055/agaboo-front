import React from 'react';
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

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
    display:'Left'
  },
}));



export default function Orders(props) {
  const classes = useStyles();
  const [clientes, setClientes] = React.useState([]);
  
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




  //Funcion para traer el listado de customer de firestore
  function listarClientes(){

    CustomerController.getCustomers()
    .then(value => {
      if(value.length != 0){
        console.log('Base de datos vacia.');
      }else if (value.length >= clientes.length) {        
        setClientes(value);
      }
    });
  }

  //Metodo para actualizar el listado
  function actualizarClientes(){
    CustomerController.getCustomers()
    .then(value=> {
      setClientes(value);      
    });
  }

  return (    
    <React.Fragment>{listarClientes()}
    <FullScreenDialog 
    botonEditar={botonEditar} 
    handleClickDebotonEditarCerrar={handleClickDebotonEditarCerrar}       
    />

    <AlertDialog
      botonEliminar={botonEliminar}
      handleClickDeleteClose={handleClickDeleteClose}
    />
    <Paper>    
    <Typography variant="h4">Clientes</Typography>
    <Button className={classes.seeMore} color="primary" variant="contained" onClick={actualizarClientes} >Actualizar</Button>
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
              <IconButton >                
              <DeleteIcon onClick={handleClickDeleteOpen}/>
            </IconButton>
              </TableCell>

              <TableCell>
              <IconButton>      
              <EditIcon onClick={handleClickDebotonEditarOpen}/> 
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
      
        <Button className={classes.seeMore} color="primary" variant="contained" onClick={actualizarClientes} >Actualizar</Button>
      </Paper>
    </React.Fragment>
  );
}