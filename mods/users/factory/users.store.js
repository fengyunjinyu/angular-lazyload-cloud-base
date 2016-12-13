/**
 * users.store.js
 * 数据仓库地址
 * 用于ajax请求等
 */




app.factory("UserStore" ,function($resource ,$http){


    var url_base = "./api/users/";



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
})


