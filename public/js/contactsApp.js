angular.module("mainApp.contactsApp", ['ngRoute'])
    .service("Contacts", function($http) {
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
        // this.checkContact = function(contact) {
        //     return $http.post("/api/login", contact).
        //     then(function(response) {
        //         return response;
        //     }, function(response) {
        //         alert("Error logging in.");
        //     });
        // }
    })
    .controller("ListController", function(contacts, $scope) {
        console.log(contacts.data);
        $scope.contacts = contacts.data;
    })
    .controller("NewContactController", function($scope, $location, Contacts) {
        console.log(Contacts);
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveContact = function(contact) {
            console.log('form submitted');
            console.log(this.contact);
            Contacts.createContact(this.contact).then(function(doc) {
                console.log(doc);
                var contactUrl = "/contacts/" + doc.data._id;
                $location.path(contactUrl);
            }, function(response) {
                alert(response);
            });
        }

        // $scope.logIn = function(contact) {
        //     console.log(contact.email);
        //     Contacts.checkContact(contact);
        //     $location.path('#/');
        // }
    })

    .controller("EditContactController", function($scope, $routeParams, Contacts) {
        Contacts.getContact($routeParams.contactId).then(function(doc) {
            $scope.contact = doc.data;
        }, function(response) {
            alert(response);
        });

        $scope.tester = "hello";
        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.contactFormUrl = "../views/contact-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.saveContact = function(contact) {
            Contacts.editContact(contact);
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.deleteContact = function(contactId) {
            Contacts.deleteContact(contactId);
        }
    });