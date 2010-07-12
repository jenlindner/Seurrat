var simple_pusher = require('simple_pusher');

var config = {
  appId:  '1234',
  key:    '0aafake61807key8fe70',
  secret: '789fake2ac7esecretd9'
};

var channel = "pdq-orders";
var eventName = "purhcase";
var data = { price: 53.80, postalCode: '98072' };

simple_pusher.trigger(config, channel, eventName, data);

// You can also pass in a callback as the 5th argument to get the request
simple_pusher.trigger(config, channel, eventName, data, function(request) {
  request.addListener('response', function(response) {
    // Inspect the response, or something...
  })
});