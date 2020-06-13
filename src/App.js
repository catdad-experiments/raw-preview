import { html, useState } from './preact.js';
import DragAndDrop from './DragAndDrop.js';
import reader from './reader.js';

export default () => {
  const [file, setFile] = useState(null);

  const onFile = newFile => {
    reader(newFile).then(data => {
      console.log(data);
      setFile(data);
    }).catch(err => {
      console.error(err);
    });
  };

  if (!file) {
    return html`
      <${DragAndDrop} onFile=${onFile} />
    `;
  }

  return html`
    <${DragAndDrop} onFile=${onFile} hidden=${true} />
    <div class=img><img src=${file.url} /><//>
  `;
};
