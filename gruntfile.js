module.exports = function (grunt) {

    var modRewrite = require('connect-modrewrite'),
        sortedJsPath = [
            'js/components/angular/*.js',
            'js/components/angular-route/*.js',
            'js/components/**/*.js',
            'js/config/**/*.js',
            'js/directive/**/*.js',
            'views/**/*.js'
        ],
        getUglifyFiles = function () {
            var paths = [];

            sortedJsPath.map(function (path) {
                paths.push('app/' + path);
            });

            return paths;
        };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: 'build'
        },
        stylus: {
            compile: {
                files: {
                    'build/css/common.css' : 'app/css/import.styl'
                }
            }
        },
        copy: {
            index: {
                expand: true,
                cwd: 'app/views',
                src: 'index.html',
                dest: 'build',
                filter: 'isFile'
            },
            html: {
                expand: true,
                cwd: 'app',
                src: ['views/**/*.html', '!views/index.html'],
                dest: 'build',
                filter: 'isFile'
            },
            img: {
                expand: true,
                cwd: 'app',
                src: ['img/**/*.png', '!img/sprite/**/*.png', '!img/sprite-retina/**/*.png'],
                dest: 'build'
            },
            js: {
                expand: true,
                cwd: 'app',
                src: 'js/**/*',
                dest: 'build',
                filter: 'isFile'
            },
            ctrl: {
                expand: true,
                cwd: 'app',
                src: 'views/**/*.js',
                dest: 'build',
                filter: 'isFile'
            }
        },
        jshint: {
            files: 'app/views/**/*.js',
            options: {
                unused: true,
                curly: true,
                boss: true,
                onevar: true,
                indent: 4,
                camelcase: true,
                latedef: true,
                quotmark: 'single',
                trailing: true,
                evil: true,
                white: true,
                strict: true,
                globals: {
                    console: true
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            server: {
                options: {
                    open: true,
                    base: 'build',
                    middleware: function(connect, options) {
                        var middlewares = [];

                        middlewares.push(modRewrite(['^[^\\.]*$ /index.html [L]']));

                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        return middlewares;
                    }
                }
            }
        },
        bower: {
            options: {
                targetDir: 'app/js/components',
                cleanTargetDir: false,
                cleanBowerDir: true,
                verbose: true
            },
            install: {}
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            index: {
                src: 'app/views/index.html',
                dest: 'build/index.html'
            },
            views: {
                expand: true,
                cwd: 'app',
                src: ['views/**/*.html', '!views/index.html'],
                dest: 'build'
            }
        },
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'build',
                    src: 'img/**/*.png',
                    dest: 'build',
                    ext: '.png'
                }]
            }
        },
        uglify: {
            options: {
                'lift-vars': false,
                compress: false
            },
            live: {
                src: getUglifyFiles(),
                dest: 'build/js/common.js',
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true
                }
            }
        },
        filerev: {
            dist: {
                src: [
                    'build/js/**/*.js',
                    'build/css/**/*.css',
                    'build/img/**/*.{png,jpg,svg}'
                ]
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: "Grabs"
            }
        },
        notify: {
            watch: {
                options: {
                    message: 'Grabs is ready!'
                }
            }
        },
        sprite: {
            normal: {
                src: 'app/img/sprite/**/*.png',
                destImg: 'build/img/sprite.png',
                destCSS: 'app/css/sprite.styl',
                imgPath: '/img/sprite.png',
                algorithm: 'binary-tree',
                padding: 1
            },
            retina: {
                src: 'app/img/sprite-retina/**/*.png',
                destImg: 'build/img/sprite-retina.png',
                destCSS: 'app/css/sprite-retina.styl',
                imgPath: '/img/sprite-retina.png',
                algorithm: 'binary-tree',
                padding: 2,
                cssVarMap: function (sprite) {
                    sprite.name = sprite.name + '-2x';
                }
            }
        },
        template: {
            development: {
                src: 'app/views/index.html',
                dest: 'build/index.html',
                options: {
                    data: function () {
                        return {
                            development: true,
                            jsFiles: grunt.file.expand({cwd: 'app'}, sortedJsPath)
                        };
                    }
                }
            }
        },
        watch: {
            all: {
                options: {
                    livereload: 35729
                },
                files: 'app/**/*'
            },
            html: {
                files: 'app/**/*.html',
                tasks: 'html'
            },
            css: {
                files: 'app/**/*.styl',
                tasks: 'css',
                options: {
                    nospawn: true
                }
            },
            js: {
                files: 'app/**/*.js',
                tasks: 'js'
            }
        }
    });

    // Load Npm Tasks
    require('load-grunt-tasks')(grunt);

    // Run Notify
    grunt.task.run('notify_hooks');

    // $ grunt
    grunt.registerTask('default', [
        'clean',
        'copy:index',
        'copy:html',
        'copy:img',
        'copy:js',
        'copy:ctrl',
        'sprite',
        'stylus',
        'template:development',
        'connect:server',
        'notify:watch',
        'watch'
    ]);
    // $ grunt live
    grunt.registerTask('live', [
        'bower:install',
        'clean',
        'stylus',
        'uglify:live',
        'htmlmin:index',
        'htmlmin:views',
        'sprite',
        'imagemin',
        'filerev'
    ]);

    // Watch Tasks
    grunt.registerTask('html', [
        'copy:index',
        'copy:html'
    ]);
    grunt.registerTask('css', [
        'stylus'
    ]);
    grunt.registerTask('js', [
        'copy:js',
        'copy:ctrl',
        'jshint'
    ]);
};
