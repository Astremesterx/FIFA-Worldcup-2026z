const fs = require('fs');

const tailwindPath = 'tailwind.config.js';
const cssPath = 'src/index.css';

let tailwind = fs.readFileSync(tailwindPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

const colorsMatch = tailwind.match(/colors:\s*\{([^}]*)\}/);
if (colorsMatch) {
  const colorsStr = '{' + colorsMatch[1] + '}';
  // Fix keys without quotes if any, and single quotes
  const safeStr = colorsStr.replace(/([{,]\s*)([a-zA-Z0-9-]+)\s*:/g, '$1"$2":').replace(/'/g, '"');
  const colorsObj = JSON.parse(safeStr);

  let cssVariablesDark = '  html.dark {\n';
  let cssVariablesLight = '  :root {\n';
  let newTailwindColors = 'colors: {\n';

  // We want pure white / light gray backgrounds for light mode, dark text.
  // And secondary (gold) can stay but maybe slightly darker for contrast.
  for (const [key, val] of Object.entries(colorsObj)) {
    cssVariablesDark += `    --color-${key}: ${val};\n`;
    newTailwindColors += `        "${key}": "var(--color-${key})",\n`;
    
    // Light mode approximations
    let lightVal = val;
    if (key === 'background') lightVal = '#f8f9fa';
    else if (key === 'surface') lightVal = '#ffffff';
    else if (key === 'surface-container') lightVal = '#f0f2f5';
    else if (key === 'surface-container-low') lightVal = '#ffffff';
    else if (key === 'surface-container-lowest') lightVal = '#ffffff';
    else if (key === 'surface-container-high') lightVal = '#e5e7eb';
    else if (key === 'surface-container-highest') lightVal = '#d1d5db';
    else if (key === 'surface-variant') lightVal = '#e5e7eb';
    else if (key === 'surface-bright') lightVal = '#ffffff';
    else if (key === 'surface-dim') lightVal = '#d1d5db';
    else if (key === 'on-background' || key === 'on-surface') lightVal = '#111827';
    else if (key === 'on-surface-variant') lightVal = '#4b5563';
    else if (key === 'primary-container') lightVal = '#e0e7ff';
    else if (key === 'on-primary-container') lightVal = '#312e81';
    else if (key === 'secondary') lightVal = '#b8860b'; // Dark goldenrod for contrast on white
    else if (key === 'outline') lightVal = '#9ca3af';
    else if (key === 'outline-variant') lightVal = '#d1d5db';
    else if (key === 'error') lightVal = '#ef4444';
    else if (key === 'on-error') lightVal = '#ffffff';
    else if (key === 'error-container') lightVal = '#fee2e2';
    else if (key === 'on-error-container') lightVal = '#991b1b';
    else if (val === '#e2e2e2' || val === '#c7c6cc') lightVal = '#111827';
    else if (val === '#121414' || val === '#1e2020') lightVal = '#ffffff';
    
    cssVariablesLight += `    --color-${key}: ${lightVal};\n`;
  }
  
  cssVariablesDark += '  }\n';
  cssVariablesLight += '  }\n';
  newTailwindColors += '      }';

  // Replace in tailwind.config.js
  tailwind = tailwind.replace(/colors:\s*\{[^}]*\}/, newTailwindColors);
  fs.writeFileSync(tailwindPath, tailwind);

  // Replace in index.css
  const layerBaseIdx = css.indexOf('@layer base {');
  if (layerBaseIdx !== -1) {
    const injection = `${cssVariablesLight}\n${cssVariablesDark}\n`;
    css = css.replace('@layer base {', `@layer base {\n${injection}`);
  }
  
  fs.writeFileSync(cssPath, css);
  console.log('Successfully updated tailwind and index.css');
} else {
  console.log('Failed to parse colors');
}
