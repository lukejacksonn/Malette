const ev = {};

export const Publish = function (topic, args) {
  const subs = ev[topic] || [];
  return subs.map(x => x.apply(this, args || []));
};

export const Subscribe = (topic, cb) => {
  if (!ev[topic]) ev[topic] = [];
  ev[topic].push(cb);
  return [topic, cb];
};

export const Fetch = json =>
  typeof json === 'string' ?
    fetch(json).then(res => res.json())
  : Promise.resolve(json);

export const Node = template => json =>
  json.map(x => {
    const range = document.createRange();
    range.selectNode(document.body);
    const $n = range.createContextualFragment(template(x).trim());
    $n.data = x;
    return $n;
  });

export const Bind = selector => event => callback => nodes =>
  nodes.map(x =>
    [...x.querySelectorAll(selector)]
    .forEach(y => y.addEventListener(event, callback.bind(x)))
  ?x:x);

export const Once = selector => event => callback => nodes =>
  nodes.map(x =>
    [...x.querySelectorAll(selector)]
    .forEach(y => y.addEventListener(event, callback.bind(x), { once: true }))
  ?x:x);

export const Draw = element => nodes =>
  nodes.map(x => element.appendChild(x));

export const Guid = () =>
  ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
