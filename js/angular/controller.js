angular.module('LeapTheremin')
  .controller('PrimaryController', function($scope){

    $scope.total = 0;
    

    setInterval(function(){
       if($scope.total < 100){
         $scope.total ++;
         // console.log($scope.total);
         $scope.xPos = xPos.toFixed(0);
         $scope.yPos = yPos.toFixed(0);
         $scope.zPos = zPos.toFixed(0);
       } else{
         $scope.total = 0;
       }
      $scope.$apply();
      },100)

  });



  

 
  


