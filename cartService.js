app.factory('CartService', function($http) {
  
  var getProducts = function  () { 
       return $http.get('products.json');
  };
  
  
  return {
    $getProductsInCart : getProducts
  };
});