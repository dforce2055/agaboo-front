import React , { useEffect }from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from  './Button';
import NavBar from '../Header/Navigation';
import ProductController from '../../controllers/Product';
import FormDialog from './DialogUpdateProduct';
import SearchBox from './SearchBox';



const StyledTableCell = withStyles(theme => ({
  head: {
    background: 'linear-gradient(45deg, #2c7369 20%, #3fb5a5 90%)',
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















const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
}));

export default function CustomizedTables(props) {
    const [rows,setRows] = React.useState([
    ]);

  const classes = useStyles();
  const {history}  = props;



console.log('Rows despues de getProducts: ', rows);


  
  async function getProducts(){
    const products = await ProductController.getProducts();
    console.log("Cantidad de productos :", products.length);
    if( rows.length !== products.length){
      setRows(products); 
      console.log("products :" , rows);  
    }
    
  };

  function getArray(newArray){
    console.log('getArray :',  newArray);
    setRows(newArray);
    console.log('Rows en table products: ' , rows);
    getProducts();
  };
  
  function pruebaSet(){
    setRows([]);
    console.log('Rows en pruebaSet', rows ); 
  };
  

  useEffect(() => {
    getProducts();
  });
  
  return (
      <React.Fragment>
        <NavBar/>
        <SearchBox/>
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <StyledTableCell align= "justyfy">Producto</StyledTableCell>
                    <StyledTableCell align="justyfy">Codigo</StyledTableCell>
                    <StyledTableCell align="justyfy">Estado</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => (
                    <StyledTableRow key={row.typeProduct}>
                    <StyledTableCell component="th" scope="row">
                      {/* <FormDialog values = {row} 
                                  //setRows = {setRows()}
                                  products = {rows}
                                  getArray = {getArray}
                                  setRows = {setRows}
                                  /> */}
                    
                      
                      
                      {row.type}
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
