/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Agrego imports
import CustomerController from '../../../../controllers/Customer';
import FullScreenDialog from '../Update/UpdateUser';
import AlertDialog from '../Delete/DialogDelete';
import VisibilityClient from '../Visibility/visibility';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [clientes, setClientes] = React.useState([]);

  React.useEffect(()=>{
    if (clientes.length === 0) {
      CustomerController.getCustomers()
      .then(value=> {
        setClientes(value);      
    }).catch(error=>{
      console.log("Error al traer el cliente= ",error);
    })
    }
  }); 

  return (
    <React.Fragment>
    
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>Eliminar</TableCell>
            <TableCell>Modificar</TableCell>
            <TableCell>Ver</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>D.N.I</TableCell>
            <TableCell align="right">Localidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map(row => (
            <TableRow key={row.dni}>

            {/*Dialog de ELIMINAR cliente*/}
            <TableCell>   
              <AlertDialog
                 cliente={row}/>
            </TableCell>

              {/*Dialog de MODIFICAR cliente*/}
              <TableCell>
                <FullScreenDialog 
                  valor={row}/>  
              </TableCell>
              
              {/*Dialog de VER cliente*/}
              <TableCell>              
                <VisibilityClient 
                  cliente = {row}/>
              </TableCell>

              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.apellido}</TableCell>
              <TableCell>{row.dni}</TableCell>
              {/*<TableCell>{row.paymentMethod}</TableCell>*/}
              <TableCell align="right">{row.localidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          Ver mas ordenes
        </Link>
      </div>
    </React.Fragment>
  );
}