module.exports = function (grunt) {

    var modRewrite = require('connect-modrewrite');

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
            js: {
                expand: true,
                cwd: 'app',
                src: 'js/**/*',
                dest: 'build',
                filter: 'isFile'
            }
        },
        jshint: {
            files: 'app/js/*.js',
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
                src: 'build/index.html',
                dest: 'build/index.html'
            },
            views: {
                expand: true,
                cwd: 'build',
                src: 'views/**/*.html',
                dest: 'build'
            }
        },
        uglify: {
            options: {
                'lift-vars': false,
                compress: false
            },
            live: {
                src: ['app/js/config/*.js', 'app/js/components/**/*.js'],
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
            connect: {
                options: {
                    message: 'Server is ready!'
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

    // Show Elapsed Time at The End
    require('time-grunt')(grunt);

    // Load Npm Tasks
    require('load-grunt-tasks')(grunt);

    // Run Notify
    grunt.task.run('notify_hooks');

    // $ grunt
    grunt.registerTask('default', [
        'clean',
        'copy:index',
        'copy:html',
        'copy:js',
        'stylus',
        'connect:server',
        'notify:connect',
        'watch'
    ]);
    // $ grunt live
    grunt.registerTask('live', [
        'bower:install',
        'clean',
        'copy:index',
        'copy:html',
        'stylus',
        'uglify:live',
        'htmlmin:index',
        'htmlmin:views',
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
        'jshint'
    ]);
};
