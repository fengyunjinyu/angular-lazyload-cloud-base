/**
 * 用户个人信息控制器
 */

app.controller("UserInfoCtrl" , function($scope,UserService,UserStore ){

    $scope.desc = " scope vars ";

    $scope.get_user = function(){
        console.log("dojo")
        UserService.get_user();
    }

    $scope.get_info = function(){

        console.log(UserStore.info().$promise);
    }

});
