const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Función para convertir PNG a WebP
async function convertPngToWebp(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    console.log(`✅ Convertido: ${inputPath} → ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error convirtiendo ${inputPath}:`, error.message);
  }
}

// Función para procesar un directorio
async function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (path.extname(file).toLowerCase() === '.png') {
      const webpPath = filePath.replace(/\.png$/i, '.webp');
      await convertPngToWebp(filePath, webpPath);
    }
  }
}

// Ejecutar conversión
async function main() {
  const imagesDir = path.join(__dirname, '../src/assets/images');
  console.log('🚀 Iniciando conversión de imágenes PNG a WebP...');
  console.log(`📁 Directorio: ${imagesDir}`);
  
  await processDirectory(imagesDir);
  
  console.log('✨ Conversión completada!');
}

main().catch(console.error);