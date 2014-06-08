module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: 'build'
        },
        stylus: {
            compile: {
                files: {
                    'build/css/common.css' : 'app/css/*.styl'
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
            server: {
                options: {
                    port: 9000,
                    base: 'build'
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

    // Load Npm Tasks with Matchdep 
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // $ grunt
    grunt.registerTask('default', [
        'clean',
        'copy:index',
        'copy:html',
        'copy:js',
        'stylus',
        'connect:server',
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
