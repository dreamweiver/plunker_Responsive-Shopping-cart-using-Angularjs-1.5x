app.controller('CartCtrl', function($scope,CartService) {
  var noOfProducts =0;
  var priceQtyArr =[];
  
  $scope.prods=[];
  $scope.code="";
  $scope.totalItems =0;
  $scope.subTotal = 0;
  $scope.estTotal = 0;
  $scope.discount = 0;
  
  $scope.reCalculate =function (newQty, index) {
    var priceQtyObj = priceQtyArr[index];
    var prevQty = priceQtyObj.qty;
    var prevTProdPrice = priceQtyObj.price * prevQty;
    var incOrDecQty =0;
    var incOrDecPrice = 0;
    var newTProdPrice = priceQtyObj.price * newQty;
    priceQtyArr[index].qty = newQty;
    incOrDecQty = newQty - prevQty;
    incOrDecPrice = newTProdPrice - prevTProdPrice;  
    
    $scope.totalItems += incOrDecQty; //update total items on qty change
    $scope.subTotal += incOrDecPrice; //updated subtotal on qty change
    $scope.estTotal = $scope.subTotal - $scope.discount ;
  };
  
  $scope.applyCode = function (code) {

      var disc = 0;
      if(code === "magic3"){
        if($scope.totalItems < 3){
          disc = 0;
        }
        else if ($scope.totalItems === 3){
          disc = $scope.subTotal * 0.05;
        }
        else if ($scope.totalItems > 3 && $scope.totalItems <= 6){
          disc = $scope.subTotal * 0.10;
        }else if($scope.totalItems > 10){
          disc = $scope.subTotal * 0.25;
        }
      }
      
      $scope.discount = disc;
      $scope.estTotal = $scope.subTotal - $scope.discount ;
  };
  
  
  function updateTotal (){
    for(var i=0;i<noOfProducts;i++){
        var q = parseInt($scope.prods[i].p_quantity,10);
        var p = parseInt($scope.prods[i].p_price,10);
        $scope.subTotal += p;
  
        var obj = {
          'qty' : q,
          'price': p
        };
        priceQtyArr.push(obj);
        $scope.totalItems += q;
    }
    $scope.estTotal = $scope.subTotal - $scope.discount ;
  }
  
  //fetch the products & its details
  CartService.$getProductsInCart().
      then(function (response){
           //angular.copy(response.data.productsIncart, $scope.prods);
           $scope.prods = response.data.productsInCart;
           noOfProducts = $scope.prods.length;
           updateTotal();
      });
});