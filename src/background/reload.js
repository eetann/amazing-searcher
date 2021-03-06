const sock = new WebSocket("ws://localhost:8000");
const reset = '\u001b[0m';
const green = '\u001b[32m';
sock.addEventListener("open", () => {
  sock.send('ExtensionReloader connected!');
  sock.send('To keep detecting file changes,');
  sock.send(green + 'please open "Service Worker" at "chrome://extensions/"' + reset);
});
sock.addEventListener("close", () => {
  sock.send('reload.js disconnected!');
});
sock.addEventListener("error", (event) => {
  sock.send('ExtensionReloader error:' + event);
});
sock.addEventListener("message", e => {
  if (e.data === 'reload') {
    chrome.tabs.query({lastFocusedWindow: true, status: "complete"}, loadedTabs => {
      for (let tab in loadedTabs) {
        sock.send('hoge');
        // chrome.tabs.reload(tab.id);
      }
    })
    sock.send('extension reloaded!');
    chrome.runtime.reload();
  } else {
  }
});
