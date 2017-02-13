angular.module("mainApp.sellApp", ['ngRoute'])
    .service("Products", function($http) {
        this.createProduct = function(product) {
            return $http.post("/api/new/products", product).
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
                console.log("this right here" + doc);
                var productUrl = "/products/" + doc.data._id;
                $location.path(productUrl);
            }, function(response) {
                alert(response);
            });
        }
    });
    