angular.module("mainApp.productsApp", ['ngRoute', 'authServices'])
    .service("Products", function($http) {
        this.search = "";

        this.setSearch = function(data) {
            this.search = data;
        }
        this.getSearch = function() {
            return this.search;
        }

        this.getProducts = function() {
            console.log("search: " + this.getSearch());
            var query = this.getSearch();
            return $http.get("/api/products").
            then(function(response) {
                for(var i = 0; i < response.data.length; i++) {
                    var curr = response.data[i].itemName;
                    curr = curr.toLowerCase();
                    query = query.toLowerCase();
                    var index = response.data.indexOf(response.data[i]);
                    if(!(curr.includes(query))) {
                        delete response.data[index];
                    }
                }
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
    .controller("ProductsListController", function(products, $scope, $filter, Products, $window, userInfo) {
        $scope.products = products.data;
        $scope.tester = "hi";
        $scope.colourIncludes = [];
        console.log($scope.products);
        $scope.userId = userInfo.getUserId();

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
    .controller("NewProductController", function($scope, $location, Products, userInfo) {
        console.log(Products);
        $scope.back = function() {
            $location.path("#/");
        }
        $scope.userId = userInfo.getUserId();

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
    })
    .controller("SearchBarController", function($scope, $routeParams, Products) {
        $scope.tester = "";
        $scope.submitIt = function() {
            Products.setSearch($scope.tester);
            console.log(Products.search);
        }
    });