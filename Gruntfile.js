module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      development: {
        src: "./src/*.js",
        dest: './dist/game.js',
        options: {
            browserifyOptions: { debug: true },
            transform: [["babelify", { "presets": ["env"] }]],
            watch: true,
        }
      },
      production: {
        src: "./src/*.js",
        dest: './dist/game.js',
        options: {
            browserifyOptions: { debug: false },
            transform: [["babelify", { "presets": ["env"] }]],
            watch: false,
        }
      }
    },
    watch: {
      js: {
        files: './src/*.js',
        tasks: ['default']
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['browserify:development', 'watch']);
  grunt.registerTask('build', ['browserify:production']);
};