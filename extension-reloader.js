const red = '\u001b[31m';
const reset = '\u001b[0m';
const green = '\u001b[32m';
const WebSocket = require('ws');
class ExtensionReloader {
  constructor() {
    this.server = new WebSocket.Server({port: 8000});
    this.connections = [];
    this.server.on('connection', (cb) => {
      this.connections.push(cb);
      cb.on('close', () => {
        this.connections = this.connections.filter((conn, i) => {
          return (conn === cb) ? false : true;
        });
      });
      cb.addEventListener("error", (event) => {
        consle.log(red + 'ExtensionReloader error:' + event + reset);
      });

      cb.on("message", (msg) => {
        console.log(msg);
      });
    });
  };
  apply(compiler) {
    compiler.hooks.done.tap('ExtensionReloader', () => {
      for (var i = 0, len = this.connections.length; i < len - 1; i++) {
        this.connections[i].send('reload');
      }
      this.connections[this.connections.length - 1].send('restart');
      console.log('Successful bundle!');
      console.log(green + 'Please open "chrome://extensions/" and load your extension!' + reset);
    })
    let entry = compiler.options.entry;
    let content_reload = './content_reload.js';
    if (entry.content) {
      if (Array.isArray(entry.content)) {
        entry.content.push(content_reload);
      } else {
        entry.content = [entry.content, content_reload];
      }
    }
  };
}
module.exports = ExtensionReloader
