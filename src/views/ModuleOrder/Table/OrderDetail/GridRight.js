import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  ButtonGroup,
  Grid,
  Divider} from '@material-ui/core';
import {
  MuiThemeProvider, 
  createMuiTheme} from '@material-ui/core/styles';
import DialogSave from './DialogSaveOrder';
import OrderController from '../../../../controllers/Order';
import GridRightResponsive from './GridRightRespon';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#318377',
    color: theme.palette.common.white,
  },
}))(TableCell);

const themeMuiProvider = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#3fb5a5',
        '&:hover': {
          backgroundColor: '#0ce8ca',
          "@media (hover: none)": {
            backgroundColor: "#0ce8ca"
          },
        },
      },
      containedSecondary: {
        backgroundColor: '#b53f3f',
        '&:hover': {
          backgroundColor: '#f30b0b',
          "@media (hover: none)": {
            backgroundColor: "#f30b0b"
          },
        },
      },
    }, 
  }
})

const useStyles = makeStyles(theme => ({
  TextField:{
    width:'125px'
  },
  buttonLeft: {
    marginRight:'2px',
    marginLeft:'13px',
    marginTop: theme.spacing(3),
  },
  buttonRight: {
    marginLeft:'20px',
    marginTop: theme.spacing(3),
  },
}));

//Este metodo le llegan como parametro un conjunto de objetos y los recorre, luego se fija su respectiva cantidad y lo mapea
const onlyProduct = (order) => {
  let result = []; 
  order.forEach(element => {
    for (let i = 0; i < element.cantidad; i++) {
      result.push({
        producto:element.producto,
        precio_X_unidad:element.precio_X_unidad,
        modelo:element.modelo,
        id_producto:''
      })
    } 
  });
  return result
}

const TableResponsive = (order) =>{
  let array = onlyProduct(order)
  
  return(
    <React.Fragment>
    {array.map((row,index)=>(
      <div>
        <br/>
          <Divider key={index} />
          <GridRightResponsive
            data={row}
            i={index}
          />
        <br/>
      </div>
    ))}
    </React.Fragment>
  );
}


export default function GridRight() {
  const classes = useStyles();
  const [arrayOnlyProduct] = React.useState([]); //Guardo el arreglo con los id
  const [orderId,setOrderId] = React.useState(''); //Guardo el id del pedido
  const [order,setOrder] = React.useState([]); //Guardo listado de productos con su cantidad
  const [load,setLoad] = React.useState(true); //Render y cargo datos
  const [openDialog, setOpenDialog] = React.useState(false);//State de Dialog
  const [stateDisabled, setStateDisabled] = React.useState(false);//Estado de Disabled button y textFeid

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  React.useEffect(()=>{
    if (load) {  
        setOrder(JSON.parse(sessionStorage.getItem('listado_producto')));  
        setOrderId(JSON.parse(sessionStorage.getItem('id_pedido')));            
        setLoad(false);
    }
  });

  React.useEffect(()=>{
    onlyProduct(order).forEach(element => {
      arrayOnlyProduct.push(element)
    });    
  },[order]);

  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana
  //Actualiza el ancho de la ventana
  React.useEffect(() => {
    const updateWidth = () => {
      const width = document.body.clientWidth;
      setWidthWindows(width);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
  }, []);

  const addIdForIndex = index => (event)=>{
    arrayOnlyProduct[index].id_producto = event.target.value;
    console.log("Array:",arrayOnlyProduct);
  }

  const save = () => {
    OrderController.saveOrderProductIds(orderId,arrayOnlyProduct);
    console.log("guardo pedido con su lista.");
    console.log("lista:",arrayOnlyProduct);
    console.log("id del pedido:",orderId);
    handleCloseDialog();
  }

  return (
      <div className={classes.root}>
      <DialogSave 
        open={openDialog} 
        handleClose={handleCloseDialog}
        handleSave={save}
        handleOpenDialog={handleOpenDialog}
      />
        {
          (widthWindow > 700) ? 
          <Table>
          <TableHead >
            <TableRow hover={true}>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell>Producto</StyledTableCell>
              <StyledTableCell align="right">Modelo</StyledTableCell>
              <StyledTableCell align="right">Codigo</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {onlyProduct(order).map((row,index) => (
                <TableRow key={index}>
                <TableCell 
                >
                  {index}
                </TableCell>
                <TableCell 
                  component="th" 
                  scope="row"
                >
                  {row.producto}
                </TableCell>
                <TableCell align="right">
                {row.modelo}</TableCell>
                <TableCell align="right">
                  <TextField 
                  className={classes.TextField} 
                  variant="outlined" 
                  label="Codigo" 
                  multiline 
                  rowsMax="4"
                  onChange={addIdForIndex(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        :
        TableResponsive(order)
        }

        <MuiThemeProvider theme={themeMuiProvider}>
          <ButtonGroup variant="text" size="large" aria-label="large contained secondary button group" >
            <Button 
            className={classes.buttonLeft} 
            color="secondary" variant="contained" >
                  Cancelar
            </Button>
            
            <Button 
            onClick={handleOpenDialog} 
            className={classes.buttonRight} 
            color="primary" 
            variant="contained" 
            > 
              Guardar 
            </Button>
          </ButtonGroup>
        </MuiThemeProvider>
      </div>
  );
}
