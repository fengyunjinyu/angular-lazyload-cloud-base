/**
 * grunt 项目打包机
 */
module.exports = function(grunt){

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
        /**
         * 指定合并目录
         */
        dirs:{
            modulename:'',
            dest:'<%= pkg.name %>'
        },
        uglify:{
            options:{
                banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build:{
                src:'build/script/*.js',
                dest:'build/scripts/'
            },
            buildall:{
                files:[{
                    expand:true,
                    cwd:'grunttest/',
                    src:'mods/*.js',
                    dest:'build/js'
                }]
            }
        },

        /**  js 合并  */
        concat:{
            options:{
                seprator:';',
                stripBanners:true,
                banner:'/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist:{
                src:'dist/*.js',
                dest:'build/script/dist.js'
            },
            build:{
                src:'mods/**/*.js',
                dest:'build/script/vendor.js'

            },
            //按模块打包
            concat_module:{
                src:'mods/<%= dirs.modulename %>/{,*/}*.js',
                dest:'build/<%= dirs.modulename %>.js'

            },
            //打包所有文件
            concat_all:{
                src:'mods/{,*/}{,*/}{,*/}*.js',
                dest:'build/all.js'
            }
        },
        jasmine_node:{
            options:{
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'spec'
            },
            all:['spec/']
        },
        htmlmin:{
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    minifyJS: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'mods',
                        src: [
                            '**/views/{,*/}*.html'
                        ],
                        dest: 'build/'
                    }
                ]
            }
        },
        includeSource:{
            options:{
                basePath:'./',
                baseUrl:'/',
                templates:{
                    html:{
                        js:'<script src="{filePath}"></script>',
                        css: '<link rel="stylesheet" href="{filePath}" />'
                    }
                }
            },
            server:{
                files:{
                    'index.html': 'index.tpl.html'
                }
            },
            dist:{
                files: {
                    'build/index.html': 'index.tpl.html'
                }
            }

        },
        // Automatically inject Bower components into the app
        wiredep:{
            server:{
                src:'index.html',
                ignorePath:/\.\.\//
            },
            dist:{
                src:'dist/index.html',
                ignorePath:'/\.\.\//'
            }
        },
        useminPrepare:{
            html:'build/index.html',
            options:{
                dest:"build",
                root:'',
                flow:{
                    steps:{
                        js:['concat' , 'uglifyjs'],
                        css:['cssmin']
                    },
                    post:{}
                }
            }
        },
        usemin:{
            html:['build/{,*/}*.html'],
            css:['build/styles/{,*/}*.css'],
            options: {
                assetsDirs: [
                    'build',
                    'build/images'
                ]
            }
        },
        //资源文件后缀名增加八位md5加密字符串
        filerev:{
            options: {
                algorithm: 'md5',
                length: 8
            },
            dist:{
                src:[
                    'build/script{,*/}*.js',
                    'build/styles/{,*/}*.css',
                    'build/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    'build/fonts/*'
                ]
            }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'build/{,*/}*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        }
    });


    /**
     * 加载任务驱动模块
     */
    grunt.loadNpmTasks("grunt-contrib-uglify");
    //文件合并
    grunt.loadNpmTasks("grunt-contrib-concat");
    //html压缩
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-wiredep");
    //文件内部资源文件压缩
    grunt.loadNpmTasks("grunt-include-source");
    //文件打版本号
    grunt.loadNpmTasks("grunt-usemin");
    //
    grunt.loadNpmTasks("grunt-filerev");
    /** 目录清理 */
    grunt.loadNpmTasks("grunt-contrib-clean");
    /** 代码单元测试 */
    grunt.loadNpmTasks("grunt-jasmine-code");

    /* less语法解析*/
    grunt.loadNpmTasks("grunt-contrib-less");

    /**
     * 定义任务
     */

    grunt.registerTask('default',['uglify:buildall','concat']);

    //grunt.registerTask("build" ,['uglify:build']);
    grunt.registerTask("test" , ['htmlmin']);

    grunt.registerTask("mytask" , '' , function(arg1 , arg2){
        if(arg1){
            grunt.config.data.dirs.modulename = arg1;
            grunt.task.run("concat:concat_module")
        }else{
            grunt.task.run("concat:concat_all");
        }
        //grunt.task.run('uglify:buildall');
    });

    grunt.registerTask("server",[
        'includeSource:server',
        'wiredep:server',
        'useminPrepare'
    ]);

    grunt.registerTask("test",[
        'includeSource:server',
        'wiredep:server'
    ]);

    /**
     * 项目打包脚本
     */
    grunt.registerTask("build" ,[
        'clean:dist',
        'test',
        'includeSource:dist',
        'wiredep:dist',
        'useminPrepare',
        'concat:dist',
        'concat:build',
        'usemin',
        'filerev:dist',
        //'uglify:build',
        'htmlmin'
    ]);
}
