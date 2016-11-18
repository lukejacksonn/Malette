export default () => {

  const canvas = document.createElement('canvas');
  const colors = ['#e51c23','#e91e63','#9c27b0','#673ab7','#3f51b5','#5677fc','#03a9f4','#00bcd4','#009688','#259b24','#8bc34a','#cddc39','#ffeb3b','#ffc107','#ff9800','#ff5722','#795548','#9e9e9e','#607d8b'];

  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
  ctx.fillRect(0, 0, 32, 32);

  const link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL('image/x-icon');

  return link;

};
