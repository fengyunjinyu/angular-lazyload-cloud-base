/**
 * Created by zhangge on 16/12/13.
 */

defaultModule.controller("ListCtrl" , function($scope , DefaultService , DefaultStore){

    $scope.getmore= function () {
        DefaultStore.getlist();
    }

    $scope.getserv = function(){
        DefaultService.edit();
    }
});
