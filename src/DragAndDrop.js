import { html } from './preact.js';

export default ({ onFile, hidden = false } = {}) => {
  const ref = {};

  const onChange = (ev) => {
    const file = ev.target.files[0];

    if (file) {
      onFile(file);
    }
  };

  const onClick = () => {
    if (ref && ref.current) {
      ref.current.click();
    }
  };

  const elems = [
    html`<input type=file class=hide onChange=${onChange} ref=${ref} />`
  ];

  if (!hidden) {
    elems.push(html`<div class=dnd onClick=${onClick}>Click to choose a file or drag it here</div>`);
  }

  return elems;
};
