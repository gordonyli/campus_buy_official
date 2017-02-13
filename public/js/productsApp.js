angular.module("mainApp.productsApp", ['ngRoute'])
    .service("Products", function($http) {
        this.getProducts = function() {
            return $http.get("/api/products").
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding products.");
            });
        }
        this.createProduct = function(product) {
            return $http.post("/api/new/products", product).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error creating product.");
            });
        }
    })
    .controller("ProductsListController", function(products, $scope) {
        console.log(products.data);
        $scope.products = products.data;
    })
    .controller("NewProductController", function($scope, $location, Products) {
        console.log(Products);
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveProduct = function(product) {
            console.log(product);
            Products.createProduct(product).then(function(doc) {
                console.log("this right here" + doc);
                var productUrl = "/products/" + doc.data._id;
                $location.path(productUrl);
            }, function(response) {
                alert(response);
            });
        }
    });