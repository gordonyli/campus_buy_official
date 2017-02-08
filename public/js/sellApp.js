angular.module("mainApp.sellApp", ['ngRoute'])
    .service("Products", function($http) {
        this.createProduct = function(product) {
            return $http.post("/api/Sell/Products", product).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error creating product.");
            });
        }
    })
    .controller("NewProductController", function($scope, $location, Products) {
        console.log(Products);
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveProduct = function(product) {
            console.log(product);
            Products.createProduct(product).then(function(doc) {
                console.log(doc);
                $location.path("#/");
            }, function(response) {
                alert(response);
            });
        }
    });