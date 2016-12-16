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
            // minifica os css´s dos plugins
            cssvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'prod/',
                    ext: '.min.css',
                    extDot: 'last'
                }]
            },
        },

        /* UGLIFY MINIFICA */
        uglify: {
            options: {
                sourceMap: false,    // gera sitemaps
            },

            // arquivos de plugins, minifica eles
            jsvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'prod/',
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
            cssvendor: {
                files: ['dev/**/*.css'],
                tasks: ['postcss:cssvendor', 'cssmin:cssvendor']
            },
            jsvendor: {
                files: ['dev/**/*.js'],
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
    grunt.registerTask('init', ['clean', 'postcss', 'cssmin', 'uglify', 'jsonmin']);
};
