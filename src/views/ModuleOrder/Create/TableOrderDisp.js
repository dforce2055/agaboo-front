import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 350,
  },
}));

export default function TableOrderDisp(props) {
  const classes = useStyles();
  const {rows} = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <Thead>
          <Tr>
            <Td>Producto</Td>
            <Td align="right">Cantidad Alquilable</Td>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map(row => (
            <Tr key={row.type}>
              <Td component="th" scope="row">
                {row.type}
              </Td>
              {row.cantidad > 0 ? <Td align="right">{row.cantidad}</Td> : <Td align="right">No alquilables</Td>}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Paper>
  );
}
