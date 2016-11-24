// Neon Gruntfile
// --------------

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/socket.io-client/socket.io.js',
                    'bower_components/d3/d3.js',
                    'bower_components/topojson/topojson.js',
                ],
                dest: 'dist/js/dependencies.js'
            },

            charts: {
                src: [
                    'src/charts/charts.js',
                    'src/charts/barchart.js',
                    'src/charts/map.js'
                ],
                dest: 'dist/js/charts.js'
            }
        },

        // Launch the static server and open the browser
        connect: {
            server: {
                options: {
                    target: 'http://localhost:5000',
                    port: 5000,
                    livereload: 35729,
                    open: true
                }
            }
        },

        // Rebuild the targets automatically
        watch: {
            options: {
                livereload: true
            },
            less: {
                files: ['src/less/**/*.less'],
                tasks: ['less'],
                options: {
                    reload: true
                }
            }
        },

        // Compile styles
        less: {
            main: {
                options: {
                    paths: ['dist/css']
                },
                files: {
                    'dist/css/main.css': 'src/less/main.less'
                }
            }
        }

    });

    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Tasks
    grunt.registerTask('serve', ['connect:server', 'watch']);
    grunt.registerTask('default', ['less', 'concat']);
};