import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from  './Button';
import NavBar from '../Header';
import {withRouter } from 'react-router-dom';



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



function createData(typeProduct, code, state, description ) {
  return { typeProduct, code, state, description};
}

const rows = [
  createData('Baño Quimico', 5001, 'Alquilado'),
  createData('Baño Quimico', 5002, 'Alquilado'),
  createData('Baño Quimico', 5003, 'Disponible'),
  createData('Baño Quimico', 5004, 'Disponible'),
  createData('Baño Quimico', 5005, 'Averiado'),
];

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
  const classes = useStyles();
  const {history}  = props;
  console.log('history' , history);

  return (
      <React.Fragment>
        <NavBar/>
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <StyledTableCell align= "justyfy">Prodcuto</StyledTableCell>
                    <StyledTableCell align="justyfy">Codigo</StyledTableCell>
                    <StyledTableCell align="justyfy">Estado</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => (
                    <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                        {row.typeProduct}
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
