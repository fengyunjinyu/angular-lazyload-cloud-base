/**
 * 用户模块 进入
 */

/**
 * module defined
 */





/**
 * 延迟加载
 */
app.config([
    '$stateProvider',
    function( $stateProvider){
        $stateProvider.state('app.user' , {
            url:'/user',
            templateUrl:'./mods/users/views/base.html',
            controller:'UserCtrl',
            resolve:{
                loadMyCtrl:['$ocLazyLoad' , function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        './mods/users/services/users.services.js',
                        './mods/users/factory/users.store.js',
                        './mods/users/controllers/user.ctrl.js'
                    ]
                    ).then(function(){
                        console.log("dd");
                    })
                }]
            }

        }).state("app.user.lists" , {
            url:'/userlists',
            templateUrl:'./mods/users/views/list.html',
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
                loadMyCtrl:['$ocLazyLoad', function( $ocLazyLoad ){
                    return $ocLazyLoad.load([
                        //'./mods/users/factory/users.store.js',
                        './mods/users/services/users.services.js',
                        './mods/users/controllers/userinfo.ctrl.js'

                    ]);

                }]
            }
        })
    }
]);



