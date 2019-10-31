import ProductController from '../../controllers/Product' ;
import {type as countProduct} from '../actions/countProducts';



let defaultState = [] ;
const arrayStock = [] ; 
const typesProduct = ["Baño Químico", "Oficina", "Boletería", "Garita"] 

async function getProducts(){
    defaultState = await ProductController.getProducts(); 
}

async function mostrar(){
    console.log('Reducer defaultState :' , await defaultState);
}

function countProducts(product, array){ // Funcion para contar Productos por tipo.

    let count = 0;
    let i = 0;
    while(i < arrayStock.length) {
      if(product === array[i].type){
        count++ ;
      }
      i++;
    }
    return count;
  }

// function createArrayStock(type){// crea el array mapeado para poder encontrar
//     let product;    
//     let count ;

//     for(let idx = 0 ; idx < typesProduct.length ; idx++  ){
//         product = typesProduct[idx] ;
//         count = countProducts( type, products); // traigo la cantidad del mismo tipo
//         arrayStock.push({"product" : product, "count" : count}) 
//     };

//     return arrayStock; 
// }
 getProducts(defaultState);

 



//const defaultState = products  ;


function reducer(state = defaultState , {type , payload} ){

    switch (type) {

        case countProduct : {

           // return createArrayStock(payload); 
        }

        default : 
            return state;
    }   
}

export default reducer;