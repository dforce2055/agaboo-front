import React, {useState , useEffect} from 'react';
import NavBar from '../../Header/Navigation';
import CustomizedTables from './TableProducts';
import SimpleBottomNavigation from '../../Footer/Footer';
import firebase from '../../../config/firebase';
import { withRouter } from 'react-router-dom';
import SearchBox from './SearchBox';
import FilterProduct from './FilterProduct';
import {connect } from 'react-redux';
import countProduct from '../../../redux/actions/countProducts';    


function useIndexUpdateProduct(props) {
    const [value , setValue] = useState("DISPONIBLE");
    const [rows,  setRows] = useState([]);
    const [update, setUpdate] = useState(true);
    const { products  } = props ;
    //const { countProduct } = props ;
    console.log('Products en index de redux: ', products);
    //console.log('countProduct : ' , countProduct('DISPONIBLE'));

    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
      }
    
      
    return (
        <div>

            <NavBar/>
            <SearchBox/>
            <FilterProduct 
                value = {value}
                setValue = {setValue}
                setUpdate = {setUpdate}
            />
            <CustomizedTables
                setUpdate = {setUpdate}
                update = {update}
                rows = {rows}
                setRows = {setRows}
                value = {value}
                setValue = {setValue}
                />
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
    )
}

 const mapsStateToProps = (state) => {
     return {
         products : state.products , 
     };
 };

const wrapper = connect(mapsStateToProps); 
const component = wrapper(useIndexUpdateProduct); 



export default withRouter(component) ;