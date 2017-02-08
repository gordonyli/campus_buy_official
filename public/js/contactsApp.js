// angular.module("contactsApp")
//     // .service("Contacts", function($http) {
//     //     this.getContacts = function() {
//     //         return $http.get("/api/contacts").
//     //         then(function(response) {
//     //             return response;
//     //         }, function(response) {
//     //             alert("Error finding contacts.");
//     //         });
//     //     }
//     //     this.createContact = function(contact) {
//     //         return $http.post("/api/contacts", contact).
//     //         then(function(response) {
//     //             return response;
//     //         }, function(response) {
//     //             alert("Error creating contact.");
//     //         });
//     //     }
//     //     this.getContact = function(contactId) {
//     //         console.log(contactId);
//     //         var url = "/api/contact/" + contactId;
//     //         return $http.get(url).
//     //         then(function(response) {
//     //             return response;
//     //         }, function(response) {
//     //             console.log(response);
//     //             alert("Error finding this contact.");
//     //         });
//     //     }
//     //     this.editContact = function(contact) {
//     //         var url = "/api/contacts/" + contact._id;
//     //         console.log(contact._id);
//     //         return $http.put(url, contact).
//     //         then(function(response) {
//     //             return response;
//     //         }, function(response) {
//     //             alert("Error editing this contact.");
//     //             console.log(response);
//     //         });
//     //     }
//     //     this.deleteContact = function(contactId) {
//     //         var url = "/api/contacts/" + contactId;
//     //         return $http.delete(url).
//     //         then(function(response) {
//     //             return response;
//     //         }, function(response) {
//     //             alert("Error deleting this contact.");
//     //             console.log(response);
//     //         });
//     //     }
//     // })
//     .controller("ListController", function(contacts, $scope) {
//         console.log(contacts.data);
//         $scope.contacts = contacts.data;
//         $scope.test = "hello";
//     });
// Define the `phonecatApp` module
var phonecatApp = angular.module('phonecatApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('PhoneListController', function PhoneListController($scope) {
    $scope.phones = [
        {
            name: 'Nexus S',
            snippet: 'Fast just got faster with Nexus S.'
        }, {
            name: 'Motorola XOOM™ with Wi-Fi',
            snippet: 'The Next, Next Generation tablet.'
        }, {
            name: 'MOTOROLA XOOM™',
            snippet: 'The Next, Next Generation tablet.'
        }
    ];
    $scope.test = "hello";
    $scope.contacts = contacts.data;

});

phonecatApp.service("Contacts", function($http) {
        this.getContacts = function() {
            return $http.get("/api/contacts").
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding contacts.");
            });
        }
        this.createContact = function(contact) {
            return $http.post("/api/contacts", contact).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error creating contact.");
            });
        }
        this.getContact = function(contactId) {
            console.log(contactId);
            var url = "/api/contact/" + contactId;
            return $http.get(url).
            then(function(response) {
                return response;
            }, function(response) {
                console.log(response);
                alert("Error finding this contact.");
            });
        }
        this.editContact = function(contact) {
            var url = "/api/contacts/" + contact._id;
            console.log(contact._id);
            return $http.put(url, contact).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error editing this contact.");
                console.log(response);
            });
        }
        this.deleteContact = function(contactId) {
            var url = "/api/contacts/" + contactId;
            return $http.delete(url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error deleting this contact.");
                console.log(response);
            });
        }
    });