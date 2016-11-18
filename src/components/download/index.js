import { Fetch, Node, Bind, Draw } from '../../xs';
import './style.scss';

const action = {
  download() {
    const $swatch = document.querySelector('swatch-');
    const guid = ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4).toUpperCase();
    const page = `
      <!DOCTYPE html>
      <html>
      	<head>
      		<meta charset="utf-8">
      		<title>Malette | SWATCH-${guid}</title>
          <style>
            * {
              box-sizing: border-box;
            }
            body {
              width: 100%;
              height: 100vh;
              margin: 0;
              padding: 2rem;
              background: #fff;
              font-family: sans-serif;
            }
            swatch- {
              width: 100%;
              height: 100%;
              display: flex;
              flex-flow: row wrap;
            }
            color- {
              flex: 1 1 15rem;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            }
            name- {
              font-size: 1rem;
              font-weight: bold;
            }
            hex- {
              font-size: .618rem;
              margin-top: .32rem;
            }
            [normal-text] { color: rgba(255, 255, 255, 0.7); }
            [dark-text] { color: rgba(0, 0, 0, 0.87); }
            [dark-strong-text] { color: #000; }
            [light-text] { color: rgba(255, 255, 255, 0.87); }
            [light-strong-text] { color: #fff; }
          </style>
      	</head>
      	<body>${$swatch.outerHTML}</body>
      </html>
    `;

    // Create a blob from binary array
    const f = new Blob([page], {type:'application/octet-stream'});
    const a = document.createElement('a');
    window.URL = window.URL || window.webkitURL;
    a.href = window.URL.createObjectURL(f);
    a.download = `SWATCH-${guid}`;
    document.body.appendChild(a);
    a.click();

    // Remove the temporary link
    document.body.removeChild(document.body.lastElementChild);
  }
};

export default () => {
  const $download = document.createElement('download-');

  Fetch([{}])
  .then(Node(() => `
    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  `))
  .then(Bind('svg')('click')(action.download))
  .then(Draw($download));

  return $download;
};
