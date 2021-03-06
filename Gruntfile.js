module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist/**/*']
        },
        bower: {
            install: {
                options: {
                    layout: 'byComponent',
                    cleanup: true
                }
            }
        },
        less: {
            my_target: {
                files: {
                    'src/generated/style.css': 'src/less/style.less'
                }
            }
        },
        cssmin: {
            my_target: {
                files: {
                    'dist/css/style.min.css': 'src/generated/style.css'
                }
            }
        },
        uglify: {
            my_target: {
                files: {'dist/js/excalibur.min.js': 'src/js/excalibur.js'}
            }
        },
        copy: {
            js: {
                expand: true,
                flatten: true,
                src: ['lib/bootstrap/js/bootstrap.min.js',
                        'lib/jquery/jquery.min.*'],
                dest: 'dist/js'
            },
            img: {
                expand: true,
                flatten: true,
                src: ['src/img/*.png', 'src/img/*.jpg'],
                dest: 'dist/img'
            },
            fonts: {
                expand: true,
                flatten: true,
                src: 'lib/bootstrap/fonts/*',
                dest: 'dist/fonts'
            },
            favicons: {
                expand: true,
                flatten: true,
                src: 'src/favicons/*',
                dest: 'dist/'
            }
        },
        htmlbuild: {
            dist: {
                src: 'src/index.html',
                dest: 'dist',
                options: {
                    beautify: true,
                    scripts: {
                        bundle: [
                            'dist/js/jquery.min.js',
                            'dist/js/bootstrap.min.js',
                            'dist/js/excalibur.min.js'
                        ]
                    },
                    styles: {
                        bundle: [
                            'dist/css/style.min.css'
                        ]
                    }
                }
            }
        },
        watch: {
            src: {
                files: 'src/**/*',
                tasks: ['less'],
                options: {
                    livereload: true
                }
            }

        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'bower', 'less', 'cssmin', 'uglify', 'copy', 'htmlbuild']);
    grunt.registerTask('build', ['clean', 'less', 'cssmin', 'uglify', 'copy', 'htmlbuild']);

};