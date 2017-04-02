angular.module("cartApp", ['ngRoute'])
	.service("Cart", function($http, ngCartItem) {
		this.addItem = function(product) {
			var newCart = new ngCartItem(product._id, product.itemName, product.itemPrice);
			return $http.post("/api/new/cart", newCart).
			then(function(response){
				return response;
			}, function(response) {
				alert("Error adding product to the cart.");
			});
		};

		this.getCart = function() {
			return $http.get("/api/cart").
			then(function(response){
				return response;
			}, function(response) {
				alert("Error finding cart.");
			});
		};

		this.getTotalItems = function(items) {
			var count = 0;
			angular.forEach(items, function(cart) {
				count += 1;
			});
			return count;
		};

		this.totalCost = function(items) {
			var total = 0;
			angular.forEach(items, function(cart) {
				total += cart._price;
			});
			return +parseFloat(total).toFixed(2);
		}

		this.removeItemById = function(productId) {
			var url = "/api/cart/" + productId;
			return $http.delete(url).
			then(function(response){
				return response;
			}, function(response) {
				//alert("Error deleting product from cart.");
			});
		};
	})
	.controller("EditCartController", function($scope, Cart, $window, $location) {
		$scope.saveToCart = function(product) {
			Cart.addItem(product).then(function(doc) {
				var cartProductUrl = "/cart/" + doc.data._id;
				$location.path(cartProductUrl);
			}, function(response) {
				alert(response);
			});
		}

		$scope.deleteFromCart = function(productId) {
			Cart.removeItemById(productId);
			$window.location.reload();
		}
	})

	.controller("CartListController", function(cart, $scope, Cart, $window) {
		$scope.getItems = cart.data;
		$scope.totalItems = Cart.getTotalItems(cart.data);
		$scope.totalPrice = Cart.totalCost(cart.data);
	})

	.factory('ngCartItem', ['$rootScope', '$log', function($rootScope, $log) {

		var item = function(id, name, price) {
			this.setId(id);
			this.setName(name);
			this.setPrice(price);
		};

		item.prototype.setId = function(id) {
			if (id) {
				this._unique = id;
			} else {
				$log.error('An ID must be provided');
			}
		};

		item.prototype.getId = function() {
			return this._id;
		};

		item.prototype.setName = function(name) {
			if (name) {
				this._name = name;
			} else {
				$log.error('A name must be provided');
			}
		};

		item.prototype.getName = function() {
			return this._name;
		};

		item.prototype.setPrice = function(price) {
			var priceFloat = parseFloat(price);
			if (priceFloat) {
				if (priceFloat <= 0) {
					$log.error('A price must be over 0');
				} else {
					this._price = (priceFloat);
				}
			} else {
				$log.error('A price must be provided');
			}
		};

		item.prototype.getPrice = function() {
			return this._price;
		};

		item.prototype.toObject = function() {
			return {
				id: this.getId(),
				name: this.getName(),
				price: this.getPrice(),
			}
		};

		return item;
	}]);