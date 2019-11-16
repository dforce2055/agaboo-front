import React, {useState } from 'react';
import NavBar from '../../Header/Navigation';
import CustomizedTables from './TableProducts';
import SimpleBottomNavigation from '../../Footer/Footer';
import firebase from '../../../config/firebase';
import { withRouter } from 'react-router-dom';
import SearchBox from './SearchBox';
import FilterProduct from './FilterProduct';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';  

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    table: {
      padding: theme.spacing(2),
      
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
            <Grid container alignItems="center" justify="center" className={classes.root} spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                    <h1>Buscar producto</h1>
                    <SearchBox />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <h1>Estado de producto</h1>
                    <FilterProduct
                        value={value}
                        setValue={setValue}
                        setUpdate={setUpdate}
                    />
                </Grid>
                <Grid item xs = {12} xl={6}>
                    <CustomizedTables
                            setUpdate = {setUpdate}
                            update = {update}
                            rows = {rows}
                            setRows = {setRows}
                            value = {value}
                            setValue = {setValue}
                        />
                </Grid>
            </Grid>
            <footer>
                 <SimpleBottomNavigation/>
            </footer>
        </React.Fragment>
    )
}




export default withRouter(useIndexUpdateProduct) ;