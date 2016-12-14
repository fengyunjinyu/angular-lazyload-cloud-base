/**
 * 模块定义
 * 以及模块使用的加载方式
 */

var defaultModule = angular.module('default.module',['oc.lazyLoad']);
defaultModule.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        defaultModule.controller = $controllerProvider.register;
        defaultModule.directive = $compileProvider.directive;
        defaultModule.filter = $filterProvider.register;
        defaultModule.factory = $provide.factory;
        defaultModule.service = $provide.service;
        defaultModule.constant = $provide.constant;
    }]);


defaultModule.constant('Modules_Config', [
    {
        name: 'treeControl',
        serie: true,
        files: [
            "Scripts/angular-bootstrap/ui-bootstrap-tpls-0.14.3.min.js"
        ]
    }
]);


defaultModule.config(["$ocLazyLoadProvider","Modules_Config",routeFn]);
function routeFn($ocLazyLoadProvider,Modules_Config) {
    $ocLazyLoadProvider.config({
        debug: false,
        events: false,
        modules: Modules_Config
    });
}

/**
 * 定义路由
 */
defaultModule.config(['$stateProvider',
    '$urlRouterProvider',
    '$ocLazyLoadProvider',
    function($stateProvider,$urlRouteProvider , $ocLazyLoadProvider){

    $stateProvider.state('app.default' , {
        url:'/usdef',
        controller: 'DefaultCtrl', // This view will use AppCtrl loaded below in the resolve
        templateUrl: 'mods/default/view/default.html',
        /*
        views:{
            "lazyLoadView": {
                controller: 'DefaultCtrl', // This view will use AppCtrl loaded below in the resolve
                templateUrl: 'mods/default/view/default.html'
            }
        },
        */
        //controller:'DefaultCtrl',
        //templateUrl:'./mods/default/view/default.html',


        resolve:{
            deps:['$ocLazyLoad' , function($ocLazyLoad){
                return $ocLazyLoad.load('./mods/default/DefaultCtrl.js').then(function(){
                    console.log("doss");
                });

            }]
            ,
            loadMyService:['$ocLazyLoad' , function($ocLazyLoad){
                return $ocLazyLoad.load([
                    './mods/default/default.service.js',
                    './mods/default/default.store.js'
                ]);
            }]

        }


    }).state('app.default.list' , {
        url:'/list',
        templateUrl:'./mods/default/view/list.html',
        controller:'ListCtrl',
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('./mods/default/list.ctrl.js').then(function () {
                    console.log("doss");
                });

            }]
        }

    });



}]);

