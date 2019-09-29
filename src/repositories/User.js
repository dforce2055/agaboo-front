/**
 * @Repository
 User Repository Class
 */
import { Component } from 'react';
import { db } from '../config/firebase';
import { User } from '../models/User';
const collection = 'users';

export default new class UserRepo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            },

        }
    }

    getUser = async (email) => {
        try {
            if ( !email ){
                return null;
            }
            let query = await db.collection(collection).doc(email).get();
            let result = query.data();
            let usuario = new User();
            
            //var bar = JSON.parse(JSON.stringify(foo));
            
            //Mapeo los resultados en el User:usuario
            for (let prop in result) {
                //console.log(prop + " : " + result[prop]);
                usuario[prop] = result[prop];
            }
            console.log(usuario);
            return usuario;
        } catch (error) {
            throw new Error();
        }
    }
}
