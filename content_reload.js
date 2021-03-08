const sock = new WebSocket("ws://localhost:8000");
const reset = '\u001b[0m';
const green = '\u001b[32m';
sock.addEventListener("message", e => {
  if (e.data == 'reload') {
    setTimeout(() => {window.location.reload()}, 2000)
  } else if (e.data == 'restart') {
    chrome.runtime.sendMessage('restart');
  }
})
