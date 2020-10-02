var twit = require('twit')
var config = require('./config.js');

var twitter =  new twit(config);
var idsDone = [];
var count = 1;
var countIdRetweet = 1;
var idsDoneRetweet = [];

// parmas
// var definedParams = {
//   q: ids[Math.floor(Math.random()*ids.length)],
//   result_type: 'popular',
//   count: '3',
//   until: formatDate(),
//   lang: 'en',
//   include_entities: false
// }

var retweet_bot = function(){
  var ids = [
    '#failure', '#onetime', '#oneplus', '#courtroom',
    '#lawyer','#perfection','#gym','#swimming','#haryana','#delhi','#police','#forest',
    '#protein','#calisthenics','#heart','#funding','#warrenbuffet','#money','#jobless',
    '#poor','#entrepreneur','#rain','#cold','#coffee', '#vue'
    // '#SaturdayMorning', '#Beach', '#Politics', '#Government', '#Sympathy',
    // '#Sundays','#Fun','#Friends','#People','#Culture','#Love','#Family','#Passion',
    // '#Friends','#Football','#Recipie','#Cooking','#Education','#Success','#Motivation',
    // '#Money','#Investment','#Stocks','#Markets','#Economy', '#Pain'
  ];
  var hashtag = ids[Math.floor(Math.random()*ids.length)].toString();
  var params = {
    q: hashtag,
    result_type: 'mixed',
    count: 3,
    lang: 'en',
    until: formatDate()
  }
  twitter.get('search/tweets', params, function(err, data){
    if(!err){
      var tweet = data.statuses;
      if(tweet!= undefined && tweet.length > 0){
        var retweetId = tweet[0];
        twitter.post('statuses/retweet/:id',{
          id: retweetId
        }, function(err, response){
          if(response){
            console.log("Retweet done")
          }
          if(err){
            console.log("Bot messed retweet" + err)
          }
        });
      } else{
        console.log('retweet me issue hai' + tweet);
      }
    } else{
      console.log('retweet me issue hai' + err);
    }
  })
}

// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function(){
  var ids = [
    '#failure', '#onetime', '#oneplus', '#courtroom',
    '#lawyer','#perfection','#gym','#swimming','#haryana','#delhi','#police','#forest',
    '#protein','#calisthenics','#heart','#funding','#warrenbuffet','#money','#jobless',
    '#poor','#entrepreneur','#rain','#cold','#coffee', '#vue'
  ];
  var hashtag = ids[Math.floor(Math.random()*ids.length)].toString();
  var params = {
    q: hashtag,
    result_type: 'recent',
    count: 100,
    lang: 'en',
    until: formatDate()
  }
  console.log('Hashtag used for like' + params.q);
  // find the tweet
  twitter.get('search/tweets', params, function(err,data){
    var tweet = data.statuses;
    // find tweets
      if(tweet!= undefined && tweet.length > 0){
        var randomTweet;
        for(var i = 0; i< tweet.length; i++){
          if(!idsDone.includes(tweet[i].id)){
            randomTweet = tweet[i];
            break;
          }
        }
        // if random tweet exists
        if(typeof randomTweet != 'undefined'){
          // Tell TWITTER to 'favorite'
          twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
            // if there was an error while 'favorite'
            if(err){
              console.log("-------------------------Bot messed liked----- "+ randomTweet.id +"--------------" + err)
            }
            else{
              idsDone[count] = tweet.id;
              count = count + 1;
              console.log("------------------LIKE---DONE--------------" + idsDone + "-----");
            }
          });
        }
      } else {
        console.log('tweet me issue hai' + tweet);
      }
  });
}

// grab & 'favorite' as soon as program is running...
favoriteTweet();
// retweet_bot();
// 'favorite' a tweet in every 50 minutes
// setInterval(retweet_bot, 10000);
setInterval(favoriteTweet, 600000);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};

function formatDate() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}


// random pick
var ids = [
  '#SaturdayMorning', '#Beach', '#Politics', '#Government', '#Sympathy',
  '#Sundays','#Fun','#Friends','#People','#Culture','#Love','#Family','#Passion',
  '#Friends','#Football','#Recipie','#Cooking','#Education','#Success','#Motivation',
  '#Money','#Investment','#Stocks','#Markets','#Economy', '#Pain'
];