import { mkdir, copyFile, cp } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js']) {
  await copyFile(file, `dist/${file}`);
}
console.log('Portafolio preparado en dist.');

await cp('assets', 'dist/assets', { recursive: true });
