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
                var productUrl = "/products/" + doc.data._id;
                $location.path(productUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    .directive('onlyDigits', function () {
        return {
          require: 'ngModel',
          restrict: 'A',
          link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
              if (val) {
                var digits = val.replace(/[^0-9.]/g, '');

                if (digits.split('.').length > 2) {
                  digits = digits.substring(0, digits.length - 1);
                }
                if (digits.split('.')[1].length > 2) {
                    digits = digits.substring(0, digits.length -1);
                }

                if (digits !== val) {
                  ctrl.$setViewValue(digits);
                  ctrl.$render();
                }
                return parseFloat(digits);
              }
              return undefined;
            }            
            ctrl.$parsers.push(inputValue);
          }
        }
    });

    // this.createContact = function(contact) {
    //         return $http.post("/api/contacts", contact).
    //         then(function(response) {
    //             return response;
    //         }, function(response) {
    //             alert("Error creating contact.");
    //         });
    //     }
    // $scope.saveContact = function(contact) {
    //         console.log(contact);
    //         Contacts.createContact(contact).then(function(doc) {
    //             console.log(doc);
    //             var contactUrl = "/contacts/" + doc.data._id;
    //             $location.path(contactUrl);
    //         }, function(response) {
    //             alert(response);
    //         });
    //     }