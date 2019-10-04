import React , { useState, useEffect }from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from  './Button';
import NavBar from '../Navigation';
import ProductController from '../../controllers/ProductController';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import FormDialog from './DialogUpdateProduct';

import {withRouter } from 'react-router-dom';
import { Icon } from "@material-ui/core";



const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3fb5a5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);













function createData(type, code, state, description ) {
  return { type, code, state, description};
}







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

export default function CustomizedTables(props) {
    const [rows,setRows] = React.useState([
      createData('Baño Quimico', 5001, 'Alquilado'),
      createData('Baño Quimico', 5002, 'Alquilado'),
      createData('Baño Quimico', 5003, 'Disponible'),
      createData('Baño Quimico', 5004, 'Disponible'),
      createData('Baño Quimico', 5005, 'Averiado'),
    ]);

  const classes = useStyles();
  const {history}  = props;
  

console.log('Rows despues de getProducts: ', rows);


  
  async function getProducts(){
    const products = await ProductController.getProducts();
    console.log("Cantidad de productos :", products.length);
    if(rows.length != products.length){
      setRows(products); 
      console.log("products :" , rows);    
    }
    
  };

  useEffect(() => {
    getProducts();
    
  });
  
  return (
      <React.Fragment>
        <NavBar/>
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <StyledTableCell align= "justyfy">Producto</StyledTableCell>
                    <StyledTableCell align="justyfy">Codigo</StyledTableCell>
                    <StyledTableCell align="justyfy">Estado</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => (
                    <StyledTableRow key={row.typeProduct}>
                    <StyledTableCell component="th" scope="row">
                      <FormDialog values = {row}/>
                    
                      
                      
                      {row.type}
                    </StyledTableCell>
                    <StyledTableCell align="justyfy">{row.code}</StyledTableCell>
                    <StyledTableCell align="justyfy">{row.state}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </Paper>

        <Button label = {'Volver'} onClick={()=> history.push('/mainMenu')}/>
      </React.Fragment>
        
        
    
    
  );
}
