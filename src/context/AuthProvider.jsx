import React, { createContext, useState, useContext } from "react";

// Crear el contexto para el manejo de la sesión
const SessionContext = createContext();

// Componente que envuelve a los hijos y proporciona el contexto de autenticación
export const AuthProvider = ({ children }) => {
    // Estado para almacenar la información del usuario
    const [user, setUser] = useState(() => {
        // Intentamos obtener el usuario almacenado previamente en el localStorage
        const storedUser = localStorage.getItem("user");
        // Si existe un usuario en el localStorage, lo parseamos a objeto, si no, usamos null
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Función para iniciar sesión, guardando los datos del usuario en localStorage y en el estado
    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData)); // Guardamos el usuario en el localStorage
        setUser(userData); // Actualizamos el estado del usuario
    };

    // Función para cerrar sesión, eliminando los datos del usuario de localStorage y el estado
    const logout = () => {
        localStorage.removeItem("user"); // Eliminamos el usuario del localStorage
        setUser(null); // Limpiamos el estado del usuario
    };

    // Proporcionamos el contexto con los valores de usuario, login y logout
    return (
        <SessionContext.Provider value={{ user, login, logout }}>
            {children} {/* Renderizamos los componentes hijos */}
        </SessionContext.Provider>
    );
};

// Hook personalizado para usar el contexto de la sesión en otros componentes
export const useSession = () => useContext(SessionContext);
