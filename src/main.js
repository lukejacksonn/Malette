import './main.scss';

import { Publish } from './xs';
import Clipboard from 'clipboard';

import ColorList from './components/colors';
import Swatch from './components/swatch';
import Download from './components/download';
import Toast from './components/toast';
import Favicon from './components/favicon';

const host = 'malette.io';
if ((host == window.location.host) && (window.location.protocol != 'https:')) {
  window.location.protocol = 'https';
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

const $body = document.body;
const $head = document.head;

$head.appendChild(Favicon());
$body.appendChild(ColorList());
$body.appendChild(Swatch());
$body.appendChild(Download());
$body.appendChild(Toast());

const clipboard = new Clipboard('hex-', {
  text: (trigger) => trigger.textContent,
});

clipboard.on('success', e =>
  Publish('hex/copied', [e.text])
);
