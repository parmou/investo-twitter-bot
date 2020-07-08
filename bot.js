var twit = require('twit')
var config = require('./config.js');

var twitter =  new twit(config);

var retweet_bot = function(){
  var params = {
    q: '#motivation, #selfhelp',
    result_type: 'recent',
    lang: 'en'
  }

  twitter.get('search/tweets', params, function(err, data){
    if(!err){
      var retweetId = data.statuses[0].id_str;
      console.log(retweetId);

      twitter.post('statuses/retweet/:id',{
        id: retweetId
      }, function(err, response){
        if(response){
          console.log("retweet done")
        }
        if(err){
          console.log("Bot messed retweet")
        }
      });
    }

    else{
      console.log("twitter bot lost search motivation itself");
    }
  })
}

// grab & retweet as soon as program is running...
//retweet_bot();
// retweet in every 50 minutes
//setInterval(retweet_bot, 3000000);



// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function(){
  var params = {
      q: '#motivation, #selfhelp', // REQUIRED
      result_type: 'recent',
      lang: 'en'
  }
  // find the tweet
  twitter.get('search/tweets', params, function(err,data){
    console.log(data)

    // find tweets
    var tweet = data.statuses;
    console.log(tweet)
    var randomTweet = ranDom(tweet);   // pick a random tweet
    console.log(randomTweet)

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log("Bot messed liked")
        }
        else{
          console.log("twitter bot lost search motivation itself for retweet");
        }
      });
    }
  });
}

// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 60 minutes
setInterval(favoriteTweet, 3600000);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};