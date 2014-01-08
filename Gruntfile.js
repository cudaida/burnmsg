//Gruntfile
module.exports = function(grunt) {

    //Initializing the configuration object
    grunt.initConfig({ 
        concat: {
            options: {
                separator: ';'
            },            
            javascript: {
                src: [
                    './app/assets/js/app.js',
                    './bower_components/jquery/jquery.min.js',
                    './bower_components/bootstrap/bootstrap.min.js'
                ],
                dest: './public/js/app.js'
            }
        },
        less: {
            development: {
                options: {
                    compress: true, //minify
                },
                files: {
                //compile main stylesheet
                './public/css/styles.css' : './app/assets/less/styles.less'
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    './public/js/app.js' : './public/js/app.js'
                }
            }
        },
        phpunit: {
            classes: {
                dir: './app/tests/'
            },
            options: {
                bin: 'phpunit',
                colors: true
            }
        },
        watch: {
            js: {
                files: ['./app/assets/js/*.*'],
                tasks: ['concat:javascript', 'uglify'],
                options: {
                    livereload: true
                }
            },
            less: {
                files: ['./app/assets/less/*.*'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            tests: {
                files: ['./app/controllers/*.php', './app/models/*.php'],
                tasks: ['phpunit']
            }
        }
    });

    //Load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-phpunit');

    //Define the deault task
    grunt.registerTask('default', ['watch']);
};