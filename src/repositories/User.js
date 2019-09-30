/**
 * @Repository
 * User Repository Class
 */
import { Component } from 'react';
import { db } from '../config/firebase';
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

            let query = await db.collection(collection).doc(email).get();
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
        await db.collection(collection)
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
        await db.collection(collection)
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

    getUsers = async (res) => {
        try {
            let coleccion = await db.collection(collection).get();
            let usuarios = coleccion.docs.map(doc => doc.data());
            return usuarios;
        } catch (error) {
            throw new Error();
        }
    };

    addUser = async (newUser) => {
        if (!newUser) throw new Error(`Error: no se envio un cliente para registrar`);
        let result = await db.collection(collection)
            .doc(newUser.email)
            .set({
                apellido: newUser.apellido,
                nombre: newUser.nombre,
                cuit: newUser.cuit,
                cuil: newUser.cuil,
                tipoDocumento: newUser.tipoDocumento,
                numeroDocumento: newUser.numeroDocumento,
                direccion: newUser.direccion,
                telefono: newUser.telefono,
                email: newUser.email,
                estado: newUser.estado,
                role: newUser.role,
            })
            .then(() => {
                console.log("Documento guardado exitosamente!");
                return true;
            })
            .catch(function (error) {
                console.error("Error al guardar el documento: ", error);
                return false;
            });
        // Retorna True o False
        return result;
    }

    editUser = async (email, user) => {
        if (!email) throw new Error(`Error: el EMAIL es obligatorio`);
        let result = this.getUserByEMAIL(email)
            .then(() => {
                db.collection(collection).doc(email).update({
                    nombre: user.nombre,
                    apellido: user.apellido,
                    cuit: user.cuit,
                    cuil: user.cuil,
                    tipoDocumento: user.tipoDocumento,
                    numeroDocumento: user.numeroDocumento,
                    direccion: user.direccion,
                    telefono: user.telefono,
                    email: user.email,
                    estado: user.estado,
                    role: user.role,
                });
                return true;
            })
            .catch(function (error) {
                console.error("Error al guardar el documento: ", error);
                return false;
            });
        return result;
    }

    deleteUser = async (email) => {
        if (!email) throw new Error(`Error: el EMAIL es obligatorio`);
        let result = this.getUserByEMAIL(email)
            .then(() => {
                db.collection(collection).doc(email).delete();
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