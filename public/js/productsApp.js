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
    })
    .controller("ProductsListController", function(products, $scope) {
        console.log(products.data);
        $scope.products = products.data;
    });