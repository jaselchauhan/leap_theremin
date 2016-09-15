angular.module('LeapTheremin')
  .controller('PrimaryController', function($scope){

    $scope.total = 0;

    setInterval(function(){

     

       if($scope.total < 100){
         $scope.total ++;
         
         $scope.xPos = handExport.palmPosition[0].toFixed(0);
         $scope.yPos = handExport.palmPosition[1].toFixed(0);
         $scope.zPos = handExport.palmPosition[2].toFixed(0);
         $scope.thumbPos = handExport.fingers[0].tipPosition[0].toFixed(0);
         $scope.indexPos = handExport.fingers[1].tipPosition[0].toFixed(0);

 
            // if(Math.abs($scope.thumbPos - $scope.indexPos)<40){
            //   console.log("FINGERS");
            // }

            // if(handExport.grabStrength > 0.9){
            //   console.log("hand is closed with rating of: ", handExport.grabStrength);
            // } else{
            //   console.log("hand is open with rating of: ", handExport.grabStrength);
            // }

            //change css properties with leap motion - change font size and make it auto update using angular like co-ords!
         

       } else{
         $scope.total = 0;
       }
      $scope.$apply();
      },100)


  });



  

 
  


