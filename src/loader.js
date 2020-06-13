/* eslint-disable no-console */

import { html, render } from './preact.js';
import App from './App.js';

export default () => {
  render(html`<${App} />`, document.querySelector('#app'));
};
