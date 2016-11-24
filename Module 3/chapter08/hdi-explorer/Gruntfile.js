module.exports = function(grunt) {

    // Initialize the grunt configuration
    grunt.initConfig({
        // Import the package configuration
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['Gruntfile.js']
        },

        copy: {
            bootstrap: {
                files: [
                    {
                        cwd: 'bower_components/bootstrap/dist/js/',
                        src: '*.min.js',
                        dest: 'js/lib/',
                        filter: 'isFile',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/bootstrap/dist/css/',
                        src: '*.min.css',
                        dest: 'css/',
                        filter: 'isFile',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/bootstrap/dist/fonts',
                        src: '**',
                        dest: 'fonts/',
                        filter: 'isFile',
                        expand: true
                    }
                ]
            },
            fontawesome: {
                files: [
                    {
                        cwd: 'bower_components/font-awesome/css/',
                        src: '*.min.css',
                        dest: 'css/',
                        filter: 'isFile',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/font-awesome/fonts',
                        src: '**',
                        dest: 'fonts/',
                        filter: 'isFile',
                        expand: true
                    }
                ]
            },
            jquery: {
                src: 'bower_components/jquery/dist/jquery.js',
                dest: 'js/lib/jquery.min.js'
            },
            backbone: {
                src: 'bower_components/backbone/backbone.js',
                dest: 'js/lib/backbone-min.js'
            },
            underscore: {
                src: 'bower_components/underscore/underscore.js',
                dest: 'js/lib/underscore-min.js'
            },
            d3: {
                src: 'bower_components/d3/d3.min.js',
                dest: 'js/lib/d3.min.js'
            },
            typeahead: {
                files: [
                    {
                        src: 'bower_components/typeahead.js/dist/bloodhound.js',
                        dest: 'js/lib/bloodhound.js'
                    },
                    {
                        src: 'bower_components/typeahead.js/dist/typeahead.jquery.js',
                        dest: 'js/lib/typeahead.jquery.js'
                    }
                ]
            },
            firebase: {
                src: 'bower_components/firebase/firebase.js',
                dest: 'js/lib/firebase.js'
            }
        },

        concat: {
            dependencies: {
                src: [
                    'js/lib/jquery.min.js',
                    'js/lib/underscore-min.js',
                    'js/lib/backbone-min.js',
                    'js/lib/bootstrap.min.js',
                    'js/lib/bloodhound.js',
                    'js/lib/typeahead.jquery.js',
                    'js/lib/firebase.js',
                    'js/lib/d3.min.js'
                ],
                dest: 'dependencies.min.js'
            },

            app: {
                src: [
                    'js/app/app.js',
                    'js/app/models/app.js',
                    'js/app/models/country.js',
                    'js/app/collections/countries.js',
                    'js/app/views/country.js',
                    'js/app/views/countries.js',
                    'js/app/setup.js'
                ],
                dest: 'js/application.js'
            },

            hdi: {
                src: [
                    'js/src/charts.js',
                    'js/application.js'
                ],
                dest: 'hdi.js'
            },

            css: {
                src: [
                    'css/main.css',
                    'css/charts.css',
                    'css/summary.css',
                    'css/sharing.css'
                ],
                dest: 'hdi.css'
            }
        },

        uglify: {
            options: {mangle: false},
            hdi: {
                files: {
                    'hdi.min.js': ['hdi.js']
                }
            }
        },

        clean: [
            'js/lib/*.js',
            'js/application.js'
        ],

        watch: {
            all: {
                files: ['css/main.css', 'css/sharing.css', 'css/summary.css', 'css/charts.css'],
                tasks: ['build'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    // Enable the grunt plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register Tasks

    // Test Task
    grunt.registerTask('build', ['jshint', 'copy', 'concat', 'uglify', 'clean']);
    grunt.registerTask('dist', ['build']);
    grunt.registerTask('default', ['build']);


};