import React , { useEffect }from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from "react-router-dom";
import { hideFooter } from './../../Footer/HideFooter';
import firebase from '../../../config/firebase';
import ProductController from '../../../controllers/Product';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3fb5a5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    overflowX: 'auto',
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

 function CustomizedTables(props) {
  const {rows,setRows} = props;
  const {value, setValue} = props;
  const {update, setUpdate} = props;
  const {history} = props ;
  let userRole = checkRoleAdmin();
  const classes = useStyles();
  const array = [] 
  const typesProduct = ["Baño Químico", "Oficina", "Boletería", "Garita"] // Hardcode de los tipos de productos
  
  

  async function getProducts(){
    if( update ){

      const products = await ProductController.getProductsByState(value);
      let product;
      let count ;

      for(let idx = 0 ; idx < typesProduct.length ; idx++  ){
        product = typesProduct[idx] ;
        count = countProducts( product, products); // traigo la cantidad del mismo tipo
        array.push({"product" : product, "value" : value, "count" : count}) 
      };
      
      setRows(array);
      setUpdate(false); 
    }

  }

  function countProducts(product, array_parameter){ // Funcion para contar Productos

    let count = 0;
    let i = 0;
    while(i < array_parameter.length) {
      if(product === array_parameter[i].type){
        count++ ;
      }
      i++;
    }

    return count;
  }

  async function checkRoleAdmin(){
    let role = await firebase.getCurrentUserRole();
  
    if(role==="ADMIN"){
      return false;
    }else if(role==="LOGISTICS"){
      return false;
    }
  }

  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana
/*
  React.useEffect(() => {
    console.log("useEffect");
    // creamos una función para actualizar el estado con el clientWidth
    const updateWidth = () => {
      const width = document.body.clientWidth;
      console.log(`updateWidth con ${width}`);
      setWidthWindows(width);
    };

    // actualizaremos el width al montar el componente
    updateWidth();

    // nos suscribimos al evento resize de window
    window.addEventListener("resize", updateWidth);
  }, []);*/
  
  useEffect(() => {
    const updateWidth = () => {
      const widthVariable = document.body.clientWidth;
      console.log(`updateWidth con ${widthVariable}`);
      setWidthWindows(widthVariable);
    }
    updateWidth();

    getProducts();
    hideFooter();
  });
  
  return (
      <React.Fragment>
            <Table>
                <TableHead>
                <TableRow>
                    <StyledTableCell align = "justify" wir>Producto</StyledTableCell>
                    {/* <StyledTableCell align="justyfy">Estado</StyledTableCell> */}
                    <StyledTableCell align="justify">Cantidad</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody >
                {rows.map(row => (
                    <TableRow key={row.typeProduct}>
                    <TableCell component="th" scope="row">
                      {row.product}
                    </TableCell>
                    {/* <StyledTableCell align="justyfy">{row.value}</StyledTableCell> */}
                    <TableCell align="justify">{row.count}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
           </Table>
            {userRole ?
              <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/createProduct')} >
                <AddIcon />
              </Fab> : ""
            }
             
      </React.Fragment>         
        
    
    
  );
}




export default withRouter(CustomizedTables);