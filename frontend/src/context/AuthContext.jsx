import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Para manejar la carga inicial
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioLogueado = localStorage.getItem('usuario');
        if (usuarioLogueado) {
            try {
                setUsuario(JSON.parse(usuarioLogueado));
            } catch (error) {
                console.error("Error al parsear el usuario del localStorage:", error);
                // Si hay un error al parsear, eliminamos la entrada inválida
                localStorage.removeItem('usuario');
            }
        }
        setIsLoading(false); // La carga inicial ha terminado
    }, []);

    const iniciarSesion = (datosUsuario) => {
        localStorage.setItem('usuario', JSON.stringify(datosUsuario));
        setUsuario(datosUsuario);
        navigate(`/${datosUsuario.rol}`);
    };

    const cerrarSesion = () => {
        localStorage.removeItem('usuario');
        setUsuario(null);
        navigate('/');
    };

    const valorContexto = {
        usuario,
        iniciarSesion,
        cerrarSesion,
        isLoading // Exponemos el estado de carga
    };

    if (isLoading) {
        // Puedes mostrar un indicador de carga aquí, por ejemplo:
        return <div>Cargando...</div>; // O un componente más elaborado
    }

    return (
        <AuthContext.Provider value={valorContexto}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const contexto = useContext(AuthContext);
    if (!contexto) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return contexto;
};

export { AuthProvider, useAuth };