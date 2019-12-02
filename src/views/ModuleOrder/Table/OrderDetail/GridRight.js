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
  buttonRight: {
    marginTop: theme.spacing(2),
  },
}));

//Este metodo le llegan como parametro un conjunto de objetos y los recorre, luego se fija su respectiva cantidad y lo mapea
const onlyProduct = (order) => {
  let result = []; 
  order.forEach(element => {
    if (element.modelo === " ") {
      element.modelo = "---"
    }
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

const TableResponsive = (order,addIdForIndex) =>{
  let array = onlyProduct(order)
  
  return(
    <React.Fragment>
    {array.map((row,index)=>(
      <div>
          <Divider key={index} />
        <br/>
          <GridRightResponsive
            data={row}
            i={index}
            addIdForIndex={addIdForIndex}
          />
        <br/>
        <Divider/>
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
  const [disabled,setDisabled] = React.useState(true);
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  React.useEffect(()=>{ //Carga los datos la primera vez
    if (load) {  
        setOrder(JSON.parse(sessionStorage.getItem('listado_producto')));  
        setOrderId(JSON.parse(sessionStorage.getItem('id_pedido')));            
        setLoad(false);
    }
  });

  React.useEffect(()=>{ //Se ejecuta siempre que cambie el valor order
    onlyProduct(order).forEach(element => {
      arrayOnlyProduct.push(element)
    }); 
  },[order]);

  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana

  React.useEffect(() => {//Se ejecuta siempre que el tamaño de la pantalla cambie
    const updateWidth = () => {
      const width = document.body.clientWidth;
      setWidthWindows(width);
    };
    updateWidth();    
    window.addEventListener("resize", updateWidth);
  }, []);

  const addIdForIndex = index => (event)=>{
    arrayOnlyProduct[index].id_producto = event.target.value;//Guardo el valor en id_producto en el indice dado

    if (arrayOnlyProduct.find(x=>x.id_producto =="")) { //Si existe un campo vacio pondra el boton invicible
      setDisabled(true)
    }else{
      setDisabled(false)
    }
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
        TableResponsive(order,addIdForIndex)
        }

        <MuiThemeProvider theme={themeMuiProvider}>
            
            <Button 
            onClick={handleOpenDialog} 
            className={classes.buttonRight} 
            color="primary" 
            variant="contained"
            disabled={disabled}
            > 
              Guardar 
            </Button>
        </MuiThemeProvider>
      </div>
  );
}
