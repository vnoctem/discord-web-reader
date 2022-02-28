jQuery(function() {
  const extensionId = chrome.runtime.id;
  console.log(`vgrtest Loading script for extension ${extensionId}...`);

  // Select the target node (ol class scrollerInner)
  //let target = $('div[class*="chatContent"]').get(0);
  let target = $('#app-mount').get(0);
  console.log('vgrtest target: ', target);

  // TODO implement seenMessages
  var seenMessages = {};

  // Create an observer instance
  let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

      // Get message elements
      let messageElements = $('li[class*="messageListItem"]');

      // Get most recent message element
      let lastMessageElement = messageElements.get(messageElements.length - 1);
      //let lastMessageId = lastMessageElement.id;
      console.log('vgrtest recentMessageElement: ', lastMessageElement);
      //console.log('vgrtest lastMessageId: ', lastMessageId);

      // Get alert from message element
      let messageText = $(lastMessageElement).find('div[id*="message-content"]');
      console.log('vgrtest alert: ', messageText);

      let isNewAlert = $(messageText).find('span[class*="emojiContainer"]').find('img[alt=":OSwhite:"').length > 0;

      if (isNewAlert) {
        console.log('vgrtest isNewAlert!!!!');

        let strongElements = $(messageText).find('strong');

        let alert = {
          symbol: '',
          strike: '',
          side: '',
          date: '',
          quantityAndCost: ''
        };
  
        if (strongElements) {
          alert.symbol = strongElements.get(0).textContent;
          alert.strike = strongElements.get(1).textContent;
          alert.side = strongElements.get(2).textContent;
          alert.date = strongElements.get(3).textContent;
          alert.quantityAndCost = strongElements.get(4).textContent;
        }

        console.log('vgrtest alert object: ', alert);

        // TODO send new
        chrome.runtime.sendMessage(extensionId, {'alert': alert, 'type': 'from_content'}, function(response){});
      }
    });
  });

  // Configuration of the observer
  let config = { attributes: true, subtree: true };

  // Pass in the target node, as well as the observer options
  observer.observe(target, config);
  
  console.log("vgrtest Script loaded...");
});