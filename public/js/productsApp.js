angular.module("myApp.productsApp", ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    contacts: function(Contacts) {
                        return Contacts.getContacts();
                    }
                }
            })
            .when("/Products/product/:productId", {
                controller: "EditProductController",
                templateUrl: "product.html"
            })
            .when("/Products", {
                templateUrl: "product.html",
                controller: "ListControllerProducts",
                resolve: {
                    products: function(Products) {
                        console.log(Products);
                        return Products.getProducts();
                    }
                }
            })
            .when("/login", {
                controller: "NewContactController",
                templateUrl: "login.html"
            })
            .when("/new/product", {
                controller: "NewProductController",
                templateUrl: "product-form.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    }])
    .service("Products", function($http) {
        this.getProducts = function() {
            return $http.get("/products").
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding products.");
            });
        }
        this.createProduct = function(product) {
            return $http.post("/Products/products", product).
            then(function(response) {
                console.log(response);
                return response;
            }, function(response) {
                alert("Error creating product.");
            });
        }
        this.getProduct = function(productId) {
            var url = "/products/" + productId;
            return $http.get(url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding this products.");
            });
        }
        this.deleteProduct = function(productId) {
            var url = "/products/" + productId;
            return $http.delete(url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error deleting this product.");
                console.log(response);
            });
        }
    })
    .controller("ListController", function(contacts, $scope) {
        console.log(contacts.data);
        $scope.contacts = contacts.data;
    })
    .controller("ListControllerProducts", function(products, $scope) {
        console.log(products);
        $scope.products = products.data;
    })
    .controller("NewProductController", function($scope, $location, Products) {
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveProduct = function(product) {
            console.log(product);
            Products.createProduct(product).then(function(doc) {
                var productUrl = "#/Products/product/" + doc.data._id;
                $location.path(productUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    .controller("EditProductController", function($scope, $routeParams, Products) {
        Products.getProduct($routeParams.productId).then(function(doc) {
            $scope.product = doc.data;
        }, function(response) {
            alert(response);
        });

        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.productFormUrl = "product-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.productFormUrl = "";
        }

        $scope.saveProduct = function(product) {
            Products.editProduct(product);
            $scope.editMode = false;
            $scope.productFormUrl = "";
        }

        $scope.deleteProduct = function(productId) {
            Products.deleteProduct(productId);
        }
    });