const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

//funcion que autentica los token recibidos
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'No se proporciona ningún token de autenticación.' })
    }
    jwt.verify(token, jwtConfig.secret, (err, user) => {
        if (err) {
            //Verificamos si el token expiro o es invalido
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado, ingresa nuevamente.' });
            }
            return res.status(403).json({ message: 'Token invalido.' }); // Forbidden si no es válido
        }
        //revisa
        req.user = user;
        next();
    })
}

//funcion que verifica los roles
function authorizeRoles(roles = [3, 2, 1]) {
    if (typeof roles === 'string') {
        roles = [parseInt(roles, 10)]; // Convertir el string numérico a número entero y ponerlo en un array
    }else {
        // Asegúrate de que si roles ya es un array, sus elementos sean números enteros
        roles = roles.map(role => parseInt(role, 10));
    }

    return (req, res, next) => {
        // 1. Verificar si req.user existe (lo que significa que authenticateToken se ejecutó)
        // 2. Verificar si req.user.user existe (el objeto anidado en el payload)
        // 3. Verificar si las propiedades email y rol existen dentro de req.user.user
        if (!req.user || !req.user.user || !req.user.user.email || !req.user.user.rol) {
            console.log('Fallo la verificación de autenticación requerida en authorizeRoles.');
            console.log('req.user:', req.user); // Para depuración
            return res.status(401).json({ message: 'Authentication required: User data missing in token.' });
        }

        // Acceder al rol del usuario desde el objeto anidado 'user'
        const userRol = parseInt(req.user.user.rol, 10); // Aseguramos que el rol del usuario también sea un número

        // Verificar si el rol del usuario está incluido en los roles permitidos
        if (roles.length && !roles.includes(userRol)) {
            console.log('Acceso denegado: Rol de usuario no permitido.');
            console.log('Rol del usuario:', userRol);
            console.log('Roles permitidos:', roles);
            return res.status(403).json({ message: 'Access denied. You do not have the necessary role.' });
        }

        // Si todo está bien, pasa al siguiente middleware o a la ruta
        next();
    };
}

module.exports = {
  authenticateToken,
  authorizeRoles
};