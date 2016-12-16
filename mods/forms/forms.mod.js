/**
 * 表单处理模块
 */


var formModule= angular.module('com.module.forms',['formly','formlyBootstrap','ui.bootstrap']);
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

formModule.run(function(formlyConfig) {
    var attributes = [
        'date-disabled',
        'custom-class',
        'show-weeks',
        'starting-day',
        'init-date',
        'min-mode',
        'max-mode',
        'format-day',
        'format-month',
        'format-year',
        'format-day-header',
        'format-day-title',
        'format-month-title',
        'year-range',
        'shortcut-propagation',
        'datepicker-popup',
        'show-button-bar',
        'current-text',
        'clear-text',
        'close-text',
        'close-on-date-selection',
        'datepicker-append-to-body'
    ];

    var bindings = [
        'datepicker-mode',
        'min-date',
        'max-date'
    ];

    var ngModelAttrs = {};

    formlyConfig.setType({
        name: 'timepicker',
        template: '<timepicker ng-model="model[options.key]"></timepicker>',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        defaultOptions: {
            ngModelAttrs: ngModelAttrs,
            templateOptions: {
                datepickerOptions: {}
            }
        }
    });

    /*
    formlyConfig.setType({
        name: 'datepicker',
        templateUrl: 'uib/template/datepicker/datepicker.html',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        defaultOptions: {
            ngModelAttrs: ngModelAttrs,
            templateOptions: {
                datepickerOptions: {
                    format: 'MM.dd.yyyy',
                    initDate: new Date()
                }
            }
        },
        controller: ['$scope', function ($scope) {
            $scope.datepicker = {};
            $scope.datepicker.opened = false;
            $scope.datepicker.open = function ($event) {
                $scope.datepicker.opened = !$scope.datepicker.opened;
            };
        }]
    });

    */
    function camelize(string) {
        string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
            return chr ? chr.toUpperCase() : '';
        });
        // Ensure 1st char is always lowercase
        return string.replace(/^([A-Z])/, function (match, chr) {
            return chr ? chr.toLowerCase() : '';
        });
    }

    ngModelAttrs = {};


    angular.forEach(attributes, function(attr) {
        ngModelAttrs[camelize(attr)] = {attribute: attr};
    });

    angular.forEach(bindings, function(binding) {
        ngModelAttrs[camelize(binding)] = {bound: binding};
    });

    formlyConfig.setType({
        name: 'datepicker',
        templateUrl:'./mods/forms/views/elements/datepicker.html',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        defaultOptions: {
            ngModelAttrs: ngModelAttrs,
            templateOptions: {
                datepickerOptions: {
                    format: 'MM.dd.yyyy',
                    initDate: new Date()
                }
            }
        },
        controller: ['$scope', function ($scope) {
            $scope.datepicker = {};

            $scope.datepicker.opened = false;

            $scope.datepicker.open = function ($event) {
                $scope.datepicker.opened = !$scope.datepicker.opened;
            };
        }]
    });


    // attributes
    angular.forEach([
        'meridians',
        'readonly-input',
        'mousewheel',
        'arrowkeys'
    ], function(attr) {
        ngModelAttrs[camelize(attr)] = {attribute: attr};
    });

    // bindings
    angular.forEach([
        'hour-step',
        'minute-step',
        'show-meridian'
    ], function(binding) {
        ngModelAttrs[camelize(binding)] = {bound: binding};
    });

    formlyConfig.setType({
        name: 'timepicker',
        template: '<timepicker ng-model="model[options.key]"></timepicker>',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        defaultOptions: {
            ngModelAttrs: ngModelAttrs,
            templateOptions: {
                datepickerOptions: {}
            }
        }
    });
});

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
                            label:'姓名',
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
            url:'/config',
            templateUrl:'mods/forms/views/base.html',
            controller:function( $scope ){
                $scope.title="完整配置项以及效果";

                var vm = this;
                $scope.vm = vm;


                vm.model= {};
                vm.rentalFields = [
                    {
                        key: 'email',
                        type: 'input',
                        templateOptions: {
                            type: 'email',
                            label: 'Email address',
                            placeholder: 'Enter email',
                            required:true
                        }
                    },
                    {
                        key: 'password',
                        type: 'input',
                        templateOptions: {
                            type: 'password',
                            label: 'Password',
                            placeholder: 'Password',
                            required:true
                        },
                        "expressionProperties":{
                            "templateOptions.disabled": "!model.email"
                        }
                    },
                    /*
                    {
                        key: 'file',
                        type: 'file',
                        templateOptions: {
                            label: 'File input',
                            description: 'Example block-level help text here',
                            url: 'https://example.com/upload'
                        }
                    },

                    */
                    {
                        key: 'checked',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'Check me out'
                        }
                    },
                    {
                        "key": "ipAddress",
                        "type": "input",
                        "templateOptions": {
                            "label": "IP Address",
                            "placeholder": "127.0.0.1"
                        },
                        "hideExpression": "!model.knowIpAddress",
                        "validators": {
                            "ipAddress": {
                                "message": "$viewValue + \" is not a valid IP Address\""
                            }
                        }
                    },
                    {
                        key: 'marvel2',
                        type: 'select',
                        defaultValue: 'milky_way',
                        templateOptions: {
                            label: 'Favorite Candy (initialized via default value',
                            options: [
                                {name: 'Snickers', value: 'snickers'},
                                {name: 'Baby Ruth', value: 'baby_ruth'},
                                {name: 'Milky Way', value: 'milky_way'}
                            ]
                        }
                    },
                    {
                        key: 'marvel2',
                        type: 'select',
                        templateOptions: {
                            label: '分组下啦选择',
                            options: [
                                {name: 'Iron Man', value: 'iron_man', group: 'Male'},
                                {name: 'Captain America', value: 'captain_america', group: 'Male'},
                                {name: 'Black Widow', value: 'black_widow', group: 'Female'},
                                {name: 'Hulk', value: 'hulk', group: 'Male'},
                                {name: 'Captain Marvel', value: 'captain_marvel', group: 'Female'}
                            ]
                        }
                    },
                    {
                        key: 'time',
                        type: 'timepicker',
                        templateOptions: {
                            label: '时间选择'
                        }
                    },
                    {
                        key: 'date1',
                        type: 'datepicker',
                        templateOptions: {
                            label: '日期选择',
                            type: 'text',
                            datepickerPopup: 'dd-MMMM-yyyy'
                        }
                    },

                ];

                $scope.dt = new Date();

                $scope.options = {
                    customClass: '',
                    minDate: new Date(),
                    showWeeks: true
                };

                vm.originalFields = angular.copy(vm.fields);

                // function definition
                function onSubmit() {
                    vm.options.updateInitialValue();
                    alert(JSON.stringify(vm.model), null, 2);
                }

            }
        })



    }]);


