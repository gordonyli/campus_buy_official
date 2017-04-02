//where all routing happens
angular.module("mainApp", ['ngRoute', 'mainApp.contactsApp','mainApp.productsApp'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "../views/list.html",
                controller: "SearchBarController",
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
