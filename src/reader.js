/* globals ExifReader */

export default async file => {
  const { name, type, size } = file;

  const arrayBuffer = await file.arrayBuffer();
  const tags = ExifReader.load(arrayBuffer, { expanded: true });
  const url = `data:image/jpg;base64,${tags['Thumbnail'].base64}`;

  return { name, type, size, tags, url };
};
