export const type = 'countProducts'

const countProducts = idState => {
    return { 
        type ,
        payload : idState 
    }

};

export default countProducts;

