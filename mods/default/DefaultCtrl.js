/**
 * Created by zhangge on 16/12/13.
 */

defaultModule.controller("DefaultCtrl" , function($scope , DefaultService , DefaultStore){
    $scope.module_vars = "DefaultCtrl";
    $scope.dojo = function(){
        DefaultService.edit();
    };
    $scope.doget= function () {
        DefaultStore.getlist();
    }
});
