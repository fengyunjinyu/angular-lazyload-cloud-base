/**
 * 表单处理模块
 */


var formModule= angular.module('com.module.forms',['oc.lazyLoad','formly', 'formlyBootstrap']);

/*
formModule.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        formModule.controller = $controllerProvider.register;
        formModule.directive = $compileProvider.directive;
        formModule.filter = $filterProvider.register;
        formModule.factory = $provide.factory;
        formModule.service = $provide.service;
        formModule.constant = $provide.constant;
    }]);

formModule.config(["$ocLazyLoadProvider","Modules_Config",routeFn]);
function routeFn($ocLazyLoadProvider,Modules_Config) {
    $ocLazyLoadProvider.config({
        debug: false,
        events: false,
        modules: Modules_Config
    });
}

/*
formModule.config(function(formlyConfigProvider){

    formlyConfigProvider.setType({
        name:'custom',
        templateUrl:'./mods/forms/views/custom.html'
    })
})

*/

/**
 * 定义路由
 */
formModule.config(['$stateProvider',
    '$urlRouterProvider',
    '$ocLazyLoadProvider',
    function($stateProvider,$urlRouteProvider , $ocLazyLoadProvider ){
        $stateProvider.state('app.forms' , {
            url:'/forms',
            //abstract:true,
            //controller: 'FormIndexCtrl', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'mods/forms/views/index.html',
            controller: 'FormIndexCtrl'
            /*
            resolve:{
                deps:['$ocLazyLoad' , function($ocLazyLoad){
                    return $ocLazyLoad.load('./mods/forms/controllers/index.ctrl.js');
                }]

                ,
                loadMyService:['$ocLazyLoad' , function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        './mods/default/default.service.js',
                        './mods/default/default.store.js'
                    ]);
                }]

            }
            */
        }).state("app.forms.license",{
            url:'',
            templateUrl:'mods/forms/views/license.html',
            controllerAs:'ctrl',
            controller: function ($scope) {
                $scope.title = "声明";
                $scope.description = "使用angular-formly可以很容易的实现" +
                    "form表单的创建,大大压缩表单元素的使用量";

            }
        }).state("app.forms.user",{
            url:'/user',
            templateUrl:'mods/forms/views/base.html',
            controller:function($scope){
                var vm = this;
                $scope.title = "创建一个用户";
                $scope.vm = vm;
                vm.rentalFields=[
                    {
                        key:'first_name',
                        type:'input',
                        templateOptions:{
                            type:'text',
                            label:'姓',
                            placeholder: '输入姓',
                            required: true
                        }
                    },
                    {
                        key:'last_name',
                        type:'input',
                        templateOptions:{
                            type:'text',
                            label:'名',
                            placeholder:'输入名',
                            required:true
                        }
                    },
                    {
                        key:'email',
                        type:'input',
                        templateOptions:{
                            type:'email',
                            label:'邮箱',
                            placeholder:'输入邮箱',
                            required:true
                        }
                    },
                    {
                        key:'under18',
                        type:'checkbox',
                        templateOptions:{
                            label:'是否不满18岁'
                        },
                        hideExpression: '!model.email' //email验证失败之前不显示
                    },
                    {
                        key: 'province',
                        type:'select',
                        templateOptions:{
                            label:'选择省',
                            options: [{name:'sx',value:'1'}]
                        },
                        hideExpression: '!model.email'
                    }
                ]
            }
        }).state("app.forms.other" , {
            url:'/other',
            templateUrl:'mods/forms/views/base.html',
            controller:function($scope){
                $scope.title="更多组件";
                var vm = this;
                $scope.vm = vm;

                vm.rentalFields=[
                    {
                        key:'first_name',
                        type:'input',
                        templateOptions:{
                            type:'text',
                            label:'姓',
                            placeholder: '输入姓',
                            required: true
                        }
                    },
                    {
                        key:'last_name',
                        type:'input',
                        templateOptions:{
                            type:'text',
                            label:'名',
                            placeholder:'输入名',
                            required:true
                        }
                    },
                    {
                        key:'email',
                        type:'input',
                        templateOptions:{
                            type:'email',
                            label:'邮箱',
                            placeholder:'输入邮箱',
                            required:true
                        }
                    },
                    {
                        key:'under18',
                        type:'checkbox',
                        templateOptions:{
                            label:'是否不满18岁'
                        },
                        hideExpression: '!model.email' //email验证失败之前不显示
                    },
                    {
                        key: 'province',
                        type:'select',
                        templateOptions:{
                            label:'选择省',
                            options: [{name:'sx',value:'1'}]
                        },
                        hideExpression: '!model.email'
                    }
                ]

            }
        }).state("app.forms.config",{
            url:'',
            templateUrl:'mods/forms/views/base.html',
            controller:function( $scope ){
                $scope.title="完整配置项以及效果";

                var vm = this;
                $scope.vm = vm;
                vm.rentalFields=[
                    {
                        key:'first_name',
                        type:'input',
                        templateOptions:{
                            type:'text',
                            label:'姓',
                            placeholder: '输入姓',
                            required: true
                        }
                    },
                    {
                        key:'last_name',
                        type:'input',
                        templateOptions:{
                            type:'text',
                            label:'名',
                            placeholder:'输入名',
                            required:true
                        }
                    },
                    {
                        key:'email',
                        type:'input',
                        templateOptions:{
                            type:'email',
                            label:'邮箱',
                            placeholder:'输入邮箱',
                            required:true
                        }
                    },
                    {
                        key:'under18',
                        type:'checkbox',
                        templateOptions:{
                            label:'是否不满18岁'
                        },
                        hideExpression: '!model.email' //email验证失败之前不显示
                    },
                    {
                        key: 'province',
                        type:'select',
                        templateOptions:{
                            label:'选择省',
                            options: [{name:'sx',value:'1'}]
                        },
                        hideExpression: '!model.email'
                    }
                ]
            }
        })



    }]);


