/* globals dcraw */

import exifr from 'https://cdn.jsdelivr.net/npm/exifr@5.0.2/dist/full.esm.js';

const IMAGES = ['image/jpeg', 'image/jpg', 'image/png'];
const safe = prom => prom.then(data => [null, data]).catch(err => [err]);

function toBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);

  for (let i = 0, l = bytes.byteLength; i < l; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}

export default async file => {
  const { name, type, size } = file;

  const arrayBuffer = await file.arrayBuffer();
  const [, tags = {}] = await safe(exifr.parse(arrayBuffer));

  const [mime, image] = IMAGES.includes(type.toLowerCase()) ?
    [type.toLocaleLowerCase(), arrayBuffer] :
    ['image/jpg', dcraw(new Uint8Array(arrayBuffer), { extractThumbnail: true }).buffer];

  const url = `data:${mime};base64,${toBase64(image)}`;

  return { name, type, size, tags, url };
};
