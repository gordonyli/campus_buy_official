//where all routing happens
angular.module("mainApp", ['ngRoute', 'mainApp.contactsApp','mainApp.productsApp'])
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
            .when("/products", {
                templateUrl: "../views/productsList.html",
                controller: "ProductsListController",
                resolve: {
                    products: function(Products) {
                        return Products.getProducts();
                    }
                }
            })
            .when("/sell", {
                templateUrl: "../views/sell-form.html",
                controller: "NewProductController",
            })
            .otherwise({
                redirectTo: "/"
            })

        })
        .controller("SearchBarController", function($scope, $location) {
            //console.log(Products);
            $scope.search = function() {
            $location.path("#/products");
            }
        });