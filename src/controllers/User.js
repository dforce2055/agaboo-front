/**
 * @Controller
 * User **Controller** Class
 */
import { Component } from 'react';
import UserRepo from '../repositories/User';
import {User} from '../models/User';


class UserController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            },

        };
    };


    addUser = async (data) => {
        if (!data || !data.email || !data.numeroDocumento ) throw new Error(`Error: el email, tipo y número de documento son obligatorios para registrar un cliente`);
        try {
            let newUser = new User();
            newUser = Object.assign({}, data); //Utilizo Object.assign para mapear el objeto
            const result = await UserRepo.addUser(newUser);

            if (result) {
                console.log(`Se agrego un nuevo Usuario ${newUser} `);
                return true;
            } else {
                console.log(`No se pudo agregar el Usuario ${newUser}`);
                return false;
            }
        } catch (error) {
            console.log(error);
        }   
    }

    

    getAllUsers = async () => {

        try {
            let users = await UserRepo.getAllUsers();

            if (users) {
                //const UserDTO = { estado: user.estado, role: user.role };
                // console.log(UserDTO);
                // no puedo devolver usuario, tengo que devolver estado y rol a la vista
                return users;
            } else {
                console.log("No se pudo obtener el listado de usuarios");
                return false;
            }

        } catch (error) {
            throw new Error();
        }
    }

    getActiveUsers = async () => {

        try {
            let users = await UserRepo.getActiveUsers();

            if (users) {
                //const UserDTO = { estado: user.estado, role: user.role };
                // console.log(UserDTO);
                // no puedo devolver usuario, tengo que devolver estado y rol a la vista
                return users;
            } else {
                console.log("No se pudo obtener el listado de usuarios");
                return false;
            }

        } catch (error) {
            throw new Error();
        }
    }

    editUser = async (data) => {
        if (!data || !data.email || !data.numeroDocumento || !data.tipoDocumento) throw new Error(`Error: el email, tipo y número de documento son obligatorios para Editar/Registar un cliente`);
        try {
            let user = new User();
            user = Object.assign({}, data); //Utilizo Object.assign para mapear el objeto
            const result = await UserRepo.editUser(user);

            if (result) {
                console.log(`Se Editó correctamente el Usuario ${user.nombre} `);
                return true;
            } else {
                console.log(`No se pudo editar el Usuario ${user.nombre}`);
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteUser = async (data) => {
        if (!data.email) throw new Error(`Error: el email es obligatorio para eliminar un cliente`);
        try {
            const result = await UserRepo.deleteUser(data.email);

            if (result) {
                console.log(`Se eliminó el Usuario ${data.email} `);
                return true;
            } else {
                console.log(`No se pudo eliminar el Usuario ${data.email}`);
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    getUserStatusAndRole = async (email) => {
        if (!email) throw new Error(`Error: el email es obligatorio`);
        try {
            let user = await UserRepo.getUserByEMAIL(email);

            if( user.estado === true) {
                const UserDTO = { estado: user.estado, role: user.role };
                // console.log(UserDTO);
                // no puedo devolver usuario, tengo que devolver estado y rol a la vista
                sessionStorage.userRole = user.role;
                return UserDTO;
            } else {
                const UserDTO = { estado: false, role: "inactivo" };
                return UserDTO;
            }
            
            
        } catch (error) {
            throw new Error();
        }
    }


}
export default new UserController();