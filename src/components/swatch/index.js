import { Subscribe, Fetch, Node, Draw } from '../../xs';
import './style.scss';

export default () => {
  const $swatch = document.createElement('swatch-');

  const removeColor = e => {
    $swatch.removeChild(e.target);
    e.target.removeEventListener('animationend', removeColor);
  };

  $swatch.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName == 'COLOR-') {
      e.target.classList.add('remove');
      e.target.addEventListener('animationend', removeColor);
    }
  });

  Subscribe('color/hovered', (color) => {
    if ($swatch.children.length == 0) {
      $swatch.style.backgroundColor = `#${color.hex}`;
    }
  });

  Subscribe('color/picked', (color) => {
    const colors = [...$swatch.querySelectorAll('color-')];
    const exists = colors.find(x =>
      x.querySelector('hex-').textContent === `#${color.hex}`
    );
    if(!exists && colors.length < 6) {
      Fetch([color])
      .then(Node(({base, shade, hex, text}) => `
        <color- ${text} style='background-color:#${hex}'>
          <name->${base.replace(' ','-')}-${shade}</name->
          <hex->#${hex}</hex->
        </color->
      `))
      .then(Draw($swatch));
    }
  });

  return $swatch;
};
