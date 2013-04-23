module.exports = function (grunt) {

    var buildDir = "../server-app/src/main/webapp/mobile/";

    // Project configuration.
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),


            requirejs: {
                compile: {
                    options: {
                        // main file to start to look for its dependencies.
                        name          : 'app',
                        baseUrl       : "src/app",
                        mainConfigFile: "src/config.js",
                        optimize      : "uglify",
                        out           : "build/<%= pkg.name %>.min.js"
                    }
                }
            },

            buster: {
                test  : {
                    config     : 'test/buster.js',
//                    reporter   : 'xml',
                    'log-level': 'debug'
                },
                server: {
                    port: 1111
                }
            },

            handlebars: {
                compile: {
                    options: {
                        amd        : true,
                        wrapped    : false,
                        // the namespace within TemplateManager
                        namespace  : "JST",
                        processName: function (filename) {
                            return filename.split('/').slice(1).join('/');
                        }
                    },
                    files  : {
                        "src/<%= pkg.name %>.jst.js": [
                            "src/app/templates/**/*.html"
                        ]
                    }
                }
            },

            jshint: {
                options: {
                    curly  : true,
                    eqeqeq : true,
                    immed  : true,
                    latedef: true,
                    newcap : true,
                    noarg  : true,
                    sub    : true,
                    undef  : true,
                    boss   : true,
                    eqnull : true,
                    node   : true
                },
                globals: {
                    exports: true,
                    zepto  : true,
                    $      : true,
                    _      : true
                }
            },

            compass: {
                dev : {
                    options: {
                        sassDir       : 'src/resources/sass',
                        cssDir        : 'src/resources/css',
                        outputStyle   : 'expanded',
                        relativeAssets: true,
                        noLineComments: false,
                        debugInfo     : true,
                        imagesDir     : 'src/resources/images',
                        fontsDir      : 'src/resources/fonts'
                    }
                },
                dist: {
                    options: {
                        sassDir       : 'src/resources/sass',
                        cssDir        : 'build/resources/css',
                        outputStyle   : 'compressed',
                        noLineComments: true,
                        debugInfo     : false,
                        relativeAssets: true,
                        imagesDir     : 'src/resources/images',
                        fontsDir      : 'src/resources/fonts',
                        environment   : 'production'
                    }
                }
            },

            watch: {
                compass   : {
                    files: ['src/resources/sass/**/*.scss'],
                    tasks: ['compass:dev']
                },
                handlebars: {
                    files: [
                        'src/app/templates/**/*.html'
                    ],
                    tasks: 'handlebars'
                }
            },

            clean: {
                options: {
                    force : true
                },
                build: [
                    'build/', buildDir
                ]
            },

            copy: {
                build: {
                    files: [
                        {
                            expand: true,
                            cwd   : 'src/',
                            dest  : 'build/',

                            src: [
                                "config.json",
                                "config.js",
                                "index.html",
                                "**/*.css",
                                "**/*.png",
                                "**/*.jpg",

                                "**/*.eot",
                                "**/*.svg",
                                "**/*.ttf",
                                "**/*.woff",
                                "**/*.otf",

                                // exclude everything from scripts folder
                                "!scripts/**"
                            ]

                        },
                        {
                            expand: true,
                            cwd   : 'src/',
                            dest  : 'build/',
                            src   : [
                                // include only requijs from scripts folder
                                "scripts/requirejs/require.js"
                            ]

                        }
                    ]
                },

                debug: {
                    files: [
                        // ios resources
                        {
                            expand: true,
                            cwd   : 'src/',
                            src   : [ '**' ],
                            dest  : buildDir
                        }
                    ]
                },

                dist: {
                    files: [
                        // ios resources
                        {
                            expand: true,
                            cwd   : 'build/',
                            src   : [ '**' ],
                            dest  : buildDir
                        }
                    ]
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-buster');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    // Default task.
    grunt.registerTask('test', 'buster');
    grunt.registerTask('default', 'build'.split(' '));
    grunt.registerTask('build', 'clean compass handlebars requirejs copy:build'.split(' '));
    grunt.registerTask('debug', 'compass handlebars copy:debug'.split(' '));
    grunt.registerTask('dist', 'clean compass:dist handlebars requirejs copy:build copy:dist'.split(' '));

};
