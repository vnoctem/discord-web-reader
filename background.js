chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension is installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'from_content') {

    let objectAlert = message.alert;
    console.log('vgrtest onMessage objectAlert: ', objectAlert);

    /* let stringAlert = JSON.stringify(objectAlert);
    console.log('vgrtest onMessage stringAlert: ', stringAlert); */

    // Send POST request to local HTTP server
    (async () => {
      const rawResponse = await fetch('http://127.0.0.1:8001/bot', {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(objectAlert)
      });
      const content = await rawResponse.json();
      console.log(content);
    }).then((returnedResponse) => {
      // do nothing
    }).catch((error) => {
     // Your error is here!
     console.log('Error while sending POST request: ' + error);
    });
  }
});