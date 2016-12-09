oc.lazyLoad模块按需加载
各个Controller模块、Directive模块、Server模块、template模板，其实这些都是一些 .js文件或者 .html文件 。
按需加载的场景:
路由加载

依赖加载

controller里动态加载
template包含加载
如何组织按需加载
分路由  按功能 打包成不同的单个或者多个controller directive server模块

1 路由加载(resolve/uiRouter)

基于uiRouter的resolve是在加载controller和template之前所执行的一系列操作，
它帮助我们初始化我们所要前往的那一个视图。只有be solved(操作完成)，controller才会被实例化。
因此，我们可以在resolve步骤里面加载我们所需要的controller。


lazymod模块中两个路由  userslist 和 userinfo
state: app.user.userslist
获取用户列表

state: app.user.userinfo
获取用户的详细信息
