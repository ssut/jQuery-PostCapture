/*jshint node:true*/
module.exports = function (grunt) {
    'use strict';

    var banner,
        umdStart,
        umdMiddle,
        umdEnd,
        umdStandardDefine,
        umdAdditionalDefine,
        umdLocalizationDefine;

    banner = '/*!\n' +
    ' * jQuery Validation Plugin v<%= pkg.version %>\n' +
    ' *\n' +
    ' * <%= pkg.homepage %>\n' +
    ' *\n' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
    ' * Released under the <%= _.pluck(pkg.licenses, "type").join(", ") %> license\n' +
    ' */\n';

    // define UMD wrapper variables

    // Expose plugin as an AMD module if AMD Loader is present:
    umdStart = '(function(factory) {\n' +
        '\tif (typeof define === \'function\' && define.amd) {\n';

    // Browser globals:
    umdMiddle = '\t} else {\n' +
    '\t\tfactory(window.jQuery);\n' +
    '\t}\n' +
    '}(function($) {\n\n';

    umdEnd = '\n}));';

    // Register as an anonymous AMD module:
    umdStandardDefine = '\t\tdefine([\'jquery\'], factory);\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            // used to copy to dist folder
            dist: {
                options: {
                    banner: banner +
                            umdStart +
                            umdStandardDefine +
                            umdMiddle,
                    footer: umdEnd
                },
                files: {
                    'dist/jquery.postcapture.js': ['src/core.js', 'src/*.js']
                }
            }
        },
        uglify: {
            options: {
                preserveComments: false,
                banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("m/d/yyyy") %>\n' +
                        ' * <%= pkg.homepage %>\n' +
                        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                        ' Licensed <%= _.pluck(pkg.licenses, ""type").join(", ") %> */\n'
            },
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'dist/jquery.postcapture.min.map'
                },
                files: {
                    'dist/jquery.postcapture.min.js': 'dist/jquery.postcapture.js'
                }
            }
        },
        compress: {
            dist: {
                options: {
                    mode: 'zip',
                    level: 1,
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip',
                    pretty: true
                },
                src: [
                    'dist/*.js',
                    'Gruntfile.js',
                    'README.md',
                    'src/*.js',
                    'test/**/*.*'
                ]
            }
        },
        qunit: {
            files: 'test/index.html'
        },
        jshint: {
            options: {
                jshintrc: true
            },
            core: {
                src: 'src/*.js'
            },
            test: {
                src: 'test/*.js'
            },
            grunt: {
                src: 'Gruntfile.js'
            }
        },
        watch: {
            options: {
                atBegin: true
            },
            gruntfile: {
                files: '<%= jshint.grunt.src %>',
                tasks: [
                    'jshint:grunt'
                ]
            },
            src: {
                files: '<%= jshint.core.src %>',
                tasks: [
                    'jshint:core',
                    'concat',
                    'qunit'
                ]
            },
            test: {
                files: [
                    '<%= jshint.test.src %>',
                    'test/index.html'
                ],
                tasks: [
                    'jshint:test'
                ]
            }
        },
        replace: {
            dist: {
                src: 'dist/**/*.min.js',
                overwrite: true,
                replacements: [
                    {
                        from: './jquery.postcapture',
                        to: './jquery.postcapture.min'
                    }
                ]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('default', [ 'concat', 'jshint', 'qunit' ]);
    grunt.registerTask('release', [ 'default', 'uglify', 'replace', 'compress' ]);
    grunt.registerTask('start', [ 'concat', 'watch' ]);
};
