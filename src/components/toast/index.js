import { Fetch, Node, Draw, Subscribe } from '../../xs';
import './style.scss';

export default () => {
  const $toast = document.createElement('toast-');
  let timer;

  Subscribe('hex/copied', (hex) => {
    if (timer) clearTimeout(timer);
    $toast.innerHTML = '';
    Fetch([{}])
    .then(Node(() => `
      <p>Copied <span style='background-color:${hex}'></span><code>${hex}</code> to clipboard</p>
    `))
    .then(Draw($toast));
    timer = setTimeout(() => $toast.innerHTML = '', 3000);
  });

  return $toast;
};
