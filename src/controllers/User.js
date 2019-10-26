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
        if (!data.email) throw new Error(`Error: el email es obligatorio para registrar un cliente`);
        if (!data.numeroDocumento) throw new Error(`Error: el Número de Documento es obligatorio para registrar un cliente`);
        if (!data.tipoDocumento) throw new Error(`Error: el tipo de Documento es obligatorio para registrar un cliente`);

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

    getUsers = async () => {
        
    }

    getUserStatusAndRole = async (email) => {
        if (!email) throw new Error(`Error: el email es obligatorio`);
        try {
            let user = await UserRepo.getUserByEMAIL(email);

            if( user.estado === true) {
                const UserDTO = { estado: user.estado, role: user.role };
                // console.log(UserDTO);
                // no puedo devolver usuario, tengo que devolver estado y rol a la vista
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