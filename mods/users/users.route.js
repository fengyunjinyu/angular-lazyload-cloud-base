/**
 * 用户中心
 * 路由模块
 */

angular.module("com.module.user",[]).config(["$stateProvider" , function( $stateProvider ){
    $stateProvider.state('app.user' , {
        url:'/user',
        templateUrl:'./mods/users/views/base.html',
        controller:'UserCtrl',
        resolve:{
            loadMyCtrl:['$ocLazyLoad' , function($ocLazyLoad){
                return $ocLazyLoad.load(
                    './mods/users/services/users.services.js',

                    './mods/users/controllers/user.ctrl.js'

                )
            }]
        }

    }).state("app.user.lists" , {
        url:'/userlists',
        templateUrl:'./mods/users/views/list.html',
        controller:'UserListCtrl',

        resolve:{
            loadMyCtrl:['$ocLazyLoad' , function( $ocLazyLoad ){
                return $ocLazyLoad.load('./mods/users/controllers/userlist.ctrl.js');

            }]
        }
    }).state("app.user.info" , {
        url:'/userinfo',
        templateUrl:'./mods/users/views/info.html',
        controller:'UserInfoCtrl',
        resolve:{
            loadMyCtrl:['$ocLazyLoad' , function( $ocLazyLoad ){
                return $ocLazyLoad.load(
                    './mods/users/controllers/userinfo.ctrl.js'
                );

            }]
        }
    })

}]);


