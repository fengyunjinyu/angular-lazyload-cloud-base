/**
 *  angular project 入口
 */
var app = angular.module('app' , [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngResource',
    'ui.router',
    'oc.lazyLoad',
    'default.module',
    'formly',
    'formlyBootstrap',
    'com.module.forms',
    'ui.bootstrap'

]);

app.config(["$provide", "$compileProvider", "$controllerProvider",
    "$filterProvider" , function($provider , $compileProvider , $controllerProvider , $filterProvoder){

        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvoder.register;
        app.factory = $provider.factory;
        app.constant = $provider.constant;
    }]);

app.constant('Modules_Config', [
    {
        name: 'treeControl',
        serie: true,
        files: []
    }
]);
app.config(["$ocLazyLoadProvider","Modules_Config",routeFn]);
function routeFn($ocLazyLoadProvider,Modules_Config){
    console.log(Modules_Config);
    $ocLazyLoadProvider.config({
        debug:false,
        events:false,
        modules:Modules_Config
    });
}
app.config(["$stateProvider","$urlRouterProvider",function($stateProvider , $urlRouterProvider){
    $stateProvider.state('router' ,{
        url:'/router',
        template:"<div>Router Error</div>"
    }).state('app',{
        url:'/app',
        abstract:true,
        controllerAs:'ctrl',
        templateUrl:'./mods/core/views/layout.html',
        controller:function($scope){
            $scope.username="zhangge";
            $scope.email="12@qq.com";

        }
    }).state("app.home",{
        url:'',
        controllerAs:'ctrl',
        templateUrl:'./mods/core/views/home.html',
        controller:function( $scope ){}
    }).state("app.lazymod" ,{
        url:'/lazymod',
        /*
         templateUrl:'./mods/lazymod/views/index.html',
         controller:'LazymodCtrl',
         */
        templateUrl:'./mods/lazymod/views/index.html',
        controller:'LazymodCtrl',
        resolve:{
            deps:['$ocLazyLoad' , function($ocLazyLoad){
                return $ocLazyLoad.load("./mods/lazymod/controllers/lazymod.ctrl.js");
            }]
        }
    });

    $urlRouterProvider.otherwise('/router');
}]);


app.controller("LayoutCtrl" , function($scope){
});
