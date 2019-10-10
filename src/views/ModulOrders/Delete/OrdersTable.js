import React from 'react';
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import ResponsiveDialog from "./DeleteDialog";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import "./OrderDelete.css";

const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: { 
    MuiSvgIcon:{
      colorPrimary:{
        color:'#16984a',
      },
    },
    MuiButton:{
      contained:{
        color: 'white',
        backgroundColor:'#519e8a',
        '&:hover': {
          backgroundColor: '#31c59f',
          "@media (hover: none)": {
            backgroundColor: "#31c59f"
          },
        },
      },
    },
    MuiOutlinedInput:{
      input:{
        padding:'9px 14px',
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
  inputRoot: {
    color: 'inherit',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '55%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

const useForceUpdate = () => React.useState()[1];

export default function CustomizedTables() {
  const classes = useStyles();
  const forceUpdate = useForceUpdate();

  return (
    <MuiThemeProvider theme={theme}>
      {console.log("renderizando...")}
      <div>
        <TextField variant="outlined" type="date">
          Buscar por fecha
        </TextField>
        <Button variant="contained" startIcon={<SearchIcon/>} className="botonBuscar">
          Buscar
        </Button>
      </div>
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
                <ResponsiveDialog reRender={forceUpdate}/>                {/* Dialog de confirmar */}
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
