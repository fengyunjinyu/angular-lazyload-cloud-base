/**
 * directive  qalist
 * 请求获取更多相关问题
 * 涉及到分页 ajax请求 等
 */

/*
 *  response json

    {
        code:0,
        count:321,
        data:[
                  { "question": "q1" , "answer":'a1' },
                  { "question": "q2" , "answer":'a2' },
             ]
    }


 */

angular.module("com.module.core",[]).directive("ngQaList" , ['$http' , function( $http ){
    return {
        restrict:'EA',
        scope:{
            'aid':'='
        },
        templateUrl:'./mods/core/directives/ngQaList/qalist.html',
        link:function(scope,iElement ,iAttrs){
            //init data
            scope.data = [];

            scope.pageinfo = {
                count:0,
                perpage:5,
                pageindex:0,
                aid:scope.aid
            };
            function get_more_lists(){
                console.log("dorequest");
                $http
                    .get("./data/qa_list.json" , scope.pageinfo)
                    .success(function(response){
                        console.log(response);
                        scope.data = response.data;
                        scope.pageinfo.count = response.count;

                    })
                    .error(function(data){
                        console.log(data);
                    })
            }
            //get_more_lists();
            scope.$watch('data' , function (val) {
            });

            scope.nextPage = function(){
                scope.pageinfo.pageindex++;
                get_more_lists();
            };

            scope.prePage = function(){
                scope.pageinfo.pageindex--;
                get_more_lists();
            };

            //获取指定页面
            scope.getPage = function(x){
                scope.pageinfo.pageindex = x;
                get_more_lists();
            }
        }
    }
}]);
