module.exports = function(grunt){
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);//加载所有的任务
  grunt.initConfig({
    connect: {
      options: {
        port:9999,
        hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
        livereload: 35720  //声明给 watch 监听的端口
      },
      server: {
        options:{
          open: true, //自动打开网页
          base: [
            '.'  //主目录
          ]
        }
      }
    },
    sass: {
      options:{
        //noCache:true,
        compass:true,
        style:'expanded',
        sourcemap:"none"
      },
      dist: {
        files: {
          'app/css/index.css':'app/scss/index.scss',
        }
      }
    },
    cssmin:{
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          "dest/css/index.css": "app/css/index.css",
        }
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dest/index.html': 'app/index.html',     // 'destination': 'source'
        }
      }
    },
    uglify:{
      my_target: {
        options: {
          beautify: false
        },
        files: {
          'dest/js/index.js': ['app/js/index.js'],
        }
      }
    },
    jade: {
      debug: {
        options: {
          pretty:true,
          data: {
            debug: true
          }
        },
        files: {
          "app/index.html": "app/index.jade",
        }
      }
    },
    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'  //监听前面声明的端口  35729
        },
        files: [
          //下面文件的改变就会实时刷新网页
          'app/{,*/}*.html',
          'app/{,*/}*.jade',
          'app/css/{,*/}*.css',
          'app/scss/{,*/}*.scss',
          'app/js/{,*/}*.js'
        ],
        tasks:['sass', 'jade', 'htmlmin', 'cssmin', 'uglify']
      }
    }
  });
 
  grunt.registerTask('default', [
    'sass',
    'jade',
    'cssmin',
    'htmlmin',
    'uglify',
    'connect',
    'watch'
  ]);
};

