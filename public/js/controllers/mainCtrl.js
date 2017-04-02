angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $location, $timeout, $rootScope) {
	var app = this;

	app.loadme = false;

	$rootScope.$on('$routeChangeStart', function() {

		if (Auth.isLoggedIn()) {
			app.isLoggedIn = true;
			Auth.getUser().then(function(data) {
				app.firstName = data.data.firstName;
				app.lastName = data.data.lastName;
				app.email = data.data.email;
				app.phone = data.data.phone;
				app.loadme = true;
			});
		} else {
			app.isLoggedIn = false;
			app.firstName = '';
			app.loadme = true;
		}
	});

	this.doLogin = function(loginData) {
		//console.log('form submitted');
		app.errorMsg = false;

		Auth.login(app.loginData).then(function(doc) {
			//console.log(doc);
			if(doc.data == null) {
				//console.log("failed to login");
				app.errorMsg = "Failed to log in";
			} else {
				app.successMsg = "Logging in...";
				$timeout(function() {
					$location.path('#/');
					app.loginData = '';
					app.successMsg = false;
				}, 2000);
				//console.log("logged in");
			}		
		});
	};

	this.logout = function() {
		Auth.logout();
		$location.path('/logout');
		$timeout(function() {
			$location.path('#/');
		}, 2000);

	};
});