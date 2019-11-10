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


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: 20,
    },
    paper: {
      height: 140,
      width: 100,
    },
    table: {
      //padding: theme.spacing(2),
      marginRight : 90 ,
    },

  }));
  



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
            <NavBar/>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        <Grid  item>
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
            <Grid container className={classes.table} spacing={2}>
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
            
        </React.Fragment>
        
        
    )
}




export default withRouter(useIndexUpdateProduct) ;