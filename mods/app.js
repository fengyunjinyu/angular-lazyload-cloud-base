/**
 *  angular project 入口
 */
var app = angular.module('app' , [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngResource',
    'ui.router','oc.lazyLoad',

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


/*

 app.directive("ngQaList" , function($http){

 return {
 restrict:'EA',
 scope:{
 aid:'='
 },
 template:'<div>{{userd}}</div><p ng-click="changed()">CHange Val</p><li ng-repeat="item in list_qa">{{ item }}</li>',
 link:function(scope,iElement ,iAttrs){
 scope.userd="usa";
 scope.list_qa=[];

 scope.$watch('list_qa' , function(val){
 console.log("list_qa changed");
 });

 scope.changed = function(){
 scope.list_qa=['list1'];
 };
 setTimeout(function(){
 $http.get("./test.json").success(function(data){
 scope.list_qa=['sjjfjf','111','333'];
 console.log(data);
 }).error(function(data){
 console.log(data);
 scope.list_qa=['ahh' , 'kkskd'];
 })


 } , 4000);

 }
 }

 });

 */






/*


 //定义指令
 Lazy.directive("ngHello" , function($scope){
 return {
 template:'<div><h3>Hello world</h3></div>'

 }
 });

 Lazy.directive('ngDirective' , function(){
 return {
 restrict:'EA',
 scope:false,
 replace:true,
 template:'<p>Dojos</p>'
 }
 });

 //定义factory


 //定义service

 */
