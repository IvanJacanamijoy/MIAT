# Guía de Despliegue para Hostinger - MIAT

## Preparación de Imágenes para Producción

### ✅ Configuraciones Implementadas

1. **Configuración de Vite optimizada** (`vite.config.js`):
   - Assets organizados en carpeta `assets/images/`
   - Nombres de archivos con hash para cache busting
   - Compresión automática de imágenes

2. **Rutas de imágenes corregidas**:
   - Todas las importaciones usan rutas relativas consistentes
   - Eliminadas rutas absolutas que causan problemas en producción

3. **Archivos de configuración creados**:
   - `.env.production` - Variables de entorno para producción
   - `public/.htaccess` - Configuración Apache para Hostinger

## Pasos para Desplegar en Hostinger

### 1. Build de Producción
```bash
cd frontend
npm run build:prod
```

### 2. Subir Archivos
- Sube todo el contenido de la carpeta `dist/` al directorio `public_html/` de tu hosting
- Asegúrate de que el archivo `.htaccess` esté incluido

### 3. Configurar Variables de Entorno
Edita el archivo `.env.production` con tus datos reales:
```env
VITE_API_URL=https://tu-dominio.com/api
VITE_APP_TITLE=MIAT - Producción
```

### 4. Verificar Estructura de Archivos en Hostinger
```
public_html/
├── .htaccess
├── index.html
├── vite.svg
└── assets/
    ├── images/
    │   ├── imagen_fondo_nosotros-[hash].png
    │   ├── logo_miat_rojo-[hash].png
    │   └── servicio_1-[hash].png
    ├── index-[hash].css
    └── index-[hash].js
```

## Optimizaciones Implementadas

### Imágenes
- ✅ Compresión automática durante el build
- ✅ Cache headers configurados (1 mes para imágenes)
- ✅ Nombres con hash para evitar problemas de cache
- ✅ Organización en carpeta `assets/images/`

### Performance
- ✅ Compresión GZIP habilitada
- ✅ Headers de cache optimizados
- ✅ Headers de seguridad configurados

### Compatibilidad SPA
- ✅ Redirección de rutas al index.html
- ✅ Configuración para React Router

## Scripts Disponibles

- `npm run build:prod` - Build optimizado para producción
- `npm run preview:prod` - Preview local del build de producción

## Notas Importantes

1. **Tamaño de Chunks**: El build muestra una advertencia sobre chunks grandes (>500KB). Considera implementar code splitting si es necesario.

2. **Imágenes Grandes**: La imagen `imagen_fondo_nosotros.png` es de 1.8MB. Considera optimizarla manualmente si es necesario.

3. **API URL**: Recuerda actualizar `VITE_API_URL` en `.env.production` con la URL real de tu API en producción.

## Verificación Post-Despliegue

1. Verifica que todas las imágenes cargan correctamente
2. Comprueba que las rutas de React Router funcionan
3. Confirma que los headers de cache están activos
4. Prueba la aplicación en diferentes dispositivos

## Troubleshooting

- Si las imágenes no cargan, verifica que el archivo `.htaccess` esté en el directorio raíz
- Si las rutas no funcionan, confirma que la configuración de Apache está activa
- Para problemas de cache, verifica que los headers estén configurados correctamente