defaultModule.factory("DefaultStore" ,function($resource ,$http){


    var url_base = "./api/users/";

    /*
     var factory = {};
     factory.multipy = function(){
     return 12;
     };
     factory.getlist = function(){

     $http.get(url_base+"/lists.json").success(function(data){
     console.log(data);
     })
     };
     factory.info = function(){
     $http.get(url_base+"info.json").success(function(data){
     console.log(data)
     })
     }
     return factory;
     */


    var baseUrl = "./api/users/";
    return $resource(
        './api/users/',
        {},
        {
            getlist:{
                method:'GET',
                url:baseUrl+'/lists.json',
                params:{},
                isArray:true,
                cache:false,
                responseType:'json'
            },
            info:{
                method:'GET',
                url:baseUrl+'/info.json'

            }
        }
    )
});