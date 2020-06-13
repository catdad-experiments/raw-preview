/* globals ExifReader */

const IMAGES = ['image/jpeg', 'image/png'];

const get = (obj = {}, [key, ...path] = [], fallback = undefined) => {
  if (key in obj && path.length) {
    return get(obj[key], path, fallback);
  }

  return key in obj ? obj[key] : fallback;
};

function toBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);

  for (let i = 0, l = bytes.byteLength; i < l; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}

function getEmbeddedImage(exif, arrayBuffer) {
  const offset = get(exif, ['StripOffsets', 'description']);
  const length = get(exif, ['StripByteCounts', 'description']);

  return offset && length ?
    arrayBuffer.slice(offset, offset + length) :
    null;
}

export default async file => {
  const { name, type, size } = file;

  const arrayBuffer = await file.arrayBuffer();
  const tags = ExifReader.load(arrayBuffer, { expanded: true });

  const jpg = getEmbeddedImage(tags.exif, arrayBuffer);
  const data = jpg ? toBase64(jpg) :
    IMAGES.includes(type) ? toBase64(arrayBuffer) :
      tags.Thumbnail.base64;

  const url = `data:image/jpg;base64,${data}`;

  return { name, type, size, tags, url };
};
