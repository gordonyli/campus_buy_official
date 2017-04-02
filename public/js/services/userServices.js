angular.module('userServices', [])

.factory('User', function($http) {
	userFactory = {};



	userFactory.create = function(regData) {
		return $http.post('/api/users', regData).
		then(function(response) {
            return response;
        }, function(response) {
            alert("Error registering.");
        });
	}

	return userFactory;
});