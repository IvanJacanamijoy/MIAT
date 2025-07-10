
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// Mapeo de IDs de rol a nombres de rol
const roleIdToName = {
    1: 'usuario', // Asegúrate que esto coincida con tus rutas (ej. /administrar)
    2: 'tecnico',    // Asegúrate que esto coincida con tus rutas (ej. /tecnico)
    3: 'admin'     // Asegúrate que esto coincida con tus rutas (ej. /usuario)
};

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null); // Contendrá { id, email, rol: 'nombre_rol', nombre }
    const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // El token JWT en bruto
    const navigate = useNavigate();

    // Función de cierre de sesión centralizada
    const cerrarSesion = () => {
        console.log("Cerrando sesión...");
        setAuthToken(null);
        setUsuario(null); // Limpia el estado del usuario en el contexto
        localStorage.removeItem('token'); // Solo remueve el token de localStorage
        navigate('/'); // Redirige a la ruta raíz
    }
    // Efecto para inicializar el estado del usuario al cargar la aplicación
    useEffect(() => {
        if (authToken) {
            try {
                const decoded = jwtDecode(authToken);
                // Opcional: verificar expiración del token aquí
                if (decoded.exp * 1000 < Date.now()) {
                    console.log('Token expirado al cargar la aplicación.');
                    cerrarSesion();
                    return;
                }
                // Mapear el rol numérico a su nombre correspondiente
                const userRoleName = roleIdToName[decoded.user.rol];
                if (userRoleName) {
                    setUsuario({
                        ...decoded.user, // Copia el resto de las propiedades del payload
                        rol: userRoleName // Sobrescribe el 'rol' con el nombre
                    });
                } else {
                    console.error('Rol desconocido en el token:', decoded.user.rol);
                    cerrarSesion();
                }

            } catch (error) {
                console.error("Error decodificando token al iniciar:", error);
                cerrarSesion(); // Limpiar token inválido
            }
        } else {
            setUsuario(null); // Asegura que el usuario sea null si no hay token
        }
    }, [authToken]); // Vuelve a ejecutar si el authToken cambia (ej. al hacer login)

    const iniciarSesion = (token) => {
        setAuthToken(token); // Almacena el token en el estado local
        localStorage.setItem('token', token); // Persiste el token en localStorage

        try {
            const decoded = jwtDecode(token);
            // Mapear el rol numérico a su nombre
            const userRoleName = roleIdToName[decoded.user.rol];
            if (userRoleName) {
                setUsuario({
                    ...decoded.user,
                    rol: userRoleName
                });
            } else {
                console.error('Rol desconocido en el token recién recibido:', decoded.user.rol);
                cerrarSesion(); // Invalidar sesión si el rol es desconocido
            }
        } catch (error) {
            console.error("Error decodificando el nuevo token:", error);
            cerrarSesion(); // Limpiar si el token es inválido
        }
    };

    return (
        <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion, authToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};