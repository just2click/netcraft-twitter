angular.module('NetCraftTwitter').config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/home'
		})

		.when('/home', {
			templateUrl: 'assets/templates/index.html',
			controller: 'TwitterController'
		})

		.when('/about', {
			templateUrl: 'assets/templates/about.html',
			controller: 'AboutController'
		})

		.when('/contact', {
			templateUrl: 'assets/templates/contact.html',
			controller: 'ContactController'
		});

});
