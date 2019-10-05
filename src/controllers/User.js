/**
 * @Controller
 * User Controller Class
 */
import { Component } from 'react';
import UserRepo from '../repositories/User';


class UserController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            },

        };
    };

    getUserStatus = async (email) => {
        if (!email) throw new Error(`Error: el email es obligatorio`);
        try {
            let user = await UserRepo.getUserByEMAIL(email);

            if( user.estado === true) {
                const UserDTO = { estado: user.estado, role: user.role };
                // console.log(UserDTO);
                // no puedo devolver usuario, tengo que devolver estado y rol a la vista
                return UserDTO;
            } else {
                const UserDTO = { estado: "false", role: "inactivo" };
                return UserDTO;
            }
            
            
        } catch (error) {
            throw new Error();
        }
    }


}
export default new UserController();