/**
 * User services
 * 操作方法服务
 */


app.factory("UserStore" ,function($resource ,$http){


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

app.service("UserService" , function($state){
    this.edit = function(){
        console.log("edit now user");
    };
    this.get_user = function(){
        console.log("get now user");
    };
    this.get_user_list = function(){
        return [
            {name:'zg',id:10},
            {id:11 , name:'jam'},
            {id:12 , name:'smith'}
        ]
    }
});

