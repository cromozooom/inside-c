module.exports = function (grunt) {
	grunt.initConfig({
		
		// WATCH task config
		watch: {
			sass: {
				files: ['source/**/*.sass', 'source/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'browserSync']
			},

			css: {
				files: ['source/**/*.sass', 'source/**/*.scss'],
				tasks: ['sass', 'autoprefixer']
			},
			
			pug: {
				files: ['source/**/*.pug'],
				tasks: ['pug'],
			},

			browserSync: {
				files: ['app/**/*.css', 'app/**/*.html', "source/data/*.json"],
				tasks: ['pug', 'browserSync']
			},

		},

		// SASS task config
		sass: {
			dev: {
				files: {
					// destination				// source file
					'app/app.css':			'source/sass/styles.sass',
					
				},
				options: {
					style: 'compressed',
				}
			}
		},

		// AUTOPREFIXER
		autoprefixer:{
			dist:{
				files:{
					'app/app.css':			'app/app.css',
				}
			}
		},

		// PUG
		pug: {
			compile: {
				options: {
					client: false,
					pretty: true,
					data: {
						//data: grunt.file.readJSON('./source/data/data.json'),
						//defaultData: grunt.file.readJSON('./source/data/defaultData.json'),
						//monacoRichesData: grunt.file.readJSON('./source/data/monacoRichesData.json'),
						//redSpinsData: grunt.file.readJSON('./source/data/redSpinsData.json'),
					}
				},
				files: [ {
					cwd: 'source',
					src: '**/*.pug',
					dest: 'app/',
					expand: true,
					ext: '.html'
				}]
			}
		},


		copy: {
			//app: {
			//	files: [{
			//			src: [ 'js/*','style/**/*.css', '!**/*.jade', 'img/**/*'],
			//			dest: './app'
			//		}]
			//}
			app: {
				cwd: 'sources',
				src: [ 'js/*','style/**/*.css', '!**/*.jade', 'img/**/*' ],
				dest: 'app',
				expand: true
			}
		},
		
		
		clean: {
			app: ['./app/**']
		},



		// Using the BrowserSync Server for your static .html files.
		browserSync: {
			default_options: {
				bsFiles: {
					src: [
					'app/css/*.css',
					'app/*.html'
					// '*.pug',
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: './app'
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', ['browserSync', 'autoprefixer', 'watch']);
};