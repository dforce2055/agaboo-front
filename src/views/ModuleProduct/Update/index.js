import React, {useState , useEffect} from 'react';
import NavBar from '../../Header/Navigation';
import CustomizedTables from './TableProducts';
import SimpleBottomNavigation from '../../Footer/Footer';
import firebase from '../../../config/firebase';
import { withRouter } from 'react-router-dom';
import SearchBox from './SearchBox';
import FilterProduct from './FilterProduct';

function useIndexUpdateProduct(props) {
    const [value , setValue] = useState("DISPONIBLE");
    const [rows,  setRows] = useState([]);
    const [update, setUpdate] = useState(true);

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

export default withRouter(useIndexUpdateProduct);