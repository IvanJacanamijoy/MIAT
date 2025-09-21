const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear directorio uploads si no existe
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        // Generar nombre único: timestamp + nombre original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

// Filtro para validar tipos de archivo
const fileFilter = (req, file, cb) => {
    // Permitir solo imágenes
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen'), false);
    }
};

// Configuración de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB máximo
    }
});

// Middleware para subir fotos de servicios (antes y después)
const uploadServicePhotos = upload.fields([
    { name: 'fotoAntes', maxCount: 1 },
    { name: 'fotoDespues', maxCount: 1 }
]);

// Middleware para manejar errores de multer
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                success: false, 
                message: 'El archivo es demasiado grande. Máximo 5MB.' 
            });
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ 
                success: false, 
                message: 'Demasiados archivos o campo de archivo inesperado.' 
            });
        }
    }
    
    if (error.message === 'Solo se permiten archivos de imagen') {
        return res.status(400).json({ 
            success: false, 
            message: 'Solo se permiten archivos de imagen (JPG, PNG, GIF, etc.).' 
        });
    }
    
    next(error);
};

module.exports = {
    uploadServicePhotos,
    handleMulterError
};