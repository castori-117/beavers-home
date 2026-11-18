// Copies the self-hosted fonts from @fontsource into public/fonts (versioned file names, cached immutable).
import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = `${root}node_modules/@fontsource-variable/schibsted-grotesk`;
const target = `${root}public/fonts`;

mkdirSync(`${target}/licenses`, { recursive: true });
copyFileSync(`${source}/files/schibsted-grotesk-latin-wght-normal.woff2`, `${target}/schibsted-grotesk.v1.woff2`);
copyFileSync(`${source}/LICENSE`, `${target}/licenses/schibsted-grotesk-OFL.txt`);
console.log('fonts copied');
