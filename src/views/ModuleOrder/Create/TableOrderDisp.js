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
  tablaPedidos: {
    textAlign: "left",
    borderCollapse: 'collapse',
    borderSpacing: 0,
    borderColor: 'rgba(0,0,0,.5)',
    padding: '.25em',
    
    '& tbody': {
      '& tr': {
        border: '1px solid rgba(0,0,0,.1)',
        padding: '.25em',
      },
      '& td': {
        border: '1px solid rgba(0,0,0,.1)',
        padding: '.25em',
      }
    },
    '& thead': {
      backgroundColor: 'rgba(0,0,0,.1)',
      color: '#555',
      border: '1px solid rgba(0,0,0,.1)',
      padding: '.25em',
      
      '& th': {
        border: '1px solid rgba(0,0,0,.1)',
        padding: '.25em',
      }
    },
  },
}));

export default function TableOrderDisp(props) {
  const classes = useStyles();
  const {rows} = props;
  let data = [];
  if (rows) {
    data = rows;    
  } else {
    data = [];
  }
  return (
    <Paper>
      <Table className={classes.tablaPedidos} aria-label="caption table">
        <Thead>
          <Tr>
            <Td>Producto</Td>
            <Td>Cantidad Alquilable</Td>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(row => (
            <Tr key={row.type}>
              <Td component="th" scope="row">
                {row.type}
              </Td>
              {row.cantidad > 0 ? <Td align="right">{row.cantidad}</Td> : <Td align="right">0</Td>}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Paper>
  );
}
