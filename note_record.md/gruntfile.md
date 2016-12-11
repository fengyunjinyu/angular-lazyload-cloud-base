使用grunt打包

cmd：
1 grunt modulename  对当前模块进行打包
2 watch检测  当css发生变化时 生成新的压缩文件

模块打包分类
一个模块拥有
1个route.config.js
1个provider.js
n个controller
n个directive
n个service

合并后

1个route.config.js
一个provier.js
一个controller
一个directive
一个service


模块入口 index.html
打包后 模块内的资源就会引入当前资源压缩后的文件




