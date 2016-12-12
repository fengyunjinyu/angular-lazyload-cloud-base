/**
 * User services
 * 操作方法服务
 */

angular.module("com.module.user").service("UserService" , function($state){
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

