/*BUG LOOBY*/
let urlOpened = false;
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (!urlOpened && details.url.includes('/spaceman/?tabletype')) {
      let modifiedUrl = details.url.replace('/spaceman/', '/lobby2/');
      chrome.tabs.update(details.tabId, { url: modifiedUrl }, function(tab) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          urlOpened = true;
        }
      });
    }
  },
  {
    urls: [
      "*://*.client.pragmaticplaylive.net/*",
      "*://client.pragmaticplaylive.net/*",
      "*://*.pragmaticplaylive.net/*"
    ]
  }
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'performAction') {
    sendResponse({ result: "Action performed" });
  }
});
