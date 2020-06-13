import { html, useEffect } from './preact.js';

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

  useEffect(() => {
    const onDrop = (ev) => {
      ev.stopPropagation();
      ev.preventDefault();

      const file = ev.dataTransfer.files[0];

      if (file) {
        onFile(file);
      }
    };

    const onDrag = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
    };

    window.addEventListener('drop', onDrop);
    window.addEventListener('dragover', onDrag);

    return () => {
      window.removeEventListener('drop', onDrop);
      window.removeEventListener('dragover', onDrag);
    };
  }, [onFile]);

  const elems = [
    html`<input type=file class=hide onChange=${onChange} ref=${ref} />`
  ];

  if (!hidden) {
    elems.push(html`
      <div class=dnd onClick=${onClick}>
        <div class=container>Click to choose a file or drag it here<//>
      </div>
    `);
  }

  return elems;
};
