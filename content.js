jQuery(function() {
  const extensionId = chrome.runtime.id;
  console.log(`vgrtest Loading script for extension ${extensionId}...`);

  // Select the target node (ol class scrollerInner)
  //let target = $('div[class*="chatContent"]').get(0);
  let target = $('#app-mount').get(0);
  console.log('vgrtest target: ', target);

  // Create an observer instance
  let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

      // Get message elements
      let messageElements = $('li[class*="messageListItem"]');

      // Get most recent message element
      let recentMessageElement = messageElements.get(messageElements.length - 1);
      console.log('vgrtest recentMessageElement: ', recentMessageElement);

      // Get alert from message element
      let messageText = $(recentMessageElement).find('div[id*="message-content"]');
      let strongElements = $(messageText).find('strong');

      let alert = {
        symbol: '',
        strike: '',
        side: '',
        date: '',
        quantityAndCost: ''
      };

      alert.symbol = strongElements.get(0).textContent;
      alert.strike = strongElements.get(1).textContent;
      alert.side = strongElements.get(2).textContent;
      alert.date = strongElements.get(3).textContent;
      alert.quantityAndCost = strongElements.get(4).textContent;

      /* $(strongElements).each(function(index) {
        console.log(index + ' : vgrtest - ' + $(this).text());
      });
      console.log('strongElements: ', strongElements); */

      console.log('vgrtest alert object: ', alert);

      let isNewAlert = $(messageText).find('span[class*="emojiContainer"]').find('img[alt=":OSwhite:"').length > 0;
      if (isNewAlert) {
        console.log('vgrtest isNewAlert');
        // TODO send new
      }

      console.log('vgrtest alert: ', messageText);

      // Send message to background.js if 
      //chrome.runtime.sendMessage(extensionId, {'message': newMessage}, function(response){});
    });
  });

  // Configuration of the observer
  let config = { attributes: true, subtree: true };

  // Pass in the target node, as well as the observer options
  observer.observe(target, config);
  
  //chrome.runtime.sendMessage(extensionId, 'vgrtest Hello test', function(response) {});
  
  console.log("vgrtest Script loaded...");

});