
//where all routing happens
angular.module("mainApp", ['ngRoute', 'mainApp.contactsApp','mainApp.productsApp', 'cartApp', 'userControllers', 'userServices', 'mainController', 'authServices'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "../views/list.html",
                controller: "SearchBarController"
            })
            .when("/register", {
                // controller: "NewContactController",
                // templateUrl: "../views/contact-form.html"
                templateUrl: "../views/newRegister.html",
                controller: 'regCtrl',
                controllerAs: 'register'
            })
            // .when("/contacts/:contactId", {
            //     controller: "EditContactController",
            //     templateUrl: "../views/contact.html"
            // })
            .when("/profile", {
                templateUrl: "../views/newProfile.html"
            })
            .when("/login", {
                templateUrl: "../views/newLogin.html"
                // controller: "NewContactController",
                // templateUrl: "../views/login.html"
            })
            .when("/logout", {
                templateUrl: "../views/newLogout.html"
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
                controller: "NewProductController"
            })
            .when("/cart", {
                templateUrl: "../views/cart.html",
                controller: "CartListController",
                resolve: {
                    cart: function(Cart) {
                        return Cart.getCart();
                    }
                }
            })
            .when("/mymarket", {
                templateUrl: "../views/mymarket.html",
                controller: "ProductsListController",
                resolve: {
                    products: function(Products) {
                        return Products.getProducts();
                    }
                }
            })
            .otherwise({
                redirectTo: "/"
            })

        })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    })
