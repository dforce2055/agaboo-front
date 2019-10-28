/**
 * @Repository
 * User Repository Class
 */
import { Component } from 'react';
import  firebase   from '../config/firebase';
import { User } from '../models/User';
const collection = 'users';

class UserRepo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            },

        }
    }

    getUser = async (email) => {
        if (!email) throw new Error(`Error: el email es obligatorio`);
        try {
            
            let query = await firebase.db.collection(collection).doc(email).get();
            let result = query.data();
            let usuario = new User();
            //Mapeo los resultados en el User:usuario
            usuario = Object.assign({}, result);
            /* Otros metodos
            //var bar = JSON.parse(JSON.stringify(foo));          
            for (let prop in result) {
                //console.log(prop + " : " + result[prop]);
                usuario[prop] = result[prop];
            }*/
            //console.log(usuario);
            return usuario;
        } catch (error) {
            throw new Error();
        }
    }

    getUserByCUIL = async (cuil) => {
        if (!cuil) throw new Error(`Error: el CUIL es obligatorio`);
        let user = {};
        await firebase.db.collection(collection)
            .where('cuil', '==', cuil)
            .limit(1)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    user = doc.data();
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                user = null;
            });

        return user;
    }
    
    getUserByEMAIL = async (email) => {
        if (!email) throw new Error(`Error: el EMAIL es obligatorio`);
        let user = {};
        await firebase.db.collection(collection)
            .where('email', '==', email)
            .limit(1)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    user = doc.data();
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                user = null;
            });

        return user;
    }

    getAllUsers = async (res) => {
        try {
            let coleccion = await firebase.db.collection(collection).get();
            let usuarios = coleccion.docs.map(doc => doc.data());
            return usuarios;
        } catch (error) {
            throw new Error();
        }
    };

    getActiveUsers = async (res) => {
        try {
            let coleccion = await firebase.db.collection(collection).where("eliminado", "==", false).get();
            let usuarios = coleccion.docs.map(doc => doc.data());
            return usuarios;
        } catch (error) {
            throw new Error();
        }
    };

    addUser = async (newUser) => {
        if (!newUser) throw new Error(`Error: no se envio un usuario para registrar`);
        let result = await firebase.db.collection(collection)
            .doc(newUser.email)
            .set(newUser)
            .then(() => {
                console.log("Usuario guardado exitosamente!!!");
                return true;
            })
            .catch(function (error) {
                console.error("Error al guardar el Usuario: ", error);
                return false;
            });
        // Retorna True o False
        return result;
    }

    editUser = async (user) => {
        if (!user) throw new Error(`Error: no se envio un usuario para registrar`);
        let result = await firebase.db.collection(collection)
                .doc(user.email)
                .set(user, { merge: true } )
                .then(() => {
                    return true;
                })
                .catch(function (error) {
                    return false;
                });
        return result;
    }

    deleteUser = async (email) => {
        if (!email) throw new Error(`Error: no se envio el email del usuario para ELIMINAR`);
        let result = await firebase.db.collection(collection)
            .doc(email)
            .set({eliminado: true }, { merge: true })
            .then(() => {
                return true;
            })
            .catch(function (error) {
                return false;
            });
        return result;
    }

    deleteUserTRUE = async (email) => {
        if (!email) throw new Error(`Error: el EMAIL es obligatorio`);
        let result = this.getUserByEMAIL(email)
            .then(() => {
                firebase.db.collection(collection).doc(email).delete();
                return true;
            })
            .catch(function (error) {
                console.error("Error al eliminar el documento: ", error);
                return false;
            });
        return result;
    }
}
export default new UserRepo();