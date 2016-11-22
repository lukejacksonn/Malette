# Malette | Color Picker

![Malette App](https://s3-eu-west-1.amazonaws.com/lukejacksonn/malette-screenshot.png)

> Available at https://malette.io

A material design inspired color picker recently rebuilt as a shiny, tiny progressive web app. It is built using no particular framework, just plain ~~old~~ ES6 javascript, [bundled with rollup](https://github.com/rollup/rollup). The app is automatically built and deployed to [github pages](https://github.com/lukejacksonn/malette/tree/gh-pages) using a [genius travis configuration](https://gist.github.com/domenic/ec8b0fc8ab45f39403dd) and https is ensured by letting [cloudflare handle the DNS](https://sheharyar.me/blog/free-ssl-for-github-pages-with-custom-domains). Everything included the app weighs in at ~11kb gzipped. When the service worker kicks in, first meaningful paint happens at around 300ms.

## TODO

- Handle the opening and closing of the swatch- component better on touch devices
- Implement firebase auth and db so that users can store and share swatches
- Try turning the colors- and swatch- components into polymer components
