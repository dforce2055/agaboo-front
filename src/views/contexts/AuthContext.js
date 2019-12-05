import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [usuarioValidado, setUsuarioValidado] = useState(null);
    return (
        <AuthContext.Provider value={{ usuarioValidado, setUsuarioValidado }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;