chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension is installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('vgrtest onMessage: ', message.message);
});