import React, {useState , useEffect} from 'react';
import NavBar from '../../Header/Navigation';
import CustomizedTables from './TableProducts';
import SimpleBottomNavigation from '../../Footer/Footer';
import firebase from '../../../config/firebase';
import { withRouter } from 'react-router-dom';
import SearchBox from './SearchBox';
import FilterProduct from './FilterProduct';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';  
import Paper from '@material-ui/core/Paper';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';


const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: {
    MuiSelect:{
      outlined:{
        width:'230px',
      },
    },
    MuiOutlinedInput:{
      input:{
        paddingBottom:'15px',
      },
    },
  }
});

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop:theme.spacing(2),
    },
    paper: {
      height: 140,
      width: 100,
    },
    table: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(8),
    },
}));
  

// function useIndexUpdateProduct(props) {
//     const [value , setValue] = useState("DISPONIBLE");
//     const [rows,  setRows] = useState([]);
//     const [update, setUpdate] = useState(true);
//     const classes = useStyles();



//     if (!firebase.getCurrentUsername()) {
//         // not logged in
//         alert('Por favor inicie sesión para acceder')
//         props.history.replace('/login')
//         return null
//       }
    
      
//     return (
//         <React.Fragment>
//             <NavBar/>
//             <Grid container alignItems="center" justify="center" className={classes.root} spacing={2}>
//                 <Grid item xs={12} md={6} lg={6}>
//                     <h1>Buscar producto</h1>
//                     <SearchBox />
//                 </Grid>
//                 <Grid item xs={12} md={6} lg={6}>
//                     <h1>Estado de producto</h1>
//                     <FilterProduct
//                         value={value}
//                         setValue={setValue}
//                         setUpdate={setUpdate}
//                     />
//                 </Grid>
//                 <Grid item xs = {12} xl={6}>
//                     <CustomizedTables
//                             setUpdate = {setUpdate}
//                             update = {update}
//                             rows = {rows}
//                             setRows = {setRows}
//                             value = {value}
//                             setValue = {setValue}
//                         />
//                 </Grid>
//             </Grid>
//             <footer>
//                  <SimpleBottomNavigation/>
//             </footer>
//         </React.Fragment>
//     )
// }

function useIndexUpdateProduct(props) {
  const [value , setValue] = useState("DISPONIBLE");
  const [rows,  setRows] = useState([]);
  const [update, setUpdate] = useState(true);
  const classes = useStyles();



  if (!firebase.getCurrentUsername()) {
      // not logged in
      alert('Por favor inicie sesión para acceder')
      props.history.replace('/login')
      return null
  }
  

  return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <NavBar/>
          <Grid container className={classes.root}>
              <Grid item xs={12}>
                  <Grid container justify="center">
                      <Grid key={2} item>
                        <h1>Buscar producto</h1> 
                        <SearchBox/>
                      </Grid>
                      <Grid key={2} item>
                        <h1>Estado de producto</h1> 
                        <FilterProduct 
                                value = {value}
                                setValue = {setValue}
                                setUpdate = {setUpdate}
                        />
                      </Grid>
                  </Grid>
              </Grid>
              
          </Grid>
          <Grid container className={classes.table}>
              <Grid item xs = {12} xl = {6}>
                  <Paper>
                      <CustomizedTables
                              setUpdate = {setUpdate}
                              update = {update}
                              rows = {rows}
                              setRows = {setRows}
                              value = {value}
                              setValue = {setValue}
                          />
                  </Paper>
              </Grid>
          </Grid>
          <footer>
               <SimpleBottomNavigation/>
          </footer>
        </MuiThemeProvider>
      </React.Fragment>
      
      
  )
}




export default withRouter(useIndexUpdateProduct) ;