angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($http, $location, User, $timeout) {

	var app = this;

	this.regUser = function(regData) {
		app.errorMsg = false;

		User.create(app.regData).then(function(doc) {
			//console.log(doc);
	 		if(doc.data == "") {
				app.errorMsg = "Failed to register";
			} else {
				app.successMsg = "Registering...";
				$timeout(function() {
					$location.path('#/');
				}, 2000);
			}	
		});
	};
});	