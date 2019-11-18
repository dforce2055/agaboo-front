import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerController from '../../../controllers/Customer';
import FullScreenDialog from './Update/UpdateUser';
import AlertDialog from './Delete/DialogDelete';
import VisibilityClient from './Visibility/visibility';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [clientes, setClientes] = React.useState([]);
  
  React.useEffect(()=>{
    if (clientes.length === 0) {  
      CustomerController.getCustomers()
      .then(value=> {
        console.log('En la promise', value);
        
        setClientes(value);      
    }).catch(error=>{
      console.log("Error al traer el cliente= ",error);
    })
    }

    /*if(updateList === true){
      console.log("Update list es verdadero?",updateList);
      
      CustomerController.getCustomers()
      .then(value=> {
        console.log("SETEO CLIENTES");        
      setClientes(value);      
    });

    setUpdateList(false);
    console.log("Seteo para que no quede en verdadero el updateList==>",updateList);
    
    }*/

    
  }); 

  return (    
    <React.Fragment>   
    <Paper className={classes.root}>    
    <Typography variant="h4">Clientes</Typography>
      <Table size="small">      
        <TableHead>
          <TableRow>
            <TableCell>Delete</TableCell>
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
            /*Dialog de ELIMINAR cliente*/
            <TableRow key={row.dni}>
              <TableCell>   
                <AlertDialog

                />
              </TableCell>

              {/*Dialog de MODIFICAR cliente*/}
              <TableCell>
                <FullScreenDialog 
                  valor={row}    
                />  
              </TableCell>
              
              {/*Dialog de VER cliente*/}
              <TableCell>              
                <VisibilityClient cliente = {row}/>
              </TableCell>

              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.apellido}</TableCell>
              <TableCell>{row.dni}</TableCell>
              <TableCell align="right">{row.localidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
    </React.Fragment>
  );
} 