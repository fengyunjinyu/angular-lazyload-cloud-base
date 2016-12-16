/* global angular */
(function() {

    'use strict';

    var app = angular.module('formlyExample', ['formly', 'formlyBootstrap', 'ui.bootstrap']);

    app.run(function(formlyConfig) {

        /*
         ngModelAttrs stuff
         */

        var ngModelAttrs = {};

        function camelize(string) {
            string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
            // Ensure 1st char is always lowercase
            return string.replace(/^([A-Z])/, function(match, chr) {
                return chr ? chr.toLowerCase() : '';
            });
        }

        /*
         timepicker
         */

        ngModelAttrs = {};

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



    app.controller('MainCtrl', function MainCtrl(formlyVersion) {
        var vm = this;
        // funcation assignment
        vm.onSubmit = onSubmit;

        // variable assignment
        vm.author = { // optionally fill in your info below :-)
            name: 'Benjamin Orozco',
            url: 'https://github.com/benoror'
        };
        vm.exampleTitle = 'UI Bootstrap TimePicker'; // add this
        vm.env = {
            angularVersion: angular.version.full,
            formlyVersion: formlyVersion
        };

        vm.model = {};
        vm.options = {};

        vm.fields = [
            {
                key: 'time',
                type: 'timepicker',
                templateOptions: {
                    label: 'Time'
                }
            }
        ];

        vm.originalFields = angular.copy(vm.fields);

        // function definition
        function onSubmit() {
            vm.options.updateInitialValue();
            alert(JSON.stringify(vm.model), null, 2);
        }
    });

})();
