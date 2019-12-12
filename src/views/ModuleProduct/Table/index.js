import React, { useState, useEffect }from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#318377',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


function TableProduct({product}){
  const [rows,setRows] = useState([]);

  useEffect(()=>{
    if (product) {
      setRows(product)
    }
  },[product]);
  
  return(
    <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Producto</StyledTableCell>
            <StyledTableCell align="right">Cantidad</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow key={row.type}>
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}

export default TableProduct;
