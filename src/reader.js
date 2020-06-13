/* globals ExifReader */

const IMAGES = ['image/jpeg', 'image/png'];

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
  const tags = ExifReader.load(arrayBuffer, { expanded: true });
  const url = `data:image/jpg;base64,${ IMAGES.includes(type) ? toBase64(arrayBuffer) : tags['Thumbnail'].base64}`;

  return { name, type, size, tags, url };
};
