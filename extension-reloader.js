// const red = '\u001b[31m';
const reset = '\u001b[0m';
const green = '\u001b[32m';
const WebSocket = require('ws');
class ExtensionReloader {
  constructor() {
    this.server = new WebSocket.Server({port: 8000});
  };
  apply(compiler) {
    compiler.hooks.done.tap('ExtensionReloader', () => {
      this.server.on('connection', (cb) => {
        cb.on('close', () => {
          console.log('ExtensionReloader disconnected!')
        });
        cb.addEventListener("error", (event) => {
          sock.send('ExtensionReloader error:' + event);
        });
        cb.on("message", (msg) => {
          console.log(msg);
        });
      });
      console.log('Successful bundle!');
      console.log(green + 'Please open "chrome://extensions/" and load your extension!' + reset);
    })
  };
}
module.exports = ExtensionReloader
