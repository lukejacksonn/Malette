import { Fetch, Node, Bind, Draw, Publish } from '../../xs';
import './style.scss';

// {
//   "base": "Red",
//   "shade": "50",
//   "hex": "fde0dc",
//   "text": "dark-text"
// }

const action = {
  picked(e) {
    if (e.target.nodeName !== 'HEX-') {
      Publish('color/picked', [this.data]);
    }
  },
  hovered() { Publish('color/hovered', [this.data]); },
};

export default () => {
  const $colors = document.createElement('colors-');

  Fetch('colors.json')
  .then(Node(({base, shade, hex, text}) => `
    <color- ${text} style='background-color:#${hex}'>
      <div>
        <name->${base.replace(' ','-')}-${shade}</name->
        <hex->#${hex}</hex->
      <div>
    </color->
  `))
  .then(Bind('color-')('click')(action.picked))
  .then(Bind('color-')('mouseenter')(action.hovered))
  .then(Draw($colors));

  return $colors;
};
