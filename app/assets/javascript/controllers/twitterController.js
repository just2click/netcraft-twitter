angular.module('NetCraftTwitter').controller('TwitterController', function ($scope, $q, $sce, twitterService) {
	$scope.users = [];
	$scope.tweets = [];
	$scope.primaryBtnProps = {
		type: false,				// false == show search true == show resluts and enable search
		text: 'search  '
	};

	$scope.connectedTwitter = false;
	$scope.searching = false;
	$scope.page = 0;
	$scope.selectedUser = null;

	twitterService.initialize();

	function parseTwitterDate(text) {
		return new Date(Date.parse(text.replace(/( +)/, ' UTC$1')));
	}

	function scrollToBottom() {
	  var userTweets    = $('#user-tweets');
	  userTweets.scrollTop(1E10);
	}

	function formatTweets (data) {
		for (var tweet of data) {
			var tweetDate = moment(parseTwitterDate(tweet.created_at)).format('DD/MM/YYYY');
			var tweetText = tweet.text
        .replace(/#(\S+)/g, '<a href="https://twitter.com/#!/%23$1">#$1</a>')
        .replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
					var username = u.replace("@","");
					return u.link("http://twitter.com/"+username);
				})
        .replace(/(>|<a[^<>]+href=['"])?(https?:\/\/([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.,]*[^ !#?().,])?)/gi,
        	function($0, $1, $2) {
            	return ($1 ? $0 : '<a href="' + $2 + '" target="_blank">' + $2 + '</a>');
        	});

			$scope.tweets.push({
				formattedDate: tweetDate,
				text: tweetText
			});
		}
	}

	$scope.trustAsHtml = function (value) {
		return $sce.trustAsHtml(value);
	};

	$scope.getTweets = function (user, append, callback) {
		if ($scope.selectedUser === null || $scope.selectedUser.id !== user.id) {
			$scope.page = 1;
		}
		$scope.selectedUser = user;
		twitterService.getTweets(user.screen_name, $scope.page)
			.then(function (data) {
				if (!append) { $scope.tweets = []; }
				formatTweets(data);
				if (callback) { callback(); }
			}, function () {
				$scope.err = true;
			});
	};

	$scope.loadMoreTweets = function() {
		$scope.page++;
		$scope.getTweets($scope.selectedUser, true, scrollToBottom);
	};

	$scope.searchUsers = function() {
		if (!$scope.connectedTwitter) { return; }
		$scope.searching = true;
		$scope.tweets = [];
		$scope.page = 0;
		var term = $scope.searchTerm.toString().trim();
		if (term.length > 0) {
			twitterService.searchUsers(term)
				.then(function (data) {
					$scope.searching = false;
					$scope.users = data;
				}, function () {
					$scope.searching = false;
					$scope.err = true;
				});
		} else {
			$scope.searching = false;
			$scope.users = [];
		}
	};

	$scope.toggleSearchUI = function () {
		$scope.primaryBtnProps.text = ($scope.primaryBtnProps.type ? 'search  ' : 'resluts');
		if ($scope.primaryBtnProps.type) {
			$('#columns').fadeOut();
		} else {
			$('#columns').fadeIn();
		}
		$scope.primaryBtnProps.type = !$scope.primaryBtnProps.type;
	};

	$scope.connectButton = function () {
		twitterService.connectTwitter()
			.then(function () {
				if (twitterService.isReady()) {
					$('#connectButton').fadeOut(function () {
						$('#signOut').fadeIn();
						$('#searchBox').fadeIn();
						$('#searchButton').fadeIn();
						$scope.users = [];
						$scope.tweets = [];
						$scope.connectedTwitter = true;
					});
				}
			});
	};

	$scope.signOut = function () {
		twitterService.clearCache();
		$scope.users.length = 0;
		$('#signOut').fadeOut(function () {
			$('#searchBox').fadeOut();
			$('#searchButton').fadeOut();
			$('#connectButton').fadeIn();
			$scope.$apply(function () {
				$scope.users = [];
				$scope.tweets = [];
				$scope.page = 0;
				$scope.connectedTwitter = false;
			});
		});
		$scope.err = false;
	};

	// If this is a returning user don't show the connect button
	if (twitterService.isReady()) {
		$('#connectButton').hide();
		$('#searchBox').show();
		$('#searchButton').show();
		$('#signOut').show();

		$scope.connectedTwitter = true;
	}
});
