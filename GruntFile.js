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
                src:'grunttest/mods/*.js',
                dest:'build/<%= pkg.name %>.min.js'
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
                dest:'./tmp/dist.js'
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
                    removeComments: true,
                    collapseWhitespace: true
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
        }
    });


    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-jasmine-node");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-wiredep");
    grunt.loadNpmTasks("grunt-include-source");
    grunt.loadNpmTasks("grunt-usemin");


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

    grunt.registerTask("build" ,[
        'test',
        'includeSource:dist',
        'wiredep:dist',
        'useminPrepare',
        'concat:dist',
        'usemin', 
        ''
    ]);
}
