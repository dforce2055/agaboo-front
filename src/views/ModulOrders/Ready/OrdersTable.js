import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { IconButton } from '@material-ui/core';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: { 
    MuiSvgIcon:{
      colorPrimary:{
        color:'#16984a',
      },
    },
    
}
});

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

function createData(nombre, dni, fecha, direccion, telefono) {
  return { nombre, dni, fecha, direccion, telefono };
}

const rows = [
  createData('Cesar Vega', 159, '28/09/2019', 24, 4.0),
  createData('Ivan Cuadrado', 237, '28/09/2019', 37, 4.3),
  createData('Diego Perez', 262, '28/09/2019', 24, 6.0),
  createData("Francisco D'Anunzio", 305, '28/09/2019', 67, 4.3),
  createData('Ionatan Tarragona', 356, '28/09/2019', 49, 3.9),
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Accion</StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="right">DNI</StyledTableCell>
            <StyledTableCell align="right">Fecha</StyledTableCell>
            <StyledTableCell align="right">Dirección</StyledTableCell>
            <StyledTableCell align="right">Teléfono</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.nombre}>
              <StyledTableCell padding="checkbox">
                <IconButton>
                  <CheckBoxIcon color='primary'/>
                </IconButton>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.nombre}
              </StyledTableCell>
              <StyledTableCell align="right">{row.dni}</StyledTableCell>
              <StyledTableCell align="right">{row.fecha}</StyledTableCell>
              <StyledTableCell align="right">{row.direccion}</StyledTableCell>
              <StyledTableCell align="right">{row.telefono}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </MuiThemeProvider>
  );
}
