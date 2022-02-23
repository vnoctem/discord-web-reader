jQuery(function() {
  const extensionId = chrome.runtime.id;
  console.log(`vgrtest Loading script for extension ${extensionId}...`);

  // Select the target node (ol class scrollerInner)
  var target = $('div[class*="scrollerInner"]').get(0);
  console.log('vgrtest target: ', target);

  // Create an observer instance
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

      // Get the Twitter modal window replies count
      /* var loneTweetsCount = $('.PermalinkOverlay-body .ThreadedConversation--loneTweet .tweet').length
      var threadedTweetsCount = $('.PermalinkOverlay-body .ThreadedConversation .tweet').length
      var total = loneTweetsCount + threadedTweetsCount */
      let newMessage = $('li[class*="messageListItem"]');
      console.log('vgrtest newMessage: ', newMessage);

      // Send message to background.js
      chrome.runtime.sendMessage(extensionId, {'message': newMessage}, function(response){});
    });
  });

  // Configuration of the observer
  var config = { attributes:true, subtree: true };

  // Pass in the target node, as well as the observer options
  observer.observe(document, config);
  
  //chrome.runtime.sendMessage(extensionId, 'vgrtest Hello test', function(response) {});
  
  
  console.log("vgrtest Script loaded...");

});