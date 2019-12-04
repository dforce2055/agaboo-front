import React, { useState, useEffect } from 'react';
import UserController from '../../controllers/User';
import CircularProgress from "@material-ui/core/CircularProgress";

const NewCustomer = ({ props }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    
    const handleChange = event => {
        setSearchTerm(event.target.value);
        console.log("Buscado => " + event.target.value);
    };

    const manejarBusqueda = event => {
        if (event.key === 'Enter') {
            if (searchTerm.length > 1) {
                console.log("Apreto ENTER");
                console.log("Quiere buscar => " + searchTerm);
                setLoading(true);
                UserController.searchUsersActive(searchTerm)
                    .then(users => {
                        console.log("Resultado de busqueda => ");
                        console.log(users);
                        setUsuarios(users);
                        setLoading(false);
                    })
            } else {
                setLoading(true);
                UserController.getActiveUsers()
                    .then(users => {
                        console.log('cargando usuarios');
                        console.log(users);
                        setUsuarios(users);
                        setLoading(false);
                    })
                }
        }
    }

    const results = !searchTerm
        ? usuarios
        : usuarios.filter(usuario =>
            usuario.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

    useEffect(() => {
        console.log('usuarios => ', usuarios);
    }, [usuarios])

    useEffect(() => {
        // Acá puedo llamar al context de usuarios guardados
        UserController.getActiveUsers()
            .then(users => {
                console.log('cargando usuarios');
                console.log(users);
                setUsuarios(users);
                setLoading(false);
            })
    }, [])
    return (
        <div className="App">
            <h1>Usuarios</h1>
            <input
                type="text"
                placeholder="Buscar Usuarios por email"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={manejarBusqueda}
            />
            {loading ? (
                <CircularProgress color="inherit" size={20} />
            ) : 
                <ul>
                    {results.map(item => (
                        <li key={item.email}>{item.apellido}, {item.nombre}: {item.email}</li>
                    ))}
                </ul>
            }
        </div>
    );
}

export default NewCustomer;