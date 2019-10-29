import { createStore, combineReducers } from 'redux' ;
import products from './reducers/products' ;

const reducers = combineReducers({
    products
// Lugar para agregar los reducers

})


let store = createStore(reducers)



export default store; 