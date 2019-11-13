import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ResponsiveDialog from './ConfirmDialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from "react-router-dom";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

//Import componentes
import OrderController from '../../../controllers/Order';
import SimpleMenu from './ButtonOption.js';
import { Button } from '@material-ui/core';

const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: { 
    MuiIconButton:{
      root:{
        color:'#19a952',
      },
    },
    MuiTablePagination: {
      actions:{
        marginLeft:'0px',
      },
      select:{
        paddingLeft:'0px',
      },
    },
    MuiSelect:{
      select:{
        minWidth:'0px',
      },
    },
}
});

let rows = [];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = rows.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: '', numeric: false, disablePadding: false, label: 'Opciones' },
  { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'id_cliente', numeric: true, disablePadding: false, label: 'CUIT/CUIL' },
  { id: 'fecha_entrega', numeric: true, disablePadding: false, label: 'Fecha de entrega' },  
  { id: 'ciudad', numeric: false, disablePadding: false, label: 'Ciudad' },
  { id: 'direccion', numeric: false, disablePadding: false, label: 'Dirección' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };  

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: '#000000d6',
          backgroundColor: '#14ceb49e',
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  title: {
    flex: '0 0 auto',
  },
}));
const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} seleccionado/s
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Pedidos pendientes
          </Typography>
        )}
      </div>
      
      <div className={classes.spacer} />
      <div >
        {numSelected > 0 ? (
          <Tooltip title="Confirmar">
            <ResponsiveDialog/>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              
            </IconButton>
          </Tooltip>
        )}
      </div>
          
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(12),
    right: theme.spacing(7),
    zIndex: 99,
    backgroundColor: '#3fb5a5',
    '&:hover': {
      backgroundColor: '#0ce8ca',
      "@media (hover: none)": {
        backgroundColor: "#0ce8ca"
      },
    },
  },
}));

function EnhancedTable(props) {
  
  React.useEffect(()=>{
    if (a) {      
      //Guardo la informacion traida de la base de datos en ROWS para poder mapear el array
      OrderController.getOrders()
        .then(value =>{
          rows = value;
        setA(false);
        }); 
    }
  });
   
  const [a,setA] = React.useState(true);

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {history} = props

  function handleRequestSort(property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id_cliente);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleChangePage(newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const isSelected = nombre => selected.indexOf(nombre) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const query = (fecha_ini,fecha_fin) =>{

    console.log("ini=",fecha_ini);
    console.log("fin=",fecha_fin);

    OrderController.validateDate(fecha_ini,fecha_fin)
    .then(result=>{
      //console.log("muestro result=",result);
    });
    
    }
  return (
    <MuiThemeProvider theme={theme}>

    <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/registrarPedido')} >
          <AddIcon />
        </Fab>   
        <Button variant="contained" color="primary" onClick={()=>query('2019-11-08','2019-11-11')}>QUERY</Button>

    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.nombre);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell>
                      {/*Paso listado_productos por props, asi lo puede recibir la clase ButtonOption el cual contiene las opciones que se utilizaran al hacer click en el icono MoreHorizIcon(los tres puntos)*/}
                      <SimpleMenu 
                      //Paso observer
                      setA={setA}
                      listado_producto = {row.listado_producto} //Listado producto entero
                      id_pedido={row.id_pedido} //Id del pedido seleccionado
                      />      
                      </TableCell>

                      <TableCell component="th" id={labelId} scope="row" padding="none" key={row.id}>
                        {row.nombre}
                      </TableCell>
                      <TableCell align="right" key={row.id}>{row.id_cliente}</TableCell>
                      <TableCell align="right" key={row.id}>{row.fecha_entrega}</TableCell>
                      <TableCell align="right" key={row.id}>{row.ciudad}</TableCell>
                      <TableCell align="right" key={row.id}>{row.direccion}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage='Filas por pagina:' // Saco la palabra "ROWS PER PAGE". Se puede agregar cualquier grase entre ' ' .
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`} //MODIFICO EL OF
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Pagina Anterior',
          }}
          nextIconButtonProps={{
            'aria-label': 'Siguiente Pagina',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      
    </div>
    </MuiThemeProvider>
  );
}

export default withRouter(EnhancedTable);
