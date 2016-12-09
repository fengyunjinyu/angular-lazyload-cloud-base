基于angular的项目开发架构探索

支持模块按需加载
将controller  service   resource  factory  模块分别独立
局部版本打包测试
版本tag标记打包


oc.lazyLoad模块按需加载

各个Controller模块、Directive模块、Server模块、template模板，其实这些都是一些 .js文件或者 .html文件 。

按需加载的场景:
路由加载

依赖加载

controller里动态加载

template包含加载

如何组织按需加载
分路由  按功能 打包成不同的单个或者多个controller directive server模块

/******/
angular声明模块,以及该模块需要的依赖模块
angular.module('mod_name', requires_mods);
requires——mods 字符串数组, 本模块需要依赖于这些模块,依赖需要在本模块加载之前由
注入器进行预加载


/**
   Angular 模块加载
 **/

 在模块的加载阶段, angularjs会在注册者提供呵配置的过程中对模块进行配置


