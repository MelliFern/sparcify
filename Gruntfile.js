'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    clean: {
      build: {
        src: ['build/']
      }
    },

    copy: {
      build: {
        expand: true,
        cwd: 'client/',
        src: ['**/*.html','**/*.css', '**/**/**/**/*.eot', '**/**/**/**/*.svg', '**/**/**/**/*.ttf', '**/**/**/**/*.woff', '**/**/*.png', '**/**/*.jpg'],
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    browserify: {
      dev: {
        src: ['client/**/*.js', 'client/*.js'],
        dest: 'build/bundle.js'
      },
      test: {
        src: ['test/client_side/*_test.js'],
        dest: 'test/client_side/test_bundle.js'
      },
      karmatest: {
        src: ['test/client_test/*_test.js'],
        dest: 'test/client_test/karma_test_bundle.js'
      },
      options: {
        transform: ['debowerify']
      }
    },
    karma: {
      unit: {
      configFile: 'karma.conf.js'
      }
    }
  });
  grunt.registerTask('build', ['clean','browserify', 'copy']);
  grunt.registerTask('build:test', ['browserify:test']);
  grunt.registerTask('test:client', ['browserify:karmatest', 'karma:unit']);
};
