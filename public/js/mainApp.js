angular.module("mainApp", ['ngRoute', 'mainApp.contactsApp', 'mainApp.sellApp'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "../views/list.html",
                controller: "ListController",
                resolve: {
                    contacts: function(Contacts) {
                        return Contacts.getContacts();
                    }
                }
            })
            .when("/new/contact", {
                controller: "NewContactController",
                templateUrl: "../views/contact-form.html"
            })
            .when("/contacts/:contactId", {
                controller: "EditContactController",
                templateUrl: "../views/contact.html"
            })
            .when("/login", {
                controller: "NewContactController",
                templateUrl: "../views/login.html"
            })
            .when("/Sell", {
                templateUrl: "../views/sell-form.html",
                controller: "NewProductController",
                
            })
            .otherwise({
                redirectTo: "/"
            })
    });