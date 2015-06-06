/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    eslint: {
      target: ['src/*.js'],
      options: {
        config: '.eslintrc'
      }
    },
    jscs: {
        src: ['src/*.js'],
        options: {
            config: '.jscsrc'
        }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.pcextreme.nl',
          port: 21,
          authKey: 'gloey.nl'
        },
        src: 'dist',
        dest: '/domains/gloey.nl/htdocs/www/apps/autolayout'
      }
    },
    exec: {
      clean: 'rm -rf ./dist',
      build: 'webpack -p',
      'build-debug': 'webpack -d',
      'serve': 'webpack-dev-server -d --inline --reload=localhost',
      'open-serve': 'open http://localhost:8080'
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-exec');

  // Default task.
  grunt.registerTask('default', ['eslint', 'jscs', 'exec:build-debug']);
  grunt.registerTask('clean', ['exec:clean']);
  grunt.registerTask('serve', ['eslint', 'jscs', 'exec:open-serve', 'exec:serve']);
  grunt.registerTask('deploy', ['eslint', 'jscs', 'exec:clean', 'exec:build-debug', 'ftp-deploy']);
};
