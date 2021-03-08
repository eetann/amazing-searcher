chrome.runtime.onMessage.addListener((msg) => {
  if (msg == 'restart') {
    chrome.runtime.reload();
  }
  return true
});
