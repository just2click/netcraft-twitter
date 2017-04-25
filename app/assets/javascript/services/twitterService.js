angular.module('NetCraftTwitter').factory('twitterService', function($q) {

	var authorizationResult = false;

	return {
		initialize: function () {
    	//initialize OAuth.io with public key of the application
      OAuth.initialize('19gVB-kbrzsJWQs5o7Ha2LIeX4I', {cache:true});
      //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
      authorizationResult = OAuth.create('twitter');
		},

		isReady: function () {
			return authorizationResult;
		},
		connectTwitter: function () {
			var deferred = $q.defer();

			OAuth.popup('twitter', { cache: true }, function (error, result) {
				if (!error) {
					authorizationResult = result;
					deferred.resolve();
				} else {
					// Handle error TODO:
				}
			});

			return deferred.promise;
		},
		clearCache: function () {
			OAuth.clearCache('twitter');
			authorizationResult = false;
		},
		getTweets: function (username, page) {
			var deferred = $q.defer();
			var url='https://api.twitter.com/1.1/statuses/user_timeline.json?callback=?';
			url += '&screen_name=' + username + '&page=' + page +  '&count=5';
     	var promise = authorizationResult.get(url)
     		.done(function(data) {
					deferred.resolve(data);
      	})
      	.fail(function(err) {
        	deferred.reject(err);
        });

        return deferred.promise;
		},
		searchUsers: function (username) {
			if (username) {
				var deferred = $q.defer();
				var url = 'https://api.twitter.com/1.1/users/search.json';
				url += '?q=' + username + '&page=1&count=10';

				var promise = authorizationResult.get(url)
					.done(function (data) {
						deferred.resolve(data);
					})
					.fail(function (err) {
						deferred.reject(err);
					});

				//return the promise of the deferred object
      	return deferred.promise;
			}
		}
	};
});
