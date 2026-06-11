import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'public', 'world cup', '2026_FIFA_World_Cup_emblem.svg.webp');
const outputDir = path.join(__dirname, 'public');

async function generateIcons() {
  try {
    await sharp(inputPath)
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(outputDir, 'icon-192x192.png'));
    
    await sharp(inputPath)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(outputDir, 'icon-512x512.png'));
      
    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
