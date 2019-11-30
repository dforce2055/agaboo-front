import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#318377',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [order,setOrder] = React.useState([]);
  const [load,setLoad] = React.useState(true);

  React.useEffect(()=>{
    if (load) {  
        setOrder(JSON.parse(sessionStorage.getItem('listado_producto')));
        setLoad(false);
    } 
  });
  return (
      <Table>
        <TableHead >
          <TableRow hover={true}>
            <StyledTableCell>Producto</StyledTableCell>
            <StyledTableCell>Modelo</StyledTableCell>
            <StyledTableCell align="right">Id</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map(row => (
            <TableRow key={row.id_producto}>
              <TableCell component="th" scope="row">
                {row.producto}
              </TableCell>
              <TableCell>{row.modelo}</TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}
