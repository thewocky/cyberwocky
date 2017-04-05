/*!
 * Cyberwocky Gruntfile
 * http://cyberwocky.com
 * @author Jeff Battema
 */
 
 'use strict';
 
/**
 * Grunt Module
 */

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	

    // JS libs for use in theme
    var jsFiles = [
		'assets/js/lib/jquery.min.js',
		'assets/js/lib/jquery.easing.1.3.js',
		'assets/js/lib/bootstrap.min.js',
		'assets/js/lib/jquery.waypoints.min.js',
		'assets/js/lib/jquery.magnific-popup.min.js',
		'assets/js/lib/owl.carousel.min.js',
		'assets/js/lib/jquery.countTo.js',
		'assets/js/lib/TweenMax.min.js',
		'assets/js/lib/MorphSVGPlugin.min.js',
		'assets/js/wocky/particles.js',
		'assets/js/wocky/close-curve.js',
		'assets/js/wocky/app-particles.js',
		'assets/js/wocky/wocky.js'
    ];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dev: {
				options: {
					compass: true,
					style: 'expanded',
					sourcemap: 'auto',
					lineNumber: true
				},
				files: {
					'assets/css/wocky.css': 'assets/scss/wocky.scss'
				}
			},
			dist: {
				options: {
					compass: true,
					style: 'compressed',
					sourcemap: false,
					lineNumber: false
				},
				files: {
					'assets/css/wocky.min.css': 'assets/scss/wocky.scss'
				}
			}
		},

		concat: {
			js: {
				src: jsFiles,
                dest: 'assets/js/main.js'
			}
		},

		postcss: {
		    dev: {
				options: {
			      map: true, // inline sourcemaps
			      processors: [
			        require('pixrem')(), // add fallbacks for rem units
			        require('autoprefixer')({browsers: 'last 2 versions, > 5%'}) // add vendor 			      
			        ]
			    },
		    	src: ['assets/css/wocky.css']
		    },
		    dist: {
				options: {
			      map: false, // inline sourcemaps
			      processors: [
			        require('pixrem')(), // add fallbacks for rem units
			        require('autoprefixer')({browsers: 'last 2 versions, > 5%'}), // add vendor 	> 5%		      
			        require('cssnano')() // minify the result
			        ]
			    },
		    	src: ['assets/css/wocky.min.css']
		    }
		},

		uglify: {
			dev: {
				files: {
					'assets/js/main.min.js': ['assets/js/main.js']
				}
			}
		},

		watch: {
			sass: {
				files: ['assets/scss/*.scss', 'assets/scss/**/*.scss'],
				tasks: ['sass:dev','postcss:dev','sass:dist','postcss:dist'],
			},
            scripts: {
                files: ['assets/js/*.js','assets/js/**/*.js'],
                tasks: [
                    'concat:js',
                    'uglify'
                ]
			}
		}
	});

	grunt.registerTask('default', ['watch']);

}