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
        this.deleteProduct = function(productId) {
            var url = "/api/products/" + productId;
            return $http.delete(url).
            then(function(response) {
                return response;
            }, function(response) {
                //alert("Error deleting this product.");
                console.log(response);
            });
        }
    })
    .controller("ProductsListController", function(products, $scope, $filter, Products, $window) {
        $scope.products = products.data;
        $scope.colourIncludes = [];
        console.log($scope.products);

        $scope.includeColour = function(colour) {
            var i = $.inArray(colour, $scope.colourIncludes);
            if (i > -1) {
                $scope.colourIncludes.splice(i, 1);
            } else {
                $scope.colourIncludes.push(colour);
            }
        }
        $scope.colourFilter = function(fruit) {
            if ($scope.colourIncludes.length > 0) {
                if ($.inArray(fruit.itemCondition, $scope.colourIncludes) < 0)
                    return;
            }

            return fruit;
        }
        $scope.check = function(productID) {
            console.log(productID);
        }
        $scope.deleteProduct = function(productId) {
            Products.deleteProduct(productId);
            $window.location.reload();
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