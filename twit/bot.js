// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function(st) {
    var params = {
        q: st,  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                	console.log(err)
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}

// grab & retweet as soon as program is running...
// retweet('#gt2rs, #porsche');
// retweet in every 50 minutes
// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function(st){
  var params = {
      q: st,  // REQUIRED
      result_type: 'recent',
      lang: 'en'
  }
  // find the tweet
  Twitter.get('search/tweets', params, function(err,waa)
  {

    // find tweets
    // console.log('waaaaaa')
    // console.log(waa)
    // console.log("end of waaa")
    var tweet = waa.statuses;
    // console.log(tweet)
    var randomTweet = ranDom(tweet);   // pick a random tweet by index
    // console.log("this is the user")
    // console.log(randomTweet.user)
    // console.log(randomTweet.user.id)


    // if random tweet exists
    if(typeof randomTweet != 'undefined')
    {
      // Tell TWITTER to 'favorite'
      // inputs are 
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response)
      					{
      						// definition of the function(err, response)
					        // if there was an error while 'favorite'
					        if(err){
					        	console.log(err)
					          console.log('CANNOT BE FAVORITE... Error');
					        }
					        else{
					        	console.log(randomTweet)
					          console.log('FAVORITED... Success!!!');
					        }
      					}
      			   );
    }
  });
}
// grab & 'favorite' as soon as program is running...
// HERE
// favoriteTweet('#gt2rs, #porsche');
// 'favorite' a tweet in every 60 minutes
// setInterval(favoriteTweet, 3600000);

//find trending topics
var findAvailableTrends = function(){
  // find the tweet
  Twitter.get('trends/available', function(err,data)
  {

    // find tweets

    // if random tweet exists
    if(err)
    {
    	console.log(err)
    }
    else{
    	console.log("these are the available trends")
    	place = ranDom(data)
    	woeid = 1
    	idx = -1
    	for(i=0; i<data.length; i++){
    		if(data[i].name == 'New York'){
    			idx = i
    		}
    	}
    	place = data[idx]
    	console.log(place)
    	console.log(place.woeid)
    	console.log("new york?")
    	console.log(data[idx].woeid)
    	console.log(data[idx])
    	var params = {
	      id: place.woeid  // REQUIRED
  		}
    	//find topics in this location
    	Twitter.get('trends/place', params, function(err, data)
    	{
    		console.log("returning from callback")
    		if(err){
    			console.log(err)
    		}
    		else{
    			console.log(data[0])
    		}

    	})

    }
  });
};

findAvailableTrends();

// function to generate a random item in list
function ranDom (list) {
	//return an entire tweet json with meta data
  var index = Math.floor(Math.random()*list.length);
  //randomly choose an index
  return list[index];
};