module.exports = function (grunt) {

    //dependencies
    require('load-grunt-tasks')(grunt);

    var gruntSettings = {

        /* POST CSS AUTO-PREFIXER CSS */
        postcss: {
            options: {
                processors: [
                  require('autoprefixer')({
                      remove: false,
                      browsers: [
                          'last 4 Chrome versions',
                          'last 4 Firefox versions',
                          'last 4 Explorer versions',
                          'last 4 Edge versions',
                          'last 4 iOS versions',
                          'last 4 Opera versions',
                          'last 4 Safari versions',
                          'last 4 OperaMobile versions',
                          'last 4 OperaMini versions',
                          'last 4 ChromeAndroid versions',
                          'last 4 FirefoxAndroid versions',
                          'last 4 ExplorerMobile versions'
                      ]
                  })
                ]
            },
            // para os plugins
            cssvendor: {
                src: ['dev/**/*.css'],
            }
        },

        /* CSSMIN MINIFICA, COMBINA CSS */
        cssmin: {
            // minifica os css´s da config
            cssvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/js/config/',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'prod/cfw/',
                    ext: '.min.css',
                    extDot: 'last'
                }]
            },

            // minifica os css´s dos plugins
            cssvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/js/plugin/',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'prod/vendor/',
                    ext: '.min.css',
                    extDot: 'last'
                }]
            }
        },

        /* UGLIFY MINIFICA */
        uglify: {
            options: {
                sourceMap: false
            },

            // config (main file)
            jsmain: {
                files: {
                    'prod/cfw/cfw.min.js': ['dev/js/cfw.js']
                }
            },

            // arquivos de configurações
            jsconfig: {
                files: [{
                    expand: true,
                    cwd: 'dev/js/config',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'prod/cfw/',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            },

            // arquivos de plugins
            jsvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/js/plugin',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'prod/vendor/',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            },
        },

        /* UGLIFY MINIFICA */
        jsonmin: {
            jsonvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: ['**/*.json', '!**/*.min.json'],
                    dest: 'prod/',
                    ext: '.min.json',
                    extDot: 'last'
                }]
            }
        },

        /* COPIA ARQUIVOS DOS PLUGINS (FORA CSS E JS) */
        copy: {
            copyvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/js/plugin',
                    src: ['**/*.jpg', '**/*.png', '**/*.gif', '**/*.cur', '**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.php'],
                    dest: 'prod/vendor/'
                }]
            }
        },

        /* DELETA AS PASTAS */
        clean: ['prod'],

        /* WATCH, VERIFICA ALTERAÇÕES NOS ARQUIVOS */
        watch: {
            /*
             * tarefa padrão de desenvolvimento
             */
            options: {
                spawn: false,
            },
            cssconfig: {
                files: ['dev/js/config/**/*.css'],
                tasks: ['postcss:cssconfig', 'cssmin:cssconfig']
            },
            cssvendor: {
                files: ['dev/js/plugin/**/*.css'],
                tasks: ['postcss:cssvendor', 'cssmin:cssvendor']
            },
            mainjs: {
                files: ['dev/js/cfw.js'],
                tasks: ['uglify:jsmain']
            },
            jsconfig: {
                files: ['dev/js/config/**/*.js'],
                tasks: ['uglify:jsconfig']
            },
            jsvendor: {
                files: ['dev/js/plugin/**/*.js'],
                tasks: ['uglify:jsvendor']
            },
            jsonvendor: {
                files: ['dev/vendor/**/*.json'],
                tasks: ['jsonmin:jsonvendor']
            },
            gruntfile: {
                files: ['gruntfile.js']
            }

        }

    };

    grunt.initConfig(gruntSettings);

    /* TAREFA PADRÃO */
    grunt.registerTask('default', ['watch']);

    /* TAREFA GERA TUDO */
    grunt.registerTask('init', ['clean', 'postcss', 'cssmin', 'uglify', 'jsonmin', 'copy']);
};
